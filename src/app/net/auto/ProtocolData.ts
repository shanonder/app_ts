/**==============ProtocolData======================*/
class AttributesData implements ISequence{
    /**
     * 属性
     */

	public __getSequence(){return 1;}

	public cfgId : number;	//配置表ID
	public value : number;	//

    public static readByte(byte:Byte , data?:AttributesData):AttributesData{
        if(!data) data = new AttributesData();
		data.cfgId = ByteUtil.readInt32(byte);
		data.value = ByteUtil.readFloat64(byte);
        return data;
    }

    public static writeByte(byte:Byte , data:AttributesData):Byte{
		ByteUtil.writeInt32(byte, data.cfgId);
		ByteUtil.writeFloat64(byte, data.value);
        return byte;
    }
}
class ItemData implements ISequence{
    /**
     * 物品
     */

	public __getSequence(){return 4;}

	public insId : string;	//唯一ID
	public cfgId : number;	//配置表ID
	public type : string;	//分类
	public createTime : number;	//创建时间

    public static readByte(byte:Byte , data?:ItemData):ItemData{
        if(!data) data = new ItemData();
		data.insId = ByteUtil.readString(byte);
		data.cfgId = ByteUtil.readInt32(byte);
		data.type = ByteUtil.readString(byte);
		data.createTime = ByteUtil.readFloat64(byte);
        return data;
    }

    public static writeByte(byte:Byte , data:ItemData):Byte{
		ByteUtil.writeString(byte, data.insId);
		ByteUtil.writeInt32(byte, data.cfgId);
		ByteUtil.writeString(byte, data.type);
		ByteUtil.writeFloat64(byte, data.createTime);
        return byte;
    }
}
class EquipData extends ItemData{
    /**
     * 武器
     */

	public __getSequence(){return 2;}

	public strenthLv : number;	//唯一ID
	public attributes : AttributesData[];	//属性

    public static readByte(byte:Byte , data?:EquipData):EquipData{
        if(!data) data = new EquipData();
		ItemData.readByte(byte,data);
		data.strenthLv = ByteUtil.readInt32(byte);
		data.attributes = ByteUtil.readArray(byte , AttributesData.readByte);
        return data;
    }

    public static writeByte(byte:Byte , data:EquipData):Byte{
		ItemData.writeByte(byte,data);
		ByteUtil.writeInt32(byte, data.strenthLv);
		ByteUtil.writeArray(byte , data.attributes , AttributesData.writeByte);
        return byte;
    }
}
class PackData implements ISequence{
    /**
     * 
     */

	public __getSequence(){return 5;}

	public type : number;	//唯一ID
	public openLength : number;	//开启长度
	public itemList : GridData[];	//

    public static readByte(byte:Byte , data?:PackData):PackData{
        if(!data) data = new PackData();
		data.type = ByteUtil.readInt16(byte);
		data.openLength = ByteUtil.readInt16(byte);
		data.itemList = ByteUtil.readArray(byte , GridData.readByte);
        return data;
    }

    public static writeByte(byte:Byte , data:PackData):Byte{
		ByteUtil.writeInt16( byte, data.type);
		ByteUtil.writeInt16( byte, data.openLength);
		ByteUtil.writeArray(byte , data.itemList , GridData.writeByte);
        return byte;
    }
}
class GridData implements ISequence{
    /**
     * 
     */

	public __getSequence(){return 3;}

	public index : number;	//序号
	public item : ItemData;	//唯一ID

    public static readByte(byte:Byte , data?:GridData):GridData{
        if(!data) data = new GridData();
		data.index = ByteUtil.readInt16(byte);
		data.item = ItemData.readByte(byte);
        return data;
    }

    public static writeByte(byte:Byte , data:GridData):Byte{
		ByteUtil.writeInt16( byte, data.index);
		ItemData.writeByte(byte , data.item);
        return byte;
    }
}
class RoleBaseData implements ISequence{
    /**
     * 
     */

	public __getSequence(){return 6;}

	public insId : string;	//唯一ID
	public profId : number;	//职业ID
	public serverId : number;	//服务器ID
	public name : string;	//姓名
	public level : number;	//等级

