import axios from "axios";
import { URL_PATH } from "../utils/constants"
export const workTimeService = {
    getWorkTimeUser: (authObject, examNumberId) => {
        const url = `${URL_PATH}/api/worktimes/users/${authObject?.userId}/exam-number/${examNumberId}`
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${authObject?.token}`
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
    addWorkTimeUser: (authObject, examNumberId, timeExam) => { 
        const url = `${URL_PATH}/api/worktimes/users/${authObject?.userId}/exam-number/${examNumberId}?timeExam=${timeExam}`
        return axios.post(url,{},{
            headers: {
                Authorization: `Bearer ${authObject?.token}`
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
    updateWorkTimeUser: (authObject, examNumberId, endExam) => { 
        const url = `${URL_PATH}/api/worktimes/users/${authObject?.userId}/exam-number/${examNumberId}?endExam=${endExam}`
        return axios.put(url,{},{
            headers: {
                Authorization: `Bearer ${authObject?.token}`
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
    removeWorkTimeAndUserAnswerUser: (examNumberId, authOject) => {
        const url = `${URL_PATH}/api/worktimes/users/${authOject?.userId}/exam-number/${examNumberId}`
        return axios.delete(url, {
            headers: {
                Authorization: `Bearer ${authOject?.token}`
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
    getAllWorkTimeUser: (authObject) => {
        const url = `${URL_PATH}/api/worktimes/users/${authObject?.userId}`
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${authObject?.token}`
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
    updateWorkTimeStudent: (studentId, examNumberId, endExam) => { 
        const url = `${URL_PATH}/api/worktimes/students/${studentId}/exam-number/${examNumberId}?endExam=${endExam}`
        return axios.put(url)
           .then(response => {
                return response.data;
            })
           .catch(error => {
                console.log(error.response?.data.message)
                return error.response
            })
    },
    getWorkTimeStudent: (studentId, examNumberId) => {
        const url = `${URL_PATH}/api/worktimes/students/${studentId}/exam-number/${examNumberId}`
        return axios.get(url)
           .then(response => {
                return response.data;
            })
           .catch(error => {
                console.log(error.response?.data.message)
                return error.response
            })
    }

}