import request from "./request";
import { serverURL } from "@/utils/serverURL";

//获取全局设置
export async function getSetting() {
  const res = await request.get("/api/setting");
  res.avatar = serverURL + res.avatar;
  res.qqQrCode = serverURL + res.qqQrCode;
  res.weixinQrCode = serverURL + res.weixinQrCode;
  return res;
}
