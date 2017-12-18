<template>
  <div >
    <el-row type="flex" class="row-bg row-first">
      <el-col :span="20">
        <el-button type="info" size='large' icon="plus" class="add-btn" @click="formVisible = true">添加</el-button>
        <friendship-addroomcontract v-bind:dialog-form-visible="formVisible" v-on:closeForm="closeForm"></friendship-addroomcontract>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <el-table
            :data="contracts"
            height="500"
            max-height="550px"
            :row-class-name="tableRowClassName">
            <el-table-column type="expand">
              <template scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="押金">
                    <span>{{ props.row.deposit }}</span>
                  </el-form-item>
                  <el-form-item label="签订日期">
                    <span>{{ props.row.contractSignDate }}</span>
                  </el-form-item>
                  <el-form-item label="房东电话">
                    <span>{{ props.row.landlordPhoneNum }}</span>
                  </el-form-item>
                  <el-form-item label="租客电话">
                    <span>{{ props.row.renterPhoneNum }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="homeAddress"
              label="所属房屋"
              width="220">
              <template scope="scope">
                <el-tag
                  type='primary'
                  close-transition>{{scope.row.homeAddress}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="roomAddress"
              label="单间"
              width="90">
              <template scope="scope">
                <el-tag
                  type='success'
                  close-transition>{{scope.row.roomAddress}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="renterName"
              width="80"
              label="租客">
              <template scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag>{{ scope.row.renterName }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="rental"
              width="80"
              label="租金">
            </el-table-column>
            <el-table-column
              prop="deposit"
              width="80"
              label="押金">
            </el-table-column>
            <el-table-column
              prop="contractPayMode"
              label="支付方式">
              <template scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag>{{ scope.row.contractPayMode }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="contractRentStartTime"
              label="起租日">
            </el-table-column>
            <el-table-column
              prop="contractRentEndTime"
              label="结束日">
            </el-table-column>
            <el-table-column
              prop="contractNextPayDate"
              label="下期支付">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="end">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[20, 50, 100, 200]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>


<script>

  import AddRoomContract from '../components/addroomcontract.vue'

  export default {
    name: 'RomeContractManage',
    components : {
      'friendship-addroomcontract': AddRoomContract
    },
    data() {
      return {
        contracts: [],
        page: 1,
        totalPages: 0,
        total: 0,
        pageSize: 20,
        formVisible: false
      }
    },
    props:[],
    methods: {
      tableRowClassName(row, index) {
        if (index === 1) {
          return 'info-row';
        } else if (index === 3) {
          return 'positive-row';
        }
        return '';
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getData();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.getData();
      },
      getData() {
        var _this = this;
        this.$ajax.get('http://localhost:8080/fsr.web/contract/getRoomContract?page='+this.page+'&pageSize='+this.pageSize).then(res => {
          //var _data = JSON.parse(res.data);
          console.log(res.data);
          _this.contracts = res.data.data;
          _this.page = res.data.currentPage;
          _this.totalPages = res.data.totalPage;
          _this.total = res.data.total;
        }, res => {

        });
      },
      closeForm() {
        this.formVisible = false;
        this.getData();
      }
    },
    created(){
      this.getData();
    }
  }
</script>

<style>
  .el-table .info-row {
    background: #c9e5f5;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }


  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .row-first {
    height: 60px;
  }

  .add-btn {
    position: relative;
    top: -65px;
  }
</style>
