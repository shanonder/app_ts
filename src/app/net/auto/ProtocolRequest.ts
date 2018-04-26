class ProtocolRequest{

    static Login (platId:number , serverId:number , openId:string , token:string){
        /**
		 * 登录请求
		 * @param platId 登录平台
		 * @param serverId 服务器ID
		 * @param openId 玩家第三方ID
		 * @param token 通行证
         */

        const msg:MessageVO = Protocol.msg;
        const byte:Byte = msg.bytes;
        msg.cmd = 0x10001;
 			ByteUtil.writeInt16( byte, platId);
			ByteUtil.writeInt32(byte, serverId);
			ByteUtil.writeString(byte, openId);
			ByteUtil.writeString(byte, token);
        Protocol.sendMessage(msg);
    }

    static Heap (){
        /**
		 * 心跳包
         */

        const msg:MessageVO = Protocol.msg;
        
        msg.cmd = 0x20000;
 
        Protocol.sendMessage(msg);
    }

    static PackInit (type:number){
        /**
		 * 包裹初始化
		 * @param type 包裹类型
         */

        const msg:MessageVO = Protocol.msg;
        const byte:Byte = msg.bytes;
        msg.cmd = 0x40001;
 			ByteUtil.writeInt16( byte, type);
        Protocol.sendMessage(msg);
    }

    static PackMove (type0:number , index0:number , insId0:string , type1:number , index1:number , insId1:string){
        /**
		 * 物品移动
		 * @param type0 移动源包裹类型
		 * @param index0 移动源包裹索引
		 * @param insId0 移动源包裹物品唯一ID
		 * @param type1 移动目标包裹类型
		 * @param index1 移动目标包裹索引
		 * @param insId1 移动目标包裹物品唯一ID
         */

        const msg:MessageVO = Protocol.msg;
        const byte:Byte = msg.bytes;
        msg.cmd = 0x40002;
 			ByteUtil.writeInt16( byte, type0);
			ByteUtil.writeInt16( byte, index0);
			ByteUtil.writeString(byte, insId0);
			ByteUtil.writeInt16( byte, type1);
			ByteUtil.writeInt16( byte, index1);
			ByteUtil.writeString(byte, insId1);
        Protocol.sendMessage(msg);
    }

    static PackDelete (type:number , index:number , insId:string){
        /**
		 * 物品删除（丢弃）
		 * @param type 包裹类型
		 * @param index 包裹索引
		 * @param insId 包裹物品唯一ID
         */

        const msg:MessageVO = Protocol.msg;
        const byte:Byte = msg.bytes;
        msg.cmd = 0x40003;
 			ByteUtil.writeInt16( byte, type);
			ByteUtil.writeInt16( byte, index);
			ByteUtil.writeString(byte, insId);
        Protocol.sendMessage(msg);
    }

    static PackSell (type:number , index:number , insId:string){
        /**
		 * 物品出售
		 * @param type 包裹类型
		 * @param index 包裹索引
		 * @param insId 包裹物品唯一ID(检查用)
         */

        const msg:MessageVO = Protocol.msg;
        const byte:Byte = msg.bytes;
        msg.cmd = 0x40004;
 			ByteUtil.writeInt16( byte, type);
			ByteUtil.writeInt16( byte, index);
			ByteUtil.writeString(byte, insId);
        Protocol.sendMessage(msg);
    }

    static RoleCreate (name:string , profId:number){
        /**
		 * 创建角色
		 * @param name 角色姓名
		 * @param profId 职业id
         */

        const msg:MessageVO = Protocol.msg;
        const byte:Byte = msg.bytes;
        msg.cmd = 0x30001;
 			ByteUtil.writeString(byte, name);
			ByteUtil.writeInt16( byte, profId);
        Protocol.sendMessage(msg);
    }

}
