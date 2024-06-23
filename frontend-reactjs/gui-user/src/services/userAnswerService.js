import axios from "axios";
import { URL_PATH } from "../utils/constants"
const auth = JSON.parse(localStorage.getItem('auth'))
export const userAnswerService = {

    postUserAnswer: (idUser, idOption) => {
        const url = `${URL_PATH}/api/user_answers/users/${idUser}?idOption=${idOption}`
        return axios.post(url, {}, {
            headers: {
                Authorization: `Bearer ${auth?.token}`
            }
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error.response?.data.message);
            return error.response;
        });
    },
    updateAnswer: (idUser, idOptionFirst, idOptionLast) => {
        const url = `${URL_PATH}/api/user_answers/users/${idUser}?idOptionFirst=${idOptionFirst}&idOptionLast=${idOptionLast}`
        return axios.put(url, {}, {
            headers: {
                Authorization: `Bearer ${auth?.token}`
            }
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error.response?.data.message);
            return error.response;
        });
    }

}