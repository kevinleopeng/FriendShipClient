<template>
  <el-dialog title="添加单间信息" :visible.sync="dialogFormVisible" :show-close="false">
    <el-form :model="form" :label-position="labelPosition">
      <el-form-item label="所属房屋" :label-width="formLabelWidth" class="inline-block">
        <el-select v-model="form.homeId"  @change='onhousechanged' placeholder="请选择房东姓名">
          <el-option v-for="item in homes" :label="item.address" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单间类型" :label-width="formLabelWidth" class="inline-block">
        <el-select v-model="form.roomClass" @change='onroomchanged' placeholder="请选择">
          <el-option v-for="item in roomClassOps" :label="item.type" :value="item.val"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否空置" :label-width="formLabelWidth" class="inline-block">
        <el-select v-model="form.isEmpty" placeholder="请选择">
          <el-option v-for="item in emptyOps" :label="item.type" :value="item.val"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="室内面积" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.actualArea" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="是否有阳台" :label-width="formLabelWidth" class="inline-block width-align">
        <el-select v-model="form.isBalcony" placeholder="请选择">
          <el-option v-for="item in livingBalconyOps" :label="item.type" :value="item.val"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否有卫生间" :label-width="formLabelWidth" class="inline-block width-align">
        <el-select v-model="form.isBathRoom" placeholder="请选择">
          <el-option v-for="item in livingBalconyOps" :label="item.type" :value="item.val"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单间附件" :label-width="formLabelWidth">
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
          homeId: '',
          roomAddress: '',
          isEmpty: '',
          actualArea: '',
          roomClass: '',
          isBalcony: '',
          isBathRoom: '',
          roomPics: ''
        },
        rooms: [],
        livingBalconyOps: [{"val":1, "type": "有"},{"val":0, "type": "无"}],
        emptyOps: [{"val":1, "type": "是"},{"val":0, "type": "否"}],
        roomClassOps: [{"val":1, "type": "主卧"},{"val":2, "type": "隔间"},{"val":3, "type": "次卧"},{"val":4, "type": "小次卧"}],
        homeAddress: '',
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
        this.$ajax.get('http://localhost:8080/fsr.web/home').then(res => {
          //var _data = JSON.parse(res.data);
          console.log("homes:" + res.data);
          _this.homes = res.data.data;
        }, res => {

        });
      },

      onSubmit() {
        var _this = this;
        this.$ajax({
          method: 'post',
          url: 'http://localhost:8080/fsr.web/room/add',
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
      onhousechanged(item) {
        console.log("o item" + item);
        var _item = this.getItemByKeyAndVal("id", item, this.homes);

        this.homeAddress = _item.address;
      },
      onroomchanged(item) {
        var _item = this.getItemByKeyAndVal("val", item, this.roomClassOps);

       this.form.roomAddress = this.homeAddress + _item.type;
        console.log("roomAddress:" + this.form.roomAddress);
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
