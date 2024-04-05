import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

//Login a user
const login = async (userData) => {
    const response =  await axios.post(API_URL + 'login', userData);
    
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

//Register a user
const register = async (userData) => {
    const response =  await axios.post(API_URL, userData);
    
    return response.data;
}

//Logout a user
const logout = async() => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService;
