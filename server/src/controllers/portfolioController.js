import Portfolio from '../models/Portfolio.js';
import User from '../models/User.js';

// @desc    Create new portfolio
// @route   POST /api/portfolios
// @access  Private
export const createPortfolio = async (req, res, next) => {
  try {
    const { title, description, canvasLayout } = req.body;

    const portfolio = await Portfolio.create({
      title,
      description,
      canvasLayout,
      owner: req.user.id
    });

    // Add portfolio to user's portfolios array
    await User.findByIdAndUpdate(req.user.id, {
      $push: { portfolios: portfolio._id }
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio created successfully',
      data: { portfolio }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all portfolios for current user
// @route   GET /api/portfolios
// @access  Private
export const getMyPortfolios = async (req, res, next) => {
  try {
    const portfolios = await Portfolio.find({ owner: req.user.id })
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: portfolios.length,
      data: { portfolios }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single portfolio by ID
// @route   GET /api/portfolios/:id
// @access  Private
export const getPortfolioById = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id)
      .populate('owner', 'username fullName avatar');

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Check if user is owner or portfolio is public
    if (portfolio.owner._id.toString() !== req.user.id && !portfolio.isPublic) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this portfolio'
      });
    }

    res.status(200).json({
      success: true,
      data: { portfolio }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update portfolio
// @route   PUT /api/portfolios/:id
// @access  Private
export const updatePortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Check ownership
    if (portfolio.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this portfolio'
      });
    }

    // Only allow explicit fields — prevents mass assignment
    if (req.body.title !== undefined) portfolio.title = req.body.title;
    if (req.body.description !== undefined) portfolio.description = req.body.description;

    // canvasLayout is Mixed — must use markModified so Mongoose persists the change
    if (req.body.canvasLayout !== undefined) {
      portfolio.canvasLayout = req.body.canvasLayout;
      portfolio.markModified('canvasLayout');
    }

    const updated = await portfolio.save();

    res.status(200).json({
      success: true,
      message: 'Portfolio updated successfully',
      data: { portfolio: updated }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete portfolio
// @route   DELETE /api/portfolios/:id
// @access  Private
export const deletePortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Check ownership
    if (portfolio.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this portfolio'
      });
    }

    await portfolio.deleteOne();

    // Remove from user's portfolios array
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { portfolios: portfolio._id }
    });

    res.status(200).json({
      success: true,
      message: 'Portfolio deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Publish/unpublish portfolio
// @route   PUT /api/portfolios/:id/publish
// @access  Private
export const togglePublishPortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Check ownership
    if (portfolio.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to publish this portfolio'
      });
    }

    const willPublish = !portfolio.isPublished;

    // Enforce one published portfolio per user:
    // unpublish all others before publishing this one
    if (willPublish) {
      await Portfolio.updateMany(
        { owner: req.user.id, _id: { $ne: portfolio._id } },
        { $set: { isPublished: false, isPublic: false } }
      );
    }

    portfolio.isPublished = willPublish;
    portfolio.isPublic = willPublish;
    await portfolio.save();

    res.status(200).json({
      success: true,
      message: `Portfolio ${portfolio.isPublished ? 'published' : 'unpublished'} successfully`,
      data: { portfolio }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get published portfolio by username
// @route   GET /api/portfolios/p/:username
// @access  Public
export const getPublishedPortfolio = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const portfolio = await Portfolio.findOne({
      owner: user._id,
      isPublished: true
    })
      .sort({ updatedAt: -1 })
      .populate('owner', 'username fullName avatar bio');

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'No published portfolio found for this user'
      });
    }

    // Increment views
    portfolio.views += 1;
    await portfolio.save();

    res.status(200).json({
      success: true,
      data: { portfolio }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all published portfolios (discover page)
// @route   GET /api/portfolios/discover
// @access  Public
export const discoverPortfolios = async (req, res, next) => {
  try {
    const { page = 1, limit = 12, sort = '-views' } = req.query;

    const portfolios = await Portfolio.find({
      isPublished: true,
      isPublic: true
    })
      .populate('owner', 'username fullName avatar')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Portfolio.countDocuments({
      isPublished: true,
      isPublic: true
    });

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: { portfolios }
    });
  } catch (error) {
    next(error);
  }
};
