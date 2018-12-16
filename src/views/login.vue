<template lang="html">
<div id="login">
  <div class="title">
    <p>学生信息管理系统</p>
  </div>
  <div class="form">
    <el-form :model='people' status-icon :rules='rule' ref='people'>
      <el-form-item label='学号' prop='peoplenumber'>
        <el-input type='number' v-model='people.number'></el-input>
      </el-form-item>
      <el-form-item label='密码' prop='peoplepassword'>
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
    var checknumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('学号不能为空 ～'))
      }
      callback();
    };
    var checkpass = (rule, value, callback) => {
      if (value === '') {
        callback (new Error('请输入密码 ～'))
      }
      callback();
    };
    return {
      people: {
        number: '',
        password: ''
      },
      rule: {
        peoplenumber: [
          {validator: checknumber, trigger: 'blur'}
        ],
        peoplepassword: [
          {validator: checkpass, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submit (people) {
      this.$refs[people].validate((valid) => {
          if (valid) {
            console.log(this.people);
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
