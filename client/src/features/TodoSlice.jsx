import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios/AxiosConfig"

export const createTodo = createAsyncThunk(
    'todo/createTodo',
    async(data)=>{
        try {
            const response = await axiosInstance.post('/api/create', data)
            return response.data
        } catch (error) {
            return error.response            
        }
    }
)

export const getTodo = createAsyncThunk(
    'todo/getTodo',
    async()=>{
        try {
            const response = await axiosInstance.get('/api/todos')
            return response.data
            
        } catch (error) {
            return error.response
            
        }
    }
)

export const getTodoById = createAsyncThunk(
    'todo/getTodoById',
    async(id)=>{
        try {
            const response = await axiosInstance.get(`/api/todos/${id}`)
            return response.data
            
        } catch (error) {
            return error.response
            
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async(id)=>{
        try {
            const response = await axiosInstance.delete(`/api/delete/${id}`)
            return response
        } catch (error) {
            return error.response
        }
    }
)

export const updateTodo = createAsyncThunk(
    'todo/updateTodo',
    async({id, todo})=>{
        try {
            const response = await axiosInstance.put(`/api/update/${id}`, todo)
            return response.data
        } catch (error) {
            return error.response
        }
    }
)

export const TodoSlice = createSlice({
    name: 'todo',
    initialState: {
        dataTodo:[], 
        loadingTodo: false,
        errorTodo: null,
        dataTodoById:[], 
        loadingTodoById: false,
        errorTodoById: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // create
            .addCase(createTodo.pending, (state) => {
                state.loadingTodo = true
                state.errorTodo = null
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.loadingTodo = false
                state.dataTodo = action.payload;
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.loadingTodo = false
                state.errorTodo = action.payload
            })
            // get
            .addCase(getTodo.pending, (state) => {
                state.loadingTodo = true
                state.errorTodo = null
            })
            .addCase(getTodo.fulfilled, (state, action) => {
                state.loadingTodo = false
                state.dataTodo = action.payload;
            })
            .addCase(getTodo.rejected, (state, action) => {
                state.loadingTodo = false
                state.errorTodo = action.payload
            })
            // get by id
            .addCase(getTodoById.pending, (state) => {
                state.loadingTodoById = true
                state.errorTodoById = null
            })
            .addCase(getTodoById.fulfilled, (state, action) => {
                state.loadingTodoById = false
                state.dataTodoById = action.payload;
            })
            .addCase(getTodoById.rejected, (state, action) => {
                state.loadingTodoById = false
                state.errorTodoById = action.payload
            })
            // delete
            .addCase(deleteTodo.pending, (state) => {
                state.loadingTodo = true
                state.errorTodo = null
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.loadingTodo = false
                state.errorTodo = null
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.loadingTodo = false
                state.errorTodo = action.payload
            })
            // update
            .addCase(updateTodo.pending, (state) => {
                state.loadingTodo = true
                state.errorTodo = null
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.loadingTodo = false
                state.errorTodo = null
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.loadingTodo = false
                state.errorTodo = action.payload
            })
    }
})

export default TodoSlice.reducer