import axios from "axios";
import { URL_PATH } from "../utils/constants"


export const timeExamService = {

    getAll: () => {
        const url = URL_PATH + "/api/time-exams"
        return axios.get(url)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return error.response;
            });
    }
}