import http from '../http-common'


const createAdmins = async (data) =>{
    return await http.post(`/user/admin`,data);
}

const createPorters = async (data) =>{
    return await http.post(`/user/porter`,data);
}


const updateAdmins = async (data) =>{
    return await http.put(`/user/admin/${data.admin_id}`);
}

const updatePorters = async (data) =>{
    return await http.put(`/user/porter/${data.porter_id}`);
}

const getAdmins = async () =>{
    return await http.get(`/user/admins`);
}

const getPorters = async () =>{
    return await http.get(`/user/porters`);
}

const assignHostel = async (data) =>{
    console.log(data)
    return await http.post(`user/porter/${data.porter_id}/hostel/${data.hostel_id}`);
}


const userServices = {
    createAdmins,
    createPorters,
    updateAdmins,
    updatePorters,
    getAdmins,
    getPorters,
    assignHostel,
}

export default userServices