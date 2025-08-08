import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.model('Item', itemSchema);