    public static readByte(byte:Byte , data?:RoleBaseData):RoleBaseData{
        if(!data) data = new RoleBaseData();
		data.insId = ByteUtil.readString(byte);
		data.profId = ByteUtil.readInt16(byte);
		data.serverId = ByteUtil.readInt16(byte);
		data.name = ByteUtil.readString(byte);
		data.level = ByteUtil.readInt32(byte);
        return data;
    }

    public static writeByte(byte:Byte , data:RoleBaseData):Byte{
		ByteUtil.writeString(byte, data.insId);
		ByteUtil.writeInt16( byte, data.profId);
		ByteUtil.writeInt16( byte, data.serverId);
		ByteUtil.writeString(byte, data.name);
		ByteUtil.writeInt32(byte, data.level);
        return byte;
    }
}
class RoleData extends RoleBaseData{
    /**
     * 
     */

	public __getSequence(){return 7;}

	public exp : number;	//经验
	public attributes : AttributesData[];	//属性

    public static readByte(byte:Byte , data?:RoleData):RoleData{
        if(!data) data = new RoleData();
		RoleBaseData.readByte(byte,data);
		data.exp = ByteUtil.readFloat64(byte);
		data.attributes = ByteUtil.readArray(byte , AttributesData.readByte);
        return data;
    }

    public static writeByte(byte:Byte , data:RoleData):Byte{
		RoleBaseData.writeByte(byte,data);
		ByteUtil.writeFloat64(byte, data.exp);
		ByteUtil.writeArray(byte , data.attributes , AttributesData.writeByte);
        return byte;
    }
}
class Login{
    /**
     * 登录返回
     */

	public platId : number;	//登录平台
	public serverId : number;	//服务器ID
	public openId : string;	//玩家第三方ID
	public token : string;	//通行证
	public uid : string;	//玩家ID
    constructor(byte:Byte){
		this.platId = ByteUtil.readInt16(byte);
		this.serverId = ByteUtil.readInt32(byte);
		this.openId = ByteUtil.readString(byte);
		this.token = ByteUtil.readString(byte);
		this.uid = ByteUtil.readString(byte);
    }
}
class Heap{
    /**
     * 心跳包
     */

	public time : number;	//当前时间
    constructor(byte:Byte){
		this.time = ByteUtil.readFloat64(byte);
    }
}
class EnterWorld{
    /**
     * 进入场景（初始化）
     */

	public role : RoleData;	//角色
	public packs : Object[];	//背包数据
	public modules : number[];	//开启模块
	public customize : string;	//自定义保存参数
    constructor(byte:Byte){
		this.role = RoleData.readByte(byte);
		this.packs = ByteUtil.readArray(byte);
		this.modules = ByteUtil.readArray(byte , ByteUtil.readInt16);
		this.customize = ByteUtil.readString(byte);
    }
}
class PackInit{
    /**
     * 包裹初始化
     */

	public packs : PackData[];	//
    constructor(byte:Byte){
		this.packs = ByteUtil.readArray(byte , PackData.readByte);
    }
}
class PackMove{
    /**
     * 物品移动
     */

	public type0 : number;	//移动源包裹类型
	public index0 : number;	//移动源包裹索引
	public insId0 : string;	//移动源包裹物品唯一ID
	public type1 : number;	//移动目标包裹类型
	public index1 : number;	//移动目标包裹索引
	public insId1 : string;	//移动目标包裹物品唯一ID
    constructor(byte:Byte){
		this.type0 = ByteUtil.readInt16(byte);
		this.index0 = ByteUtil.readInt16(byte);
		this.insId0 = ByteUtil.readString(byte);
		this.type1 = ByteUtil.readInt16(byte);
		this.index1 = ByteUtil.readInt16(byte);
		this.insId1 = ByteUtil.readString(byte);
    }
}
class PackDelete{
    /**
     * 物品删除（丢弃）
     */

