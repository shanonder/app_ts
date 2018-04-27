module Game{
    export class MyDemo extends ui.test.DemoUI{
        public static SINGLE_KEY = "Game.MyDemo";
    }

    export class Entry{
        public static SINGLE_KEY = "Game.Entry";
        private engine: d3.Engine;
        constructor(){
        }

        public init():void{


            // Laya.Render.isConchWebGL = true;
            //
            // if (!Laya.Render.isConchNode && !Laya.WebGL.enable()){
            //     alert("Laya3D init error,must support webGL!");
            //     return;
            // }
            //
            //
            // // Laya.RunDriver.beginFlush = ;
            // Laya.Render.isConchWebGL = true;
            // Laya3D.init(window.innerWidth,window.innerHeight,true,true);
            // // Laya.init(window.innerWidth,window.innerHeight);
            // Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
            // Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
            // // Laya.stage.bgColor = null;//"#FFFFFF";
            // var engine:d3.Engine = this.engine = new d3.Engine();
            // // engine.animation();
            // Laya.RunDriver.changeWebGLSize=function(width,height){
            //     engine._screenWidth = width,height;
            //     engine._screenHeight = width,height;
            //     engine.renderer.setSize( engine._screenWidth, engine._screenHeight );
            //     engine.camera.aspect = engine._screenWidth/ engine._screenHeight;
            //     engine.camera.updateProjectionMatrix();
            // }
            //
            //
            // Laya.RunDriver.beginFlush = ()=>{engine.render()};
            // App.ViewManager.regist(Game.MyDemo,"res/atlas/comp.json");
            // App.ViewManager.toggleDialog(Game.MyDemo);
            Laya.init(900,1280);
            // let socket:Laya.Socket = new Laya.Socket();
            // socket.connect("127.0.0.1",19860);
            let socket:SocketIOClient.Socket = io.connect('http://localhost:19860');
            socket.on('news', function (data) {
                console.log(data);
                socket.emit('my other event', { my: 'data' });
            });
        }
    }
}
App.Singleton.getInstance(Game.Entry).init();

