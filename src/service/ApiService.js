import { API_BASE_URL } from "../app-config";

const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    // 로컬 스토리지에서 ACCESS_TOKEN 가져오기
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if(accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }
    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
};
if(request) {
    // GET
    options.body = JSON.stringify(request);
}
return fetch(options.url, options)
    .then((response) =>
        response.json().then((json) => {
        if(!response.ok) {
            // response.ok가 true이면 정상적인 응답, 아니면 에러 응답
            return Promise.reject(json);
        }
        return json;
    })
)
.catch((error) => {
    console.log(error.status);
    if(error.status === 403) {
        window.location.href = "/login"; // redirect
    }
    return Promise.reject(error);
});

}

export function signin(memberDTO) {
    return call("/auth/signin", "POST", memberDTO)
    .then((response) => {
        alert("로그인 토큰: " + response.token);
        if(response.token) {
            // 로컬 스토리지에 토큰 저장
            localStorage.setItem(ACCESS_TOKEN, response.token);
            //token이 존재하는 경우 Todo 화면으로 리디렉트
            window.location.href="/";
            // window.location.href="/todo";
        }

    });
}

// 로그아웃
export function signout() {
    localStorage.setItem(ACCESS_TOKEN, null);
    window.location.href="/login";
}

// 회원가입
export function signup(memberDTO) {
    return call("/auth/signup", "POST", memberDTO);
}