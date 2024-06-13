import axios from "axios";
import { URL_PATH } from "../utils/constants"


export const authService = {

    login: (data) => {
        const url = URL_PATH + "/api/auth/login"
        return axios.post(url, data)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log("Login fail:", error.response);
                return error.response;
            });
    },
    register: (data) => {
        const url = URL_PATH + "/api/auth/register"
        return axios.post(url, data)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log("Register fail:", error.response);
                return error.response;
            })
    },
    loginStudent: (data) => {
        const url = URL_PATH + "/api/students/login"
        return axios.post(url, data)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log("Login student fail:", error.response);
                return error.response;
            });
    }
}