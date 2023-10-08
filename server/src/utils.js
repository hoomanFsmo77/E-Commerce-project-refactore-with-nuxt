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


module.exports={
    querySerialize,responseHandler
}