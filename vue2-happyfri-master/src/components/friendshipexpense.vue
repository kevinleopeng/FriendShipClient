<template>
  <div id="fri">
     <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-submenu index="1">
           <template slot="title"><i class="el-icon-message"></i>财务管理</template>
             <el-menu-item-group>
                <template slot="title">收入支出</template>
                <el-menu-item index="1-1"><router-link :to="{ name: 'income.manage' }">收入管理</router-link></el-menu-item>
                <el-menu-item index="1-2"><router-link :to="{ name: 'expense.manage' }">支出管理</router-link></el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="统计">
                <el-menu-item index="1-3"><router-link :to="{ name: 'exin.stat' }">收入支出统计</router-link></el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>

    <!-- <el-row class="tac">
      <el-col :span="8">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>财务管理</template>
            <el-menu-item-group>
              <template slot="title">收入支出</template>
              <el-menu-item index="1-1"><router-link :to="{ name: 'income.manage' }">收入管理</router-link></el-menu-item>
              <el-menu-item index="1-2"><router-link :to="{ name: 'expense.manage' }">支出管理</router-link></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="统计">
              <el-menu-item index="1-3">收入统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-col>
    </el-row>-->
  <!-- <ul>
    <li><router-link :to="{ name: 'income.manage' }">收入管理</router-link></li>
    <li><router-link :to="{ name: 'expense.manage' }">支出管理</router-link></li>
  </ul> -->

  </div>
</template>

<script>

  export default {
    name: 'friendship-expense',
    data() {
      return {

      }
    },
    props:[],
    methods: {

    },
    created(){
    }
  }
</script>


