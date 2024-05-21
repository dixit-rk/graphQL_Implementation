const mongoose=require('mongoose');


const connectWithMongoDB=new Promise((resolve,reject)=>{
    const URI=process.env.DB_URL;
    mongoose.connect(URI,{
        useNewUrlParser:true
    }).then(()=>{
        console.log("Connected With AttendanceSheetHelper Databbase Successfully");
        const db=mongoose.connection.db;
        const st=db.collection('studentsInformation')
        const at=db.collection('attendanceInformation')
      //  console.log(st);
        resolve([st,at]);
        
    }
    )
})

module.exports=connectWithMongoDB;