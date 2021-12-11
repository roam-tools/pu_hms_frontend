import http from "../http-common";

const createUser = async (data)=>{
    return await http.post("/users",data);
}
const updateUser = async (data)=>{
    return await http.put(`/users/${data.id}`,data);
}
const deleteUser = async (id)=>{
    return await http.delete(`/user/${id}`)
}
const fetchUsers = async () =>{
    return await http.get('/users');
}
const loginUser = async (data) =>{
    return await http.post(`/login`,data)
}

const userService =  {
    createUser,
    updateUser,
    deleteUser,
    fetchUsers,
    loginUser,
}

export default userService;