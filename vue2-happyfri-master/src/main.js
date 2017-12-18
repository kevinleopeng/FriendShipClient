import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import routes from './router/router'
import ajax from './config/ajax'
import axios from 'axios'
import echarts from 'echarts'
import './style/common'
import './config/rem'
import ExpenseManage from './components/expensemanage.vue'
import IncomeManage from './components/incomemanage.vue'
import HouseContractManage from './components/housecontractmanage.vue'
import RoomContractManage from './components/roomcontractmanage.vue'
import RenterCollectManage from './components/rentercollectmanage.vue'
import LandlordCollectManage from './components/landlordcollectmanage.vue'
import friendshipexpense from './components/friendshipexpense.vue'
import LandlordManage from './components/landlordmanage.vue'
import RenterManage from './components/rentermanage.vue'
import HomeManage from './components/homemanage.vue'
import RoomManage from './components/roommanage.vue'
import MessageManage from './components/messagemanage.vue'
import friendshipcollect from './components/friendshipcollect.vue'
import friendshipcontract from './components/friendshipcontract.vue'
import friendshiplandlordrenter from './components/friendshiplandlordrenter.vue'
import friendshiphomeroom from './components/friendshiphomeroom.vue'
import friendshipmessage from './components/friendshipmessage.vue'
import ExpenseIncomeStat from './components/expenseincomestat.vue'


Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(axios)
Vue.use(echarts)
Vue.prototype.$ajax = axios
Vue.prototype.$echarts = echarts

const router = new VueRouter({
	routes:[
    {
	    path:"/expense/manage",
      name:"expense.manage",
      components: {
	      expensemanage: ExpenseManage
	    }
    },
    {
      path:"/expense/income",
      name:"income.manage",
      components: {
        incomemanage:IncomeManage
      }
    },
    {
      path:"/expense/exinstat",
      name:"exin.stat",
      components: {
        incomemanage:ExpenseIncomeStat
      }
    },
    {
      path:"/collect/renter",
      name:"rentercollect.manage",
      components: {
        rentercollectmanage:RenterCollectManage
      }
    },
    {
      path:"/collect/landlord",
      name:"landlordcollect.manage",
      components: {
        landlordcollectmanage: LandlordCollectManage
      }
    },
    {
      path:"/contract/housemanage",
      name:"housecontract.manage",
      components: {
        housecontractmanage: HouseContractManage
      }
    },
    {
      path:"/contract/roommanage",
      name:"roomcontract.manage",
      components: {
        roomcontractmanage: RoomContractManage
      }
    },
    {
      path:"/people/landlord",
      name:"landlord.manage",
      components: {
        landlordmanage: LandlordManage
      }
    },
    {
      path:"/people/renter",
      name:"renter.manage",
      components: {
        rentermanage: RenterManage
      }
    },
    {
      path:"/house/home",
      name:"home.manage",
      components: {
        homemanage: HomeManage
      }
    },
    {
      path:"/house/room",
      name:"room.manage",
      components: {
        roommanage: RoomManage
      }
    },
    {
      path:"/message",
      name:"message.manage",
      components: {
        messagemanage: MessageManage
      }
    }
  ]
})

new Vue({
  components : {
    'friendship-expense': friendshipexpense,
    'friendship-collect': friendshipcollect,
    "friendship-contract": friendshipcontract,
    "friendship-landlordrenter": friendshiplandlordrenter,
    "friendship-homeroom": friendshiphomeroom,
    "friendship-message": friendshipmessage
  },
	router,
  template:"<div id='wrapper'>" +
   " <el-row :gutter='10'> " +
   "    <el-col :xs='8' :sm='6' :md='4' :lg='3'> " +
   "      <div class='grid-content bg-purple'> " +
   "        <friendship-expense></friendship-expense>" +
   "        <friendship-collect></friendship-collect>" +
   "        <friendship-contract></friendship-contract>" +
   "        <friendship-landlordrenter></friendship-landlordrenter>" +
   "        <friendship-homeroom></friendship-homeroom>" +
   "        <friendship-message></friendship-message>" +
   "    </el-col>" +
   "    <el-col :xs='4' :sm='6' :md='8' :lg='20'> " +
   "      <div class='grid-content bg-purple-light'> " +
   "        <router-view name='expensemanage'></router-view> " +
   "        <router-view name='incomemanage'></router-view> " +
   "        <router-view name='rentercollectmanage'></router-view> " +
   "        <router-view name='landlordcollectmanage'></router-view> " +
   "        <router-view name='housecontractmanage'></router-view> " +
   "        <router-view name='roomcontractmanage'></router-view> " +
   "        <router-view name='landlordmanage'></router-view> " +
   "        <router-view name='rentermanage'></router-view> " +
   "        <router-view name='homemanage'></router-view> " +
   "        <router-view name='roommanage'></router-view> " +
   "        <router-view name='messagemanage'></router-view> " +
   "     </div> " +
   "    </el-col> " +
   " </el-rom> " +
 " </div>"
}).$mount('#main')
