import Mock from "mockjs";
import qs from "querystring";

Mock.mock("/api/message", "post", {
  code: 0,
  msg: "",
  data: {
    id: "@guid",
    nickname: "@cname",
    content: "@cparagraph(1,10)",
    createDate: Date.now(),
    "avatar|1": [
      "https://img3.wallspic.com/previews/4/2/1/8/4/148124/148124-pin_zhong_de_gou-xiao_gou-ti_yu_zu-shou_lie_gou-ying_yu_ke_ka_quan-550x310.jpg",
      "https://img3.wallspic.com/previews/8/9/6/8/3/138698/138698-huang_jin_lie_quan-pin_zhong_de_gou-cao-shi_zi_gou-xiao_gou-550x310.jpg",
      "https://img3.wallspic.com/previews/0/0/7/5/2/125700/125700-wei_er_shi_yu_mu_yang_quan-ka_lei_li_a_gou_xiong-lao_ying_guo_mu_yang_quan-ding_ji_lue_shi_zhe-bi_zi-550x310.jpg",
      "https://img3.wallspic.com/previews/9/3/2/5/95239/95239-ding_ji_lue_shi_zhe-pin_zhong_de_gou-ha_shi_qi-he_si_ji-chun_zhong_gou-550x310.jpg",
    ],
  },
});

Mock.mock(/^\/api\/message\/?(\?.+)?$/, "get", function (options) {
  const query = qs.parse(options.url);
  const data = {
    total: 52,
    [`rows|${query.limit}` || 10]: [
      {
        id: "@guid",
        nickname: "@cname",
        content: "@cparagraph(1,10)",
        createDate: Date.now(),
        "avatar|1": [
          "https://img3.wallspic.com/previews/4/2/1/8/4/148124/148124-pin_zhong_de_gou-xiao_gou-ti_yu_zu-shou_lie_gou-ying_yu_ke_ka_quan-550x310.jpg",
          "https://img3.wallspic.com/previews/8/9/6/8/3/138698/138698-huang_jin_lie_quan-pin_zhong_de_gou-cao-shi_zi_gou-xiao_gou-550x310.jpg",
          "https://img3.wallspic.com/previews/0/0/7/5/2/125700/125700-wei_er_shi_yu_mu_yang_quan-ka_lei_li_a_gou_xiong-lao_ying_guo_mu_yang_quan-ding_ji_lue_shi_zhe-bi_zi-550x310.jpg",
          "https://img3.wallspic.com/previews/9/3/2/5/95239/95239-ding_ji_lue_shi_zhe-pin_zhong_de_gou-ha_shi_qi-he_si_ji-chun_zhong_gou-550x310.jpg",
        ],
      },
    ],
  };
  return Mock.mock({
    code: 0,
    msg: "",
    data,
  });
});
