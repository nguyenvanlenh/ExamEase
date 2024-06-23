import axios from "axios";
import { URL_PATH } from "../utils/constants";
import { getDataByKeyLS } from "../utils/common";
const getToken = () => {
    const authData = getDataByKeyLS("auth");
    return authData?.token;
};
export const questionService = {
    createHeaders: () => ({
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'multipart/form-data',
        },
    }),

    uploadFileQuestion: (file, answerFile) => {
        const url = `${URL_PATH}/api/upload`;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('answerFile', answerFile);

        return axios.post(url, formData, questionService.createHeaders())
            .then(response => response.data)
            .catch(error => {
                console.error("Error uploading file question:", error?.response?.data?.message);
                return error.response;
            });
    },

    getQuestionResult: (idExamNumber, authObject) => {
        const url = `${URL_PATH}/api/questions/exam-number/${idExamNumber}`
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${authObject?.token}`
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
    getQuestion: (idQuestion, authObject) => {
        const url = `${URL_PATH}/api/questions/${idQuestion}`
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${authObject?.token}`
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
    updateQuestion: (data, id) => {
        const url = `${URL_PATH}/api/questions/${id}`;
        return axios.put(url, data, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
            .then(response => response.data)
            .catch(error => {
                console.error("Error updating question:", error?.response?.data?.message);
                return error.response;
            });
    },
}