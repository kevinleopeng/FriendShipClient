<template>
  <el-dialog title="添加房东信息" :visible.sync="dialogFormVisible" :show-close="false">
    <el-form :model="form" :label-position="labelPosition">
      <el-form-item label="房东姓名" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.name" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="住址" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.address" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="年龄" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.age" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth" class="inline-block width-align">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option v-for="item in sexOps" :label="item.type" :value="item.val"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.phoneNum" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="其它联系方式" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.otherPhoneNum" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="银行户名" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.bankAccountName" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="开户行" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.bank" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="银行账号" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.bankAccount" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="房东附件" :label-width="formLabelWidth">
        <file-upload></file-upload>
        <!--<el-input v-model="form.certificate" auto-complete="off"></el-input>-->
      </el-form-item>
      <el-form-item class="float-align">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import FileUpload from "./fileupload";

  export default {
    name: 'AddLandlord',
    components: {
     "file-upload": FileUpload
    },
    data() {
      return {
        form: {
          name: '',
          address: '',
          sex: '',
          age: '',
          phoneNum: '',
          otherPhoneNum: '',
          bankAccount: '',
          bank: '',
          bankAccountName: '',
          landlordPics: ''
        },
        sexOps: [{"val":1, "type": "男"},{"val":2, "type": "女"}],
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
          url: 'http://localhost:8080/fsr.web/landlord/add',
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
