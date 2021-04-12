import axios from 'axios';
export default axiosGlobals = () => {
    // axios.defaults.headers['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDdlN2M3YzQ0Mjg0ZDEzMmJlMWQ3ZDYxOGQ0Njg3ZSIsInN1YiI6IjU4ZTM4ZDY1OTI1MTQxMjgxMDAxZGMzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m_VYC8m5H2_XIcIIHuNCf6RHTpybdcR7Ha8GFRE-pnw";
    axios.defaults.baseURL = `https://supavideo.herokuapp.com/api/v1`;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
};


export const getVideoList = async() => await axios.get(`https://supavideo.herokuapp.com/api/v1`);