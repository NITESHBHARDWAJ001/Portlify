import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Portfolio title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  thumbnail: {
    type: String,
    default: ''
  },
  canvasLayout: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    default: {
      sections: [],
      globalBackground: {
        type: 'color',
        value: '#ffffff'
      },
      responsive: {
        desktop: {},
        tablet: {},
        mobile: {}
      }
    }
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  publishedUrl: {
    type: String,
    default: ''
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  customDomain: {
    type: String,
    default: ''
  },
  settings: {
    allowComments: {
      type: Boolean,
      default: false
    },
    showAnalytics: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Generate slug from username before saving
portfolioSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('owner')) {
    const user = await mongoose.model('User').findById(this.owner);
    if (user) {
      const suffix = this._id.toString().slice(-6);
      this.slug = `${user.username}-${suffix}`;
      this.publishedUrl = `/p/${user.username}-${suffix}`;
    }
  }
  next();
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;
