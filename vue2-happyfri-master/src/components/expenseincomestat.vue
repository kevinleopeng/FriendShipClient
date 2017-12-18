<template>
  <div >
    <el-row type="flex" class="row-bg row-first row-first-modified">
      <el-col :span="20">
        <div class="block datepicker">
          <el-date-picker
            v-model="datePickVal"
            type="daterange"
            align="right"
            placeholder="选择日期范围"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <el-select  v-model='homeIds' class="select-modified"  placeholder="请选择所属房屋">
          <el-option v-for="item in homes" :label="item.address" :value="item.id"></el-option>
        </el-select>
        <el-button type="primary" icon="search" class="button-modified" @click="notify">统计</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="20">
        <exinlinestat></exinlinestat>
        <exintotalpiestat></exintotalpiestat>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="end">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <exinpiestat></exinpiestat>
        </div>
      </el-col>
    </el-row>
    <!--<el-row type="flex" class="row-bg" justify="end">
      <el-col :span="20">
        <div class="grid-content bg-purple">

        </div>
      </el-col>
    </el-row>-->
  </div>

</template>


<script>
import ExInLineStat from '../components/exinlinestat.vue'
import ExInPieStat from '../components/exinpiestat.vue'
import ExInTotalPieStat from '../components/exintotalpiestat.vue'

  export default {
    name: 'ExpenseIncomeStat',
    components : {
      "exinlinestat": ExInLineStat,
      "exinpiestat": ExInPieStat,
      "exintotalpiestat": ExInTotalPieStat
    },
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        datePickVal: '',
        homes: [],
        homeIds: []
      }
    },
    props:[],
    methods: {
      getData() {
        var _this = this;
        this.$ajax.get('http://localhost:8080/fsr.web/home').then(res => {
          console.log(res.data);
          _this.homes = res.data.data;

        }, res => {

        });
      },
      notify() {
        this.$emit("exinq-cond", this.datePickVal);
      }
    },

    created() {
        this.getData();
    }
  }
</script>

<style>
  .row-first-modified {
    height: 120px;
  }
  .datepicker {
    display: inline-block;
    position: relative;
    top: -40px;
  }
  .select-modified {
    top: -40px;
    width: 300px;
  }
  .button-modified {
    position: relative;
    top: -40px;
  }
</style>
