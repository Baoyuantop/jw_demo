<template lang="html">
  <div id="logup">
    <div class="form">
      <el-form :model='user' status-icon :rules='rule' ref='user'>
        <el-form-item label='用户名' prop='username'>
          <el-input type='username' v-model='user.username'></el-input>
        </el-form-item>
        <el-form-item label='学号' prop='usernumber'>
          <el-input type='number' v-model='user.number'></el-input>
        </el-form-item>
        <el-form-item label='密码' prop='password'>
          <el-input type='password' v-model='user.password'></el-input>
        </el-form-item>
        <el-form-item label='确认密码' prop='checkpass'>
          <el-input type='password' v-model='user.checkpass'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type='primary' @click="submit('user')">注册</el-button>
          <el-button class="clear" @click="clean('user')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var checkname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'))
      }
      callback();
    }
    var checknumber = (rule, value, callback) => {
      if (value === ' ') {
        callback(new Error('学号不能为空 ～'))
      }
      callback();
    }
    var checkpass = (rule, value, callback) => {
      if (value === '') {
        return callback (new Error('请输入密码 ～'))
      }
      callback();
    }
    var checkpass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      }else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致'))
      }else {
        callback();
      }
    }
    return {
      user: {
        username: '',
        number: '',
        password: '',
        checkpass: ''
      },
      rule: {
        username: [
          {validator: checkname, trigger: 'blur'}
        ],
        usernumber: [
          {validator: checknumber, trigger: 'blur'}
        ],
        password: [
          {validator: checkpass, trigger: 'blur'}
        ],
        checkpass: [
          {validator: checkpass2, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submit (user) {
      this.$refs[user].validate((valid) => {
          if (valid) {
            console.log(this.user);
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
    clean (user) {
      this.$refs[user].resetFields();
    }
  }
}
</script>

<style lang="less">
#logup{
  .form{
    width: 20vw;
    height: 20vh;
    margin: 20vh auto;
    .clear{
      margin-left: 5vw;
    }
  }
}
</style>
