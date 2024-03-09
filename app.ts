import express from "express";
import { router as index} from "./api/index"; //import router from index and change name to index
import { router as movie} from "./api/movie"
import { router as person} from "./api/person"
import { router as creators} from "./api/creators"
import { router as stars} from "./api/stars"
import { router as upload} from "./api/upload"
import { router as search} from "./api/search"
import bodyParser from "body-parser";
import cors from "cors";
export const app = express();

// app.use(
//     cors({
//     //   origin: "http://yourapp.com",
//     // origin: "http:localhost:4200",
//     origin: "*", //ใครเข้าก็ได้ เรียกก็ได้
//     })
//   );
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use("/", index);
app.use("/movie", movie);
app.use("/person", person);
app.use("/creators", creators);
app.use("/stars", stars);
app.use("/search", search);
// app.use("/upload", upload);
// app.use("/uploads", express.static("uploads"));
// app.use("/", (req , res)=>{ //req = Request, res = Response
//     res.send("Hello World!!!");
// });

