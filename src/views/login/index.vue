<template>
  <div class="login-container">
    <div class="login-container_left" />
    <div class="login-container_right">
      <h1>登录</h1>
      <el-card shadow="never">
        <el-form ref="form" :rules="rules" :model="form">
          <el-form-item prop="mobile" placeholder="请输入手机号">
            <el-input v-model="form.mobile" />
          </el-form-item>
          <el-form-item prop="password" show-password placeholder="请输入密码">
            <el-input v-model="form.password" />
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="form.isAgree">用户平台使用协议</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HmLogin',
  data() {
    var isAgree = (rule, value, callback) => {
      // rule 校验规则
      // value 校验的值
      // callback 函数  【 promise 】
      // callback() => 通过该自定义校验
      // callback(new Error('您必须勾选用户的使用协议')) => 未通过自定义校验
      console.log(rule)
      console.log(value)
      value ? callback() : callback(new Error(rule.message))
    }
    return {
      form: {
        mobile: process.env.NODE_ENV === 'development' ? '13800000002' : '',
        password: process.env.NODE_ENV === 'development' ? 'hm#qd@23!' : '',
        isAgree: process.env.NODE_ENV === 'development'
      },
      rules: {
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, max: 16, message: '密码的长度应该为6~16位之间', trigger: 'blur' }],
        isAgree: [{ validator: isAgree, message: '您必须勾选用户的使用协议', trigger: 'change' }]
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(async(value, obj) => {
        if (value) {
          await this.$store.dispatch('user/setToken', this.form)
          // 跳转主页
          this.$router.push('/')
        } else {
          console.log(obj) // 未通过校验的字段
          new Promise((resolve, reject) => {
            reject('Error')
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  height: 100vh;
  .login-container_left {
    flex: 3;
    background: {
        image: url(../../assets/common/login_back.png);
        repeat: no-repeat;
        position: center;
        size: cover;
    }
    border-top-right-radius: 60px;
  }
  .login-container_right {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 170px;
    h1 {
      padding-left: 5px;
      font-size: 24px;
    }
    .el-card {
      border: none;
      ::v-deep .el-card__body {
        padding: 0;
      }
      .el-input {
      width: 350px;
        ::v-deep .el-input__inner {
          background: #f4f5fb;
        }
      }
      .el-checkbox {
        color:#606266;
      }
      .el-button {
        width:350px
      }
    }
  }
}
</style>
