const express=require("express");
const connectWithMongoDB=require('./Controllers/DBControllers.js');

const { ApolloServer } =require("@apollo/server");
const {expressMiddleware}=require("@apollo/server/express4");
const typeDefs=require('./schema.js')

let student=undefined;
let attend=undefined;

let server;
let app;


const resolvers={
    Query:{
       async students(){
           data= await student.find({}).toArray();
           return data;
        },
       async att(){
          data= await attend.find({}).toArray();
          return data;
       },
       async stud(_,args){
       // console.log(args);
        data=await student.findOne({rollNo:args.rno});
        return data;
       }
    },
    Attendance:{
        async student(parent){
            // console.log(parent); 
            // console.log('____')
         data=await student.findOne({rollNo:parent.rollNo});
         return data;
        }
    },
    Student:{
        async attend(parent){
            console.log(parent);
            console.log("-------")
            data=await attend.findOne({rollNo:parent.rollNo});
            console.log(data);
            return data;
        }
    },
    Mutation:{
        async delStud(_,args){
            await student.deleteOne({rollNo:args.rno});
            let data=await student.find({}).toArray()[0];
            return data;
        },
        async addStud(_,args){
            let data={
                ...args,
                attend:0
            }
            let res=await student.insertOne({name:data.naam,class:"c",rollNo:data.rlNo});
            let newStudent=await student.findOne({_id:res.insertedId});
            return newStudent;
        },
        async updateStud(_,args){
            console.log(args);
            console.log("________")
            let res=await student.findOneAndUpdate({rollNo:args.rno},{$set:{name:args.upd.naam,class:args.upd.class,rollNo:args.upd.rollN}},
                { upsert: true,
                returnDocument: 'after'}
                );
                console.log(res);
            return res;
        }
    }
}

async function init(){
    app=express();
    server = new ApolloServer({
        typeDefs,
        resolvers
      })
    
    await server.start();

    app.use('/graphql',expressMiddleware(server))

    app.listen(3000,(err)=>{
        console.log("server is listening on port 3000");
        connectWithMongoDB.then((data)=>{
            student=data[0];
            attend=data[1];
        })
    })
}

init();

app.use(express.json());




