var d3;
(function (d3) {
    var Ground = /** @class */ (function () {
        function Ground() {
            var gt = new THREE.TextureLoader().load("res/d3/textures/terrain/grasslight-big.jpg");
            var gg = new THREE.PlaneBufferGeometry(16000, 16000);
            var gm = new THREE.MeshPhongMaterial({ color: 0xffff00, map: gt });
            var ground = this.mesh = new THREE.Mesh(gg, gm);
            ground.rotation.x = -Math.PI / 2;
            var map = ground.material.map;
            map.repeat.set(64, 64);
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            // note that because the ground does not cast a shadow, .castShadow is left false
            // ground.receiveShadow = true;
            // var img:Laya.Image = new Laya.Image("res/d3/textures/terrain/grasslight-big.jpg");
            // Laya.stage.addChild(img);
        }
        return Ground;
    }());
    d3.Ground = Ground;
    var Engine = /** @class */ (function () {
        // private cameraControls: THREE.OrbitControls;
        function Engine(scaleX, scaleY) {
            if (scaleX === void 0) { scaleX = 1.0; }
            if (scaleY === void 0) { scaleY = 1.0; }
            this.controls = {
                moveForward: false,
                moveBackward: false,
                moveLeft: false,
                moveRight: false
            };
            this._scaleX = scaleX;
            this._scaleY = scaleY;
            this._screenWidth = window.innerWidth * scaleX;
            this._screenHeight = window.innerHeight * scaleY;
            this.init();
        }
        Engine.prototype.init = function () {
            var _this = this;
            var aspect = this._screenWidth / this._screenHeight;
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0xFFFFFF);
            this.scene.fog = new THREE.Fog(0xFFFFFF, 1000, 4000);
            this.camera = new THREE.PerspectiveCamera(45, aspect, 1, 4000);
            this.camera.position.set(0, 150, 1300);
            this.scene.add(this.camera);
            var ground = new Ground();
            this.scene.add(ground.mesh);
            var renderer = this.renderer = new THREE.WebGLRenderer({ canvas: Laya.Render.canvas });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(this._screenWidth, this._screenHeight);
            var light = new THREE.DirectionalLight(0xffffff, 2.25);
            light.position.set(200, 450, 500);
            light.castShadow = true;
            light.shadow.mapSize.width = 1024;
            light.shadow.mapSize.height = 512;
            light.shadow.camera.near = 100;
            light.shadow.camera.far = 1200;
            light.shadow.camera.left = -1000;
            light.shadow.camera.right = 1000;
            light.shadow.camera.top = 350;
            light.shadow.camera.bottom = -350;
            this.scene.add(light);
            Laya.Browser.container.appendChild(this.renderer.domElement);
            renderer.gammaInput = true;
            renderer.gammaOutput = true;
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            window.addEventListener('resize', function (e) { _this.onWindowResize(e); }, false);
            // Laya.stage.on(Laya.Event.KEY_DOWN, this, (e)=>{this.onKeyDown(e)});
            // Laya.stage.on( Laya.Event.KEY_UP, this , (e)=>{this.onKeyUp(e)} );
            var cameraControls = new THREE.OrbitControls(this.camera, renderer.domElement);
            cameraControls.target.set(0, 50, 0);
            cameraControls.update();
        };
        Engine.prototype.render = function () {
            this.renderer.render(this.scene, this.camera);
        };
        Engine.prototype.animation = function () {
            var _this = this;
            requestAnimationFrame(function () { _this.animation(); });
            this.render();
        };
        Engine.prototype.onWindowResize = function (event) {
            this._screenWidth = window.innerWidth;
            this._screenHeight = window.innerHeight;
            this.renderer.setSize(this._screenWidth, this._screenHeight);
            this.camera.aspect = this._screenWidth / this._screenHeight;
            this.camera.updateProjectionMatrix();
        };
        Engine.prototype.onKeyDown = function (event) {
            event.stopPropagation();
            switch (event.keyCode) {
                case 38: /*up*/
                case 87:/*W*/ 
                    this.controls.moveForward = true;
                    break;
                case 40: /*down*/
                case 83:/*S*/ 
                    this.controls.moveBackward = true;
                    break;
                case 37: /*left*/
                case 65:/*A*/ 
                    this.controls.moveLeft = true;
                    break;
                case 39: /*right*/
                case 68:/*D*/ 
                    this.controls.moveRight = true;
                    break;
            }
        };
        Engine.prototype.onKeyUp = function (event) {
            event.stopPropagation();
            switch (event.keyCode) {
                case 38: /*up*/
                case 87:/*W*/ 
                    this.controls.moveForward = false;
                    break;
                case 40: /*down*/
                case 83:/*S*/ 
                    this.controls.moveBackward = false;
                    break;
                case 37: /*left*/
                case 65:/*A*/ 
                    this.controls.moveLeft = false;
                    break;
                case 39: /*right*/
                case 68:/*D*/ 
                    this.controls.moveRight = false;
                    break;
            }
        };
        return Engine;
    }());
    d3.Engine = Engine;
})(d3 || (d3 = {}));
//# sourceMappingURL=Engine3d.js.map