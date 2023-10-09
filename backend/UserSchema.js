// @ts-nocheck
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'consumer'],
    default: 'consumer', // Default role is 'consumer'
  },
});

userSchema.statics.isEmailInUse = async function (email){
  try {
      const found = await this.findOne({email});
      if(found)return true;
      else return false;
  } catch (error) {
      console.error("error inside isEmailInUse", error);
      return false;
  }
}

// Add a method to hash the user's password before saving
userSchema.pre('save',function(next){
  if(this.isModified("password")){
      bcrypt.hash(this.password, 8, (err, hash)=>{
          if(err) return err;

          this.password = hash;
          next();
      });
  }
})

userSchema.methods.comparePassword = async function(/** @type {string | Buffer} */ password){
  if(!password) throw new Error("password must be provided");
  // console.log(this.password, password)
  try {
      const result = await bcrypt.compare(password, this.password);
      // console.log(result);
      return result;
  } catch (error) {
      console.log("error while comparing message", error.message);
  }
}

module.exports = mongoose.model('User', userSchema);
