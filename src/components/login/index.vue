<template>
    <div class="login_container">
        <!-- title是对话框标题 v-model控制显示与隐藏 -->
        <el-dialog v-model="userstore.visiable" title="用户登录">
            <!-- 对话框内容 -->
            <el-row>
                <!-- 左侧 -->
                <el-col :span="12">
                    <div class="login">
                        <div v-show="scene==0">
                            <el-form :model="loginParam" :rules="rules" ref="form">

                                <el-form-item prop="phone">
                                    <el-input placeholder="请输入手机号码" :prefix-icon="User" v-model="loginParam.phone"></el-input>
                                </el-form-item>
                                <el-form-item prop="code">
                                    <el-input placeholder="请输入手机验证码" :prefix-icon="Lock" v-model="loginParam.code"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button :disabled="!isPhone||flag?true:false" @click="getyzm()">
                                    <CountDown v-if="flag" @getFlag="getFlag" :flag="flag"/>
                                    <span v-else>获取验证码</span>
                                    </el-button>
                                </el-form-item>
                                <el-button @click="login()" type="primary" :disabled="!isPhone||loginParam.code.length!==6?true:false" size="default" style="width: 100%;">
                                    用户登录
                                </el-button>
                            </el-form>
                            <div class="bottom" @click="changeScene(1)">
                                
                                    <p>微信扫码登录</p>
                                    <svg t="1688542193486" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="3519" width="32" height="32">
                                        <path
                                            d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z"
                                            fill="#5D5D5D" p-id="3520"></path>
                                    </svg>
                                
                            </div>
                        </div>
                        <div class="webchat" v-show="scene==1">
                             
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="rightContent">
                        <div class="top">
                            <div class="item">
                                <img src="../../assets/images/code_app.png" alt="">
                                <p><svg t="1688542193486" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="3519" width="16" height="16">
                                        <path
                                            d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z"
                                            fill="#5D5D5D" p-id="3520"></path>
                                    </svg></p>
                                <p>微信扫一扫关注</p>
                                <p>快速预约挂号</p>
                            </div>
                            <div class="item">
                                <img src="../../assets/images/code_login_wechat.png" alt="">
                                <p><svg t="1688542513347" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="4665" width="16" height="16">
                                        <path
                                            d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                                            p-id="4666"></path>
                                    </svg></p>
                                <p>扫一扫下载</p>
                                <p>预约挂号APP</p>
                            </div>

                        </div>
                    </div>
                    <p class="tip">xxx官方指定平台</p>
                    <p class="tip">快速挂号安全放心</p>
                </el-col>
            </el-row>
            <template #footer>
                <el-button type="primary" size="default">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
// 引入倒计时组件
import CountDown from '@/components/countdown/index.vue'
import { User, Lock } from '@element-plus/icons-vue'

// 获取user仓库数据
import userStore from "@/store/modules/user"
let userstore = userStore()
import { ref,reactive,computed } from 'vue';
import { ElMessage } from 'element-plus';

let scene = ref<number>(0);//0手机登录,1微信登录
// 收集表单数据---手机号码
let loginParam = reactive({
    phone:'',
    code:''//手机验证码
})
// 计算当前表单元素的正则是否符合
let isPhone=computed(()=>{
    // 手机号码正则表达式
    const reg=/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
    // 返回布尔值：真代表手机号码、假则不是
    return reg.test(
        loginParam.phone
    )
})
// 点击切换
const changeScene=(value:number)=>{
    scene.value=value
}
// 获取验证码的回调
const getyzm=async()=>{
    // 开启倒计时
    flag.value=true
    // 通知仓库存储验证码
    try {
        // 成功
       await userstore.getyzm(loginParam.phone);
       loginParam.code=userstore.code
    } catch (error) {
        // 失败
    }
}
// 定义一个响应数据控制倒计时组件
let flag=ref<boolean>(false)
// 子组件自定义事件
// 倒计时为零展示没有倒计时的
const getFlag=(val:boolean)=>{
    // 倒计时结束
    flag.value=val
}
// 登录按钮回调
const login=async ()=>{
    // 保证两条校验都符合
   await form.value.validate();
   
   
   try {
   await userstore.userLogin(loginParam)
//    关闭对话框
    userstore.visiable=false
   } catch (error) {
    ElMessage({
        type:'error',
        message:(error as Error).message
    })
   }
}
// 自定义校验函数
const validatorPhone=(rule:any,value:any,callBack:any)=>{
    const reg=/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
    if(reg.test(value)){
        callBack()
    }else{
        callBack(new Error('请输入正确的手机号码格式'))
    }
}
// 自定义校验函数
const validatorCode=(rule:any,value:any,callBack:any)=>{
    const reg=/^\d{6}$/;
    if(reg.test(value)){
        callBack()
    }else{
        callBack(new Error('请输入正确的验证码格式'))
    }
}
// 表单校验规则
const rules={
    // 手机号码检验规则
    // phone:[
    //     {require:true,message:"请输入正确的手机号",trigger:'change',min:11}
    // ],
    // code:[
    //     {require:true,message:"请输入正确的验证码",trigger:'change',min:6,max:6}
    // ],
    // 自定义检验规则
    phone:[
        {validator:validatorPhone,trigger:'change'}
    ],
    code:[
        {validator:validatorCode,trigger:'change'}
    ]
}
// 获取相应的form组件实例
let form=ref<any>()
</script>

<style scoped lang="scss">
.login_container {
    ::v-deep(.el-dialog__body) {
        border-top: 1px solid #7f7f7f;
        border-bottom: 1px solid #7f7f7f;
    }

    .login {
        padding: 20px;
        border: 1px solid #ccc;
    }

    .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            margin: 10px 0px;
        }
    }

    .rightContent {
        .top {
            display: flex;
            justify-content: space-around;

            .item {
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                    height: 120px;
                    width: 120px;
                }

                p {
                    margin: 5px 0px;
                    color: #7f7f7f;
                }
            }
        }
    }

    .tip {
        text-align: center;
        margin: 20px 0px;
        font-size: 20px;
        font-weight: 900;
        font-style: italic;
    }
}
</style>