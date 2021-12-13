import http from '../http-common'

const signUp = async (data) =>{
    return await http.post("/user/student",data);
}

const signIn = async (data) =>{
    return await http.post("/user/login",data);
}

const authenticationService = {
    signUp,
    signIn
}

export default authenticationService