import axios from "axios";
import showMessage from "@/utils/showMessage";

//创建axios实例
const ins = axios.create();
//添加响应拦截器
ins.interceptors.response.use(function (res) {
  if (res.data.code !== 0) {
    showMessage({
      content: JSON.parse(res.data).msg,
      type: "error",
    });
    return null;
  }
  return res.data.data;
});

export default ins;
