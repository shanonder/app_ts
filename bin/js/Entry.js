var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game;
(function (Game) {
    var MyDemo = /** @class */ (function (_super) {
        __extends(MyDemo, _super);
        function MyDemo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MyDemo.SINGLE_KEY = "Game.MyDemo";
        return MyDemo;
    }(ui.test.DemoUI));
    Game.MyDemo = MyDemo;
    var Entry = /** @class */ (function () {
        function Entry() {
        }
        Entry.prototype.init = function () {
            Laya.Render.isConchWebGL = true;
            if (!Laya.Render.isConchNode && !Laya.WebGL.enable()) {
                alert("Laya3D init error,must support webGL!");
                return;
            }
            // Laya.RunDriver.beginFlush = ;
            Laya.Render.isConchWebGL = true;
            Laya3D.init(window.innerWidth, window.innerHeight, true, true);
            // Laya.init(window.innerWidth,window.innerHeight);
            Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
            Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
            // Laya.stage.bgColor = null;//"#FFFFFF";
            var engine = this.engine = new d3.Engine();
            // engine.animation();
            Laya.RunDriver.changeWebGLSize = function (width, height) {
                engine._screenWidth = width, height;
                engine._screenHeight = width, height;
                engine.renderer.setSize(engine._screenWidth, engine._screenHeight);
                engine.camera.aspect = engine._screenWidth / engine._screenHeight;
                engine.camera.updateProjectionMatrix();
            };
            Laya.RunDriver.beginFlush = function () { engine.render(); };
            App.ViewManager.regist(Game.MyDemo, "res/atlas/comp.json");
            App.ViewManager.toggleDialog(Game.MyDemo);
        };
        Entry.SINGLE_KEY = "Game.Entry";
        return Entry;
    }());
    Game.Entry = Entry;
})(Game || (Game = {}));
App.Singleton.getInstance(Game.Entry).init();
//# sourceMappingURL=Entry.js.map