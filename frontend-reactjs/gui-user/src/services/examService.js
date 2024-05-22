import axios from "axios";
import { URL_PATH } from "../utils/constants"
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZWFjaGVyIiwiaWF0IjoxNzE2MjIxNjkyLCJleHAiOjE3MTYzMDgwOTJ9.qzAnTcLNwrXsyym9Rj2vD3Vys5m8_l293m11c0PQzlQzxZImNW3Nger37LJQAZNZZucQUSWV_ZwT4uRJXO3MyA"
export const examService = {
    createExam: (data) => {
        const url = URL_PATH + "/api/exams"
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        return axios.post(url, data, config)
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
        const url = `${URL_PATH}/api/exams/${id}`;
        return axios.patch(url, null, {
            params: {
                isPublic: isPublic
            }
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error?.response?.data);
                return error.response;
            });
    },
    getExamById: (id) => {
        const url = `${URL_PATH}/api/exams/${id}`;
        return axios.get(url, null)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error?.response?.data);
                return error.response;
            });
    }
    

}