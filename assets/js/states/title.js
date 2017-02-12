Game.prototype.states.title = function (game) {
    this.name = 'title';
    console.log('[title.js] creating title state');

    this.counter = 0;
    
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
    
    this.texts.position.x = 250;
    
    game.scene.add(this.texts);

    // SPACESHIP
    this.spaceShip = Models.spaceShip();
    this.spaceShip.scale.set(1.5, 1.5, 1.5);
    this.spaceShip.rotation.set(0.3, -0.4, 1);
    this.spaceShip.position.set(290,250,50);
    game.scene.add(this.spaceShip);
};

Game.prototype.states.title.prototype.update = function (game) {
    this.counter++;
    
    var multiply = Math.sin(this.counter* 30 * Math.PI / 180) + 1;
    this.spaceShip.children[1].scale.set(1,1+(multiply * 0.05), 1);
    this.spaceShip.children[1].position.y = multiply * 2.05;
    
    this.spaceShip.rotation.z = -1 * (Math.PI / 180 * this.counter) + 0.09;
    this.spaceShip.position.x = -1* 180*Math.cos(Math.PI / 180 * this.counter) + 250;
    this.spaceShip.position.y = 180 * Math.sin(Math.PI / 180 * this.counter) + 240;
    this.spaceShip.position.z = -1* 360 * Math.sin(Math.PI / 180 * this.counter) -200 ;

    if(game.keyboard.pressed('space')){
        game.setState('planets');
    }
    
};

Game.prototype.states.title.prototype.destroy = function (game) {
    console.log('[title.js] destroying title state');

    game.removeMesh(this.texts);
    game.removeMesh(this.spaceShip);
};
