<template>
    <div class="search">
        <el-autocomplete
        clearable
        placeholder="请输入要搜索的名称"
        @select="goDetail"
        :fetch-suggestions="fetchData"
        :trigger-on-focus="false"
        v-model="hosname"
        />
      <el-button type="primary" size="default" :icon="Search">搜索</el-button>
    </div>
</template>

<script setup lang="ts">
// 引入element-plus的提供图标
import {Search} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import {ref} from 'vue'
// 引入请求方法
import {reqHospitalSearch} from '@/api/home'
import {HospitalInfo} from '@/api/home/type'
// 创建路由器对象
let $router=useRouter()
// 收集搜索的关键字(医院的名字)
let hosname=ref<string>('')
// 顶部组件的回调
const fetchData=async (hosname:string,cb:any)=>{
    // 当用户输入完，次函数会执行一次，发请求获取需要展示的数据
    let result:HospitalInfo = await reqHospitalSearch(hosname)
    // 整理数据，变成组件需要的数组形式
    let showData= result.data.map(item=>{
        return{
            value:item.hosname,//展示医院名字
            hoscode:item.hoscode//存储医院编号
        }
    })
    // 给组件提供展示的数组
    cb(showData)
}
// 点击某一个推荐项跳转
const goDetail=(item:any)=>{
    // 点击推荐项进入医院的详情页，将来需要携带query参数（医院的编码）
    $router.push({path:'/hospital/register',query:{hoscode:item.hoscode}})
    
}
// 深度选择器:>>> /deep/ ::v-deep
</script>
<script lang="ts">
export default{
    name:'sousuo'
}
</script>
<style scoped lang="scss">
.search{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
    ::v-deep(.el-input__wrapper){
        width: 600px;
        margin-right: 10px;
    }
}
</style>