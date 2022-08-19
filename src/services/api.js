import axios from "axios";


const { REACT_APP_API_URL } = process.env;


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

export async function getAllPostRequest(config) {
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/timeline`, config);
        return response;
    } catch (error) {
        return error.response;
    }
};

export async function editPostRequest(postLink, content, config, postId) {
    const body = { postLink, content };
    try {
        const response = await axios.put(`${REACT_APP_API_URL}/posts/${postId}`, body, config);
        return response;
    } catch (error) {
        return error.response;
    }
};

export async function sharePostRequest(postId, config) {
    const body = {postId}
    console.log(config);
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/posts/share`, body , config);
        return response;
    } catch (error) {
        return error.response;
    };
};

export async function getTrendingTags() {
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/hashtags`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export async function likeRequest(config, postId) {
    const body = {postId}
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/like`,body ,config);
        return response;
    } catch (error) {
        return error.response;
    }
};

export async function getUserPostsRequest(id, config){
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/user/${id}`,config);
        return response;
    } catch (error) {
        return error.response;
    }
};

export async function deletePostRequest(id, config) {
    try {
        const response = await axios.delete(`${REACT_APP_API_URL}/posts/${id}`, config);
        return response;
    } catch (error) {
        return error.response;
    }
};

export async function dislikeRequest(config, postId) {
    try {
        const response = await axios.delete(`${REACT_APP_API_URL}/like/${postId}`,config);
        return response;
    } catch (error) {
        return error.response;
    }
}

export async function getTagPostsRequest(hashtag, config){
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/hashtag/${hashtag}`,config);
        return response;
    } catch (error) {
        return error.response;
    }
};

export async function searchUserRequest(search, config){
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/searchuser`, search, config);
        return response;
    } catch (error) {
        return error.response;
    }
};

export async function followUserRequest(id, config){
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/followuser/${id}`, null, config);
        return response;
    } catch (error) {
        return error.response;
    }
};

export async function unfollowUserRequest(id, config){
    try {
        const response = await axios.delete(`${REACT_APP_API_URL}/unfollowuser/${id}`, config);
        return response;
    } catch (error) {
        return error.response;
    }
};

export async function sendCommentRequest(postId, comment, config) {
    const body = { postId, comment };
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/comments`, body, config);
        return response;
    } catch (error) {
        return error.response;
    }
};
