import type { User } from "../types/user.ts";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState{
    isLoggedIn: boolean;
    token: string | null;
    user:User | null;
    //로그인 함수는 토큰과 유저를 받아서 값을 저장(변경)하고 아무것도 뱉어주지 않음
    login : (token:string, user:User) => void;
    //로그아웃 함수는 아무것도 받지 않지만 토큰을 null 유저를 null로 바꾸고 아무것도 뱉어주지 않음
    logout: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        set=>({
            isLoggedIn:false,
            token:null,
            user:null,
            login:(token,user)=>set({isLoggedIn:true,token,user}),
            logout:()=>set({isLoggedIn:false,token:null,user:null}),
        }),
        {name:"auth-storage"}
    )
)
export default useAuthStore;