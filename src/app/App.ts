module App{
    import View = laya.ui.View;
    import Handler = laya.utils.Handler;

    export class Singleton{
        private static  _insMap:Object = {};
        public static getInstance(clazz:any, asName:string = null , autoInit : Boolean = true){
            var key:string = asName?asName:Singleton.formatKey(clazz);
            var ins:any = Singleton._insMap[key];
            if(ins == null && autoInit){
                ins = Singleton._insMap[key] = new clazz();
            }
            return ins;
        }

        public static hasInstance(key:any):Boolean{
            var fKey:string = Singleton.formatKey(key);
            return Singleton._insMap.hasOwnProperty(key) && Singleton._insMap[fKey] != null;
        }

        public static removeInstance(key:any):void{
            var fKey:string = Singleton.formatKey(key);
            delete Singleton._insMap[fKey];
        }
        private static DEF_INS_COUNT:number = 0;
        public static formatKey(key:any):string{
            if(typeof key == "string"){
                return key;
            }
            else if(key.hasOwnProperty("SINGLE_KEY")){
                return key.SINGLE_KEY;
            }else {
                return key.SINGLE_KEY = `DEF_INS_${Singleton.DEF_INS_COUNT ++}`;
            }

        }
    }

    export class ViewManager{

        public static onComplete:Function;
        public static onProgress:Function;

        private static resMap:Object = {};
        private static stateMap:Object = {};

        public static regist(clazz:any,...params:any[]){
            var key:string = Singleton.formatKey(clazz);
            ViewManager.resMap[key] = params.map(ViewManager.format);
        }

        private static format(data:any,index:any):any{
            if(typeof data == "string"){
                if(data.indexOf(".json")>-1){
                    return {"url":data,type: Laya.Loader.ATLAS};
                }
            }
            return data;
        }

        private static popupList:Dialog[] = [];
        private static showList:Dialog[] = [];

        public static showDialog(view:Dialog, isModal:boolean , closeRule:number):void{
            /**
             * @param view
             * @param closeRule 1:清除所有页面
             * @param isModal
             */
            if(!view){
                return;
            }
            if(closeRule == 1){
                ViewManager.popupList.length = 0;
                while(ViewManager.showList.length){
                    ViewManager.closeDialog(ViewManager.showList.pop(),false);
                }
            }

            if(ViewManager.showList.indexOf(view) < 0){
                ViewManager.showList.push(view);
            }
            if(isModal){
                if(ViewManager.popupList.indexOf(view) < 0){
                    ViewManager.popupList.push(view);
                }
                view.popup();
            }else{
                view.show();
            }
        }

        public static closeDialog(view:Dialog , useEffect: boolean = true):void{
            if(useEffect){
                view.close();
            }
            else{
                var handler:Handler = view.closeEffect;
                view.closeEffect = null;
                view.close();
                view.closeEffect = handler;
            }
        }

        public static toggleView(clazz:any , parent:Laya.Node , type:number = 0 , data:any = null , callback:any = null , key:string = null , childIndex:number = -1){
            var resKey:string = Singleton.formatKey(clazz);
            if(key == null){
                key = resKey;
            }
            ViewManager.stateMap[key] = type;
            if(type == -1){
                if(Singleton.hasInstance(key)){
                    var view:View = Singleton.getInstance(clazz,key);
                    view.removeSelf();
                }
                return;
            }

            var closure:Function = function():void{
                var view:View = Singleton.getInstance(clazz,key);
                if(ViewManager.onComplete){
                    ViewManager.onComplete();
                }
                if(ViewManager.stateMap[key] == -1){
                    if(view.stage){
                        view.removeSelf();
                    }
                }else if(ViewManager.stateMap[key] == 0 && view.stage){
                    view.removeSelf();
                }else{
                    if(childIndex < 0 ){
                        parent.addChild(view);
                    }else{
                        parent.addChildAt(view,childIndex);
                    }
                    if(typeof callback == "function"){
                        callback(view,data);
                    }else if(typeof callback == "string" && view.hasOwnProperty(callback)){
                        var func:Function = view[callback];
                        if(func.length){
                            func(data);
                        }else{
                            func();
                        }
                    }else if(data){
                        view.dataSource = data;
                    }
                }
            }
            if(Singleton.hasInstance(key) == false){
                var resMap:any = ViewManager.resMap[resKey];
                if(resMap){
                    var arr:any[] = resMap;
                    Laya.loader.load(arr , Laya.Handler.create(this, closure),ViewManager.onProgress?Laya.Handler.create(this,ViewManager.onProgress):null );
                    return;
                }
            }
            closure();
        }

        public static toggleDialog(clazz:any , type:number = 0 , closeRule:number = 0 , data:any = null , callback:any = null , key:string = null , isModal:boolean = false){
            var resKey:string = Singleton.formatKey(clazz);
            if(key == null){
                key = resKey;
            }
            ViewManager.stateMap[key] = type;
            if(type == -1){
                if(Singleton.hasInstance(key)){
                    var view:Dialog = Singleton.getInstance(clazz , key);
                    view.close();
                }
                return;
            }

            var closure:Function = function():void{
                var view:Dialog = Singleton.getInstance(clazz , key);
                if(ViewManager.onComplete){
                    ViewManager.onComplete();
                }
                if(ViewManager.stateMap[key] == -1){
                    if(view.isPopup){
                        ViewManager.closeDialog(view);
                    }
                }
                else if (ViewManager.stateMap[key] == 0 && view.isPopup){
                    ViewManager.closeDialog(view);
                }
                else {
                    ViewManager.showDialog(view, isModal , closeRule);
                }
                if(callback as Function){
                    callback(view,data);
                }
                else if(typeof callback == "string" && view.hasOwnProperty(callback)){
                    var func:Function = view[callback];
                    if(func.length){
                        func(data);
                    }else{
                        func();
                    }
                }
                else if(data){
                    view.dataSource = data;
                }
            }
            if(Singleton.hasInstance(key) == false){
                var resMap:any = ViewManager.resMap[resKey];
                if(resMap){
                    Laya.loader.load(resMap , Laya.Handler.create(null, closure),ViewManager.onProgress?Laya.Handler.create(null,ViewManager.onProgress):null );
                    return;
                }
            }
            closure();
        }
    }
}