	public type : number;	//包裹类型
	public index : number;	//包裹索引
	public insId : string;	//包裹物品唯一ID(检查用)
    constructor(byte:Byte){
		this.type = ByteUtil.readInt16(byte);
		this.index = ByteUtil.readInt16(byte);
		this.insId = ByteUtil.readString(byte);
    }
}
class PackSell{
    /**
     * 物品出售
     */

	public type : number;	//包裹类型
	public index : number;	//包裹索引
	public insId : string;	//包裹物品唯一ID(检查用)
    constructor(byte:Byte){
		this.type = ByteUtil.readInt16(byte);
		this.index = ByteUtil.readInt16(byte);
		this.insId = ByteUtil.readString(byte);
    }
}
class PackAdd{
    /**
     * 物品生成
     */

	public type : number;	//包裹类型
	public index : number;	//包裹索引
	public item : ItemData;	//物品
    constructor(byte:Byte){
		this.type = ByteUtil.readInt16(byte);
		this.index = ByteUtil.readInt16(byte);
		this.item = ItemData.readByte(byte);
    }
}
class RoleCreate{
    /**
     * 创建角色  {state:200,成功 201:姓名重复 ,202:包含不可用字}
     */


    constructor(byte:Byte){

    }
}
class RoleEnterWorld{
    /**
     * 进入场景
     */

	public mapId : number;	//
	public posX : number;	//
	public posY : number;	//
	public role : RoleData;	//角色信息
    constructor(byte:Byte){
		this.mapId = ByteUtil.readUint16(byte);
		this.posX = ByteUtil.readInt32(byte);
		this.posY = ByteUtil.readInt32(byte);
		this.role = RoleData.readByte(byte);
    }
}
/**==============ProtocolResponse======================*/
class ProtocolResponse{
	public static Login : number = 0x10001;	//登录返回
	public static Heap : number = 0x20000;	//心跳包
	public static EnterWorld : number = 0x50001;	//进入场景（初始化）
	public static PackInit : number = 0x40001;	//包裹初始化
	public static PackMove : number = 0x40002;	//物品移动
	public static PackDelete : number = 0x40003;	//物品删除（丢弃）
	public static PackSell : number = 0x40004;	//物品出售
	public static PackAdd : number = 0x40005;	//物品生成
	public static RoleCreate : number = 0x30001;	//创建角色  {state:200,成功 201:姓名重复 ,202:包含不可用字}
	public static RoleEnterWorld : number = 0x30002;	//进入场景

}
/**==============ProtocolHash======================*/
class ProtocolHash{
    public static Readers:Function[] = [];
    public static Writers:Function[] = [];
    public static Adapter:any[] = [];
}
ProtocolHash.Readers[1] = AttributesData.readByte;
ProtocolHash.Readers[2] = EquipData.readByte;
ProtocolHash.Readers[3] = GridData.readByte;
ProtocolHash.Readers[4] = ItemData.readByte;
ProtocolHash.Readers[5] = PackData.readByte;
ProtocolHash.Readers[6] = RoleBaseData.readByte;
ProtocolHash.Readers[7] = RoleData.readByte;


ProtocolHash.Writers[1] = AttributesData.writeByte;
ProtocolHash.Writers[2] = EquipData.writeByte;
ProtocolHash.Writers[3] = GridData.writeByte;
ProtocolHash.Writers[4] = ItemData.writeByte;
ProtocolHash.Writers[5] = PackData.writeByte;
ProtocolHash.Writers[6] = RoleBaseData.writeByte;
ProtocolHash.Writers[7] = RoleData.writeByte;


ProtocolHash.Adapter[0x10001] = Login;
ProtocolHash.Adapter[0x20000] = Heap;
ProtocolHash.Adapter[0x50001] = EnterWorld;
ProtocolHash.Adapter[0x40001] = PackInit;
ProtocolHash.Adapter[0x40002] = PackMove;
ProtocolHash.Adapter[0x40003] = PackDelete;
ProtocolHash.Adapter[0x40004] = PackSell;
ProtocolHash.Adapter[0x40005] = PackAdd;
ProtocolHash.Adapter[0x30001] = RoleCreate;
ProtocolHash.Adapter[0x30002] = RoleEnterWorld;

