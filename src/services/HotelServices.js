import http from '../http-common'

const getHostels = async (data) =>{
    return await http.get("/hostels",data);
}

const getHostel = async (id) =>{
    return await http.get(`/hostel/${id}`);
}

// const signIn = async (data) =>{
//     return await http.post("/user/login",data);
// }

const hotelService = {
    getHostels,
    getHostel,
    // signIn
}

export default hotelService