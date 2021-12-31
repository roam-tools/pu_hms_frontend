import http from '../http-common'

const getBookings = async (role = "",porter_id="") =>{
    if(role === 'admin'){
        return await http.get(`/bookings`);
    }else if(role === 'porter'){
        return await http.get(`/porter/${porter_id}/hostel/booking`);
    }else{
        return await http.get(`/bookings`);
    }
}

const confirmBooking = async (id) => {
    return await http.patch(`/booking/${id}`)
}

const cancelBooking = async (id) => {
    return await http.delete(`/booking/${id}`)
}


const bookingServices = {
    getBookings,
    confirmBooking,
    cancelBooking
}

export default bookingServices