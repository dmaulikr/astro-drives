Game.prototype.states.title = function (game) {
    this.name = 'title';
    console.log('[title.js] creating title state');

    this.counter = 0;
    
    this.directionalLight = new THREE.DirectionalLight(0xffffff);
    this.directionalLight.position.set(0, 0, 1.5).normalize();
    game.scene.add(this.directionalLight);
    
    this.texts = new THREE.Group();
    
    // MAIN TITLE
    this.title1 = Models.text('ASTRO',100);
    this.title1.position.y = 250;
    this.texts.add(this.title1);

    this.title2 = Models.text('DRIVES',100);
    this.title2.position.y = 150;
    this.texts.add(this.title2);
    
    // INSTRUCTION TEXT
    this.instruction1 = Models.text('press SPACE to start, then',30);
    this.instruction1.position.y = -20;
    this.texts.add(this.instruction1);
    
    this.instruction2 = Models.text('use UP and DOWN keys',30);
    this.instruction2.position.y = -60;
    this.texts.add(this.instruction2);
    
    this.instruction3 = Models.text('to change speed',30);
    this.instruction3.position.y = -100;
    this.texts.add(this.instruction3);
    
    this.texts.position.set(266, 158, -44);
    this.texts.rotation.set(1.38, -0.09, 0.32);
    game.scene.add(this.texts);
    
    // MAIN PLANET
    var planetGeom = new THREE.IcosahedronGeometry(120, 2);
    this.planetOne = new THREE.Mesh(planetGeom, Models.materials.planetOne);
    this.planetOne.position.x = 250;
    this.planetOne.position.y = 350;
    
    this.planetOneShied = new THREE.Mesh(planetGeom, Models.materials.planetShield);
    this.planetOneShied.position.x = 250;
    this.planetOneShied.position.y = 350;
    this.planetOneShied.scale.set(1.1,1.1,1.1);

    game.scene.add(this.planetOne);
    game.scene.add(this.planetOneShied);
    
    // Trajection
    this.trajectionLine = Models.trajectionLine(300);
    this.trajectionLine.position.x = 250;
    this.trajectionLine.position.y = 350;
    game.scene.add(this.trajectionLine);
    
    // SPACESHIP
    this.spaceShip = Models.spaceShip();
    game.scene.add(this.spaceShip);
    
    game.scene.rotation.set(-1.24, 0.32, 0)
    
};

Game.prototype.states.title.prototype.update = function (game) {
    this.counter++;
    
    var multiply = Math.sin(this.counter* 30 * Math.PI / 180) + 1;
    this.spaceShip.children[1].scale.set(1,1+(multiply * 0.05), 1);
    this.spaceShip.children[1].position.y = multiply * 2.05;
    
    this.spaceShip.rotation.z = -1 * (Math.PI / 180 * this.counter) + 0.09;
    this.spaceShip.position.x = -1* 300*Math.cos(Math.PI / 180 * this.counter) + 250;
    this.spaceShip.position.y = 300 * Math.sin(Math.PI / 180 * this.counter) + 350;

    if(game.keyboard.pressed('space')){
        game.setState('planets');
    }
    
    if(game.keyboard.pressed('w')){
        this.directionalLight.position.x += 1;
    }
    
    if(game.keyboard.pressed('s')){
        this.directionalLight.position.x -= 1;
    }
    
    if(game.keyboard.pressed('d')){
        this.directionalLight.position.y += 1;
    }
    
    if(game.keyboard.pressed('a')){
        this.directionalLight.position.y -= 1;
    }
    
    if(game.keyboard.pressed('q')){
        this.directionalLight.position.z += 1;
    }
    
    if(game.keyboard.pressed('e')){
        this.directionalLight.position.z -= 1;
    }
    
    if(game.keyboard.pressed('r')){
        console.log(this.directionalLight.position);
    }
    
};

Game.prototype.states.title.prototype.destroy = function (game) {
    console.log('[title.js] destroying title state');
    game.removeMesh(this.texts);
    game.removeMesh(this.directionalLight);
    game.removeMesh(this.planetOne);
    game.removeMesh(this.planetOneShied);
    game.removeMesh(this.trajectionLine);
    game.removeMesh(this.spaceShip);
};
