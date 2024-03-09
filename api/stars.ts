import express, { query } from "express";
import { conn, queryAsync } from "../dbconnect";
import { StarsPostRequest } from "../model/cinema_post_req";
import mysql from "mysql";
export const router = express.Router();



router.get("/", (req, res)=>{
    if(req.query.id){ //TRIP?ID=XXXXX
        const id = req.query.id;
        const name= req.query.name;
        res.send("Method GET in stars.ts with "+ id +" : "+ name +" this is query params ");
        // res.send(`Method GET in trip.ts with ${id} ${name}`);
        // res.send("Method GET in trip.ts with "+ name +" this is query params ");
    }else{
        // res.send("Method GET in trip.ts");
        // const sql = "select stars.sid,stars.name,  from stars INNER JOIN person AS person_star ON stars.pidS = person_star.pid" +
        // "INNER JOIN creators ON movie.mid = creators.midC" +
        // "INNER JOIN person AS person_creator ON creators.pidC = person_creator.pid";
        const sql = `SELECT  stars.sid, person_star.pid, person_star.name as star_name ,movie.mid , movie.name as movie_name
        FROM stars
        INNER JOIN movie ON  stars.midS = movie.mid
        INNER JOIN person AS person_star ON stars.pidS = person_star.pid`;
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
    let movie:StarsPostRequest = req.body;
    let sql = "INSERT INTO `stars`(`pidS`,`midS`) VALUES (?,?)";
    sql = mysql.format(sql, [
        movie.pidS,
        movie.midS
    ]);
    conn.query(sql, (err, result)=>{
        if (err) throw err;
        res.status(201).json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
});

router.delete("/:id", (req, res) => {
    let id = req.params.id;
    conn.query("delete from stars where sid = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
});