import http from '../http-common'


const getAdmins = async () =>{
    return await http.get(`/user/admins`);
}

const getPorters = async () =>{
    return await http.get(`/user/porters`);
}



const userServices = {
    getAdmins,
    getPorters,
}

export default userServices