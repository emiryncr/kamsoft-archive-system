import express from 'express';
import multer from 'multer';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';
import crypto from 'crypto';
import path from 'path';

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
      'video/mp4',
      'video/avi'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

router.post('/file', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { buffer, originalname, mimetype, size } = req.file;

    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads'
    });

    const filename = crypto.randomUUID() + path.extname(originalname);

    const uploadStream = bucket.openUploadStream(filename, {
      metadata: {
        originalName: originalname,
        mimeType: mimetype,
        size: size,
        uploadDate: new Date()
      }
    });

    uploadStream.end(buffer);

    uploadStream.on('finish', () => {
      res.json({
        success: true,
        file: {
          fileId: uploadStream.id,
          filename: filename,
          originalName: originalname,
          size: size,
          mimeType: mimetype,
          uploadDate: new Date()
        }
      });
    });

    uploadStream.on('error', (error) => {
      res.status(500).json({ 
        message: 'File upload failed', 
        error: error.message 
      });
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

router.get('/file/:id', async (req, res) => {
  try {
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads'
    });

    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(req.params.id)
    );

    downloadStream.on('data', (chunk) => {
      res.write(chunk);
    });

    downloadStream.on('error', () => {
      res.status(404).json({ message: 'File not found' });
    });

    downloadStream.on('end', () => {
      res.end();
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;