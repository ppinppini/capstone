import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    server: {
        proxy: {
            // 문자열만 사용한다면 프록시를 거쳐 아래와 같이 변경된 주소로 요청된다.
            "/survey": "http://43.200.172.87:8080", // 백엔드 api 주소
        },
    },
});
const getImage = async (hobbyId) => {
    const data = await (await fetch(`http://43.200.172.87:8080`)).json();

    return data;
};
