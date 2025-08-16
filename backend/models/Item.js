import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({

  title: { type: String, required: true },
  description: String,
  image: String,
  

  category: {
    type: String,
    enum: ['Documents', 'Photographs', 'Audio', 'Video', 'Artifacts', 'Digital', 'Other'],
    default: 'Other'
  },
  format: {
    type: String,
    enum: ['Text', 'Image', 'Audio', 'Video', 'PDF', 'Digital', 'Physical', 'Other'],
    default: 'Other'
  },
  condition: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Poor'],
    default: 'Good'
  },
  period: String, 
  subject: [String], 
  keywords: [String],
  language: { type: String, default: 'English' },
  

  source: String,
  donor: String,
  acquisitionDate: Date,
  originalLocation: String, 
  
  isPublic: { type: Boolean, default: true },
  accessLevel: {
    type: String,
    enum: ['Public', 'Restricted', 'Private'],
    default: 'Public'
  },
  copyrightStatus: String,
  
  dimensions: String, 
  tags: [String],
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  viewCount: { type: Number, default: 0 },
  downloadCount: { type: Number, default: 0 }
});

itemSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default mongoose.model('Item', itemSchema);