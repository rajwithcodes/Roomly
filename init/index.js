const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/roomly";


main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log("Error connecting to DB");
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data Initialized");
}
initDB();
