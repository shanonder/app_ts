module utils{
    export class StringUtil{
        public static str2Array(str:string , ...splits):any[]{
            let arr:string[] = str.split(splits.shift());
            if(splits.length){
                const list:any[] = [];
                for(let i:number = 0 ,len:number = arr.length; i < len ; ++i){
                    list.push(StringUtil.str2Array.apply(this,[arr[i]].concat(splits)));
                }
                return list;
            }
            else{
                return arr;
            }
        }
    }
}

