import Mock from "mockjs";

Mock.mock("/api/project", "get", {
  code: 0,
  msg: "",
  "data|3-10": [
    {
      id: "@uuid",
      title: "@ctitle(1,10)",
      "url|1": "@url" || null,
      "github|1": "@github" || null,
      "description|1-2": "@cparagraph" || null,
      thumb: "@image(300x250,@color,@natural)",
    },
  ],
});
