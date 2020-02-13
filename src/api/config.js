import axios from 'axios';

const $http = axios.create({
  timeout: 15000, // 请求超时时间,
  headers: {
  }
})
export default $http

