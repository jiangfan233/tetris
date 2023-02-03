import axios from "axios";

export const SoundUrl = "http://localhost:3333/api";


const axiosInstance = axios.create({
  // 默认参数
  "baseURL": SoundUrl,
  "timeout": 3000,
});

axiosInstance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },

  function (error) {
    // 对请求错误做些什么
    console.error(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if(error && error.response) {
      switch(error.response.status) {
        case 500: 
          console.log("请求错误");
          break;
        case 404: 
          console.log("无服务");
          break;
      }
    }
  }
);

export const request = axiosInstance;
