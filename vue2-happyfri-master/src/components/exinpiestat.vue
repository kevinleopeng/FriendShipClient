<template>
  <div id="pie" class="pie">
      <ul>
        <li id="incomePie" class="li-pie"></li>
        <li id="expensePie" class="li-pie"></li>
      </ul>
  </div>
</template>

<script>

  export default {
    name: 'ExInPieStat',
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
        console.log(document.getElementById("incomePie"));
        var incomePieCharts = this.$echarts.init(document.getElementById("incomePie"));
        console.log(incomePieCharts);
        incomePieCharts.setOption({
          title : {
            text: '友谊间收入',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['租金','押金','物管']
          },
          series : [
            {
              name: '收入',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:5000, name:'租金'},
                {value:3000, name:'押金'},
                {value:1000, name:'物管'}
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

        var expensePieCharts = this.$echarts.init(document.getElementById("expensePie"));
        console.log(expensePieCharts);
        expensePieCharts.setOption({
          title : {
            text: '友谊间支出',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['基础装修','家具','家电','房屋租赁']
          },
          series : [
            {
              name: '收入',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:20000, name:'基础装修'},
                {value:10000, name:'家具'},
                {value:3000, name:'家电'},
                {value:6000, name:'房屋租赁'}
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
  .pie {
    width:100%;
    height:300px;
    margin-left: -125px;
    margin-top: 50px
  }
  .li-pie {
    width:50%;
    height:300px;
    float:left;
  }
</style>
