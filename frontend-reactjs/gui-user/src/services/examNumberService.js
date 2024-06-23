import axios from "axios";
import { URL_PATH } from "../utils/constants"
import { getDataByKeyLS } from "../utils/common";
const getToken = () => {
    const authData = getDataByKeyLS("auth");
    return authData?.token;
};
export const examNumberService = {
    createHeaders: () => ({
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
    }),
    getExamNumberUser: (id) => {
        const url = `${URL_PATH}/api/exams/${id}`
        return axios.get(url)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error.response?.data.message)
                return error.response
            })
    },
    getExamNumberStudent: (id) => {
        const url = `${URL_PATH}/api/exam-numbers/students/${id}`
        return axios.get(url)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error.response?.data.message)
                return error.response
            })
    },
    getResultExamNumberUser: (idExamNumber, idUser, authObject) => {
        const url = `${URL_PATH}/api/exam-numbers/users/submit/${idExamNumber}?idUser=${idUser}`

        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${authObject?.token}`
            }
        }).then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error.response?.data.message)
                return error.response
            })
    },
    getResultExamNumberStudent: (examNumberId, studentId) => {
        const url = `${URL_PATH}/api/exam-numbers/students/submit/${examNumberId}?idStudent=${studentId}`
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