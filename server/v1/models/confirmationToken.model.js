const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfirmationTokenSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  token: {
    type:String
  },
  createdAt:{
    type: Date,
    default: Date.now()
  },
  expiresAt:{
    type:Date

  }

});

const ConfirmationTokenModel = mongoose.model(
  'ConfirmationToken',
  ConfirmationTokenSchema
);

module.exports = ConfirmationTokenModel;
