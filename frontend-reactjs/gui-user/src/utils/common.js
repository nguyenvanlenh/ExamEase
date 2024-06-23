import { MAX_SCORE } from "./constants";

export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};
export const formatDateLocal = (date) => {
    const d = new Date(date);
    const pad = (num) => (num < 10 ? '0' : '') + num;
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}


export const parseDateString = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
};

export const scrollToElement = (id) => {
    const element = document.getElementById(id);
    const header = document.querySelector('#id-header');
    if (element && header) {
        const { top, height } = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const headerHeight = header.getBoundingClientRect().height;
        const offset = window.pageYOffset + top - headerHeight - (windowHeight / 2) + (height / 2);

        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    }
};



export const getDataByKeyLS = (key) => {
    try {
        const item = localStorage.getItem(key);
        return JSON.parse(item);
    } catch (error) {
        console.error(`Error getting item with key "${key}":`, error);
        return null;
    }
};

export const setDataByKeyLS = (key, data) => {
    try {
        const jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
    } catch (error) {
        console.error(`Error setting item with key "${key}":`, error);
    }
};

export const formatdMYFromString = (string) => {
    const date = new Date(string);

    // Trích xuất ngày, tháng và năm
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    const day = date.getUTCDate();
    return `${day}/${month}/${year}`;
}

export const caculatorScore = (totalQuestion, totalAnswerCorrect) => {

    const roundUpToNearestHalf = (score) => {
        return Math.ceil(score * 2) / 2;
    };
    const score = (totalAnswerCorrect / totalQuestion) * MAX_SCORE;
    return totalAnswerCorrect ? Math.min(MAX_SCORE, roundUpToNearestHalf(score)) : 0;
}

export const formatTime = (isoString) => {
    const date = new Date(isoString);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // Nếu giờ bằng 0 thì đổi thành 12
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutesStr} ${ampm}`;
};
