import express, { query } from "express";
import { conn, queryAsync } from "../dbconnect";
import { CreatorsPostRequest } from "../model/cinema_post_req";
import mysql from "mysql";
export const router = express.Router();



router.get("/", (req, res)=>{
    if(req.query.id){ //TRIP?ID=XXXXX
        const id = req.query.id;
        const name= req.query.name;
        res.send("Method GET in creators.ts with "+ id +" : "+ name +" this is query params ");
        // res.send(`Method GET in trip.ts with ${id} ${name}`);
        // res.send("Method GET in trip.ts with "+ name +" this is query params ");
    }else{
        // res.send("Method GET in trip.ts");
        // const sql = "select * from creators INNER JOIN person ";
        const sql = `SELECT creators.cid, person_creator.pid, person_creator.name as creator_name ,movie.mid , movie.name as movie_name
        FROM creators
        INNER JOIN movie ON creators.midC = movie.mid
        INNER JOIN person AS person_creator ON creators.pidC = person_creator.pid`;
        conn.query(sql, (err, result)=>{
            if(err){ //check error
                res.status(400).json(err);
            }else{
                res.json(result);
            }
            
        });
    }
    
});

router.post("/", (req, res) => {
    let movie:CreatorsPostRequest = req.body;
    let sql = "INSERT INTO `creators`(`midC`, `pidC`) VALUES (?,?)";
    sql = mysql.format(sql, [
        movie.midC,
        movie.pidC,
    ]);
    conn.query(sql, (err, result)=>{
        if (err) throw err;
        res.status(201).json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
});

router.delete("/:id", (req, res) => {
    let id = req.params.id;
    conn.query("delete from creators where cid = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
});