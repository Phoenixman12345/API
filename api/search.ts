import express, { query } from "express";
import { conn, queryAsync } from "../dbconnect";
import { MoviePostRequest } from "../model/cinema_post_req";
import mysql from "mysql";
export const router = express.Router();

// router.get("/", (req, res) => {
//   const name = req.query.name;

//   if (name) {



// const sql = `
// SELECT 
//     movie.mid, 
//     movie.name, 
//     movie.year, 
//     movie.detail, 
//     movie.poster,
//     GROUP_CONCAT(
//         DISTINCT CONCAT('Star_ID',':',person_star.pid,'->', person_star.name , person_star.name ) 
//         SEPARATOR ', '
//     ) AS stars,
//     GROUP_CONCAT(
//         DISTINCT CONCAT('Creator_ID',':',person_creator.pid, '->', person_creator.name) 
//         SEPARATOR ', '
//     ) AS creators
// FROM 
//     movie
// LEFT JOIN 
//     stars ON movie.mid = stars.midS
// LEFT JOIN 
//     person AS person_star ON stars.pidS = person_star.pid
// LEFT JOIN 
//     creators ON movie.mid = creators.midC
// LEFT JOIN 
//     person AS person_creator ON creators.pidC = person_creator.pid
// wHERE 
//     movie.name LIKE ?
// GROUP BY 
//     movie.mid, 
//     movie.name, 
//     movie.year, 
//     movie.detail, 
//     movie.poster;
// `;


//     conn.query(sql, [`%${name}%`], (err, result) => {
//       if (err) {
//         res.status(400).json(err);
//       } else {
//         res.json(result);
//       }
//     });
//   } else {
//     // If no query parameters, return all movies
//     const sql = "SELECT * FROM movie";

//     conn.query(sql, (err, result) => {
//       if (err) {
//         res.status(400).json(err);
//       } else {
//         res.json(result);
//       }
//     });
//   }
// });



router.get("/:name", (req, res) => {
  const name = "%" + req.params.name + "%";

  let query1 = "SELECT * FROM movie WHERE name LIKE ?";
  let query2 = "SELECT DISTINCT movie.name as movie_name,person.*  FROM stars JOIN person ON person.pid = stars.pidS JOIN movie ON movie.mid = stars.midS  WHERE movie.name LIKE ?";
  let query3 = "SELECT DISTINCT movie.name as movie_name,person.*  FROM creators JOIN person ON person.pid = creators.pidC  JOIN movie ON movie.mid = creators.midC  WHERE movie.name LIKE ?";

  let results : any= {};

  conn.query(query1, [name], (err, result1) => {
      if (err) {
          console.error(err);
          return res.status(400).json(err);
      }
      results.movies = result1;

      conn.query(query2, [name], (err, result2) => {
          if (err) {
              console.error(err);
              return res.status(400).json(err);
          }
          results.stars = result2;

          conn.query(query3, [name], (err, result3) => {
              if (err) {
                  console.error(err);
                  return res.status(400).json(err);
              }
              results.creators = result3;

              res.json(results);
          });
      });
  });
});