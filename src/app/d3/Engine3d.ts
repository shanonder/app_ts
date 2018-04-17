module d3{
    export class Ground{
        public mesh:THREE.Mesh;
        constructor(){
            var gt:THREE.Texture = new THREE.TextureLoader().load("res/d3/textures/terrain/grasslight-big.jpg");
            var gg:THREE.PlaneBufferGeometry = new THREE.PlaneBufferGeometry( 16000 , 16000 );
            var gm:THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({color:0xffff00 , map: gt });
            var ground:THREE.Mesh = this.mesh = new THREE.Mesh( gg , gm );
            ground.rotation.x = - Math.PI / 2;
            var map:THREE.Texture = (ground.material as THREE.MeshPhongMaterial).map;
            map.repeat.set( 64, 64 );
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            // note that because the ground does not cast a shadow, .castShadow is left false
            // ground.receiveShadow = true;
            // var img:Laya.Image = new Laya.Image("res/d3/textures/terrain/grasslight-big.jpg");
            // Laya.stage.addChild(img);

        }
    }

    export class Engine{

        public _screenWidth:number;
        public _screenHeight:number;
        private _scaleX: number;
        private _scaleY: number;
        public scene:THREE.Scene;
        public camera:THREE.PerspectiveCamera;
        public renderer: THREE.WebGLRenderer;
        private controls = {
            moveForward: false,
            moveBackward: false,
            moveLeft: false,
            moveRight: false

        };
        // private cameraControls: THREE.OrbitControls;

        constructor( scaleX:number = 1.0 , scaleY:number = 1.0){
            this._scaleX = scaleX;
            this._scaleY = scaleY;
            this._screenWidth = window.innerWidth * scaleX;
            this._screenHeight = window.innerHeight * scaleY;

            this.init();
        }

        private init(){
            var aspect:number = this._screenWidth/this._screenHeight;
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0xFFFFFF);
            this.scene.fog = new THREE.Fog(0xFFFFFF,1000,4000);
            this.camera = new THREE.PerspectiveCamera(45, aspect , 1 , 4000);
            this.camera.position.set(0,150,1300);


            this.scene.add(this.camera);
            var ground:Ground = new Ground();
            this.scene.add( ground.mesh );

            var renderer:THREE.WebGLRenderer = this.renderer = new THREE.WebGLRenderer(
                {canvas:Laya.Render.canvas} );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( this._screenWidth, this._screenHeight );


            var light:THREE.DirectionalLight = new THREE.DirectionalLight( 0xffffff, 2.25 );
            light.position.set( 200, 450, 500 );

            light.castShadow = true;

            light.shadow.mapSize.width = 1024;
            light.shadow.mapSize.height = 512;

            light.shadow.camera.near = 100;
            light.shadow.camera.far = 1200;

            light.shadow.camera.left = -1000;
            light.shadow.camera.right = 1000;
            light.shadow.camera.top = 350;
            light.shadow.camera.bottom = -350;

            this.scene.add( light );
            Laya.Browser.container.appendChild(this.renderer.domElement);
            renderer.gammaInput = true;
            renderer.gammaOutput = true;
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;


            window.addEventListener( 'resize', (e)=>{this.onWindowResize(e)}, false );
            // Laya.stage.on(Laya.Event.KEY_DOWN, this, (e)=>{this.onKeyDown(e)});
            // Laya.stage.on( Laya.Event.KEY_UP, this , (e)=>{this.onKeyUp(e)} );


            var cameraControls:THREE.OrbitControls = new THREE.OrbitControls( this.camera, renderer.domElement );
            cameraControls.target.set( 0, 50, 0 );
            cameraControls.update();
        }
        public render():void{
            this.renderer.render(this.scene , this.camera);
        }
        public animation():void{
            requestAnimationFrame(()=>{this.animation()});
            this.render();
        }

        private onWindowResize( event ) {

            this._screenWidth = window.innerWidth;
            this._screenHeight = window.innerHeight;
            this.renderer.setSize( this._screenWidth, this._screenHeight );
            this.camera.aspect = this._screenWidth/ this._screenHeight;
            this.camera.updateProjectionMatrix();

        }

        private onKeyDown ( event ) {

            event.stopPropagation();

            switch( event.keyCode ) {

                case 38: /*up*/
                case 87: /*W*/ 	this.controls.moveForward = true; break;

                case 40: /*down*/
                case 83: /*S*/ 	 this.controls.moveBackward = true; break;

                case 37: /*left*/
                case 65: /*A*/   this.controls.moveLeft = true; break;

                case 39: /*right*/
                case 68: /*D*/    this.controls.moveRight = true; break;

                //case 67: /*C*/     controls.crouch = true; break;
                //case 32: /*space*/ controls.jump = true; break;
                //case 17: /*ctrl*/  controls.attack = true; break;

            }

        }

        private onKeyUp ( event ) {

            event.stopPropagation();

            switch( event.keyCode ) {

                case 38: /*up*/
                case 87: /*W*/ this.controls.moveForward = false; break;

                case 40: /*down*/
                case 83: /*S*/ 	 this.controls.moveBackward = false; break;

                case 37: /*left*/
                case 65: /*A*/ 	 this.controls.moveLeft = false; break;

                case 39: /*right*/
                case 68: /*D*/ 	  this.controls.moveRight = false; break;

                //case 67: /*C*/     controls.crouch = false; break;
                //case 32: /*space*/ controls.jump = false; break;
                //case 17: /*ctrl*/  controls.attack = false; break;

            }

        }
    }
}