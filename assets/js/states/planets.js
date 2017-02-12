Game.prototype.states.planets = function (game) {
    this.name = 'planets';
    console.log('[planets.js] creating planets');
    
    this.count = 0;
    this.movement = 0;
    this.score = 0;
    this.spaceShipState = 0;
    this.satellites = [];
    game.gameData.score = 0;
    document.getElementById("score").innerHTML = '';
    
    // MAIN PLANET
    var planetGeom = new THREE.IcosahedronGeometry(120, 2);
    this.planetOne = new THREE.Mesh(planetGeom, Models.materials.planetOne);
    this.planetOne.position.y = -100;
    
    this.planetOneShied = new THREE.Mesh(planetGeom, Models.materials.planetShield);
    this.planetOneShied.position.y = -100;
    this.planetOneShied.scale.set(1.1,1.1,1.1);

    game.scene.add(this.planetOne);
    game.scene.add(this.planetOneShied);
    
    // Trajection
    this.trajectionLine = Models.trajectionLine(350);
    this.trajectionLine.position.y = -100;
    game.scene.add(this.trajectionLine);
    
    // OTHER PLANET
    this.planetTwo = new THREE.Mesh(planetGeom, Models.materials.planetTwo);
    this.planetTwo.scale.set(.7,.7,.7);
    this.planetTwo.position.y = -100;
    this.planetTwo.position.x = 550;
    
    this.planetTwoShield = new THREE.Mesh(planetGeom, Models.materials.planetShield);
    this.planetTwoShield.position.y = -100;
    this.planetTwoShield.position.x = 550;
    this.planetTwoShield.scale.set(.77,.77,.77);

    game.scene.add(this.planetTwo);
    game.scene.add(this.planetTwoShield);
    
    // Trajection
    this.trajectionLineOther = Models.trajectionLine(300);
    this.trajectionLineOther.position.y = -100;
    this.trajectionLineOther.position.x = 550;
    game.scene.add(this.trajectionLineOther);
    
    // Turn check
    this.turnMarker = new THREE.Mesh(new THREE.IcosahedronGeometry(35, 1), new THREE.MeshPhongMaterial({opacity:0.1, transparent: true, color: 0xbbbbbb, wireframe: true, side: THREE.DoubleSide }));
    this.turnMarker.rotation.z = -1 * (Math.PI / 180 * 46) + 0.08;
    this.turnMarker.position.x = -1* 350*Math.cos(Math.PI / 180 * 46) + 0;
    this.turnMarker.position.y = 350*Math.sin(Math.PI / 180 * 46) + 0 - 100;
    game.scene.add(this.turnMarker);
    
    // Spaceship
    this.spaceShip = Models.spaceShip();
    game.scene.add(this.spaceShip);
    
    game.scene.rotation.set(5.2,0,0);
};

Game.prototype.states.planets.prototype.update = function (game) {
    
    this.multiplier = 1;
    this.flameMultiplier = 1;

    if(game.keyboard.pressed('up')){
        this.multiplier = 2;
        this.flameMultiplier = 1.2;
    }
    
    if(game.keyboard.pressed('down')){
        this.multiplier = .5;
        this.flameMultiplier = 0.8;
    }
    
    this.count ++;
    this.movement += this.multiplier;
    if(this.movement > 360) this.movement = 0;
    
    //The game logic
    if(this.movement > 45 && this.movement < 55){
        if(this.spaceShipState == 0){
            this.score++;
            document.getElementById("score").innerHTML = this.score;
            
            //add new satellite if needed
            if(this.score == 1 || (this.score < 12 && this.score % 3 == 0) || (this.score > 12 && this.score % 5 == 0)) {
                var satellite = {
                    model : Math.random() >= .5 ? Models.satelliteOne() : Models.satelliteTwo(),
                    direction : Math.random() >= .5 ? 1 : -1,
                    speed : Math.random(),
                    start: Math.round(Math.random() * 360),
                    added : false
                };
                
                satellite.model.rotation.z = -1 * (Math.PI / 180 * satellite.start) + 0.08;
                satellite.model.position.x = -1* 300*Math.cos(Math.PI / 180 * satellite.start) + 550;
                satellite.model.position.y = 300*Math.sin(Math.PI / 180 * satellite.start) -100;
                this.satellites.push(satellite);
            }
            
            this.spaceShipState = 1;
        }
        this.turnMarker.material.color =  new THREE.Color(0xffcc00);
        this.turnMarker.material.opacity =  .5;
    } else {
        this.spaceShipState = 0;
        this.turnMarker.material.color =  new THREE.Color(0xbbbbbb);
        this.turnMarker.material.opacity =  .1;
    }
    
    this.planetOne.rotation.z += .002;
    this.planetOneShied.rotation.z -= .002;
    
    this.planetTwo.rotation.z += .002;
    this.planetTwoShield.rotation.z -= .002;
    
    var step = this.count;

    //animate spaceShip
    var multiply = Math.sin(step*30 * Math.PI / 180) + 1;
    this.spaceShip.children[1].scale.set(this.flameMultiplier,1+(multiply * 0.05),this.flameMultiplier);
    this.spaceShip.children[1].position.y = multiply*2.05;
    
    this.spaceShip.rotation.z = -1 * (Math.PI / 180 * this.movement) + 0.08;
    this.spaceShip.position.x = -1* 350*Math.cos(Math.PI / 180 * this.movement) + 0;
    this.spaceShip.position.y = 350*Math.sin(Math.PI / 180 * this.movement) + 0 - 100;
    
    var spaceShipBox = new THREE.Box3().setFromObject(this.spaceShip);
    
    //animate satellites && check collosion
    for(var s in this.satellites){
        if(this.satellites[s].added === false){
            game.scene.add(this.satellites[s].model);
            this.satellites[s].added = true;
        }
        this.satellites[s].model.rotation.z = this.satellites[s].direction * (Math.PI / 180 * (this.satellites[s].speed+ .5 )*(this.satellites[s].start + this.count)) + 0.08;
        this.satellites[s].model.position.x = this.satellites[s].direction * 300*Math.cos(Math.PI / 180 * (this.satellites[s].speed+ .5 )*(this.satellites[s].start + this.count)) + 550;
        this.satellites[s].model.position.y = 300*Math.sin(Math.PI / 180 * (this.satellites[s].speed+ .5 )* (this.satellites[s].start + this.count)) - 100;
        
        var collosion = spaceShipBox.intersectsBox(new THREE.Box3().setFromObject(this.satellites[s].model));
        if(collosion){
            game.gameData.score = this.score;
            game.setState('endgame'); 
        }
        
    }
};

Game.prototype.states.planets.prototype.destroy = function (game) {
    console.log('[title.js] destroying title state');
    game.removeMesh(this.spaceShip);
    game.removeMesh(this.planetOne);
    game.removeMesh(this.planetOneShied);
    game.removeMesh(this.trajectionLine);
    game.removeMesh(this.planetTwo);
    game.removeMesh(this.planetTwoShield);
    game.removeMesh(this.trajectionLineOther);
    game.removeMesh(this.turnMarker);
    for(var s in this.satellites){
        game.removeMesh(this.satellites[s].model);
    }
    document.getElementById("score").innerHTML = '';
};