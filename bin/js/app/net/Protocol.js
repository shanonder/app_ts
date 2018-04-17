var Socket = laya.net.Socket;
var Byte = Laya.Byte;
var Protocol = /** @class */ (function () {
    function Protocol() {
    }
    Protocol.init = function () {
        var byteResp = new Byte();
        var byteRespR = new Byte();
        var isDecodeBody;
        Protocol.mapListener = {};
        var bytes = Protocol.bytes = new Byte();
        Protocol.msg = new MessageVO();
        Protocol.msg.bytes.endian = bytes.endian = byteResp.endian = Laya.Byte.BIG_ENDIAN;
        var socket = Protocol.socket = new Socket();
        socket.endian = Laya.Byte.BIG_ENDIAN;
        socket.on(Laya.Event.OPEN, null, function () {
            // alert("on1" + port);
        });
        socket.on(Laya.Event.ERROR, socket, function () {
            alert("error2");
        });
        socket.on(Laya.Event.MESSAGE, socket, onData);
        function onData(data) {
            //无断包粘包处理
            // readAll(data);
            //有断包粘包处理
            var pos = byteResp.pos;
            byteResp.writeArrayBuffer(data, byteResp.pos, data.byteLength);
            byteResp.pos = pos;
            readData();
        }
        function readData() {
            var cmd = 0;
            var state = 0;
            var length = 0;
            var bt = new Byte();
            bt.endian = Laya.Byte.BIG_ENDIAN;
            if (!isDecodeBody) {
                if (byteResp.bytesAvailable < Protocol.HEAD_LENGTH) {
                    return;
                }
                else {
                    byteResp.getUint16(); //HEAD_MARK
                    byteResp.getUint16(); //version
                    length = byteResp.getUint32(); //HEAD_LENGTH
                    cmd = byteResp.getUint32(); //CMD
                    state = byteResp.getUint16(); //state
                    byteResp.getUint32(); //Protocol.TESTID
                    byteResp.getUint32(); //Protocol.RESERVED
                    if (length == Protocol.HEAD_LENGTH) {
                        onMessage(cmd, state, null);
                    }
                    else {
                        isDecodeBody = true;
                    }
                }
            }
            else {
                if (byteResp.bytesAvailable < length - Protocol.HEAD_LENGTH) {
                    changeReserve();
                    return;
                }
                else {
                    bt.clear();
                    bt.writeArrayBuffer(byteResp, byteResp.pos, length);
                    bt.pos = 0;
                }
                isDecodeBody = false;
                onMessage(cmd, state, bt);
            }
            readData();
        }
        ;
        function changeReserve() {
            if (byteResp.bytesAvailable > 0) {
                byteRespR.writeArrayBuffer(byteResp, byteResp.pos, byteResp.bytesAvailable);
                byteRespR.pos = 0;
            }
            var temp = byteResp;
            byteRespR = byteResp;
            byteResp = temp;
            byteRespR.clear();
        }
        function onMessage(cmd, status, data) {
            var mapListener = Protocol.mapListener;
            if (mapListener.hasOwnProperty(cmd.toString())) {
                var closure = mapListener[cmd];
                if (closure != null) {
                    closure(cmd, status, data);
                }
            }
            else {
                console.warn("unregisted: 0x" + cmd.toString(16));
            }
        }
    };
    Protocol.dispath = function () {
        event;
    };
    Protocol.addListener = function (cmd, closure) {
        Protocol.mapListener[cmd] = closure;
    };
    Protocol.sendMessage = function (vo) {
        var bytes = Protocol.bytes;
        ByteUtil.writeUint8(bytes, Protocol.HEAD_MARK);
        ByteUtil.writeInt32(bytes, Protocol.HEAD_LENGTH);
        ByteUtil.writeInt32(bytes, vo.cmd);
        ByteUtil.writeInt16(bytes, Protocol.COMMON_STATE);
        bytes.writeArrayBuffer(vo.bytes.buffer);
        bytes.pos = 4;
        bytes.writeInt32(bytes.length);
        Protocol.socket.send(bytes.buffer);
        Protocol.socket.flush();
        vo.bytes.clear();
        bytes.clear();
    };
    Protocol.HEAD_MARK = 0xF;
    Protocol.HEAD_LENGTH = 11;
    Protocol.COMMON_STATE = 200;
    return Protocol;
}());
var MessageVO = /** @class */ (function () {
    function MessageVO() {
        this.cmd = 0;
        this.bytes = new Byte();
    }
    return MessageVO;
}());
//# sourceMappingURL=Protocol.js.map