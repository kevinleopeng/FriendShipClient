<template>
  <div >
    <el-row type="flex" class="row-bg row-first">
      <el-col :span="20">
        <el-button type="info" size='large' icon="plus" class="add-btn" @click="formVisible = true">添加</el-button>
        <el-button type="warning" size='large' icon="date" class="add-btn" @click="refreshAndNotifyLandlords">刷新并通知房东</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <el-table
            :data="collectRents"
            height="500"
            max-height="550px"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="homeAddress"
              label="承租房屋"
              width="220">
              <template scope="scope">
                <el-tag
                  type='primary'
                  close-transition>{{scope.row.homeAddress}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="landlordName"
              label="房东"
              width="80">
              <template scope="scope">
                <el-tag
                  type='success'
                  close-transition>{{scope.row.landlordName}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="renterName"
              width="80"
              label="承租者">
              <template scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag>{{ scope.row.renterName }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="amount"
              width="80"
              label="租金">
            </el-table-column>
            <el-table-column
              prop="payDateStr"
              width="120"
              label="支付日期">
            </el-table-column>
            <el-table-column
              prop="payStatus"
              width="100"
              label="是否支付">
            </el-table-column>
            <el-table-column
              prop="messageStatus"
              width="100"
              label="是否通知">
            </el-table-column>
            <el-table-column
              prop="landlordPhoneNum"
              label="房东电话">
            </el-table-column>
            <el-table-column
              prop="renterPhoneNum"
              label="租客电话">
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button
                  size="small"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
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

  export default {
    name: 'LandlordCollectManage',
    data() {
      return {
        collectRents: [],
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
        this.$ajax.get('http://localhost:8080/fsr.web/collectrent/getCollectRentByType?page='+this.page+'&pageSize='+this.pageSize+'&type=2').then(res => {
          //var _data = JSON.parse(res.data);
          console.log(res.data);
          _this.collectRents = res.data.data;
          _this.page = res.data.currentPage;
          _this.totalPages = res.data.totalPage;
          _this.total = res.data.total;
        }, res => {

        });
      },
      refreshAndNotifyLandlords() {
        var _this = this;
        this.$ajax.get('http://localhost:8080/fsr.web/collectrent/refreshPayDayAndNotify').then(res => {
          if (res.data.code == '0001') {
            this.getData();
            _this.$message({
              message: res.data.message,
              type: 'success'
            });
          } else {
            _this.$message.error(res.data.message);
          }
        }, res => {

        });
      },
      handleEdit(index, row) {

      },
      handleDelete(index, row) {

      }
    },
    created(){
      this.getData();
    }
  }
</script>


