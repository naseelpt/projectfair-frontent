
import Header from "../component/Header"
import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

// register
export const registerApi = async (reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}

// login
export const loginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
}


// add projects
export const addProjectApi = async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/add-project`,reqBody,reqHeader)
}

// get home project
export const homeProjectApi = async()=>{
   return await commonApi('GET',`${serverUrl}/home-project`)
}

// get all project
export const allProjectApi = async(searchkey,reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/all-project?search=${searchkey}`,"",reqHeader)
}

// get user project
export const userProjectApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/user-project`,"",reqHeader)
}

// api to remove user project
export const removeUserProjectApi = async(id,reqHeader)=>{
    return await commonApi('DELETE',`${serverUrl}/remove-userproject/${id}`,"",reqHeader)
}

// api to update project
export const updateUserProjectApi = async(id,reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-userProject/${id}`,reqBody,reqHeader)
}

// api update profilr
export const updateuserprofileApi = async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-userprofile`,reqBody,reqHeader)
}