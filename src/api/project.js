import request from "./request";
import { serverURL } from "@/utils/serverURL";

export async function getProject() {
  const res = await request.get("/api/project");
  res.map((i) => {
    i.description = i.description.toString();
    i.thumb = serverURL + i.thumb;
  });
  return res;
}
