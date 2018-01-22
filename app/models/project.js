var mongoose = require('mongoose');

// var ProjectSchema = mongoose.Schema({
//     name: {type: String, required: true },
//     description: {type: String, required: true }
//      },
//      { timestamps: true }
//  );


let Schema = mongoose.Schema;

//project schema definition
let ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
   }, 
  { 
    versionKey: false
  }
);

module.exports = mongoose.model('project', ProjectSchema);