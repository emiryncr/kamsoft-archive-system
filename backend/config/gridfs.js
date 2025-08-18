import mongoose from 'mongoose';
import Grid from 'gridfs-stream';

let gfs, gridfsBucket;

const initGridFS = () => {
  const conn = mongoose.connection;
  
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });
  
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
  
  return { gfs, gridfsBucket };
};

export { initGridFS, gfs, gridfsBucket };