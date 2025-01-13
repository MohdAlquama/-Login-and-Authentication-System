import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define the image schema
const gallerySchema = new Schema(
  {
    image_name: {
      type: String,
      required: true, // Image name is required
    },
    created_at: {
      type: Date,
      default: Date.now, // Automatically set the creation date
    },
    updated_at: {
      type: Date,
      default: Date.now, // Automatically set the update date
    },
  }
  
);

// Create the model
const Image = mongoose.model.Image || model('Image',gallerySchema);

export default Image;
