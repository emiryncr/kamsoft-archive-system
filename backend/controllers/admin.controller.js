import User from '../models/User.js';
import Item from '../models/Item.js';
import bcrypt from 'bcrypt';

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;
    
    if (!['user', 'archiver', 'admin'].includes(newRole)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      userId, 
      { role: newRole }, 
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newAdmin = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate('createdBy', 'name username')
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await Item.deleteMany({ createdBy: id });
        
        await User.findByIdAndDelete(id);
        
        res.json({ 
            message: 'User and all associated items deleted successfully',
            deletedUserId: id 
        });
    } catch (err) {
        console.error('Delete user error:', err);
        res.status(500).json({ 
            message: 'Error deleting user', 
            error: err.message 
        });
    }
};

export { deleteUser };

export {
  getAllUsers,
  updateUserRole,
  createAdmin,
  getAllItems,
  deleteItem
};