var Game = function () {
    console.log('[game.js] constructing game');

    // begin with no state
    this.state = null;

    // global game clock
    this.clock = new THREE.Clock();

    // start lagscale at 1, assuming no lag
    this.lagScale = 1;

    // create empty 3d scene (also renderer & camera)
    this.createScene();
    
    // somewhere to store 3D fonts
    this.fonts = {};

    this.gameData = {
        score : 0
    }
    
    // start update loop
    requestAnimationFrame(this.update.bind(this));
};

Game.prototype.update = function () {
    // continue update loop
    requestAnimationFrame(this.update.bind(this));
    
    // update the clock delta and lag scale
    this.clockDelta = this.clock.getDelta();
    this.lagScale = lerp(this.lagScale, this.clockDelta / .01666666666, 0.9);

    // run the update function for whatever state is active
    this.state.update(this);

    // render the frame
    this.renderer.render(this.scene, this.camera);
};

Game.prototype.states = {};
Game.prototype.setState = function (stateName) {
    // if we're already in a state, destroy it
    if (this.state) {
        this.state.destroy(game);
    }

    // switch to new state!
    console.log('[game.js] setting state to ' + stateName);
    this.state = new this.states[stateName](this);
};

Game.prototype.createScene = function () {
    console.log('[game.js] creating scene');

    this.camera = new THREE.PerspectiveCamera(28, window.innerWidth / window.innerHeight, 1, 4000);
    this.camera.position.set(250,0,1800);
    this.camera.useQuaternion = true;

    this.container = document.querySelector('.game-container');
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0.0);
    this.renderer.autoClear = false;

    // Lights
    this.ambientLight = new THREE.AmbientLight(0x777777);
    this.scene.add(this.ambientLight);
    
    this.directionalLight = new THREE.DirectionalLight(0xffffff);
    this.directionalLight.position.set(1, 0, 1.5).normalize();
    this.scene.add(this.directionalLight);
    
    this.keyboard = new THREEx.KeyboardState(this.renderer.domElement);
    
    // add canvas to DOM
    document.body.appendChild(this.renderer.domElement);

    this.renderer.domElement.setAttribute("tabIndex", "1");
	this.renderer.domElement.focus();
    this.renderer.domElement.click();
    
    // set renderer size
    this.updateViewportSize();
    window.addEventListener('resize', this.updateViewportSize.bind(this));
};

Game.prototype.updateViewportSize = function () {
    // update renderer size
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // update camera aspect
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
};

Game.prototype.removeMesh = function (mesh) {
    this.scene.remove(mesh);
    if (mesh.geometry) {
        mesh.geometry.dispose();
    }
    if (mesh.material) {
        if (mesh.material.uniforms && mesh.material.uniforms.texture) {
            mesh.material.uniforms.texture.value.dispose();
        }
        mesh.material.dispose();
    }

};

Game.prototype.registerFont = function (name, font) {
    this.fonts[name] = font;
};
