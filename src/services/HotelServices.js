import http from '../http-common'

const createHostels = async (data) =>{
    return await http.post("/hostel",data);
}

const updateHostel = async (data) =>{
    return await http.put(`/hostel/${data.id}`,data);
}

const deleteHostel = async (id) =>{
    return await http.delete(`/hostel/${id}`);
}

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
    createHostels,
    updateHostel,
    deleteHostel,
    getHostels,
    getHostel,
    getFeaturedHostels
}

export default hotelService