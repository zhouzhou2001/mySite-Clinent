import request from "./request";
import { serverURL } from "@/utils/serverURL";

//获取文章分类
export async function getBlogCategory() {
  return await request.get("/api/blogtype");
}
/**
 * 获取博客列表数据
 * @param {*} page 页码
 * @param {*} limit 页容量
 * @param {*} categoryid 分类id
 * @returns
 */
export async function getBlog(page = 1, limit = 10, categoryid = -1) {
  const res = await request.get("/api/blog", {
    params: { page, limit, categoryid },
  });
  res.rows.map((i) => {
    i.thumb = serverURL + i.thumb;
  });
  return res;
}

/**
 * 获取博客详情
 * @param {String} id 博客id
 * @returns
 */
export async function getBlogDtail(id) {
  return await request.get(`/api/blog/${id}`);
}

/**
 * 获取评论信息
 * @param {String} blogid 博客id
 * @param {Number} page 页码
 * @param {Number} limit 页容量
 * @returns
 */
export async function getComment(blogid, page = 1, limit = 10) {
  const res = await request.get("/api/comment", {
    params: { blogid, page, limit },
  });
  res.rows.map((i) => {
    i.avatar = serverURL + i.avatar;
  });
  return res;
}

/**
 * 提交评论
 * @param {Object} commentInfo 评论对象
 * @returns
 */
export async function postComment(commentInfo) {
  const res = await request.post("/api/comment", commentInfo);
  res.avatar = serverURL + res.avatar;
  return res;
}
