<template>
    <div>
        <el-card class="box-card" shadow="hover" @click="goDetail">
            <div class="content">
                <div class="left">
                    <div class="hospital_name">
                        
                        {{ hospitalInfo.hosname }}
                    </div>
                    <div class="tip">
                        <div class="level">
                            <svg t="1688320071029" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2314" width="16" height="16"><path d="M904.85191111 321.98200889H603.53194667c14.30869333-50.35349333 21.55406222-95.10001778 21.55406222-134.49443556 0-89.38382222-81.70154667-174.98112-159.90784-163.62154666-68.95843555 10.01244445-101.87207111 68.15744-101.87207111 142.83207111v67.46567111c0 86.54392889-66.22776889 160.34474667-150.44152889 168.46392889l-133.94830222-0.21845333A76.64071111 76.64071111 0 0 0 2.27555555 479.04995555V921.6c0 42.34353778 34.29717333 76.64071111 76.64071112 76.64071111h742.04956444a116.87253333 116.87253333 0 0 0 114.83363556-95.10001778l83.88608-442.55004444A116.87253333 116.87253333 0 0 0 904.85191111 321.98200889zM75.09333333 921.6V479.04995555a3.82293333 3.82293333 0 0 1 3.82293334-3.82293333H166.11555555v450.19591111h-87.19928888A3.82293333 3.82293333 0 0 1 75.09333333 921.6z m873.04874667-474.55345778L864.256 889.59658667a44.05475555 44.05475555 0 0 1-43.29016889 35.82634666H238.93333333V472.02304a242.70165333 242.70165333 0 0 0 197.19054222-237.89568v-67.42926222c0-42.74403555 13.72615111-67.02876445 39.50364445-70.74247111 30.76551111-4.47829333 76.64071111 43.61784889 76.64071111 91.56835555 0 42.45276445-10.81344 95.57333333-32.84081778 158.96120889a36.40888889 36.40888889 0 0 0 34.4064 48.35100444H904.85191111a44.05475555 44.05475555 0 0 1 43.29016889 52.21034667z" fill="#333303" p-id="2315"></path></svg>
                            <span>{{hospitalInfo.param.hostypeString}}</span>
                        </div>
                        <div class="time">
                            <svg t="1688320314799" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3912" width="16" height="16"><path d="M854.72 138.666667v64h-106.581333v189.184l-179.264 118.464 179.264 118.464v207.146666h106.581333v64h-682.666667v-64h106.56v-207.146666l179.285334-118.464-179.285334-118.464V202.666667H172.053333v-64h682.666667zM513.365333 550.357333l-170.752 112.832v172.736h341.525334l-0.021334-172.736-170.752-112.832zM620.245333 704l0.170667 64-213.866667 0.533333-0.170666-64L620.245333 704zM684.16 202.666667h-341.546667l0.021334 154.773333 170.752 112.832 170.752-112.832V202.666667z" fill="#515151" p-id="3913"></path></svg>
                            <span>每天{{hospitalInfo.bookingRule?.releaseTime}}放号</span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <img :src="`data:image/jpeg;base64,${hospitalInfo.logoData}`" alt="">
                </div>
            </div>
  </el-card>
    </div>
</template>

<script setup lang="ts">
// 导入useRouter
import { useRouter } from 'vue-router';
let $router=useRouter();
// 点击卡片跳转
const goDetail=() =>{
    $router.push({path:'/hospital/register',query:{hoscode:props.hospitalInfo.hoscode}})
    
}
// 接受父组件传递过来的props->即为以有的医院的数据
let props=defineProps(['hospitalInfo']);
</script>

<style scoped lang="scss">
.content{
    display: flex;
    justify-content: space-between;
    .right{
        img{
            width: 50px;
            height: 50px;
        }
    }
    .left{
        width: 60%;
        .tip{
            color: #7f7f7f;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            .level,.time{
                display: flex;
                align-items: center;
                span{
                    margin-left: 5px;
                }
            }
        }
    }
}
</style> 