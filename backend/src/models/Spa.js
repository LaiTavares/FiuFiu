const mongoose = require('mongoose');

const SpaSchema = new mongoose.Schema({
  thumbnail: String,
  company: String,
  price: Number,
  spaServices: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  toJSON: {
    virtuals: true,
  },
});

SpaSchema.virtual('thumbnail_url').get(function() {
  return `http://localhost:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spa', SpaSchema);