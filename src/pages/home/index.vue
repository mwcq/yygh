<template>
    <div>
        <!-- 首页轮播图 -->
        <Carousel />
        <!-- 搜索区域 -->
        <Search />
        <!-- 底部展示医院的结构 -->
        <el-row gutter="20">
            <el-col :span="20">
                <!-- 等级子组件 -->
                <Level @getLevel="getLevel" />
                <!-- 地区 -->
                <Region @getRegion="getRegion" />
                <!-- 展示医院结构 -->
                <div class="hospital" v-if="hasHospitalArr.length>0">
                    <Card class="item" v-for="(item, index) in hasHospitalArr" :key="index" :hospitalInfo="item" />
                </div>
                <el-empty v-else description="暂无信息" />
                <!-- 分页器 -->
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                    :background="background" layout="prev, pager, next, jumper,->, sizes,total" :total="total"
                    @current-change="currentChange" @size-change="sizeChange" />
            </el-col>
            <el-col :span="4">
                <Tip/>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { onMounted, ref } from 'vue'
import { reqHospital } from '@/api/home'
// 引入首页轮播图组件
import Carousel from './carousel/index.vue'
// 引入首页搜索区域的组件
import Search from './search/index.vue'
// 引入显示医院的结构
import Level from './level/index.vue'
// 引入显示地区的结构
import Region from './region/index.vue'
// 引入展示医院的结构
import Card from './card/index.vue'
// 引入右侧结构
import Tip from './tip/index.vue'
// 引入定义好的类型
import type { Content, HospitalResponseData } from '@/api/home/type'
// 分页器页码
let pageNo = ref<number>(1);
// 一页展示几条数据
let pageSize = ref<number>(10);
// 存储已有的医院的数据
let hasHospitalArr = ref<Content>([]);
// 存储以有医院的总个数
let total = ref<number>(0);
// 存储医院的等级响应数据
let hostype = ref<string>('');
// 存储选择的地区
let districtCode = ref<string>('')
// 组件挂在完毕，发一次请求
onMounted(() => {
    getHospitalInfo()
})
// 获取已有的医院的数据
const getHospitalInfo = async () => {
    // 获取医院的数据：默认获取第一页，一页十个数据
    let result: HospitalResponseData = await reqHospital(pageNo.value, pageSize.value, hostype.value, districtCode.value)
    if (result.code === 200) {
        // 存储以有的医院的数据
        hasHospitalArr.value = result.data.content;
        // 存储医院的总个数
        total.value = result.data.totalElements;
    }
}
// 分页器页码发生变化时的回调
const currentChange = () => {
    getHospitalInfo()

}
// 分页器下拉菜单发生变化的时候会触发
const sizeChange = () => {
    getHospitalInfo()
}
// 子组件自定义事件，获取子组件给父组件传递过来的参数
const getLevel = (level: string) => {
    // 收集等级参数
    hostype.value = level
    // 再次发请求
    getHospitalInfo();
}
// 子组件自定义事件，获取子组件给父组件传递的参数
const getRegion=(region:string)=>{
    districtCode.value=region
    getHospitalInfo()
}
</script>

<style scoped lang="scss">
.hospital {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
        width: 48%;
        margin: 5px;
    }
}
</style>