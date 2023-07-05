<template>
    <div class="level">
        <h1>医院</h1>
        <div class="content">
            <div class="left">
                等级：
            </div>
            <ul class="hospital">
                <li :class="{active:activeFlag==''}" @click="changeLevel('')">全部</li>
                <li v-for="item in levelArr" :key="item.value" :class="{active:activeFlag===item.value}" @click="changeLevel(item.value)">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import {regHospitalLevelAndRegion} from '@/api/home'
import { onMounted,ref } from 'vue'
import {HospitalLevelAndRegionResponseData,HospitalLavelAndRegionArr} from "@/api/home/type"
// 定义一个数组存储医院等级的数据
let levelArr=ref<HospitalLavelAndRegionArr>([])
// 控制医院等级高亮的响应式数据
let activeFlag = ref<string>('')
// 组件挂载完毕
onMounted(()=>{
    getLevel()
})
// 获取医院等级的数据
const getLevel=async ()=> {
    let result:HospitalLevelAndRegionResponseData=await regHospitalLevelAndRegion('HosType')
    // 存储医院等级的数据
    if(result.code===200){
        levelArr.value=result.data;
    }
    
}
// 点击等级的按钮回调
const changeLevel=(level:string)=>{
   activeFlag.value=level
    // 触发自定义事件，将医院等级的参数传递给父组件
    $emit('getLevel',level)
}
let $emit = defineEmits(['getLevel'])
</script>

<script lang="ts">
export default{
    name:'level'
}
</script>

<style scoped lang="scss">
.level{
    color: #7f7f7f;
    h1{
        
        font-weight: 900;
        margin: 10px 0px;
    }
    .content{
        display: flex;
        .left{
            margin-right: 10px;
        }
        .hospital{
            display: flex;
            li{
                margin-right: 10px;
                &.active{
                    color: #55a6fe;
                }
            }
            li:hover{
                color: #55a6fe;
                cursor:pointer;
            }
        }
    }
}
</style>