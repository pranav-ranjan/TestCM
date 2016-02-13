
var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var OrderSchema = new Schema({
  product : {
    type : String, required: true, trim: true
  },
  price : {
    type : Number,
  },
  quantity : {
    type : Number,
  }
});

var CustomerSchema = new Schema({
  firstName : {
    type : String, required: true, trim: true
  },
  lastName : {
    type : String, required: true, trim: true
  },
  email : {
    type : String, required: true, trim: true
  },
  address : {
    type : String, required: true, trim: true
  },
  city : {
    type : String, required: true, trim: true
  },
  stateId : {
    type : Number, required: true
  },
  state : {
    id : {
      type : Number
    },
    abbreviation : {
      type : String, required: true, trim: true
    },
    name : {
      type :  String, required: true, trim: true
    }
  },
  zip : {
    type : Number, required: true
  },
  gender : {
    type : String,
  },
  id : {
    type : Number, required: true, unique: true
  },
  orderCount : {
    type : Number,
  },
  orders: [OrderSchema],
});

  mongoose.model('Customer', CustomerSchema);
