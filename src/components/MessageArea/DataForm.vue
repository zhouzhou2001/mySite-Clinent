<template>
  <form ref="form" @submit.prevent="handleSubmit" id="data-form-container">
    <div class="form-item">
      <div class="input-area">
        <input
          type="text"
          placeholder="用户昵称"
          v-model="dataForm.nickname"
          maxlength="10"
        />
        <span class="tip">{{ dataForm.nickname.length }}/10</span>
      </div>
      <div class="error">{{ error.nickname }}</div>
    </div>
    <div class="form-item">
      <div class="text-area">
        <textarea
          maxlength="300"
          placeholder="输入内容"
          v-model="dataForm.content"
        />
        <span class="tip">{{ dataForm.content.length }}/300</span>
      </div>
      <div class="error">{{ error.content }}</div>
    </div>
    <div class="form-item">
      <div class="button-area">
        <button :disabled="isSubmint">
          {{ isSubmint ? "提交中..." : "提交" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      dataForm: {
        nickname: "",
        content: "",
      },
      error: {
        nickname: "",
        content: "",
      },
      isSubmint: false,
    };
  },
  methods: {
    handleSubmit() {
      this.dataForm.nickname
        ? (this.error.nickname = "")
        : (this.error.nickname = "请输入昵称");
      this.dataForm.content
        ? (this.error.content = "")
        : (this.error.content = "请输入昵称");
      if (!this.dataForm.nickname || !this.dataForm.content) {
        return;
      }
      this.isSubmint = true;
      this.$emit("submit", this.dataForm, (cont) => {
        this.dataForm.nickname = "";
        this.dataForm.content = "";
        this.isSubmint = false;
        if (cont) {
          this.$showMessage({
            content: cont,
            type: "success",
            duration: 1000,
            container: this.$refs.form,
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
#data-form-container {
  margin-bottom: 20px;
  overflow: hidden;
}
.form-item {
  margin-bottom: 8px;
}
.input-area {
  width: 50%;
  position: relative;
}
.text-area {
  position: relative;
}
.tip {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: #b4b8bc;
  font-size: 12px;
}
input,
textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed @gray;
  outline: none;
  color: @words;
  font-size: 14px;
  border-radius: 4px;
  &:focus {
    border-color: @primary;
  }
}
input {
  padding: 0 15px;
  height: 40px;
}
textarea {
  resize: none;
  padding: 8px 15px;
  height: 120px;
}
.error {
  margin-top: 6px;
  color: @danger;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
button {
  position: relative;
  cursor: pointer;
  border: none;
  outline: none;
  width: 100px;
  height: 34px;
  color: #fff;
  border-radius: 4px;
  background: @primary;
  &:hover {
    background: darken(@primary, 10%);
  }
  &:disabled {
    background: lighten(@primary, 20%);
    cursor: not-allowed;
  }
}
</style>
