// vue3框架的createApp方法，可以用来创建应用实例方法
import { createApp } from 'vue'
// 引入清除默认样式
import '@/style/reset.scss'
// 引入根组件APP
import App from '@/App.vue'
// 引入element-plus插件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入element-plus的中文设置
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入pinia仓库
import pinia from '@/store'
// 引入全局组件：顶部、底部都是全局组件
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
import Login from '@/components/login/index.vue'
// 引入vue-router核心插件安装
import router from '@/router'
// 利用creatApp方法创建应用实例，且将应用实例挂在到挂载点上
// createApp(App).mount('#app')
const app=createApp(App);
app.component('HospitalTop',HospitalTop)
app.component('HospitalBottom',HospitalBottom)
app.component('Login',Login)
// 安装vue-router插件
app.use(router)
// 安装element-plus插件
app.use(ElementPlus,{
    locale: zhCn,
})
// 安装pinia仓库
app.use(pinia)

app.mount('#app')