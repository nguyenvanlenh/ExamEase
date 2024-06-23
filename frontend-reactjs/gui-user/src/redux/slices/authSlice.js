import { createSlice } from '@reduxjs/toolkit';
import { authLocalStorage } from '../../utils/localStorage';

const initialState = authLocalStorage.get() || {};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addAuth(state, action) {
            authLocalStorage.save(action.payload)
            return action.payload
        },
        removeAuth() {
            authLocalStorage.remove()
            return {}
        }
        
    }
})

export const { addAuth, removeAuth} = authSlice.actions
export default authSlice

