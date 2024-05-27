import axios from "axios";
import { URL_PATH } from "../utils/constants"


export const categoryService = {

    getAll: () => {
        const url = URL_PATH + "/api/categories"
        return axios.get(url)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return error.response;
            });
    }
}