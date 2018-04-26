class ByteUtil{

    private static _EMPTY_STRING: string = "";

    public static readUint8(byte:Byte):number{
        return byte.getUint8();
    }

    public static readUint16(byte:Byte):number{
        return byte.getUint16();
    }

    public static readUint32(byte:Byte):number{
        return byte.getUint32();
    }

    public static readUint64(byte:Byte):Uint64{
        return Uint64.readByte(byte);
    }

    public static readInt8(byte:Byte):number{
        return byte.getByte();
    }

    public static readInt16(byte:Byte):number{
        return byte.getInt16();
    }
    public static readInt32(byte:Byte):number{
        return byte.getInt32();
    }

    public static readFloat32(byte:Byte):number{
        return byte.getFloat32();
    }

    public static readFloat64(byte:Byte):number{
        return byte.getFloat64();
    }

    public static readString(byte:Byte):string{
        return byte.readUTFString();
    }



    public static writeUint8(byte:Byte , value:number):void{
        byte.writeUint8(value);
    }

    public static writeUint16(byte:Byte , value:number):void{
        byte.writeUint16(value);
    }

    public static writeUint32(byte:Byte , value:number):void{
        byte.writeUint32(value);
    }

    public static writeUint64(byte:Byte , value:Uint64):void{
        Uint64.writeByte(byte,value);
    }

    public static writeInt8(byte:Byte , value:number):void{
        byte.writeByte(value);
    }

    public static writeInt16(byte:Byte , value:number):void{
        byte.writeInt16(value);
    }

    public static writeInt32(byte:Byte , value:number):void{
        byte.writeInt32(value);
    }

    public static writeFloat32(byte:Byte , value:number):void{
        byte.writeFloat32(value);
    }

    public static writeFloat64(byte:Byte , value:number):void{
        byte.writeFloat32(value);
    }

    public static writeString(byte:Byte , value:string):void{
        if(value == null){
            byte.writeUTFString(ByteUtil._EMPTY_STRING);
        }else{
            byte.writeUTFString(value);
        }
    }

    public static readSequence(byte:Byte):ISequence{
        var sync:number = ByteUtil.readUint16(byte);
        if (sync == 0){
            return null;
        }
        return ProtocolHash.Readers[sync].call(byte);
    }

    public static writeSequence(byte:Byte,value:ISequence){
        if(value == null){
            byte.writeUint16(0);
            return;
        }
        var sequence:number = value.__$Sequence();
        byte.writeUint16(sequence);
        ProtocolHash.Writers[sequence].call(byte,value);
    }

    public static readArray(byte:Byte , eleReader?:Function):any[]{
        var len:number = ByteUtil.readUint16(byte);
        if(len == -1){
            return null;
        }
        var arr:any[] = new Array(len);
        if(!eleReader){
            var index:number;
            while (index = ByteUtil.readUint16(byte)){
                if(index == -1){
                    break;
                }
                arr[index] = ByteUtil.readSequence(byte);
            }
        }else{
            for(var i:number = 0 ; i < len ; ++i){
                arr[i] = eleReader(byte);
            }
        }
        return arr;
    }

    public static writeArray(byte:Byte , arr:any[], eleWriter?:Function):void{
        if(arr == null){
            ByteUtil.writeInt16(byte,-1);
            return;
        }
        var len:number = arr.length;
        ByteUtil.writeInt16(byte,len);
        if(!eleWriter){
            for(var i:number = 0 ; i < arr[i] ; ++i){
                var ele:ISequence = arr[i];
                if(ele){
                    ByteUtil.writeUint16(byte,i);
                    ByteUtil.writeSequence(byte,ele);
                }
            }
            ByteUtil.writeInt16(byte,-1);
        }
        else{
            for(var i:number = 0 ; i < len ; ++i){
                eleWriter(byte , arr[i]);
            }
        }
    }
}