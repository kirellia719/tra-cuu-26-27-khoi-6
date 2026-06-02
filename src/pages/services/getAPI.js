const API_LIST = [
    "https://tuyen-sinh-26-27-khoi-6-be.onrender.com",
    "https://tuyen-sinh-26-27-khoi-6-be-3.onrender.com",
    "https://tuyen-sinh-26-27-khoi-6-be-2.onrender.com",
    "https://tuyen-sinh-26-27-khoi-6-be.vercel.app",
    "https://tuyen-sinh-26-27-khoi-6-be-wivf.vercel.app",
    "https://tuyen-sinh-26-27-khoi-6-be-jgeg.vercel.app",
];

const getRandomApi = () => {
    return API_LIST[Math.floor(Math.random() * API_LIST.length)];
};

export default getRandomApi;