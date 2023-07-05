<template>
    <div class="hospital">
        <!-- 左侧导航区 -->
        <div class="menu">
            <div class="top">
                <el-icon><HomeFilled/></el-icon>
                <span> / 医院信息</span>
            </div>
            <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
      >
        <el-menu-item index="/hospital/register" @click="changeActive('/hospital/register')">
          <el-icon><icon-menu /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/hospital/detail" @click="changeActive('/hospital/detail')">
          <el-icon><document /></el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/hospital/notice" @click="changeActive('/hospital/notice')">
          <el-icon><ChatLineRound /></el-icon>
          <span>预约通知</span>
        </el-menu-item>
        <el-menu-item index="/hospital/close" @click="changeActive('/hospital/close')">
          <el-icon><Warning /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item index="/hospital/search" @click="changeActive('/hospital/search')">
          <el-icon><Search /></el-icon>
          <span>查询/取消</span>
        </el-menu-item>
      </el-menu>
        </div>
        <!-- 右侧内容展示区:路由组件展示的位置 -->
        <div class="content">
           <!-- 子组件展示结构的地方 -->
           <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
// 引入仓库
import useDetailStore from '@/store/modules/hospitalDetail'
// 获取仓库对象
let detailStore = useDetailStore()
// 引入左侧菜单的图标
import {
  Document,
  Menu as IconMenu,
  Location,
  Search,
  Warning,
  ChatLineRound,
  HomeFilled,
} from '@element-plus/icons-vue'

import { useRouter,useRoute } from 'vue-router';
let $router=useRouter()
// 获取当前路由信息
let $route= useRoute()
// 跳转事件回调
let changeActive=(path:string)=>{
    $router.push({path,query:{hoscode:$route.query.hoscode}})
}
// 组件挂载完毕，通知pinia仓库发请求获取医院详情数据，存储在仓库当中
onMounted(()=>{
  // 获取医院详情的数据
  detailStore.getHospital($route.query.hoscode as string);
  // 获取医院科室的数据
  detailStore.getDepartment($route.query.hoscode as string)
})
</script>

<style scoped lang="scss">
.hospital{
    display: flex;
    .menu{
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 2;
        .top{
            color: #7f7f7f;
            margin-bottom: 20px;
        }
    }
    .content{
        flex: 8;
    }
}
</style>