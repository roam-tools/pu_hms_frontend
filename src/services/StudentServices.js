import http from '../http-common'


const getStudents = async (role="") =>{
    let resp
    if(role === 'admin'){
        resp = await http.get(`/user/students`);
    }else if(role === 'porter'){
        resp = await http.get(`/user/students`);
    }else{
        resp = await http.get(`/user/students`);
    }
    return resp;
}


const studentServices = {
    getStudents,
}

export default studentServices