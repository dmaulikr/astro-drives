var Models = {
    materials : {
        body : new THREE.MeshStandardMaterial( {color: 0xfefefe} ),
        painted : new THREE.MeshStandardMaterial( {color: 0x961b1b} ),
        colored : new THREE.MeshStandardMaterial( {color: 0xffa500} ),
        metal : new THREE.MeshStandardMaterial( {color: 0x333333} ),
        glass : new THREE.MeshStandardMaterial( {color: 0x4286f4} ),
        flame : new THREE.MeshPhongMaterial( {color: 0xcc8800} ),
        satellite : new THREE.MeshStandardMaterial( {color: 0xeeeeee} ),
        wireframe : new THREE.MeshStandardMaterial( {color: 0xeeeeee, wireframe: true} ),
        planetOne : new THREE.MeshPhongMaterial({color: 0x3a4901, shading: THREE.FlatShading}),
        planetTwo : new THREE.MeshPhongMaterial({ color: 0x782000, shading: THREE.FlatShading}),
        planetShield : new THREE.MeshPhongMaterial({opacity:0.07, transparent: true, color: 0xbbbbbb, wireframe: true, side: THREE.DoubleSide })
    },
        
    wing : function(){
        var wing = new THREE.Group(),
            parts = [];
        
        parts['theWing'] = new THREE.BoxGeometry( 10, 8, 1 );
        parts['theWing'].vertices[4].y -= 7; 
        parts['theWing'].vertices[5].y -= 7;     
        parts['theWing'].vertices[6].y -= 5; 
        parts['theWing'].vertices[7].y -= 5; 
        parts['theWing'].needsUpdate = true;

        parts['theWingMesh'] = new THREE.Mesh( parts['theWing'], this.materials.body );
        parts['theWingMesh'].position.y = -31;
        parts['theWingMesh'].position.x = -15.5;
        wing.add(parts['theWingMesh']);

        parts['theWingBottom'] = new THREE.BoxGeometry( 2, 9, 2 );
        parts['theWingBottom'].vertices[4].y -= 1; 
        parts['theWingBottom'].vertices[5].y -= 1;     
        parts['theWingBottom'].vertices[4].x -= .5; 
        parts['theWingBottom'].vertices[5].x -= .5;

        parts['theWingBottom'].vertices[6].y -= 1; 
        parts['theWingBottom'].vertices[7].y -= 1; 
        parts['theWingBottom'].vertices[6].x += .5; 
        parts['theWingBottom'].vertices[7].x += .5;
        parts['theWingBottom'].needsUpdate = true;

        parts['theWingBottomMesh'] = new THREE.Mesh( parts['theWingBottom'], this.materials.painted );
        parts['theWingBottomMesh'].position.y = -31;
        parts['theWingBottomMesh'].position.x = -10.5; 
        wing.add(parts['theWingBottomMesh']);
        
        return wing;
    },
        
    spaceShip : function(){
        var spaceShipModel = new THREE.Object3D();
    
        var parts = []; 
        
        parts['top1'] = new THREE.Mesh( new THREE.CylinderGeometry( 0, 6, 4, 6 ), this.materials.painted );
        spaceShipModel.add(parts['top1']);
        
        parts['top2'] = new THREE.Mesh( new THREE.CylinderGeometry( 6, 10, 10, 6 ), this.materials.painted );
        parts['top2'].position.y = -7;
        spaceShipModel.add(parts['top2']);

        parts['top3'] = new THREE.Mesh( new THREE.CylinderGeometry( 10, 11, 8, 6 ), this.materials.painted );
        parts['top3'].position.y = -16;
        spaceShipModel.add(parts['top3']);

        parts['body'] = new THREE.Mesh( new THREE.CylinderGeometry( 11, 12, 20, 6 ), this.materials.body );
        parts['body'].position.y = -30;
        spaceShipModel.add(parts['body']);

        parts['bottom'] = new THREE.Mesh( new THREE.CylinderGeometry( 10, 8, 2, 6 ), this.materials.metal );
        parts['bottom'].position.y = -41;
        spaceShipModel.add(parts['bottom']);

        parts['windowframe'] = new THREE.Mesh( new THREE.CylinderGeometry( 5, 5, .5, 8 ), this.materials.metal );
        parts['windowframe'].position.y = -28;
        parts['windowframe'].position.z = 0;
        parts['windowframe'].position.x = 10;
        parts['windowframe'].rotation.z = (Math.PI / 2) - (Math.PI / 360 * -5);
        spaceShipModel.add(parts['windowframe']);

        parts['windowglass'] = new THREE.Mesh( new THREE.CylinderGeometry( 4, 4, .5, 8 ), this.materials.glass );
        parts['windowglass'].position.y = -28;
        parts['windowglass'].position.z = 0;
        parts['windowglass'].position.x = 10.1;
        parts['windowglass'].rotation.z = (Math.PI / 2) - (Math.PI / 360 * -5);
        spaceShipModel.add(parts['windowglass']);
        
        parts['wing1'] = this.wing();
        parts['wing2'] = this.wing();
        parts['wing3'] = this.wing();
        spaceShipModel.add(parts['wing1']);
        
        spaceShipModel.add(parts['wing2']);
        parts['wing2'].rotation.y = (Math.PI / 180) * 120;
        spaceShipModel.add(parts['wing3']);
        parts['wing3'].rotation.y = (Math.PI / 180) * -120;
        
        var flame = new THREE.Group();
        var flameParts = [];
        flameParts[1] = new THREE.Mesh( new THREE.CylinderGeometry( 4, 6, 4, 6 ), this.materials.flame );
        flameParts[1].position.y = -43;
        flame.add(flameParts[1]);
        
        flameParts[2] = new THREE.Mesh( new THREE.CylinderGeometry( 6, 4, 4, 6 ), this.materials.flame );
        flameParts[2].position.y = -47;
        flame.add(flameParts[2]);
        
        flameParts[3] = new THREE.Mesh( new THREE.CylinderGeometry( 4, 0, 3, 6 ), this.materials.flame );
        flameParts[3].position.y = -50.5;
        flame.add(flameParts[3]);
        flame.name = 'flame';
        
        var box = new THREE.Box3().setFromObject( spaceShipModel );
        //box.center( this.spaceShip.position ); // this re-sets the mesh position
        spaceShipModel.position.multiplyScalar( - 1 );
        spaceShipModel.rotation.y = -0.6;

        var pivot = new THREE.Group();
        pivot.add( spaceShipModel );
        pivot.add( flame );
        return pivot;
    },
    
    satelliteOne : function(){
        var satelliteModel = new THREE.Object3D();
    
        var parts = []; 
        
        parts['top'] = new THREE.Mesh( new THREE.CylinderGeometry( 6, 10, 8, 6 ), this.materials.satellite );
        parts['top'].position.y = 12;
        satelliteModel.add(parts['top']);

        parts['body'] = new THREE.Mesh( new THREE.CylinderGeometry( 10, 10, 16, 6 ), this.materials.satellite );
        satelliteModel.add(parts['body']);

        parts['holder'] = new THREE.Mesh( new THREE.BoxGeometry( 24, 1, 1 ), this.materials.satellite );
        parts['holder'].position.y = -5;
        satelliteModel.add(parts['holder']);
        
        parts['shield1'] = new THREE.Mesh( new THREE.BoxGeometry( 16, 10, 1), this.materials.glass );
        parts['shield1'].position.y = -5;
        parts['shield1'].position.z = 0;
        parts['shield1'].position.x = 20;
        parts['shield1'].rotation.x = Math.PI / 180 * 90;
        satelliteModel.add(parts['shield1']);
        
        parts['shield2'] = new THREE.Mesh( new THREE.BoxGeometry( 16, 10, 1), this.materials.glass );
        parts['shield2'].position.y = -5;
        parts['shield2'].position.z = 0;
        parts['shield2'].position.x = -20;
        parts['shield2'].rotation.x = Math.PI / 180 * 90;
        satelliteModel.add(parts['shield2']);
        
        parts['bottom'] = new THREE.Mesh( new THREE.CylinderGeometry( 6, 8, 2, 6 ), this.materials.metal );
        parts['bottom'].position.y = -9;
        satelliteModel.add(parts['bottom']);
        
        var box = new THREE.Box3().setFromObject( satelliteModel );
        //box.center( this.spaceShip.position );
        satelliteModel.position.multiplyScalar( - 1 );
        //satelliteModel.rotation.y = -0.6;

        var pivot = new THREE.Group();
        pivot.add( satelliteModel );
        return pivot;
    },
    
    satelliteTwo : function(){
        var satelliteModel = new THREE.Object3D();
    
        var parts = []; 
        
        parts['body'] = new THREE.Mesh( new THREE.CylinderGeometry( 10, 10, 16, 6 ), this.materials.satellite );
        satelliteModel.add(parts['body']);

        parts['middle'] = new THREE.Mesh( new THREE.CylinderGeometry( 10, 8, 4, 6 ), this.materials.colored );
        parts['middle'].position.y = -10;
        satelliteModel.add(parts['middle']);
        
        parts['middle'] = new THREE.Mesh( new THREE.CylinderGeometry( 8, 8, 8, 6 ), this.materials.metal );
        parts['middle'].position.y = -16;
        satelliteModel.add(parts['middle']);
        
        parts['holder'] = new THREE.Mesh( new THREE.BoxGeometry( 4, 16, 4 ,2,8,2), this.materials.wireframe );
        parts['holder'].position.y = -28;
        satelliteModel.add(parts['holder']);
        
        parts['holder2'] = new THREE.Mesh( new THREE.BoxGeometry( 35, .5, .5 ,35, 2, 2), this.materials.wireframe );
        parts['holder2'].position.y = -30;
        satelliteModel.add(parts['holder2']);
        
        for(var i = 0; i < 6; i++){
            parts['shield'] = new THREE.Mesh( new THREE.BoxGeometry( 6, 12, 1), this.materials.glass );
            parts['shield'].position.y = -30;
            parts['shield'].position.z = 0;
            parts['shield'].position.x = i > 2 ? (-6-(i-3)*7) : (6+i*7);
            parts['shield'].rotation.x = Math.PI / 180 * 20;
            satelliteModel.add(parts['shield']);
        }
    
        //radar
        parts['radar'] = new THREE.SphereGeometry(6, 6, 6, 0, Math.PI);
        for(var i = 0; i < parts['radar'].faces.length; i++) {
            var f = parts['radar'].faces[i];
            var tmp = f.a;
            f.a = f.c;
            f.c = tmp;
        }
        parts['radar'].computeFaceNormals();
        parts['radar'].computeVertexNormals();
        parts['radarMesh'] = new THREE.Mesh(parts['radar'], this.materials.body);
        parts['radarMesh'].material.side = THREE.DoubleSide;
        parts['radarMesh'].position.z = 11.1;
        parts['radarMesh'].position.x = 10;
        parts['radarMesh'].rotation.y = Math.PI / 180 * 230;
        satelliteModel.add(parts['radarMesh']);
        
        parts['radarSphere'] = new THREE.Mesh (new THREE.SphereGeometry(1, 8, 8), this.materials.colored);
        parts['radarSphere'].position.x = 7.5;
        parts['radarSphere'].position.z = 8;
        satelliteModel.add(parts['radarSphere']);
        
        var box = new THREE.Box3().setFromObject( satelliteModel );
        //box.center( this.spaceShip.position );
        satelliteModel.position.multiplyScalar( - 1 );
        //satelliteModel.rotation.y = -0.6;

        var pivot = new THREE.Group();
        pivot.add( satelliteModel );
        return pivot;
    },
    
    trajectionLine : function(rd){
        var segment = 100, radius =  rd || 300;
        var lineGeometry = new THREE.Geometry(),
            vertArray = lineGeometry.vertices,
            angle = 2 * Math.PI / segment;
        for (var i = 0; i <= segment; i++) {
            var x = radius * Math.cos(angle * i);
            var y = radius * Math.sin(angle * i);
            vertArray.push(new THREE.Vector3(x, y, 0));
        }
        lineGeometry.computeLineDistances();

        return new THREE.Line(lineGeometry, new THREE.LineDashedMaterial({ color: 0x6484b7, dashSize: 3, gapSize: 5 }));
    },
    
    text : function(text, size, material){
        var textMaterial = material || Models.materials.flame;
        var textSize = size || 30;    
        var textGeometry = new THREE.TextGeometry(
            text,
            {
                size: textSize,
                height: 9,
                curveSegments : 10,
                font : game.fonts.main,
                bevelEnabled : true,
                bevelThickness : 1,
                bevelSize : 1
            }
        );
        textGeometry.center();
        return textMesh = new THREE.Mesh(textGeometry, textMaterial);
    }
}