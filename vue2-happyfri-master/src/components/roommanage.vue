<template>
  <div >
    <el-row type="flex" class="row-bg row-first">
      <el-col :span="20">
        <el-button type="info" size='large' icon="plus" class="add-btn" @click="formVisible = true">添加</el-button>
        <friendship-addroom v-bind:dialog-form-visible="formVisible" v-on:closeForm="closeForm"></friendship-addroom>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="start">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <el-table
            :data="rooms"
            height="500"
            max-height="550px"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="roomAddress"
              label="单间"
              width="220">
              <template scope="scope">
                <el-tag
                  type='primary'
                  close-transition>{{scope.row.roomAddress}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="emptyStatus"
              label="是否空置"
              width="100">
              <template scope="scope">
                <el-tag
                  type='primary'
                  close-transition>{{scope.row.emptyStatus}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="emptyDays"
              label="空置天数"
              width="180">
              <template scope="scope">
                <el-tag
                  type='success'
                  close-transition>{{scope.row.emptyDays}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="actualArea"
              label="室内面积">
              <template scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag>{{ scope.row.actualArea }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="hasBalcony"
              label="生活阳台">
              <template scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag>{{ scope.row.hasBalcony }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="hasBathRoom"
              label="卫生间">
              <template scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag>{{ scope.row.hasBathRoom }}</el-tag>
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
  import AddRoom from '../components/addroom.vue'

  export default {
    name: 'HomeManage',
    components : {
      'friendship-addroom': AddRoom
    },
    data() {
      return {
        rooms: [],
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
        this.$ajax.get('http://localhost:8080/fsr.web/room/getRoomsByPage?page='+this.page+'&pageSize='+this.pageSize).then(res => {
          //var _data = JSON.parse(res.data);
          console.log(res.data);
          _this.rooms = res.data.data;
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


