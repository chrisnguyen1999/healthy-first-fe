import { HasId, QueryParms, ResponseData, TimeStamp } from './common';

export enum UserRole {
    ADMIN = 'admin',
    MANAGER = 'manager',
    EXPERT = 'expert',
}

export interface LoginForm {
    email: string;
    password: string;
}

export interface UpdateProfileForm {
    avatar?: string;
    email?: string;
    fullName?: string;
    password?: string;
    newPassword?: string;
}

export interface User extends HasId, TimeStamp {
    fullName: string;
    email: string;
    avatar: string;
    role: UserRole;
    provinceCode?: number;
    districtCode?: number;
    status: boolean;
    provinceName?: string;
    districtName?: string;
}

export interface UserCreate {
    fullName: string;
    email: string;
    password: string;
    avatar?: string;
    role: UserRole;
    provinceCode?: number;
    districtCode?: number;
}

export type UserFields =
    | 'fullName'
    | 'email'
    | 'role'
    | 'status'
    | 'provinceName'
    | 'districtName';

export interface UserFilter {
    _q: string;
    role: UserRole;
    status: boolean;
}

export type UserQuery = Partial<QueryParms<UserFields> & Partial<UserFilter>>;

export type UserRecordResponse = ResponseData<User>;

export type UserListResponse = ResponseData<User[]>;
