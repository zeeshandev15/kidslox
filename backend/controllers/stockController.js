import Stock from '../models/stockModel.js';

export const createInventory = async (req, res) => {
  try {
    const { name, location, joinedDate } = req.body;
    const image = req.file ? req.file.filename : null;
    const newInventory = new Stock({
      name,
      location,
      joinedDate: joinedDate || new Date(),
      status: 'pending',

      image,
    });

    await newInventory.save();
    res.status(201).json({ success: true, customer: newInventory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const inventorys = await Stock.find();
    res.status(200).json({ success: true, inventorys });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const inventory = await Stock.findById(req.params.id);
    if (!inventory) {
      return res.status(404).json({ success: false, message: 'Inventory not found!' });
    }
    res.status(200).json({ success: true, inventory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateInventory = async (req, res) => {
  try {
    const { name, joinedDate, location, status } = req.body;
    const inventoryId = req.params.id;

    const updateData = {
      name,
      joinedDate,
      location,
      status,
    };

    // ✅ Only add image field if a new file is uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedInventory = await Stock.findByIdAndUpdate(inventoryId, updateData, { new: true });

    if (!updatedInventory) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found!',
      });
    }

    res.status(200).json({ success: true, customer: updatedInventory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteInventory = async (req, res) => {
  try {
    const deletedInventory = await Stock.findByIdAndDelete(req.params.id);
    if (!deletedInventory) {
      return res.status(404).json({ success: false, message: 'Inventory not found!' });
    }

    res.status(200).json({ success: true, message: 'Inventory deleted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
