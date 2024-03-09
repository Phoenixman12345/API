import express, { query } from "express";
import { conn, queryAsync } from "../dbconnect";
import { MoviePostRequest } from "../model/cinema_post_req";
import mysql from "mysql";
export const router = express.Router(); // router = ตัวจัดการเส้นทาง;




// router.get("/", (req, res) => {
//     conn.query('select * from movie', (err, result, fields)=>{
//       res.json(result);
//     });
    
//   });

router.get("/", (req, res)=>{
    if(req.query.mid){ //TRIP?ID=XXXXX
        const mid = req.query.mid;
        const name= req.query.name;
        res.send("Method GET in movie.ts with "+ mid +" : "+" this is query params ");
        // res.send(`Method GET in trip.ts with ${id} ${name}`);
        // res.send("Method GET in trip.ts with "+ name +" this is query params ");
    }else{
        // res.send("Method GET in trip.ts");
        // const sql = "select * from movie";
        const sql = "SELECT * from movie "; 

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
    let movie:MoviePostRequest = req.body;
    let sql = "INSERT INTO `movie`(`name`, `year`, `detail`, `star`, `poster`) VALUES (?,?,?,?,?)";
    sql = mysql.format(sql, [
        movie.name,
        movie.year,
        movie.detail,
        movie.star,
        movie.poster
    ]);
    conn.query(sql, (err, result)=>{
        if (err) throw err;
        res.status(201).json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
});

router.delete("/:id", (req, res) => {
    let id = req.params.id;
    conn.query("delete from movie where mid = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
});


// router.delete("/:id", (req, res) => {
//     let id = +req.params.id;
//     conn.query("DELETE from movie where mid = ?", [id], (err, result) => {
//         if(err) throw err;
//         res.status(200).json({ affected_row: result.affectedRows });
//     });
// });




// /trip
// router.get("/", (req, res)=>{
//     if(req.query.id){ //TRIP?ID=XXXXX
//         const id = req.query.id;
//         const name= req.query.name;
//         res.send("Method GET in trip.ts with "+ id +" : "+ name +" this is query params ");
//         // res.send(`Method GET in trip.ts with ${id} ${name}`);
//         // res.send("Method GET in trip.ts with "+ name +" this is query params ");
//     }else{
//         // res.send("Method GET in trip.ts");
//         const sql = "select * from trip";
//         conn.query(sql, (err, result)=>{
//             if(err){ //check error
//                 res.status(400).json(err);
//             }else{
//                 res.json(result);
//             }
            
//         });
//     }
    
// });

// // / trip/xxx   -> xxx is something
// router.get("/:id", (req, res)=>{
//     const id = req.params.id; //ส่งตัวแปร id มา และเก็บไว้ในตัวแปร id
//     // res.send("Method GET in trip.ts with "+ id);
//     // const sql = "select * from trip where idx = "+id; //BAD Code!!! การต่อ sting ไม่ใช่เรื่องที่ดี
//     const sql = "select * from trip where idx = ?";
//     conn.query(sql, [ id ], (err, result)=>{ //ในarray ใส่หลายตัวได้ 
//         if(err){ //check error
//             res.status(400).json(err);
//         }else{
//             res.json(result);
//         }
        
//     });
// });

// //Post /trip
// router.post("/", (req, res)=>{
//     const body = req.body;
//     res.status(201);
//     // res.send("Method POST in trip.ts with " + JSON.stringify(body));
//     res.json({text :"Method POST in trip.ts with " + JSON.stringify(body)});
// });

// //Post /trip + Data
// router.post("/", (req, res)=>{
//     const trip : TripPostRequest = req.body;
//     let sql = "INSERT INTO `trip`(`name`, `country`, `destinationid`, `coverimage`, `detail`, `price`, `duration`) VALUES (?,?,?,?,?,?,?)";
//     sql = mysql.format(sql , [
//         trip.name,
//         trip.country,
//         trip.destinationid,
//         trip.coverimage,
//         trip.detail,
//         trip.price,
//         trip.duration
//     ]);
//     conn.query(sql, (err, result)=>{
//         if(err) throw err;
//         res.status(201).json({
//             affected_row: result.affected_row,
//             last_idx : result.insertId,
//         });
        
//     });
//     res.status(201).json({});
//     console.log(trip);
    
//     // res.send("Method POST in trip.ts with " + JSON.stringify(body));
//     // res.json({text :"Method POST in trip.ts with " + JSON.stringify(body)});
// });

// //trip?id=3 or trip?name=ฟูจิ
// router.get("/search/fields",(req,res)=>{
//     const id = req.query.id;
//     const name = req.query.name;
//     let sql = "select * from trip where "
//     +"(idx IS NULL OR idx = ?) OR (name IS NULL OR name like ?)"

//     conn.query(sql,[id , "%" + name + "%"],(err,result)=>{
//         if(err){ //check error
//             res.status(400).json(err);
//         }else{
//             res.json(result);
//         }
//     })

//   });

// router.get("/search/price/", (req, res)=>{
//     const price = req.query.price;

//     const sql = "select * from trip where price < ?";
//     conn.query(sql, price, (err,result)=>{
//         if(err){ //check error
//             res.status(400).json(err);
//         }else{
//             res.json(result);
//         }
//     });
// });

// router.delete("/:id", (req, res)=>{
//     const id = +req.params.id; // + =แปลงตัวอักษรเป็นตัวเลข
//     let sql = "delete from trip where idx = ?";
//     conn.query(sql, [id], (err, result)=>{
//         if(err) throw err;
//         res.status(200).json({
//             affected_row: result.affected_row,
//         })

        
//     })
// });
// //PUT /trip/xxxx + Data
// // router.put("/:id", (req, res)=>{
// //     const id = req.params.id;
// //     const trip : TripPostRequest = req.body;

// //     let sql = "update  `trip` set `name`=?, `country`=?, `destinationid`=?, `coverimage`=?, `detail`=?, `price`=?, `duration`=? where `idx`=?";
// //     sql = mysql.format(sql, [
// //         trip.name,
// //         trip.country,
// //         trip.destinationid,
// //         trip.coverimage,
// //         trip.detail,
// //         trip.price,
// //         trip.duration,
// //         id
// //     ]);

// //     conn.query(sql , (err, result)=>{
// //         if(err) throw err;
// //         res.status(200).json({
// //             affected_row : result.affectedRows,
// //         })
// //     })
// // });

// router.put("/:id", async (req, res)=>{
//     //Receive data
//     const id = req.params.id;
//     const trip : TripPostRequest = req.body;

//     //Get Original taste data and wait util finish
//     let sql = 'select * from trip where idx = ?';
//     sql = mysql.format(sql, [id]);
//     const result = await queryAsync(sql);
//     const jsonStr = JSON.stringify(result);
//     const jsonObj = JSON.parse(jsonStr);
//     const tripOriginal : TripPostRequest = jsonObj[0];
    

//     //Merge data
//     const updateTrip = {...tripOriginal, ...trip};

//     //update to data base
//     sql = "update  `trip` set `name`=?, `country`=?, `destinationid`=?, `coverimage`=?, `detail`=?, `price`=?, `duration`=? where `idx`=?";
//     sql = mysql.format(sql, [
//         updateTrip.name,
//         updateTrip.country,
//         updateTrip.destinationid,
//         updateTrip.coverimage,
//         updateTrip.detail,
//         updateTrip.price,
//         updateTrip.duration,
//         id
//     ]);

//     conn.query(sql , (err, result)=>{
//         if(err) throw err;
//         res.status(200).json({
//             affected_row : result.affectedRows,
//         });
//     });

    
//     // res.status(200).json(JSON.stringify(jsonObj));
// });