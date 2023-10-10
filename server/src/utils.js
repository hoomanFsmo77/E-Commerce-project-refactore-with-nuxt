const imageBase=process.env.IMAGE_PATH;

const querySerialize = (obj) => {
  return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
}

const responseHandler = (error,msg,data) => {
    return {
        error:error,
        msg:msg,
        data:data
    }
}
const addImageBase = (source,key) => {
    const imageBase=process.env.IMAGE_PATH
    if(typeof key==='object'){
        let result=[...source];
        key.forEach(k=>{
            result= result.map(item=>{
                return {
                    ...item,
                    [k]:imageBase+item[k]
                }
            })
        });
        return result;
    }else{
        return source.map(item=>{
            return {...item,[key]:imageBase+item[key]}
        })
    }
}

module.exports={
    querySerialize,responseHandler,addImageBase
}