var Uint64 = /** @class */ (function () {
    function Uint64(low, high) {
        if (low === void 0) { low = 0; }
        if (high === void 0) { high = 0; }
        this.low = 0;
        this.high = 0;
        this.low = low;
        this.high = high;
    }
    Uint64.prototype.setValue = function (low, high) {
        if (this.low != low || this.high != high) {
            this.low = low;
            this.high = high;
            this.cacheString = null;
        }
    };
    Uint64.toString16 = function (value) {
        if (value.cacheString) {
            return value.cacheString;
        }
        var temp = "00000000";
        var reStr = "";
        if (value.high) {
            var lowStr = value.low.toString(16);
            reStr = "0x" + value.high.toString(16) + temp.slice(0, -lowStr.length) + lowStr;
        }
        else {
            reStr = "0x" + value.low.toString(16);
        }
        value.cacheString = reStr;
        return reStr;
    };
    Uint64.fromString16 = function (value) {
        var re;
        var length = value.length;
        if (length < 10) {
            re = new Uint64(Number(value), 0);
        }
        else {
            var l = Number("0x" + value.slice(-8));
            var h = Number(value.slice(0, -8));
            re = new Uint64(l, h);
        }
        return re;
    };
    Uint64.readByte = function (byte) {
        var l, h;
        if (byte.endian == Laya.Byte.LITTLE_ENDIAN) {
            l = byte.getUint32();
            h = byte.getUint32();
        }
        else {
            h = byte.getUint32();
            l = byte.getUint32();
        }
        return new Uint64(h, l);
    };
    Uint64.writeByte = function (byte, value) {
        if (byte.endian == Laya.Byte.LITTLE_ENDIAN) {
            byte.writeUint32(value.low);
            byte.writeUint32(value.high);
        }
        else {
            byte.writeUint32(value.high);
            byte.writeUint32(value.low);
        }
    };
    Uint64.equal = function (x, y) {
        if (!x || !y) {
            return false;
        }
        return x.high == y.high && x.low == y.low;
    };
    return Uint64;
}());
//# sourceMappingURL=Uint64.js.map