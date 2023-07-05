<template>
    <div class="top">
        <div class="content">
            <!-- 左侧区域 -->
            <div class="left" @click="goDetail">
                <img src="../../assets/images/logo.png" alt="">
                <p>预约挂号统一平台</p>
            </div>
            <!-- 右侧区域 -->
            <div class="right">
                <p class="help">帮助中心</p>
                <p class="login" @click="login()" v-if="!userstore.userInfo.name">登录/注册</p>
                <el-dropdown v-else>
    <span class="el-dropdown-link">
      {{userstore.userInfo.name}}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>实名认证</el-dropdown-item>
        <el-dropdown-item>挂号订单</el-dropdown-item>
        <el-dropdown-item>就诊人管理</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
        
        
      </el-dropdown-menu>
    </template>
  </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import userStore from "@/store/modules/user"
let $router=useRouter()
const goDetail=()=>{
    $router.push({path:'/'})
}
// 获取user仓库数据

let userstore=userStore()
const login=()=>{
    userstore.visiable=!userstore.visiable
}
</script>

<style scoped lang="scss">
.top{
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 70px;
    background: #fff;
    display: flex;
    justify-content: center;
    .content{
        width: 1200px;
        height: 70px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        .left{
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 50px;
                height: 50px;
                margin-right: 10px;
                
            }
            p{
                font-size: 20px;
                color: #55a6fe;
            }
        }
        .right{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #bbb;
            .help{
                margin-right: 10px;
            }
        }
    }
}
</style>