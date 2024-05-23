import axios from "axios";
import { URL_PATH } from "../utils/constants"
import { authLocalStorage } from "../utils/localStorage";
const auth = authLocalStorage.get("auth");
export const workTimeService = {
    getWorkTimeUser: (userId, examNumberId) => {
        const url = `${URL_PATH}/api/worktimes/users/${userId}/exam-number/${examNumberId}`
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${auth?.token}`
            }
        })
           .then(response => {
                return response.data;
            })
           .catch(error => {
                console.log(error.response?.data.message)
                return error.response
            })
    },
    addWorkTimeUser: (userId, examNumberId, timeExam) => { 
        const url = `${URL_PATH}/api/worktimes/users/${userId}/exam-number/${examNumberId}?timeExam=${timeExam}`
        return axios.post(url,{},{
            headers: {
                Authorization: `Bearer ${auth?.token}`
            }
        })
           .then(response => {
                return response.data;
            })
           .catch(error => {
                console.log(error.response?.data.message)
                return error.response
            })
    },
    updateWorkTimeUser: (userId, examNumberId, endExam) => { 
        const url = `${URL_PATH}/api/worktimes/users/${userId}/exam-number/${examNumberId}?endExam=${endExam}`
        return axios.put(url,{},{
            headers: {
                Authorization: `Bearer ${auth?.token}`
            }
        })
           .then(response => {
                return response.data;
            })
           .catch(error => {
                console.log(error.response?.data.message)
                return error.response
            })
    }

}