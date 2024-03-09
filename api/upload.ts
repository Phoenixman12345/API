import express from "express";
import multer from "multer";
import path from "path";
export const router = express.Router(); // router = ตัวจัดการเส้นทาง;

//GET Upload
router.get("/", (req, res)=>{
    res.send("Method GET in Upload.ts");
});


class FileMiddleware {
    //attribute of class
    filename = "";
    //attribute disloader for save file to disk
    public readonly diskLoader = multer({
        //storage = saving file to disk
      storage: multer.diskStorage({
        // destination = folder to be saved
        destination: (_req, _file, cb) => {
          cb(null, path.join(__dirname, "../uploads"));
        },
        //fileName = unique file name to be save - สร้างไฟล์ไม่ซ้ำ จำสูตรไม่ได้
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 10000);
          this.filename = uniqueSuffix + "." + file.originalname.split(".").pop();
          cb(null, this.filename);
        },
      }),
      //limits file size 
      limits: {
        fileSize: 67108864, // 64 MByte
      },
    });
}


const fileUpload = new FileMiddleware();
router.post("/", fileUpload.diskLoader.single("file"), (req, res) => {
  res.json({ filename: "/uploads/" + fileUpload.filename });
});

//post /upload + file

const firebaseConfig = {
    apiKey: "AIzaSyBP4PaKHkyegg7BE1qKm1yacs84lfkSkWo",
    authDomain: "tripbooking-m.firebaseapp.com",
    projectId: "tripbooking-m",
    storageBucket: "tripbooking-m.appspot.com",
    messagingSenderId: "146173309950",
    appId: "1:146173309950:web:538b785a7cb424074206af",
    measurementId: "G-7FYR93MV7L"
  };

  import {initializeApp} from "firebase/app";
  import {getStorage, ref, uploadBytesResumable, getDownloadURL}  from "firebase/storage";
  //connect to file base
  const app = initializeApp(firebaseConfig);
  //connect to storage
  const storage = getStorage();



// upload file to filebase



//Middleware save to memory
// class FileMiddleware {
//     //attribute of class
//     filename = "";
//     //attribute disloader for save file to disk
//     public readonly diskLoader = multer.memoryStorage({
//         limits: {
//             fileSize: 67108864, // 64 MByte
//           },
//     });
// }

// const fileUpload = new FileMiddleware();
// router.post("/", fileUpload.diskLoader.single("file"), async (req, res)=>
// {   
//     //upload to firebase storage
//     const filename = Math.round(Math.random() * 10000) + ".png";
//     const storageRef = ref(storage, "/images/");
//     //define file detail
//     const metaData = { contentTyp : req.file!.mimetype };
//     //start upload
//     const snapshot = await uploadBytesResumable(storageRef, req.file!.buffer , metaData);
//     const url = await getDownloadURL(snapshot.ref);
//     res.status(200).json({
//         filename : url,
//     });

// });