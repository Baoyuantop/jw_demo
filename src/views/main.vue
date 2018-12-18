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
      }
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
}
</style>
