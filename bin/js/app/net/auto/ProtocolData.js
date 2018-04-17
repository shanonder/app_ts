var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**==============ProtocolData======================*/
var AttributesData = /** @class */ (function () {
    function AttributesData() {
    }
    /**
     * 属性
     */
    AttributesData.prototype.__getSequence = function () { return 1; };
    AttributesData.readByte = function (byte, data) {
        if (!data)
            data = new AttributesData();
        data.cfgId = ByteUtil.readInt32(byte);
        data.value = ByteUtil.readFloat64(byte);
        return data;
    };
    AttributesData.writeByte = function (byte, data) {
        ByteUtil.writeInt32(byte, data.cfgId);
        ByteUtil.writeFloat64(byte, data.value);
        return byte;
    };
    return AttributesData;
}());
var ItemData = /** @class */ (function () {
    function ItemData() {
    }
    /**
     * 物品
     */
    ItemData.prototype.__getSequence = function () { return 4; };
    ItemData.readByte = function (byte, data) {
        if (!data)
            data = new ItemData();
        data.insId = ByteUtil.readString(byte);
        data.cfgId = ByteUtil.readInt32(byte);
        data.type = ByteUtil.readString(byte);
        data.createTime = ByteUtil.readFloat64(byte);
        return data;
    };
    ItemData.writeByte = function (byte, data) {
        ByteUtil.writeString(byte, data.insId);
        ByteUtil.writeInt32(byte, data.cfgId);
        ByteUtil.writeString(byte, data.type);
        ByteUtil.writeFloat64(byte, data.createTime);
        return byte;
    };
    return ItemData;
}());
var EquipData = /** @class */ (function (_super) {
    __extends(EquipData, _super);
    function EquipData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 武器
     */
    EquipData.prototype.__getSequence = function () { return 2; };
    EquipData.readByte = function (byte, data) {
        if (!data)
            data = new EquipData();
        ItemData.readByte(byte, data);
        data.strenthLv = ByteUtil.readInt32(byte);
        data.attributes = ByteUtil.readArray(byte, AttributesData.readByte);
        return data;
    };
    EquipData.writeByte = function (byte, data) {
        ItemData.writeByte(byte, data);
        ByteUtil.writeInt32(byte, data.strenthLv);
        ByteUtil.writeArray(byte, data.attributes, AttributesData.writeByte);
        return byte;
    };
    return EquipData;
}(ItemData));
var PackData = /** @class */ (function () {
    function PackData() {
    }
    /**
     *
     */
    PackData.prototype.__getSequence = function () { return 5; };
    PackData.readByte = function (byte, data) {
        if (!data)
            data = new PackData();
        data.type = ByteUtil.readInt16(byte);
        data.openLength = ByteUtil.readInt16(byte);
        data.itemList = ByteUtil.readArray(byte, GridData.readByte);
        return data;
    };
    PackData.writeByte = function (byte, data) {
        ByteUtil.writeInt16(byte, data.type);
        ByteUtil.writeInt16(byte, data.openLength);
        ByteUtil.writeArray(byte, data.itemList, GridData.writeByte);
        return byte;
    };
    return PackData;
}());
var GridData = /** @class */ (function () {
    function GridData() {
    }
    /**
     *
     */
    GridData.prototype.__getSequence = function () { return 3; };
    GridData.readByte = function (byte, data) {
        if (!data)
            data = new GridData();
        data.index = ByteUtil.readInt16(byte);
        data.item = ItemData.readByte(byte);
        return data;
    };
    GridData.writeByte = function (byte, data) {
        ByteUtil.writeInt16(byte, data.index);
        ItemData.writeByte(byte, data.item);
        return byte;
    };
    return GridData;
}());
var RoleBaseData = /** @class */ (function () {
    function RoleBaseData() {
    }
    /**
     *
     */
    RoleBaseData.prototype.__getSequence = function () { return 6; };
    RoleBaseData.readByte = function (byte, data) {
        if (!data)
            data = new RoleBaseData();
        data.insId = ByteUtil.readString(byte);
        data.profId = ByteUtil.readInt16(byte);
        data.serverId = ByteUtil.readInt16(byte);
        data.name = ByteUtil.readString(byte);
        data.level = ByteUtil.readInt32(byte);
        return data;
    };
    RoleBaseData.writeByte = function (byte, data) {
        ByteUtil.writeString(byte, data.insId);
        ByteUtil.writeInt16(byte, data.profId);
        ByteUtil.writeInt16(byte, data.serverId);
        ByteUtil.writeString(byte, data.name);
        ByteUtil.writeInt32(byte, data.level);
        return byte;
    };
    return RoleBaseData;
}());
var RoleData = /** @class */ (function (_super) {
    __extends(RoleData, _super);
    function RoleData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     */
    RoleData.prototype.__getSequence = function () { return 7; };
    RoleData.readByte = function (byte, data) {
        if (!data)
            data = new RoleData();
        RoleBaseData.readByte(byte, data);
        data.exp = ByteUtil.readFloat64(byte);
        data.attributes = ByteUtil.readArray(byte, AttributesData.readByte);
        return data;
    };
    RoleData.writeByte = function (byte, data) {
        RoleBaseData.writeByte(byte, data);
        ByteUtil.writeFloat64(byte, data.exp);
        ByteUtil.writeArray(byte, data.attributes, AttributesData.writeByte);
        return byte;
    };
    return RoleData;
}(RoleBaseData));
var Login = /** @class */ (function () {
    function Login(byte) {
        this.platId = ByteUtil.readInt16(byte);
        this.serverId = ByteUtil.readInt32(byte);
        this.openId = ByteUtil.readString(byte);
        this.token = ByteUtil.readString(byte);
        this.uid = ByteUtil.readString(byte);
    }
    return Login;
}());
var Heap = /** @class */ (function () {
    function Heap(byte) {
        this.time = ByteUtil.readFloat64(byte);
    }
    return Heap;
}());
var EnterWorld = /** @class */ (function () {
    function EnterWorld(byte) {
        this.role = RoleData.readByte(byte);
        this.packs = ByteUtil.readArray(byte);
        this.modules = ByteUtil.readArray(byte, ByteUtil.readInt16);
        this.customize = ByteUtil.readString(byte);
    }
    return EnterWorld;
}());
var PackInit = /** @class */ (function () {
    function PackInit(byte) {
        this.packs = ByteUtil.readArray(byte, PackData.readByte);
    }
    return PackInit;
}());
var PackMove = /** @class */ (function () {
    function PackMove(byte) {
        this.type0 = ByteUtil.readInt16(byte);
        this.index0 = ByteUtil.readInt16(byte);
        this.insId0 = ByteUtil.readString(byte);
        this.type1 = ByteUtil.readInt16(byte);
        this.index1 = ByteUtil.readInt16(byte);
        this.insId1 = ByteUtil.readString(byte);
    }
    return PackMove;
}());
var PackDelete = /** @class */ (function () {
    function PackDelete(byte) {
        this.type = ByteUtil.readInt16(byte);
        this.index = ByteUtil.readInt16(byte);
        this.insId = ByteUtil.readString(byte);
    }
    return PackDelete;
}());
var PackSell = /** @class */ (function () {
    function PackSell(byte) {
        this.type = ByteUtil.readInt16(byte);
        this.index = ByteUtil.readInt16(byte);
        this.insId = ByteUtil.readString(byte);
    }
    return PackSell;
}());
var PackAdd = /** @class */ (function () {
    function PackAdd(byte) {
        this.type = ByteUtil.readInt16(byte);
        this.index = ByteUtil.readInt16(byte);
        this.item = ItemData.readByte(byte);
    }
    return PackAdd;
}());
var RoleCreate = /** @class */ (function () {
    /**
     * 创建角色  {state:200,成功 201:姓名重复 ,202:包含不可用字}
     */
    function RoleCreate(byte) {
    }
    return RoleCreate;
}());
var RoleEnterWorld = /** @class */ (function () {
    function RoleEnterWorld(byte) {
        this.mapId = ByteUtil.readUint16(byte);
        this.posX = ByteUtil.readInt32(byte);
        this.posY = ByteUtil.readInt32(byte);
        this.role = RoleData.readByte(byte);
    }
    return RoleEnterWorld;
}());
/**==============ProtocolResponse======================*/
var ProtocolResponse = /** @class */ (function () {
    function ProtocolResponse() {
    }
    ProtocolResponse.Login = 0x10001; //登录返回
    ProtocolResponse.Heap = 0x20000; //心跳包
    ProtocolResponse.EnterWorld = 0x50001; //进入场景（初始化）
    ProtocolResponse.PackInit = 0x40001; //包裹初始化
    ProtocolResponse.PackMove = 0x40002; //物品移动
    ProtocolResponse.PackDelete = 0x40003; //物品删除（丢弃）
    ProtocolResponse.PackSell = 0x40004; //物品出售
    ProtocolResponse.PackAdd = 0x40005; //物品生成
    ProtocolResponse.RoleCreate = 0x30001; //创建角色  {state:200,成功 201:姓名重复 ,202:包含不可用字}
    ProtocolResponse.RoleEnterWorld = 0x30002; //进入场景
    return ProtocolResponse;
}());
/**==============ProtocolHash======================*/
var ProtocolHash = /** @class */ (function () {
    function ProtocolHash() {
    }
    ProtocolHash.Readers = [];
    ProtocolHash.Writers = [];
    ProtocolHash.Adapter = [];
    return ProtocolHash;
}());
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
//# sourceMappingURL=ProtocolData.js.map