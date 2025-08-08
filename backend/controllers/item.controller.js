import Item from '../models/Item.js';

const getAllItems = async (req, res, next) => {
  try {
    const items = await Item.find()
        .populate('createdBy', 'name username')
        .sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

const getItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id)
        .populate('createdBy', 'name username');
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
    } catch (err) {
        next(err);
    }
};

const createItem = async (req, res, next) => {
    try{
        const { title, description, image } = req.body;

        const newItem = new Item({
            title,
            description,
            image,
            createdBy: req.user.id
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        next(err);
    }
}

const updateItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (item.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You can only edit your own items' });
        }

        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('createdBy', 'name username');

        res.json(updatedItem);
    } catch (err) {
        next(err);
    }
}

const deleteItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        
        if (!item) {
        return res.status(404).json({ message: 'Item not found' });
        }

        if (item.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You can only delete your own items' });
        }

        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        next(err);
    }
}

export { getAllItems, getItem, createItem, updateItem, deleteItem };
