import axios from "axios";
import { URL_PATH } from "../utils/constants"
export const studentAnswerService = {

    post: (idStudent, idOption) => {
        const url = `${URL_PATH}/api/user_answers/students/${idStudent}?idOption=${idOption}`
        return axios.post(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error.response?.data.message);
            return error.response;
        });
    },
    update: (idStudent, idOptionFirst, idOptionLast) => {
        const url = `${URL_PATH}/api/user_answers/students/${idStudent}?idOptionFirst=${idOptionFirst}&idOptionLast=${idOptionLast}`
        return axios.put(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error.response?.data.message);
            return error.response;
        });
    }

}