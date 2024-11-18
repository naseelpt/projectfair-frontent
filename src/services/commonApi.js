import axios from "axios"


export const commonApi =async (httprequast,url,reqBody,reqHeader)=>{
    const reqConfig = {
        method:httprequast,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
    }
    return await axios(reqConfig).then((result)=>{
        return result

    }).catch((err)=>{
        return err
    })
}