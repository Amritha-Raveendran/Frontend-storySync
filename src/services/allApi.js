import { commonApi } from "./commonApi";
import { serverUrl } from "./serverUrl";

// Api call for register user
export const registerApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/register`, reqBody, "")
}

// api call for login user
export const loginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/login`, reqBody, "")
}

// api call for google authentication- login
export const googleApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/google-login`, reqBody, "")
}




// api call for get a userprofile
export const getUserApi = async (reqBody, reqHeader) => {
    return await commonApi('GET', `${serverUrl}/getUserProfile`, reqBody, reqHeader)
}

// get a  user details

export const getUserAPI = async (userId, reqHeader) => {
    return await commonApi('GET', `${serverUrl}/getUser/${userId}`, "", reqHeader)
}

//  get all users 
export const getAllUsersApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/getAllUsers`, "", reqHeader)
}

// get user profile Api
export const getUserProfileApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/getAllUsers`, "", reqHeader)
}


// Add stories
export const addStoriesApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/write`, reqBody, reqHeader);
};


//get trending-stories at home

export const displayHomeStoriesApi = async () => {
    return await commonApi('GET', `${serverUrl}/trendingStories`)
}

// get all strories at dashboard
export const getAllStoriesApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/dashboard`, "", reqHeader)
}

//get songle user stories
export const getUserStoriesApi = async (userId, reqHeader) => {
    return await commonApi('GET', `${serverUrl}/user/${userId}/stories`, "", reqHeader)
}


// delete story

export const deleteUserStoryApi = async (storyId, reqHeader) => {
    return await commonApi('DELETE', `${serverUrl}/deletestories/${storyId}`, "", reqHeader);
}

// update user stories
export const updateUserStoriesApi = async (id, reqBody, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/updateUserstories/${id}`, reqBody, reqHeader);
}

// update user profile
export const updateUserProfileApi = async (userId, reqBody, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/update-profile/${userId}`, reqBody, reqHeader)
}


// getSingleStoryApi
export const getSingleStoryApi = async (storyId, reqHeader) => {
    return await commonApi("GET", `${serverUrl}/view-story/${storyId}`, "", reqHeader)
}


// getSingleUser
export const getSingleUser = async (userId, reqHeader) => {
    return await commonApi("GET", `${serverUrl}/user/${userId}`, "", reqHeader)
}


// add coment api
export const addCommentApi = async (storyId,userId,reqBody, reqHeader) => {
    return await commonApi("POST", `${serverUrl}/comment/${storyId}/${userId}`, reqBody, reqHeader)
}
    

// GET comments for a story
export const getCommentsApi = async (storyId, reqHeader) => {
    return await commonApi("GET", `${serverUrl}/comment/${storyId}`, "", reqHeader)
}

// delete cmment

export const deleteCommentApi = async(commentId,reqHeader)=>{
return await commonApi(`DELETE`, `${serverUrl}/comment/${commentId}`,"",reqHeader)
}

// like 

export const likeApi = async(storyId,reqHeader)=>{
    return await commonApi(`POST`, `${serverUrl}/like/${storyId}`,{},reqHeader)
}


// get like count 

export const getLikeCountApi= async(storyId,reqHeader)=>{
    return await commonApi(`GET`, `${serverUrl}/like/${storyId}`,"",reqHeader)

}