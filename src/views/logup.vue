<template lang="html">
  <div id="logup">
    <div class="form">
      <el-form :model='user' status-icon :rules='rule' ref='user'>
        <el-form-item label='用户名' prop='username'>
          <el-input type='username' v-model='user.username'></el-input>
        </el-form-item>
        <el-form-item label='学号' prop='number'>
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
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        number: [
          {required: true, message: '请输入学号～', trigger: 'blur'},
          {min: 5, max: 10, message: '格式错误', trigger: 'blur'}
        ],
        password: [
          {validator: checkpass, required: true, trigger: 'blur'}
        ],
        checkpass: [
          {validator: checkpass2, required: true, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submit (user) {
      this.$refs[user].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '玩命加载中',
              spinner: 'el-icon-loading',
              background: 'rgba(0,0,0,0.7)'
            });
            this.$axios({
              method: 'post',
              url: '/users',
              data: {
                username: this.user.username,
                number: this.user.number,
                password: this.user.password
              }
            }).then(res =>{
              loading.close();
              if (res.data === 'ok') {
                loading.close();
                this.$message({message: '注册成功，即将跳转',type: 'success'});
                this.$router.push('/');
              } else if (res.data === 'logged') {
                loading.close();
                this.$message({message: '这个号注册过了~',type: 'warning'});
              }
            }).catch(error =>{
              loading.close();
              this.$message.error('网络开小差了~');
            })
          } else {
            this.$message.error('信息还没填好 ^_^');
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
