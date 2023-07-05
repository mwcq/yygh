import type { HosPitalDetail,DepartmentArr } from "@/api/hospital/type";
import type { UserInfo } from "@/api/hospital/type";
// 定义仓库内部存储数据state的ts类型
export interface Detailstate{
    hospitalInfo:HosPitalDetail,
    departmentArr:DepartmentArr
}

// 用户仓库相关的state的ts类型
export interface UserState{
    visiable:boolean,
    code:string,
    userInfo:UserInfo
}