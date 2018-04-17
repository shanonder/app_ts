class Message{

    static LoginRequest(platId:number , serverId:number , openId:string , token:string):void{
        var msg:MessageVO = Protocol.msg;
        var bytes:Byte = msg.bytes;
        msg.cmd = 0x10001;
        bytes.writeInt16(platId);
        bytes.writeInt32(serverId);
        bytes.writeUTFString(openId == null ?"" : openId);
        bytes.writeUTFString(token == null ?"" : token);
        Protocol.sendMessage(msg);
    }
}

