const typeDefs=`#graphql

type Student{
    name:String!
    rollNo:Int!
    class:String!
    attend:Attendance!
}

type Attendance{
    rollNo:Int!
    Attend:Int!
    student:Student!
}

type Query{
    students:[Student]
    stud(rno:Int!):Student
    att:[Attendance]
}

type Mutation{
    delStud(rno:Int!):[Student!]
    addStud(naam:String!,rlNo:Int!):Student!
    updateStud(rno:Int!,upd:updData!):Student!
}

input updData{
    naam:String
    class:String
    rollN:Int
}


`

module.exports=typeDefs