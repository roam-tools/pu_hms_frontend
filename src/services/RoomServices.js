import http from '../http-common'

const createRoom = async (data) =>{
    return await http.post(`/room`,data);
}

const getAllRooms = async (role="",hostel_id = "") =>{
    if(role === 'admin'){
        return await http.get(`/rooms`);
    }else if(role === 'porter'){
        return await http.get(`/hostel/${hostel_id}/rooms`);
    }else{
        return await http.get(`/rooms`);
    }
}

const getRooms = async (id) =>{
    return await http.get(`/hostel/${id}/rooms`);
}
const bookRoom = async (data) =>{
    return await http.post(`/book`,data);
}




const roomServices = {
    createRoom,
    getRooms,
    getAllRooms,
    bookRoom,
}

export default roomServices