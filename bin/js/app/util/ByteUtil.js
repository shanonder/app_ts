var ByteUtil = /** @class */ (function () {
    function ByteUtil() {
    }
    ByteUtil.readUint8 = function (byte) {
        return byte.getUint8();
    };
    ByteUtil.readUint16 = function (byte) {
        return byte.getUint16();
    };
    ByteUtil.readUint32 = function (byte) {
        return byte.getUint32();
    };
    ByteUtil.readUint64 = function (byte) {
        return Uint64.readByte(byte);
    };
    ByteUtil.readInt8 = function (byte) {
        return byte.getByte();
    };
    ByteUtil.readInt16 = function (byte) {
        return byte.getInt16();
    };
    ByteUtil.readInt32 = function (byte) {
        return byte.getInt32();
    };
    ByteUtil.readFloat32 = function (byte) {
        return byte.getFloat32();
    };
    ByteUtil.readFloat64 = function (byte) {
        return byte.getFloat64();
    };
    ByteUtil.readString = function (byte) {
        return byte.readUTFString();
    };
    ByteUtil.writeUint8 = function (byte, value) {
        byte.writeUint8(value);
    };
    ByteUtil.writeUint16 = function (byte, value) {
        byte.writeUint16(value);
    };
    ByteUtil.writeUint32 = function (byte, value) {
        byte.writeUint32(value);
    };
    ByteUtil.writeUint64 = function (byte, value) {
        byte.writeUint32(value);
    };
    ByteUtil.writeInt8 = function (byte, value) {
        byte.writeByte(value);
    };
    ByteUtil.writeInt16 = function (byte, value) {
        byte.writeInt16(value);
    };
    ByteUtil.writeInt32 = function (byte, value) {
        byte.writeInt32(value);
    };
    ByteUtil.writeFloat32 = function (byte, value) {
        byte.writeFloat32(value);
    };
    ByteUtil.writeFloat64 = function (byte, value) {
        byte.writeFloat32(value);
    };
    ByteUtil.writeString = function (byte, value) {
        if (value == null) {
            byte.writeUTFString(ByteUtil._EMPTY_STRING);
        }
        else {
            byte.writeUTFString(value);
        }
    };
    ByteUtil.readSequence = function (byte) {
        var sync = ByteUtil.readUint16(byte);
        if (sync == 0) {
            return null;
        }
        return ProtocolHash.Readers[sync].call(byte);
    };
    ByteUtil.writeSequence = function (byte, value) {
        if (value == null) {
            byte.writeUint16(0);
            return;
        }
        var sequence = value.__getSequence();
        byte.writeUint16(sequence);
        ProtocolHash.Writers[sequence].call(byte, value);
    };
    ByteUtil.readArray = function (byte, eleReader) {
        var len = ByteUtil.readUint16(byte);
        if (len == -1) {
            return null;
        }
        var arr = new Array(len);
        if (!eleReader) {
            var index;
            while (index = ByteUtil.readUint16(byte)) {
                if (index == -1) {
                    break;
                }
                arr[index] = ByteUtil.readSequence(byte);
            }
        }
        else {
            for (var i = 0; i < len; ++i) {
                arr[i] = eleReader(byte);
            }
        }
        return arr;
    };
    ByteUtil.writeArray = function (byte, arr, eleWriter) {
        if (arr == null) {
            ByteUtil.writeInt16(byte, -1);
            return;
        }
        var len = arr.length;
        ByteUtil.writeInt16(byte, len);
        if (!eleWriter) {
            for (var i = 0; i < arr[i]; ++i) {
                var ele = arr[i];
                if (ele) {
                    ByteUtil.writeUint16(byte, i);
                    ByteUtil.writeSequence(byte, ele);
                }
            }
            ByteUtil.writeInt16(byte, -1);
        }
        else {
            for (var i = 0; i < len; ++i) {
                eleWriter(byte, arr[i]);
            }
        }
    };
    ByteUtil._EMPTY_STRING = "";
    return ByteUtil;
}());
//# sourceMappingURL=ByteUtil.js.map