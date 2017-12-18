<template>
  <el-dialog title="添加消息" :visible.sync="dialogFormVisible" :show-close="false">
    <el-form :model="form" :label-position="labelPosition">
      <el-form-item label="消息" :label-width="formLabelWidth" >
        <el-input type="textarea" v-model="form.message" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="通知" :label-width="formLabelWidth" class="width-align">
        <el-select v-model="form.peopleType" placeholder="请选择通知人群">
          <el-option v-for="item in peopleTypes" :label="item.type" :value="item.val"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="float-align">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  export default {
    name: 'AddMessage',
    components: {
    },
    data() {
      return {
        form: {
          message: '',
          peopleType: '',
        },
        peopleTypes: [{"val":1, "type": "租客"}, {"val":2, "type": "房东"},{"val":3, "type": "全部"}],
        formLabelWidth: '120px',
        labelPosition: 'right'
      }
    },
    computed: {
    },
    props:['dialogFormVisible'],
    methods: {
      getData() {
      },

      onSubmit() {
        var _this = this;
        this.$ajax({
          method: 'post',
          url: 'http://localhost:8080/fsr.web/message/add',
          data: this.form
        }).then(res => {
          console.log(res.data);
          if (res.data.code == '0001') {
            _this.$message({
              message: res.data.message,
              type: 'success'
            });
           // _this.dialogFormVisible = false;
            _this.close();
          } else {
            _this.$message.error(res.data.message);
          }
        }, res => {

        });
      },
      close() {
        this.$emit('closeForm');
      }
    },
    created(){
      this.getData();
    }
  }
</script>

<style>
  .inline-block {
    display: inline-block;
  }
  .width-align {
    width: 296px;
  }
  .float-align {
    float: right;
  }
  .el-dialog__header {
    height: 50px;
  }
  .el-dialog__title {
    position: relative;
    top: -80px;
  }
</style>
