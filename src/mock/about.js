import Mock from "mockjs";

Mock.mock("/api/About", "get", {
  code: 0,
  msg: "",
  data: "https://www.w3school.com.cn",
});
