import express from "express";

export const router = express.Router(); // router = ตัวจัดการเส้นทาง;

router.get("/", (req, res)=>{
    res.send("Method GET in index.ts");
});