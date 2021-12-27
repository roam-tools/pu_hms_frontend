import http from '../http-common'


const getStudents = async () =>{
    return await http.get(`/user/students`);
}
// const getRooms = async (id) =>{
//     return await http.get(`/hostel/${id}/rooms`);
// }
// const bookRoom = async (data) =>{
//     return await http.post(`/book`,data);
// }




const studentServices = {
    getStudents,
    // getAllRooms,
    // bookRoom,
}

export default studentServices