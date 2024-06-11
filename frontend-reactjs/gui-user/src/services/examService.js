import axios from "axios";
import { URL_PATH } from "../utils/constants"
import { getDataByKeyLS } from "../utils/common";
const token = getDataByKeyLS("auth")?.token
console.log(token);
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
    },
    getAllExams: (currentPage) => {
        const url = `${URL_PATH}/api/exams/all?page=${currentPage}`;
        return axios.get(url)
            .then(response => {
                console.log(response.data.data.content);
                return response.data;

            })
            .catch(error => {
                console.log(error?.response?.data);
                return error.response;
            });
    }
    ,
    searching: (keyword, category, currentPage, size) => {
        const cateparam = category ? `&category=${category}` : ""
        const url = `${URL_PATH}/api/exams?&keyword=${keyword}${cateparam}&page=${currentPage}&size=${size}`;
        return axios.get(url)
            .then(response => {
                return response.data;

            })
            .catch(error => {
                console.log(error?.response?.data);
                return error.response;
            });
    },
    getExamsByTeacherId: (teacherId, currentPage) => {
        const url = `${URL_PATH}/api/exams/teachers/${teacherId}?page=${currentPage}`;
        return axios.get(url, null)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error?.response?.data);
                return error.response;
            });
    },
    deleteExamById: (examId) => {
        const url = `${URL_PATH}/api/exams/${examId}`;
        return axios.delete(url, null)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error?.response?.data);
                return error.response;
            });
    }


}