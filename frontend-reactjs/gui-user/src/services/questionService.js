import axios from "axios";
import { URL_PATH } from "../utils/constants"
const auth = JSON.parse(localStorage.getItem('auth'))
export const questionService = {

    getQuestionResult: (idExamNumber) => {
        const url = `${URL_PATH}/api/questions/exam-number/${idExamNumber}`
        return axios.get(url, {
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
    getQuestion: (idQuestion) => {
        const url = `${URL_PATH}/api/questions/${idQuestion}`
        return axios.get(url, {
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