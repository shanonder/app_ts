class Uint64{
    private low:number = 0;
    private high:number = 0;

    private cacheString:string;

    constructor(low:number = 0,high:number = 0){
        this.low = low;
        this.high = high;
    }

    public setValue(low:number , high:number){
        if(this.low != low || this.high != high){
            this.low = low;
            this.high = high;
            this.cacheString = null;
        }

    }

    public static toString16(value:Uint64):string{
        if(value.cacheString){
            return value.cacheString;
        }
        var temp:string = "00000000";
        var reStr:string = "";
        if(value.high){
            var lowStr:string = value.low.toString(16);
            reStr = "0x" + value.high.toString(16) + temp.slice(0, - lowStr.length) + lowStr;
        }
        else{
            reStr = "0x"+value.low.toString(16);
        }
        value.cacheString = reStr;
        return reStr;
    }

    public static fromString16(value:string):Uint64{
        var re:Uint64 ;
        var length:number = value.length;
        if(length < 10){
            re = new Uint64(Number(value),0);
        }else{
            var l:number = Number("0x" + value.slice(-8));
            var h:number = Number(value.slice(0, - 8))
            re = new Uint64(l,h);
        }

        return re;
    }

    public static readByte(byte:Byte):Uint64{
        var l:number,h:number;
        if(byte.endian == Laya.Byte.LITTLE_ENDIAN){
            l = byte.getUint32();
            h = byte.getUint32();
        }else{
            h = byte.getUint32();
            l = byte.getUint32();
        }
        return new Uint64(h,l);
    }




    public static writeByte(byte:Byte,value:Uint64){
        if(byte.endian == Laya.Byte.LITTLE_ENDIAN){
            byte.writeUint32(value.low);
            byte.writeUint32(value.high);
        }else{
            byte.writeUint32(value.high);
            byte.writeUint32(value.low);
        }
    }

    public static equal(x:Uint64 , y:Uint64) : boolean{
        if(!x || !y){
            return false;
        }
        return x.high == y.high && x.low == y.low;
    }
}