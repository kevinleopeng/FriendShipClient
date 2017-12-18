<template>
  <div >
    <el-row type="flex" class="row-bg row-first">
      <el-col :span="20">
        <el-button type="info" size='large' icon="plus" class="add-btn" @click="formVisible = true">添加</el-button>
        <friendship-addlandlord v-bind:dialog-form-visible="formVisible" v-on:closeForm="closeForm"></friendship-addlandlord>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <el-table
            :data="landlords"
            height="500"
            max-height="550px"
            :row-class-name="tableRowClassName">
            <el-table-column type="expand">
              <template scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="银行户名">
                    <span>{{ props.row.bankAccountName }}</span>
                  </el-form-item>
                  <el-form-item label="开户行">
                    <span>{{ props.row.bank }}</span>
                  </el-form-item>
                  <el-form-item label="银行账号">
                    <span>{{ props.row.bankAccount }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="房东姓名"
              width="220">
              <template scope="scope">
                <el-tag
                  type='primary'
                  close-transition>{{scope.row.name}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="住址"
              width="220">
              <template scope="scope">
                <el-tag
                  type='success'
                  close-transition>{{scope.row.address}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="phoneNum"
              label="联系方式">
              <template scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag>{{ scope.row.phoneNum }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="otherPhoneNum"
              label="其它联系方式">
              <template scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag>{{ scope.row.otherPhoneNum }}</el-tag>
                </div>
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
  import AddLandlord from '../components/addlandlord.vue'

  export default {
    name: 'LandlordManage',
    components : {
      'friendship-addlandlord': AddLandlord
    },
    data() {
      return {
        landlords: [],
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
        this.$ajax.get('http://localhost:8080/fsr.web/landlord/getLandlords?page='+this.page+'&pageSize='+this.pageSize).then(res => {
          //var _data = JSON.parse(res.data);
          console.log(res.data);
          _this.landlords = res.data.data;
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


