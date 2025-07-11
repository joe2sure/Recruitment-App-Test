// models/PendMessages.js
import mongoose from 'mongoose';

const PendMessageSchema = new mongoose.Schema(
  {
 applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPost',
      required: true,
    },
    type: {
      type:String
    },

    timeToSend: {
      type: Date,
      required: true,
    },
    isSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('PendMessage', PendMessageSchema);
