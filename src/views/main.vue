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
      <span>{{user.name}}</span>
      <el-form></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="edit = false">取 消</el-button>
        <el-button type="primary" @click="edit = false">确 定</el-button>
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
      this.$confirm('确认关闭？')
          .then(_ => {

            this.$message('修改成功 ～');
          })
          .catch(_ => {
            this.$message.error('啊哦，发生了错误 ～');
          });
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
