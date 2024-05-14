import axios from "axios";
import { URL_PATH } from "../utils/constants"
export const examService = {

    createExam: (data) => {
        const url = URL_PATH + "/api/exams"
        return axios.post(url, data)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error.response?.data.message)
                return error.response
            })
    },
    updateExam: (data, id) => {
        const url = `${URL_PATH}/api/exams/${id}`
        return axios.put(url, data)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error.response?.data.message)
                return error.response
            })
    },
    updatePublic: (id, isPublic) => {
        const url = `${URL_PATH}/api/exams/${1}`;
        return axios.patch(url, null, {
            params: {
                isPublic: isPublic
            }
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error.response.data);
                return error.response;
            });
    }

}