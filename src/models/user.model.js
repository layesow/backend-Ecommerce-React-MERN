import mongoose,{ Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  billing_adress: {
    name:{ type: String},
    email:{ type: String},
    phone:{ type: String},
    address:{ type: String},
    city:{ type: String},
    state:{ type: String},
    zip:{ type: String},
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
}, { timestamps: true });

// Hash the password before saving the user
userSchema.methods.isPasswordMatch = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({ 
            _id: this._id, 
            name: this.name, 
            email: this.email 
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { 
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY 
        }
    );
}

const User = mongoose.model("User", userSchema);

export default User;
