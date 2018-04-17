var utils;
(function (utils) {
    var StringUtil = /** @class */ (function () {
        function StringUtil() {
        }
        StringUtil.str2Array = function (str) {
            var splits = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                splits[_i - 1] = arguments[_i];
            }
            var arr = str.split(splits.shift());
            if (splits.length) {
                var list = [];
                for (var i = 0, len = arr.length; i < len; ++i) {
                    list.push(StringUtil.str2Array.apply(this, [arr[i]].concat(splits)));
                }
                return list;
            }
            else {
                return arr;
            }
        };
        return StringUtil;
    }());
    utils.StringUtil = StringUtil;
})(utils || (utils = {}));
//# sourceMappingURL=StringUtil.js.map