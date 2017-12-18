<template>
  <el-dialog title="添加租客信息" :visible.sync="dialogFormVisible" :show-close="false">
    <el-form :model="form" :label-position="labelPosition">
      <el-form-item label="租客姓名" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.name" auto-complete="off" ></el-input>
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
      <el-form-item label="工作地点" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.workAddress" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="工作公司" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.workCompany" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="公司联系方式" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.companyNum" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="所在行业" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.industry" auto-complete="off" ></el-input>
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
    name: 'AddRenter',
    components: {
     "file-upload": FileUpload
    },
    data() {
      return {
        form: {
          type: 2,
          name: '',
          sex: '',
          age: '',
          phoneNum: '',
          otherPhoneNum: '',
          workAddress: '',
          workCompany: '',
          companyNum: '',
          industry: '',
          renterPics: ''
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
          url: 'http://localhost:8080/fsr.web/renter/add',
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
