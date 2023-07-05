<template>
    <div class="region">
        <div class="content">
            <div class="left">
                地区：
            </div>
            <ul>
                <li :class="{active:activeFlag===''}" @click="changeRegion('')">全部</li>
                <li v-for="item in regionArr" :key="item.value" :class="{active:activeFlag===item.value}" @click="changeRegion(item.value)" >{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import {regHospitalLevelAndRegion} from '@/api/home'
import { onMounted,ref } from 'vue'
import {HospitalLevelAndRegionResponseData,HospitalLavelAndRegionArr} from "@/api/home/type"
let activeFlag=ref<string>('')
// 定义一个数组存储医院地区数据
let regionArr=ref<HospitalLavelAndRegionArr>([]);
// 地区组件挂载完毕获取地区数据
onMounted(()=>{
    getRegion();
})
const getRegion= async()=>{
    let result:HospitalLevelAndRegionResponseData= await regHospitalLevelAndRegion('Beijin')
    if(result.code===200){
        regionArr.value=result.data;

    }
}
const changeRegion=(region:string)=>{
    activeFlag.value=region
    $emit('getRegion',region)
}
let $emit=defineEmits(['getRegion'])
</script>

<style scoped lang="scss">
.region{
    color: #7f7f7f;
    margin-top: 10px;
    .content{
        display: flex;
        .left{
            margin-right: 10px;
            width: 52px;
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                margin-right: 10px;
                margin-bottom: 10px;
                &.active{
                    color: #55a6fe;
                }
                
            }
            li:hover{
                    color: #55a6fe;
                    cursor: pointer;
                }
        }
    }
}
</style>