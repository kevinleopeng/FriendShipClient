<template>
  <div id="linestat" class="line">

  </div>
</template>

<script>
import ExpenseIncomeStat from '../components/expenseincomestat.vue'

  export default {
    name: 'ExInLineStat',
    components: {

    },
    data() {
      return {
        days: [],
        expenseData: [],
        incomeData: [],
        condition: {}
      }
    },
    computed: {

    },
    props:[],
    methods: {
      init(){
        var _this = this;
        this.$ajax.get('http://localhost:8080/fsr.web/expense').then(res => {

          console.log(res.data);
          _this.categories = res.data.data;
          _this.firstClassCategories = _this.categories["0"];
        }, res => {

        });
        var lineCharts = this.$echarts.init(document.getElementById("linestat"));
        console.log("lineCharts");
        lineCharts.setOption({
          title: {
            text: '收入支出曲线图'
          },
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data:['收入','支出']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : ['周一','周二','周三','周四','周五','周六','周日']
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'收入',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name:'支出',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[220, 182, 191, 234, 290, 330, 310]
            }
          ]
        });
      }
    },
    created(){

    },
    mounted(){
      console.log("before init");
      ExpenseIncomeStat.$on("exinq-cond", function (condition) {
          this.condition = condition;
          console.log(this.condition);
       }.bind(this));
      this.init();
    }
  }
</script>

<style>
  .line {
    width: 60%;
    height:300px;
    float: left;
    margin-right: 20px;
  }
</style>
