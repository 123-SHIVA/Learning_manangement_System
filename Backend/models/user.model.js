import { Schema } from "mongoose";


const userSchema=new Schema({

    name:{
        type:'string',
        required:[true,"Name is required"],
        minLength:[10,"Name must be at least 5 character"],
        maxLength:[40,"name should be  less than50 characters"],
        lowercase:true,
        trim:true,
    },
    email:{
        type:'string',
        required:[true,"Email is required"],
        lowercase:true,
        trim:true,
        unique:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address',
        ]
        
    },
    password:{
        type:"string",
        required:[true,"Password is required"],
        minLength:[8,'Password must be at least 8 characters'],
        select:false
    },
    avatar:{
        public_id:{
            type:"string",
        },
        secure_url:{
            type:string
        }
    },
    role:{
        type:'string',
        enum:["USER",'ADMIN'],
        default:'USER'
    },
    forgotPasswordToken:string,
    forgotPasswordExpiry:Date

},
  { timestamps:true}
);

const user=model('User',userSchema);

export default user;