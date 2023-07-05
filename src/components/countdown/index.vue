 <template>
    <div>
        <span>获取验证码({{time}}s)</span>
    </div>
 </template>
 
 <script setup lang="ts">
//  引入组合式API
import {ref,watch} from 'vue'
// 倒计时事件
let time = ref<number>(5)
// 接收父组件传过来的参数
let props=defineProps(['flag'])
// 监听数据
watch(()=>props.flag,()=>{
    // 开启定时器
   let timer= setInterval(()=>{
        time.value--
        if(time.value==0){
            // 通知父组件
            $emit('getFlag',false)
            // 清除定时器
            clearInterval(timer)
        }
    },1000)
},{
    immediate:true
})
let $emit=defineEmits(['getFlag'])
 </script>
 
 <style scoped>
 
 </style>