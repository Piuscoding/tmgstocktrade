const mongoose = require('mongoose');
const  validator  = require('validator');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    fullname:{
        type: String,
    },
    tel:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: validator.isEmail['Please enter an email']
        // required:  [isEmail, 'Please enter an email']
    },
    country:{
        type: String
    },
   
    password:{
        type: String,
    },
    question:{
        type: String
    },
    answer:{
        type: String
    },
    city:{
        type: String,
        default: "xxxxx"
    },
    state:{
        type: String,
        default: "xxxxx"
    },
    zip:{
        type: String,
        default: "xxxxx"
    },

    image:{
        type: String,
    }, 
    session:{
        type: String,
        default:"%0"
    },

    balance:{
        type: String,
        default: "$0.00"
    },
    available:{
        type: String,
        default: "$0.00"
    },
    bonus:{
        type: String,
        default: "$0.00"
    },
    widthdrawBalance:{
        type: String,
        default: "$0.00"
    },
    profit:{
        type: String,
        default: "$0.00"
    },
    totalDeposit:{
        type: String,
        default: "0"
    },
    level:{
        type: String,
        default:"basic"
    },
    totalWidthdraw:{
        type: String,
        default: "0"
    },
    verifiedStatus:{
        type: String,
        default: 'Account not yet Verified!'
    },
    verified:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'verify'
    },
   
    deposits:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'deposit'
    },

    widthdraws:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'widthdraw'
    },
    role:{
        type: Number,
        default: 0
    }
},{timestamps: true})

// static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await (password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };
  

const User = mongoose.model('user', userSchema)

module.exports = User;
