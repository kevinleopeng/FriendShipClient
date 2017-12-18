<template>
  <el-dialog title="添加房屋信息" :visible.sync="dialogFormVisible" :show-close="false">
    <el-form :model="form" :label-position="labelPosition">
      <el-form-item label="房屋所在区域" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.area" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="房屋所在小区" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.village" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="房屋详细地址" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.address" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="房东姓名" :label-width="formLabelWidth" class="inline-block">
        <el-select v-model="form.landlordId"  @change='onlandlordchanged' placeholder="请选择房东姓名">
          <el-option v-for="item in landlords" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房屋户型结构" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.structure" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="房屋产权面积" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.propertyArea" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="房屋室内面积" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.actualArea" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="当前房屋状态" :label-width="formLabelWidth" class="inline-block width-align">
        <el-select v-model="form.status" placeholder="请选择">
          <el-option v-for="item in statusOps" :label="item.type" :value="item.val"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否有客厅阳台" :label-width="formLabelWidth" class="inline-block width-align">
        <el-select v-model="form.livingRoomBalcony" placeholder="请选择">
          <el-option v-for="item in livingBalconyOps" :label="item.type" :value="item.val"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否有生活阳台" :label-width="formLabelWidth" class="inline-block width-align">
        <el-select v-model="form.lifeBalcony" placeholder="请选择">
          <el-option v-for="item in livingBalconyOps" :label="item.type" :value="item.val"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房屋附件" :label-width="formLabelWidth">
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
    name: 'AddHome',
    components: {
     "file-upload": FileUpload
    },
    data() {
      return {
        form: {
          landlordId: '',
          landlordName: '',
          landlordPhoneNum: '',
          area: '',
          village: '',
          address: '',
          status: '',
          structure: '',
          propertyArea: '',
          actualArea: '',
          livingRoomBalcony: '',
          lifeBalcony: '',
          homePics: ''
        },
        landlords: [],
        livingBalconyOps: [{"val":1, "type": "有"},{"val":0, "type": "无"}],
        statusOps: [{"val":1, "type": "装修中"},{"val":2, "type": "通风中"},{"val":3, "type": "租赁中"},{"val":4, "type": "已租完"}],
        formLabelWidth: '120px',
        labelPosition: 'right'
      }
    },
    computed: {
    },
    props:['dialogFormVisible'],
    methods: {
      getData() {
        var _this = this;
        this.$ajax.get('http://localhost:8080/fsr.web/landlord/getAllLandlords').then(res => {
          //var _data = JSON.parse(res.data);
          console.log("landlords:" + res.data);
          _this.landlords = res.data.data;
        }, res => {

        });
      },

      onSubmit() {
        var _this = this;
        this.$ajax({
          method: 'post',
          url: 'http://localhost:8080/fsr.web/home/add',
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
      },
      onlandlordchanged(item) {
          console.log("o item" + item);
        var _item = this.getItemByKeyAndVal("id", item, this.landlords);

        console.log("item:" + _item );
        this.form.landlordName = _item.name;
        this.form.landlordPhoneNum = _item.phoneNum;

      },
      getItemByKeyAndVal(key, val, items) {
        var item = null;
        for (var i = 0;i < items.length; i++) {
          if (val == items[i][key]) {
            item = items[i];
            break;
          }
        }

        return item;
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
