import axios from "axios";
import { URL_PATH } from "../utils/constants"
export const userAnswerService = {

    postUserAnswer: (idUser, idOption) => {
        const url = `${URL_PATH}/api/user_answers/users/${idUser}?idOption=${idOption}`
        const auth = JSON.parse(localStorage.getItem('auth'))
        console.log(url)
        console.log(auth?.token)
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
    }

}