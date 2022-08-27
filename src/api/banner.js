import request from "./request";
import { serverURL } from "@/utils/serverURL";

//获取首页大图
export async function getBanners() {
  const res = await request.get("/api/banner");
  res.map((i) => {
    i.bigImg = serverURL + i.bigImg;
    i.midImg = serverURL + i.midImg;
  });
  return res;
}
