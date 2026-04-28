import mongoose from 'mongoose';

// This schema defines the structure for canvas layouts
// Used to validate and store canvas JSON data

const componentStyleSchema = new mongoose.Schema({
  backgroundColor: String,
  textColor: String,
  fontSize: String,
  fontFamily: String,
  fontWeight: String,
  textAlign: String,
  padding: String,
  margin: String,
  borderRadius: String,
  boxShadow: String,
  border: String,
  width: String,
  height: String,
  opacity: Number,
  gradient: String,
  animation: String
}, { _id: false });

const componentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  content: mongoose.Schema.Types.Mixed,
  style: componentStyleSchema,
  position: {
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    rotation: Number
  },
  props: mongoose.Schema.Types.Mixed
}, { _id: false });

const sectionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  title: String,
  components: [componentSchema],
  layout: {
    type: String,
    enum: ['grid', 'flex', 'absolute'],
    default: 'flex'
  },
  background: {
    type: String,
    color: String,
    image: String,
    gradient: String,
    pattern: String
  },
  style: componentStyleSchema,
  order: Number
}, { _id: false });

const canvasLayoutSchema = new mongoose.Schema({
  sections: [sectionSchema],
  globalBackground: {
    type: {
      type: String,
      enum: ['color', 'gradient', 'image', 'pattern'],
      default: 'color'
    },
    value: String
  },
  responsive: {
    desktop: mongoose.Schema.Types.Mixed,
    tablet: mongoose.Schema.Types.Mixed,
    mobile: mongoose.Schema.Types.Mixed
  },
  metadata: {
    lastEditedAt: Date,
    version: {
      type: String,
      default: '1.0.0'
    }
  }
}, { _id: false });

export default canvasLayoutSchema;
