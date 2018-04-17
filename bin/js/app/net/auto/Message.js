var Message = /** @class */ (function () {
    function Message() {
    }
    Message.LoginRequest = function (platId, serverId, openId, token) {
        var msg = Protocol.msg;
        var bytes = msg.bytes;
        msg.cmd = 0x10001;
        bytes.writeInt16(platId);
        bytes.writeInt32(serverId);
        bytes.writeUTFString(openId == null ? "" : openId);
        bytes.writeUTFString(token == null ? "" : token);
        Protocol.sendMessage(msg);
    };
    return Message;
}());
//# sourceMappingURL=Message.js.map