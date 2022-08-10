import axios from "axios";

const API_URL = 'http://localhost:4000';

export async function signupRequest(email, name, password, picUrl) {
    const body = { email, name, password, picUrl };
    try {
        const response = await axios.post(`${API_URL}/sign-up`, body);
        return response.status;
    } catch (error) {
        return error.response.status;
    }
};
