import express from "express";
import cors from "cors";
import fs from "fs";
import publishersRouter from "./routers/publishers.js";
import domainsRouter from "./routers/domains.js";

const PORT = 4300;
const app = express();
// const data = fs.readFileSync("./db.json", "utf8");
const dbPath = "./db.json"

// export const publishers = JSON.parse(data);

let publishers = [];

try {
    const data = fs.readFileSync(dbPath, "utf8");
    publishers = JSON.parse(data);
} catch (error) {
    console.error('Error loading data:', error);
}

export {publishers}

export function saveData(){
    try{
        if(publishers){
            fs.writeFileSync(dbPath, JSON.stringify(publishers, null, 2))
        }
    }
    catch (error)
    {
        console.log('Save did not accure due to error: ', error)
    }
}




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/publishers", publishersRouter);
app.use("/api/domains", domainsRouter);

app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
