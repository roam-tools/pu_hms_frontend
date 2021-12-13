import http from '../http-common'

const getRooms = async (id) =>{
    return await http.get(`/hostel/${id}/rooms`);
}



const roomServices = {
    getRooms,
}

export default roomServices