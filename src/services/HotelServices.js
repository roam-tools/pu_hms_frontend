import http from '../http-common'

const getHostels = async () =>{
    return await http.get("/hostels");
}

const getHostel = async (id) =>{
    return await http.get(`/hostel/${id}`);
}

const getFeaturedHostels = async () =>{
    return await http.get("/hostels/featured");
}

const hotelService = {
    getHostels,
    getHostel,
    getFeaturedHostels
}

export default hotelService