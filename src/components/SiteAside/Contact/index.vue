<template>
  <ul class="contact-container">
    <li>
      <a target="_blank" :href="data.github"
        ><Icon type="github" /><span>{{ data.githubName }}</span></a
      >
    </li>
    <li>
      <a :href="`mailto:${data.mail}`"
        ><Icon type="email" /><span>{{ data.mail }}</span></a
      >
    </li>
    <li>
      <a
        :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`"
        ><Icon type="qq" /><span>{{ data.qq }}</span></a
      >
      <div class="pop">
        <img :src="data.qqQrCode" alt="QQ二维码" />
      </div>
    </li>
    <li>
      <a
        ><Icon type="weixin" /><span>{{ data.weixin }}</span></a
      >
      <div class="pop">
        <img :src="data.weixinQrCode" alt="微信二维码" />
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
import { mapState } from "vuex";

export default {
  name: "Contact",
  components: {
    Icon,
  },
  computed: {
    ...mapState("setting", ["data"]),
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.contact-container {
  list-style: none;
  padding: 20px;
  margin: 0;
  color: @gray;
  li {
    margin: 14px 0;
    position: relative;
    &:hover {
      .pop {
        transform: scaleY(1);
      }
    }
    a {
      display: flex;
      align-items: center;
      .icon-container {
        font-size: 26px;
        width: 36px;
      }
      span {
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
.pop {
  position: absolute;
  left: 0;
  bottom: 35px;
  padding: 10px 15px;
  background-color: #fff;
  border-radius: 5px;
  transform: scaleY(0);
  transform-origin: center bottom;
  transition: 0.3s;
  img {
    width: 150px;
    height: 150px;
  }
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateY(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background: #fff;
    bottom: -8px;
  }
}
</style>