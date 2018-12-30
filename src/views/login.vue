<template lang="html">
<div id="login">
  <div class="title">
    <p>学生信息管理系统</p>
  </div>
  <div class="form">
    <el-form :model='people' status-icon :rules='rule' ref='people'>
      <el-form-item label='学号' prop='number'>
        <el-input type='number' v-model='people.number'></el-input>
      </el-form-item>
      <el-form-item label='密码' prop='password'>
        <el-input type='password' v-model='people.password'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click="submit('people')">提交</el-button>
        <el-button @click="clean('people')">重置</el-button>
        <a href="#/logup">还没账号？立即注册</a>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      people: {
        number: '',
        password: ''
      },
      rule: {
        number: [
          {required: true, message: '请输入学号～', trigger: 'blur'},
          {min: 5, max: 10, message: '格式错误', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码～', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submit (people) {
      this.$refs[people].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '玩命加载中',
              spinner: 'el-icon-loading',
              background: 'rgba(0,0,0,0.7)'
            });
            this.$axios({
              method: 'post',
              url: '/login',
              data:{
                number: this.people.number,
                password: this.people.password
              }
            }).then(res =>{
              console.log(res);
              if (res.data === true) {
                loading.close();
                sessionStorage.setItem('number',this.people.number);
                this.$router.push('/main');
              } else if (res.data === false) {
                loading.close();
                this.$message.error('用户信息错误');
              }
            }).catch(error =>{
              loading.close();
              this.$message.error('网络开小差了~');
              console.log(error);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
    clean (people) {
      this.$refs[people].resetFields();
      this.people.number = ''
      this.people.password = ''
    }
  }
}
</script>

<style scoped lang="less">
#login{
  .title{
    text-align: center;
    width: 100vw;
    height: 10vh;
    margin-top: 20vh;
    p{
      font-size: 200%;
    }
  }
  .form{
    width: 20vw;
    height: 30vh;
    margin: 1vh auto;
    a{
      margin-left: 5vw;
      color: #409EFF;
    }
  }
}
</style>
