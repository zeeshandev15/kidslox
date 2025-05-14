import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'delivered', 'refunded'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model('Inventory', stockSchema);

export default Stock;
