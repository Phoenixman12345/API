import express, { query } from "express";
import { conn, queryAsync } from "../dbconnect";
import { PersonPostRequest } from "../model/cinema_post_req";
import mysql from "mysql";
export const router = express.Router();


router.get("/", (req, res)=>{
    if(req.query.id){ //TRIP?ID=XXXXX
        const id = req.query.id;
        const name= req.query.name;
        res.send("Method GET in person.ts with "+ id +" : "+ name +" this is query params ");
        // res.send(`Method GET in trip.ts with ${id} ${name}`);
        // res.send("Method GET in trip.ts with "+ name +" this is query params ");
    }else{
        // res.send("Method GET in trip.ts");
        const sql = "select * from person";
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
    let movie:PersonPostRequest = req.body;
    let sql = "INSERT INTO `person`(`name`, `information`, `profileImage`, `age`) VALUES (?,?,?,?)";
    sql = mysql.format(sql, [
        movie.name,
        movie.information,
        movie.profileImage,
        movie.age
    ]);
    conn.query(sql, (err, result)=>{
        if (err) throw err;
        res.status(201).json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
});

router.delete("/:id", (req, res) => {
    let id = req.params.id;
    conn.query("delete from stars where pidS = ?", [id], (err, result) => {

       if (err) throw err;

       conn.query("delete from creators where pidC = ?", [id], (err, result) => {

        if (err) throw err;

        conn.query("delete from person where pid = ?", [id], (err, result) => {
            if (err) throw err;
                res
                .status(200)
                .json({ affected_row: result.affectedRows });
           });
       });
    });
});


