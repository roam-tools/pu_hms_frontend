import http from '../http-common'

const getRooms = async (id) =>{
    return await http.get(`/hostel/${id}/rooms`);
}
const bookRoom = async (data) =>{
    return await http.post(`/book`,data);
}




const roomServices = {
    getRooms,
    bookRoom,
}

export default roomServices