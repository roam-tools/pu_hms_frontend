import http from '../http-common'

const getBookings = async () =>{
    return await http.get(`/bookings`);
}



const bookingServices = {
    getBookings,
}

export default bookingServices