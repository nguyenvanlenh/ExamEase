import axios from "axios";
import { URL_PATH } from "../utils/constants"


export const userService = {

    getAll: (auth, currentPage,size) => {
        const url = URL_PATH + `/api/user?page=${currentPage}&size=${size}`
        return axios.get(url, 
            {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            }
        )
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log("auth fail:", error.response);
                return error.response;
            });
    },
    updateUser: (id, active, auth) => {
        const url = `${URL_PATH}/api/user/${id}?active=${active}`
        console.log(url)
        return axios.put(url,{}, {
            headers: {
                Authorization: `Bearer ${auth.token}`
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
}