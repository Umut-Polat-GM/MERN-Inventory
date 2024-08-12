import { BASE_URL } from "./BaseUrl";
import { postJSON } from "./request";


type RegisterDataType = {
    name: string;
    email: string;
    password: string;
};

type LoginDataType = {
    email: string;
    password: string;
};


export const postUserRegister = (data: RegisterDataType) => postJSON(`${BASE_URL}auth/register`, data);
export const postUserLogin = (data: LoginDataType) => postJSON(`${BASE_URL}auth/login`, data);