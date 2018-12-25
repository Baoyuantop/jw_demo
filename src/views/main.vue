<template lang="html">
  <div id="main">
    <div class="title">
      <p>学生信息管理系统</p>
    </div>
    <div class="table">
      <el-table :data="student">
        <el-table-column fixed prop='number' label='学号' width='150'></el-table-column>
        <el-table-column prop='name' label='姓名' width='150'></el-table-column>
        <el-table-column prop='age' label='年龄' width='150'></el-table-column>
        <el-table-column prop='class' label='班级' width='150'></el-table-column>
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
          <el-input type='username' v-model='newStu.username'></el-input>
        </el-form-item>
        <el-form-item label='学号'>
          <el-input type='number' v-model='newStu.number'></el-input>
        </el-form-item>
        <el-form-item label='年龄'>
          <el-input type='password' v-model='newStu.age'></el-input>
        </el-form-item>
        <el-form-item label='班级'>
          <el-input type='password' v-model='newStu.class'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type='primary' @click="">提交</el-button>
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
          <el-input type='class' v-model='user.class'></el-input>
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
import * as user from '@/data/user'
export default {
  data () {
    return {
      student:[],
      edit: false,
      delete: false,
      user: {
        number: '',
        name: '',
        age: '',
        class: ''
      },
      newStu: {
        name: '',
        number: '',
        age: '',
        class: ''
      },
      add: false
    }
  },
  created () {
    this.getuser()
  },
  methods: {
    async getuser () {
      user.getUser()
      .then(data => {
        this.student = data
      })
    },
    deleteStu (row) {
      this.$confirm('此操作将永久删除该人员，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row);
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
      console.log(this.user);
    },
    addStu () {
      this.add = true
    },
    cancel () {
      this.add = false
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
