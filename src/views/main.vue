<template lang="html">
  <div id="main">
    <div class="title">
      <p>学生信息管理系统</p>
    </div>
    <div class="nav">
      <div>{{number}}</div>
      <el-button type="primary" @click='logout'>退出</el-button>
    </div>
    <div class="table">
      <el-table :data="student">
        <el-table-column fixed prop='number' label='学号' width='150'></el-table-column>
        <el-table-column prop='name' label='姓名' width='150'></el-table-column>
        <el-table-column prop='age' label='年龄' width='150'></el-table-column>
        <el-table-column prop='clas' label='班级' width='150'></el-table-column>
        <el-table-column label='操作' width='150'>
          <template slot-scope='scope'>
            <el-button type='text' size='small' @click='editStu(scope.row)'>编辑</el-button>
            <el-button type='text' size='small' @click='deleteStu(scope.row)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="add">
      <el-tooltip class="item" effect="dark" content="点击增加学生" placement="top-center">
        <el-button type="danger" icon="el-icon-edit" circle @click='addStu'></el-button>
      </el-tooltip>
    </div>
    <div class="addStu" v-if='add'>
      <el-form :model='newStu' class='form'>
        <el-form-item label='姓名'>
          <el-input type='username' v-model='newStu.name'></el-input>
        </el-form-item>
        <el-form-item label='学号'>
          <el-input type='number' v-model='newStu.number'></el-input>
        </el-form-item>
        <el-form-item label='年龄'>
          <el-input type='age' v-model='newStu.age'></el-input>
        </el-form-item>
        <el-form-item label='班级'>
          <el-input type='number' v-model='newStu.clas'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type='primary' @click="make_add">提交</el-button>
          <el-button class="clear" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="编辑用户"
      :visible.sync="edit"
      width="30%"
      :before-close="editClose">
      <el-form :model='user'>
        <el-form-item label='姓名'>
          <el-input type='name' v-model='user.name'></el-input>
        </el-form-item>
        <el-form-item label='学号'>
          <el-input type='number' v-model='user.number'></el-input>
        </el-form-item>
        <el-form-item label='年龄'>
          <el-input type='age' v-model='user.age'></el-input>
        </el-form-item>
        <el-form-item label='班级'>
          <el-input type='class' v-model='user.clas'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="edit = false">取 消</el-button>
        <el-button type="primary" @click="editCommit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import * as user from '@/data/user'
export default {
  data () {
    return {
      number: '',
      student:[],
      edit: false,
      delete: false,
      user: {
        number: '',
        name: '',
        age: '',
        clas: ''
      },
      newStu: {
        name: '',
        number: '',
        age: '',
        clas: ''
      },
      add: false
    }
  },
  created () {
    this.getuser()
    this.number = sessionStorage.getItem('number')
  },
  methods: {
    getuser () {
      const loading = this.$loading({
        lock: true,
        text: '正在加载',
        spinner: 'el-icon-loading',
        background: 'rgba(0,0,0,0.7)'
      });
      this.$axios({
        method: 'get',
        url: '/user',
      }).then(res =>{
        loading.close();
        this.student = res.data
      }).catch(error =>{
        loading.close();
      })
    },
    deleteStu (row) {
      this.$confirm('此操作将永久删除该人员，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row);
        const loading = this.$loading({
          lock: true,
          text: '正在操作',
          spinner: 'el-icon-loading',
          background: 'rgba(0,0,0,0.7)'
        });
        this.$axios({
          method: 'post',
          url: '/user/del',
          data: {
            number: row.number
          }
        }).then(res =>{
          loading.close();
          this.$message({message: '已删除',type: 'success'});
          this.getuser();
        }).catch(error =>{
          loading.close();
          this.$message.error('出现未知错误，请重试');
        })
      })
    },
    editStu (row) {
      this.edit = true
      this.user = row
    },
    editClose () {
      this.$confirm('确认取消编辑？')
          .then(_ => {
            this.edit = false
            this.$message('已取消 ～');

          })
          .catch(_ => {

          });
    },
    editCommit () {
      this.edit = false
      const loading = this.$loading({
        lock: true,
        text: '提交中',
        spinner: 'el-icon-loading',
        background: 'rgba(0,0,0,0.7)'
      });
      console.log(this.user);
      this.$axios({
        method: 'post',
        url: '/user/edit',
        data:{
          name: this.user.name,
          number: this.user.number,
          age: this.user.age,
          clas: this.user.clas
        }
      }).then(res =>{
        if (res.data === 'ok') {
          loading.close();
          this.$message({message: '已修改',type: 'success'});
        }
      }).catch(error =>{
        loading.close();
        this.$message.error('出现未知错误，请重试');
      })
    },
    addStu () {
      this.add = true
    },
    cancel () {
      this.add = false
    },
    logout () {
      this.$confirm('确定要退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>{
        sessionStorage.clear();
        this.$router.push('/');
        this.$message({
          type: 'success',
          message: '已退出~'
        });
      })
    },
    make_add () {
      console.log(this.newStu);
      const loading = this.$loading({
        lock: true,
        text: '正在添加',
        spinner: 'el-icon-loading',
        background: 'rgba(0,0,0,0.7)'
      });
      this.$axios({
        method: 'post',
        url: '/add',
        data: {
          name: this.newStu.name,
          number: this.newStu.number,
          age: this.newStu.age,
          clas: this.newStu.clas
        }
      }).then(res =>{
        if (res.data === 'had') {
          loading.close();
          this.$message({message: '这个人已经有了~',type: 'warning'});
        } else if (res.data === 'ok') {
          loading.close();
          this.add = false;
          this.$message({message: '添加成功~',type: 'success'});
          this.getuser();
        }
      }).catch(error =>{
        loading.close();
      })
    }
  }
}
</script>

<style lang="less">
#main{
  .title{
    width: 90%;
    font-size: 300%;
    font-family: '微软雅黑';
    font-weight: 300;
    text-align: center;
  }
  .nav{
    width: 15vw;
    position: absolute;
    top: 5vh;
    right: 3vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .table{
    width: 50%;
    margin: 10vh auto;
  }
  .add{
    position: fixed;
    right: 10%;
    bottom: 10%;
    button{
      width: 4vw;
      height: 4vw;
    }
  }
  .addStu{
    z-index: 1;
    position: fixed;
    width: 30vw;
    height: 60vh;
    top: 20vh;
    left: 35vw;
    background-color: white;
    box-shadow: 0px 0px 15px #888888;
    .el-form-item{
      width: 15vw;
      height: 7vh;
      margin-left: 7.5vw;
      margin-top: 5vh;
    }
    .clear{
      margin-left: 5vw;
    }
  }
}
</style>
