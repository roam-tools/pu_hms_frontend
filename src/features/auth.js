import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import http from "../api"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        student: "",
        admin: "",
        status: "idle",
    },
    reducers: {
        resetStatus: (state) => {
            state.status = "idle"
            state.login = "false"
        },
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading"
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded"
                console.log(action.payload.role)
                if (action.payload.role === "student") {
                    state.student = action.payload
                } else {
                    state.admin = action.payload
                }
            })
            .addCase(login.rejected, (state) => {
                state.status = "failed"
            })

    }
})

export const login = createAsyncThunk('/student/login', async (credential) => {
    const { student_id, password } = credential

    let response = ""

    if (credential.role.toLowerCase() === "student") {
        response = await http.post('student/login', { student_id, password })
        console.log(response.data)
        localStorage.setItem("userToken", JSON.stringify(response.data.token));
        return {
            ...response.data.profile,
            role: "student"
        }
    } else {
        response = await http.post('admin/login', { email_address: student_id, password })
        localStorage.setItem("userToken", JSON.stringify(response.data.token));
        return {
            ...response.data.profile,
            role: "admin"
        }
    }

})

export const { resetStatus } = authSlice.actions

export const selectStudent = (state) => state.auth.student
export const selectAdmin = (state) => state.auth.admin

export default authSlice.reducer