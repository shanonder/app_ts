var App;
(function (App) {
    var Singleton = /** @class */ (function () {
        function Singleton() {
        }
        Singleton.getInstance = function (clazz, asName, autoInit) {
            if (asName === void 0) { asName = null; }
            if (autoInit === void 0) { autoInit = true; }
            var key = asName ? asName : Singleton.formatKey(clazz);
            var ins = Singleton._insMap[key];
            if (ins == null && autoInit) {
                ins = Singleton._insMap[key] = new clazz();
            }
            return ins;
        };
        Singleton.hasInstance = function (key) {
            var fKey = Singleton.formatKey(key);
            return Singleton._insMap.hasOwnProperty(key) && Singleton._insMap[fKey] != null;
        };
        Singleton.removeInstance = function (key) {
            var fKey = Singleton.formatKey(key);
            delete Singleton._insMap[fKey];
        };
        Singleton.formatKey = function (key) {
            if (typeof key == "string") {
                return key;
            }
            else if (key.hasOwnProperty("SINGLE_KEY")) {
                return key.SINGLE_KEY;
            }
            else {
                return key.SINGLE_KEY = "DEF_INS_" + Singleton.DEF_INS_COUNT++;
            }
        };
        Singleton._insMap = {};
        Singleton.DEF_INS_COUNT = 0;
        return Singleton;
    }());
    App.Singleton = Singleton;
    var ViewManager = /** @class */ (function () {
        function ViewManager() {
        }
        ViewManager.regist = function (clazz) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            var key = Singleton.formatKey(clazz);
            ViewManager.resMap[key] = params.map(ViewManager.format);
        };
        ViewManager.format = function (data, index) {
            if (typeof data == "string") {
                if (data.indexOf(".json") > -1) {
                    return { "url": data, type: Laya.Loader.ATLAS };
                }
            }
            return data;
        };
        ViewManager.showDialog = function (view, isModal, closeRule) {
            /**
             * @param view
             * @param closeRule 1:清除所有页面
             * @param isModal
             */
            if (!view) {
                return;
            }
            if (closeRule == 1) {
                ViewManager.popupList.length = 0;
                while (ViewManager.showList.length) {
                    ViewManager.closeDialog(ViewManager.showList.pop(), false);
                }
            }
            if (ViewManager.showList.indexOf(view) < 0) {
                ViewManager.showList.push(view);
            }
            if (isModal) {
                if (ViewManager.popupList.indexOf(view) < 0) {
                    ViewManager.popupList.push(view);
                }
                view.popup();
            }
            else {
                view.show();
            }
        };
        ViewManager.closeDialog = function (view, useEffect) {
            if (useEffect === void 0) { useEffect = true; }
            if (useEffect) {
                view.close();
            }
            else {
                var handler = view.closeEffect;
                view.closeEffect = null;
                view.close();
                view.closeEffect = handler;
            }
        };
        ViewManager.toggleView = function (clazz, parent, type, data, callback, key, childIndex) {
            if (type === void 0) { type = 0; }
            if (data === void 0) { data = null; }
            if (callback === void 0) { callback = null; }
            if (key === void 0) { key = null; }
            if (childIndex === void 0) { childIndex = -1; }
            var resKey = Singleton.formatKey(clazz);
            if (key == null) {
                key = resKey;
            }
            ViewManager.stateMap[key] = type;
            if (type == -1) {
                if (Singleton.hasInstance(key)) {
                    var view = Singleton.getInstance(clazz, key);
                    view.removeSelf();
                }
                return;
            }
            var closure = function () {
                var view = Singleton.getInstance(clazz, key);
                if (ViewManager.onComplete) {
                    ViewManager.onComplete();
                }
                if (ViewManager.stateMap[key] == -1) {
                    if (view.stage) {
                        view.removeSelf();
                    }
                }
                else if (ViewManager.stateMap[key] == 0 && view.stage) {
                    view.removeSelf();
                }
                else {
                    if (childIndex < 0) {
                        parent.addChild(view);
                    }
                    else {
                        parent.addChildAt(view, childIndex);
                    }
                    if (typeof callback == "function") {
                        callback(view, data);
                    }
                    else if (typeof callback == "string" && view.hasOwnProperty(callback)) {
                        var func = view[callback];
                        if (func.length) {
                            func(data);
                        }
                        else {
                            func();
                        }
                    }
                    else if (data) {
                        view.dataSource = data;
                    }
                }
            };
            if (Singleton.hasInstance(key) == false) {
                var resMap = ViewManager.resMap[resKey];
                if (resMap) {
                    var arr = resMap;
                    Laya.loader.load(arr, Laya.Handler.create(this, closure), ViewManager.onProgress ? Laya.Handler.create(this, ViewManager.onProgress) : null);
                    return;
                }
            }
            closure();
        };
        ViewManager.toggleDialog = function (clazz, type, closeRule, data, callback, key, isModal) {
            if (type === void 0) { type = 0; }
            if (closeRule === void 0) { closeRule = 0; }
            if (data === void 0) { data = null; }
            if (callback === void 0) { callback = null; }
            if (key === void 0) { key = null; }
            if (isModal === void 0) { isModal = false; }
            var resKey = Singleton.formatKey(clazz);
            if (key == null) {
                key = resKey;
            }
            ViewManager.stateMap[key] = type;
            if (type == -1) {
                if (Singleton.hasInstance(key)) {
                    var view = Singleton.getInstance(clazz, key);
                    view.close();
                }
                return;
            }
            var closure = function () {
                var view = Singleton.getInstance(clazz, key);
                if (ViewManager.onComplete) {
                    ViewManager.onComplete();
                }
                if (ViewManager.stateMap[key] == -1) {
                    if (view.isPopup) {
                        ViewManager.closeDialog(view);
                    }
                }
                else if (ViewManager.stateMap[key] == 0 && view.isPopup) {
                    ViewManager.closeDialog(view);
                }
                else {
                    ViewManager.showDialog(view, isModal, closeRule);
                }
                if (callback) {
                    callback(view, data);
                }
                else if (typeof callback == "string" && view.hasOwnProperty(callback)) {
                    var func = view[callback];
                    if (func.length) {
                        func(data);
                    }
                    else {
                        func();
                    }
                }
                else if (data) {
                    view.dataSource = data;
                }
            };
            if (Singleton.hasInstance(key) == false) {
                var resMap = ViewManager.resMap[resKey];
                if (resMap) {
                    Laya.loader.load(resMap, Laya.Handler.create(null, closure), ViewManager.onProgress ? Laya.Handler.create(null, ViewManager.onProgress) : null);
                    return;
                }
            }
            closure();
        };
        ViewManager.resMap = {};
        ViewManager.stateMap = {};
        ViewManager.popupList = [];
        ViewManager.showList = [];
        return ViewManager;
    }());
    App.ViewManager = ViewManager;
})(App || (App = {}));
//# sourceMappingURL=App.js.map