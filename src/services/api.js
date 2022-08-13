import axios from "axios";

const  {REACT_APP_API_URL}  = process.env;


export async function signupRequest(email, name, password, picUrl) {
    const body = { email, name, password, picUrl };
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/sign-up`, body);
        return response.status;
    } catch (error) {
        return error.response.status;
    }
};

export async function loginRequest(email, password) {
    const body = { email, password };
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/login`, body);
        return response;
    } catch (error) {
        return error.response;
    }
};

export async function sendPostRequest(postLink, content, config) {
    const body = { postLink, content };
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/timeline`, body, config);
        return response;
    } catch (error) {
        return error.response;
    }
};

export async function getAllPostRequest(config){
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/timeline`,config);
        return response;
    } catch (error) {
        return error.response;
    }
};

export async function getTrendingTags (){
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/hashtags`);
        return response;
    } catch (error) {
        return error.response;
    }
}

export async function getUserPostsRequest(id, config){
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/user/${id}`,config);
        return response;
    } catch (error) {
        return error.response;
    }
};

export async function getTagPostsRequest(hashtag, config){
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/hashtag/${hashtag}`,config);
        return response;
    } catch (error) {
        return error.response;
    }
};

export async function searchUserRequest(search){
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/searchuser`, search);
        return response;
    } catch (error) {
        return error.response;
    }
};