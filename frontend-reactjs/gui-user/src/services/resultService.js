import axios from "axios";
import { URL_PATH } from "../utils/constants";
import { getDataByKeyLS } from "../utils/common";
const token = getDataByKeyLS("auth")?.token
export const resultService = {


    getAllResultOfStudentByCodeGroup: (codeGroup) => {
        const url = `${URL_PATH}/api/result/students/${codeGroup}`
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
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
    exportFileResultByCodeGroup: async (codeGroup) => {
        const url = `${URL_PATH}/api/students/download/${codeGroup}`;
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                responseType: 'blob'
            });

            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'students.xlsx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting file:', error);
        }
    },
    sendMailResultForStudent: (codeGroup) => {
        const url = `${URL_PATH}/api/result/send-mail/${codeGroup}`
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
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