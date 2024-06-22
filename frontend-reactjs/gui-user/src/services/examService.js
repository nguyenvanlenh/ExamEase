import axios from "axios";
import { URL_PATH } from "../utils/constants";
import { getDataByKeyLS } from "../utils/common";

const getToken = () => {
    const authData = getDataByKeyLS("auth");
    return authData?.token;
};

export const examService = {
    createHeaders: () => ({
        headers: { Authorization: `Bearer ${getToken()}` }
    }),

    createExam: (data) => {
        const url = `${URL_PATH}/api/exams`;
        return axios.post(url, data, examService.createHeaders())
            .then(response => response.data)
            .catch(error => {
                console.error("Error creating exam:", error?.response?.data);
                return error.response;
            });
    },

    updateExam: (id, data) => {
        const url = `${URL_PATH}/api/exams/${id}`;
        return axios.put(url, data, examService.createHeaders())
            .then(response => response.data)
            .catch(error => {
                console.error(`Error updating exam ${id}:`, error?.response?.data);
                return error.response;
            });
    },

    updatePublic: (id, isPublic) => {
        const url = `${URL_PATH}/api/exams/${id}`;
        return axios.patch(url, { isPublic }, examService.createHeaders())
            .then(response => response.data)
            .catch(error => {
                console.error(`Error updating public status for exam ${id}:`, error?.response?.data);
                return error.response;
            });
    },

    getExamById: (id) => {
        const url = `${URL_PATH}/api/exams/${id}`;
        return axios.get(url, examService.createHeaders())
            .then(response => response.data)
            .catch(error => {
                console.error(`Error fetching exam ${id}:`, error?.response?.data);
                return error.response;
            });
    },

    getAllExams: (currentPage) => {
        const url = `${URL_PATH}/api/exams/all?page=${currentPage}`;
        return axios.get(url, examService.createHeaders())
            .then(response => response.data)
            .catch(error => {
                console.error("Error fetching all exams:", error?.response?.data);
                return error.response;
            });
    },

    searching: (keyword, category, currentPage, size) => {
        const cateparam = category ? `&category=${category}` : "";
        const url = `${URL_PATH}/api/exams?&keyword=${keyword}${cateparam}&page=${currentPage}&size=${size ? size : ""}`;
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error("Error searching exams:", error?.response?.data);
                return error.response;
            });
    },

    getExamsByTeacherId: (teacherId, currentPage) => {
        const url = `${URL_PATH}/api/exams/teachers/${teacherId}?page=${currentPage}`;
        return axios.get(url, examService.createHeaders())
            .then(response => response.data)
            .catch(error => {
                console.error(`Error fetching exams for teacher ${teacherId}:`, error?.response?.data);
                return error.response;
            });
    },

    deleteExamById: (examId) => {
        const url = `${URL_PATH}/api/exams/${examId}`;
        return axios.delete(url, examService.createHeaders())
            .then(response => response.data)
            .catch(error => {
                console.error(`Error deleting exam ${examId}:`, error?.response?.data);
                return error.response;
            });
    }
};
