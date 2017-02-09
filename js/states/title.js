Game.prototype.states.title = function (game) {
    this.name = 'title';
    console.log('[title.js] creating title state');

    this.counter = 0;
    
    this.geometry = new THREE.TextGeometry(
        'Press space to start',
        {
            size: 30,
            height: 9,
            curveSegments : 10,
            font : game.fonts.main,
            bevelEnabled : true,
            bevelThickness : 1,
            bevelSize : 1
        }
    );
    this.geometry.center();
    this.mesh = new THREE.Mesh(this.geometry, Models.materials.flame);
    
    game.scene.add(this.mesh);
    
    this.spaceShip = Models.spaceShip();
    this.spaceShip.scale.set(12,12,12);
    this.spaceShip.rotation.set(0.3, -0.4, 1);
    this.spaceShip.position.set(150,220,50);
    game.scene.add(this.spaceShip);

};

Game.prototype.states.title.prototype.update = function (game) {
    this.counter++;
    
    var multiply = Math.sin(this.counter* 30 * Math.PI / 180) + 1;
    this.spaceShip.children[1].scale.set(1,1+(multiply * 0.05), 1);
    this.spaceShip.children[1].position.y = multiply * 2.05;
    
    if(game.keyboard.pressed('space')){
        game.setState('planets');
    }
    
};

Game.prototype.states.title.prototype.destroy = function (game) {
    console.log('[title.js] destroying title state');

    game.removeMesh(this.mesh);
    game.removeMesh(this.spaceShip);
};
