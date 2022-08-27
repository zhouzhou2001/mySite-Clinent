import request from "./request";
import { serverURL } from "@/utils/serverURL";

//提交留言
export async function postMessage(data) {
  const res = await request({
    url: "/api/message",
    method: "post",
    data,
  });
  if (res) {
    res.avatar = serverURL + res.avatar;
  }
  return res;
}
//分页获取留言数据
export async function getMessage(page = 1, limit = 10) {
  const res = await request.get("/api/message", {
    params: {
      page,
      limit,
    },
  });
  res.rows.map((i) => {
    i.avatar = serverURL + i.avatar;
  });
  return res;
}
