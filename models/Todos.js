const mongoose = require('mongoose');

const TodosSchema = new mongoose.Schema(
    
    
    {
 
    title: {
    type: String,
    required:true
  },
  Description: {
    type: String,
    maxlength: 300,
    required:true

  },
  finished: {
    type: Boolean,
    default:false
},
  finished_at:{
    type: Date,
  },
  createdAt:{
    type: Date,
    default:Date.now()
  },
  updatedAt:{
    type: Date,
    default:null
  },

}
// ,
// {
//       timestamps: { currentTime: () => Date.now() 
//     }
// }
);

module.exports = Todos = mongoose.model('todos', TodosSchema);