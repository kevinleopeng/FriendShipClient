<template>
  <div id="totalpie" class="totalpie">

  </div>
</template>

<script>

  export default {
    name: 'ExInTotalPieStat',
    components: {

    },
    data() {
      return {

      }
    },
    computed: {

    },
    props:[],
    methods: {
      init(){
        console.log("coming init");
        console.log(document.getElementById("totalpie"));
        var totalPieCharts = this.$echarts.init(document.getElementById("totalpie"));
        console.log(totalPieCharts);
        totalPieCharts.setOption({
          title : {
            text: '友谊间总收入支出',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['收入','支出']
          },
          series : [
            {
              name: '总收入支出',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:30000, name:'收入'},
                {value:60000, name:'支出'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });


      }
    },
    created(){

    },
    mounted(){
      console.log("before init");
      this.init();
    }
  }
</script>

<style>
  .totalpie {
    width: 35%;
    height:300px;
    float: left;
  }

</style>
