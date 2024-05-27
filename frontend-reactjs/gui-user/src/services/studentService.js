import axios from "axios";
import { URL_PATH } from "../utils/constants";
import { getDataByKeyLS } from "../utils/common";

const token = getDataByKeyLS("auth")?.token

export const studentService = {
    createStudent: (file, code_group) => {
        const url = `${URL_PATH}/api/students/import`;
        // Tạo một đối tượng FormData để chứa tệp và code_group
        const formData = new FormData();
        formData.append('file', file);
        formData.append('code_group', code_group);

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        return axios.post(url, formData, config)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .catch(error => {
                console.log(error.response);
                return error.response;
            });
    },
    createWorkTime: (examId) => {
        const url = `${URL_PATH}/api/worktimes/${examId}`;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        return axios.post(url, examId, config)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Error creating worktime:', error.response?.data);
                return error.response;
            });
    },
};
