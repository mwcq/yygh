<template>
    <div>
       <h1 class="top">{{ hospitalStore.hospitalInfo.hospital?.hosname }}停诊通知</h1> 
    </div>
    <el-empty description="暂无信息" />
</template>

<script setup lang="ts">
import useDetailStore from "@/store/modules/hospitalDetail";
let hospitalStore = useDetailStore()
</script>

<style scoped lang="scss">
.top {
    color: #7f7f7f;
        text-align: center;
        font-size: 30px;
    }
</style>