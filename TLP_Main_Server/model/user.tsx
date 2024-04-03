import { ObjectId } from "mongodb";



export default class UserMongoDb {
    constructor(
        public id: ObjectId,
        public user_id: string,
        public firebase_id: string,
        public first_name: string,
        public last_name: string,
        public email: string,
        public password: string,
        public admin: boolean,
        public user_agreement: boolean,
        public timestamp: boolean
    ) {
        this.id = id,
        this.user_id = user_id,
        this.firebase_id = first_name,
        this.first_name = first_name,
        this.last_name = last_name,
        this.email = email,
        this.password = password,
        this.admin = admin,
        this.user_agreement = user_agreement,
        this.timestamp = timestamp
    }
}




// schema validation on the database side
// TODO: need to create instance of db
// TODO: need to decide where this goes or who should implement
// await db.command({
//     'collMod': process.env.COLLECTION_NAME,
//     'validator': {
//         $jsonSchema: {
//             bsonType: 'object',
//             required: ['user_id', 'firebase_id', 'first_name', 'last_name', 'email', 'password'  ],
//             additionalProperties: false,
//             properties: {
//                 _id: {},
//                 first_name: {
//                     bsonType: 'string',
//                     description: "'first_name' is required and is a string"
//                 },
//                 last_name: {
//                     bsonType: 'string',
//                     description: "'last_name' is required and is a string"
//                 },
//                 email: {
//                     bsonType: 'string',
//                     description: "'email' is required and is a string"
//                 },
//                 password: {
//                     bsonType: 'string',
//                     description: "'password' is required and is a string"
//                 },

//             }
//         }
//     }

// })



// connectToMongoDB()
//     .then(() => {
//         app.use("/user", userRouter);

//         app.listen(port, () => {
//             console.log(`Server started at http://localhost:${port}`);
//         });
//     })
//     .catch((error: Error) => {
//         console.error("Database connection failed", error);
//         process.exit();
//     });