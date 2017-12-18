<template>
  <el-dialog title="添加租赁合同" :visible.sync="dialogFormVisible" :show-close="false">
    <el-form :model="form" :label-position="labelPosition">
      <el-form-item label="所属房屋" :label-width="formLabelWidth" class="inline-block">
        <el-select v-model="form.homeId"  @change='onhousechanged' placeholder="请选择所属房屋">
          <el-option v-for="item in homes" :label="item.address" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属单间" :label-width="formLabelWidth" class="inline-block">
        <el-select v-model="form.roomId" @change='onroomchanged' placeholder="请选择所属单间">
          <el-option v-for="item in rooms" :label="item.roomType" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房东姓名" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.landlordName" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="租客" :label-width="formLabelWidth" class="inline-block width-align">
        <el-select v-model="form.renterId"  @change='onrenterchanged'  placeholder="请选择租客">
          <el-option v-for="item in renters" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付方式" :label-width="formLabelWidth" class="inline-block width-align">
        <el-select v-model="form.payMode" @change='onPayModeChanged' placeholder="请选择支付方式">
          <el-option v-for="item in payModes" :label="item.type" :value="item.num"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="租金" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.rental" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="押金" :label-width="formLabelWidth" class="inline-block">
        <el-input v-model="form.deposit" auto-complete="off" ></el-input>
      </el-form-item>


      <el-form-item label="起租日时间" :label-width="formLabelWidth" class="inline-block width-align">
        <el-date-picker
          v-model="form.rentStartTime"
          type="datetime"
          @change="onrentStartTimeChanged"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结租日时间" :label-width="formLabelWidth" class="inline-block width-align">
        <el-date-picker
          v-model="form.rentEndTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="签订时间" :label-width="formLabelWidth" class="inline-block width-align">
        <el-date-picker
          v-model="form.signDate"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="合同附件" :label-width="formLabelWidth">
        <file-upload></file-upload>
        <!--<el-input v-model="form.certificate" auto-complete="off"></el-input>-->
      </el-form-item>
      <el-form-item class="float-align">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>

    <!--<div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>-->
  </el-dialog>
</template>

<script>
  import FileUpload from "./fileupload";

  export default {
    name: 'AddRoomContract',
    components: {
     "file-upload": FileUpload
    },
    data() {
      return {
        form: {
          type: 1,
          landlordId: 1,
          landlordName: '友谊间',
          renterId: '',
          renterName: '',
          homeId: '',
          homeAddress: '',
          roomId: '',
          roomAddress: '',
          deposit: '',
          rental: '',
          payMode: '',
          isIncrement: '',
          whichYear: '',
          incrementPercent: '',
          rentStartTime: '',
          rentEndTime: '',
          freeRentDays: '',
          signDate: '',
          rentContract: '',
          landlordPhoneNum: '18381019636',
          renterPhoneNum: '',
          nextPayDate: ''
        },
        moveDays: 0,
        renters: [],
        homes: [],
        rooms: [],
        payModes: [{"num":"1", "type": "按月支付"},{"num":"2", "type": "按季度支付"}, {"num": "3", "type": "半年支付"}, {"num": "4", "type": "按年支付"}],
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
          console.log("homes:" + res.data.data);
          _this.homes = res.data.data;
        }, res => {

        });
        this.$ajax.get('http://localhost:8080/fsr.web/renter/getRentersByType?type=2').then(res => {
          //var _data = JSON.parse(res.data);
          console.log("renters:" + res.data);
          _this.renters = res.data.data;
        }, res => {

        });
      },

      onSubmit() {
        var _this = this;
        this.$ajax({
          method: 'post',
          url: 'http://localhost:8080/fsr.web/contract/add',
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

        var _item = this.getItemByKeyAndVal("id", item, this.homes);
          var _this = this;

          this.form.homeId = _item.id;
          this.form.homeAddress = _item.address;

          this.$ajax.get('http://localhost:8080/fsr.web/room/getRoomsByHomeId?homeId='+this.form.homeId).then(res => {
            _this.rooms = res.data.data;
          }, res => {

          });
      },
      onroomchanged(item) {

        var _item = this.getItemByKeyAndVal("id", item, this.rooms);

        this.form.roomId = _item.id;
        this.form.roomAddress = _item.roomType;

      },
      onrenterchanged(item) {

        var _item = this.getItemByKeyAndVal("id", item, this.renters);

        this.form.renterName = _item.name;
        this.form.renterPhoneNum = _item.phoneNum;
       },
      onrentStartTimeChanged(time) {
        if (this.moveDays != 0) {
          var dateStr = time.substring(0, time.lastIndexOf(" ")),
            dateArr = dateStr.split("-"),
            mth = parseInt(dateArr[1], 10) - 1,
            date = new Date();


          date.setFullYear(dateArr[0], mth, dateArr[2]);
          date.setDate(date.getDate() + this.moveDays);
          var m = date.getMonth() + 1 + "";
          if (m.length == 1) {
            m = "0" + m;
          }
          this.form.nextPayDate = date.getFullYear() + "-" + m + "-" + date.getDate() + "T" + "00:00:00.000Z";
          console.log("nextPayDate" + this.form.nextPayDate);
        }
      },
      onPayModeChanged(payMode) {
        if (1 == payMode) {
          this.moveDays = 30;
        } else if (2 == payMode) {
          this.moveDays = 91;
        } else if (3 == payMode) {
          this.moveDays = 182;
        } else if (4 == payMode) {
          this.moveDays = 365;
        }
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
