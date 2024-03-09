import http from "http";
import {app} from "./app"
const port = process.env.port || 3000; //การกำหนด environment แต่ถ้าไม่มี ให้ใส่ 3000 
const server = http.createServer(app);

server.listen(port , ()=>{ //เปิด port แล้ว ให้ทำอะไร
    console.log("Server is Start");
});