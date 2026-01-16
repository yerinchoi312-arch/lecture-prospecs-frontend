import  axios from "axios";
import useAuthStore from "../store/useAuthStore.ts";

//상수 constant 뭔가 정해져 있는 바뀌지 않는 값을 마련 

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const httpClient = axios.create({
    baseURL: BASE_URL,
    headers:{
        "Content-Type":"application/json", // 내가 요청할 때에는 json 형식으로 내용을 적어서 보내고
        "x-client-key": API_KEY, //백엔드에서 정한 사항 인증코드 넣어서 요청 보냄
    }
})
//요청 인터셉터

httpClient.interceptors.request.use(
    config =>{
        //axios가 request를 보낼 때 환경 설정 정볼르 꺼내서 수정하고 다시 넣어줘야 되는 함수임
        // 만약, useAuthStore(zustand)에 token이 존재하면 그 token정보를 꺼내서
        //request header에 "Authorization"이라는 키에 , 그 token을 넣어서 환경 설정 정보를 수정 후
        //axios에 다시 넣어줄것임

        //react hooks : useState , useEffect , useRef
        //react hooks 라는건, react 컴포넌트 내부에서 변경사항을 지속적으로 확인하고 그에 대한 처리를 해줄수있는 메소드
        //zustand에서 만든것도 훅임 => 컴포넌트가 아닌 곳에서 데이터를 꺼내와야 하는 상황
        //useAuthStore.getState()로 실행하게 되면 , 지금 현재의 값만 꺼내옴
        const token = useAuthStore.getState().token;
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    }
)