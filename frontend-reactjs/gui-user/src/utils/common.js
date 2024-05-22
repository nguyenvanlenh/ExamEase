export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// ví dụ a = formatDate(date)

// tôi muốn date === parseDateString(a) ( chuyển qua chuyển về)
export const parseDateString = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
};

export const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
        const { top, height } = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const offset = top - (windowHeight - height) / 2;

        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    }
};
export const getDataByKeyLS = (key) => {
    try {
        const item = localStorage.getItem(key);
        console.log(`Getting item with key "${key}":`, item);
        return JSON.parse(item);
    } catch (error) {
        console.error(`Error getting item with key "${key}":`, error);
        return null;
    }
};

export const setDataByKeyLS = (key, data) => {
    try {
        const jsonData = JSON.stringify(data);
        console.log(`Setting item with key "${key}" to:`, jsonData);
        localStorage.setItem(key, jsonData);
    } catch (error) {
        console.error(`Error setting item with key "${key}":`, error);
    }
};

