import Template from '../models/Template.js';
import User from '../models/User.js';

// @desc    Create new template
// @route   POST /api/templates
// @access  Private
export const createTemplate = async (req, res, next) => {
  try {
    const { name, description, canvasLayout, category, tags, isPublic } = req.body;

    const template = await Template.create({
      name,
      description,
      canvasLayout,
      category,
      tags,
      isPublic,
      author: req.user.id
    });

    // Add template to user's templates array
    await User.findByIdAndUpdate(req.user.id, {
      $push: { templates: template._id }
    });

    res.status(201).json({
      success: true,
      message: 'Template created successfully',
      data: { template }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all public templates (marketplace)
// @route   GET /api/templates
// @access  Public
export const getPublicTemplates = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      sort = '-likesCount',
      search 
    } = req.query;

    const query = { isPublic: true };

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    const templates = await Template.find(query)
      .populate('author', 'username fullName avatar')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Template.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: { templates }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get templates by current user
// @route   GET /api/templates/my
// @access  Private
export const getMyTemplates = async (req, res, next) => {
  try {
    const templates = await Template.find({ author: req.user.id })
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: templates.length,
      data: { templates }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single template by ID
// @route   GET /api/templates/:id
// @access  Public
export const getTemplateById = async (req, res, next) => {
  try {
    const template = await Template.findById(req.params.id)
      .populate('author', 'username fullName avatar');

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }

    // Check if template is public or belongs to user
    if (!template.isPublic && (!req.user || template.author._id.toString() !== req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this template'
      });
    }

    res.status(200).json({
      success: true,
      data: { template }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update template
// @route   PUT /api/templates/:id
// @access  Private
export const updateTemplate = async (req, res, next) => {
  try {
    let template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }

    // Check ownership
    if (template.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this template'
      });
    }

    template = await Template.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Template updated successfully',
      data: { template }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete template
// @route   DELETE /api/templates/:id
// @access  Private
export const deleteTemplate = async (req, res, next) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }

    // Check ownership
    if (template.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this template'
      });
    }

    await template.deleteOne();

    // Remove from user's templates array
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { templates: template._id }
    });

    res.status(200).json({
      success: true,
      message: 'Template deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Use template (increment usage count)
// @route   POST /api/templates/:id/use
// @access  Private
export const useTemplate = async (req, res, next) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }

    if (!template.isPublic && template.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to use this template'
      });
    }

    // Increment usage count
    template.usageCount += 1;
    await template.save();

    res.status(200).json({
      success: true,
      message: 'Template loaded successfully',
      data: { template }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Like/unlike template
// @route   POST /api/templates/:id/like
// @access  Private
export const toggleLikeTemplate = async (req, res, next) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }

    const likeIndex = template.likes.indexOf(req.user.id);

    if (likeIndex === -1) {
      // Add like
      template.likes.push(req.user.id);
      template.likesCount += 1;
      
      // Add to user's saved templates
      await User.findByIdAndUpdate(req.user.id, {
        $addToSet: { savedTemplates: template._id }
      });
    } else {
      // Remove like
      template.likes.splice(likeIndex, 1);
      template.likesCount -= 1;
      
      // Remove from user's saved templates
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { savedTemplates: template._id }
      });
    }

    await template.save();

    res.status(200).json({
      success: true,
      message: likeIndex === -1 ? 'Template liked' : 'Template unliked',
      data: { 
        liked: likeIndex === -1,
        likesCount: template.likesCount 
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get saved templates
// @route   GET /api/templates/saved
// @access  Private
export const getSavedTemplates = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'savedTemplates',
        populate: { path: 'author', select: 'username fullName avatar' }
      });

    res.status(200).json({
      success: true,
      count: user.savedTemplates.length,
      data: { templates: user.savedTemplates }
    });
  } catch (error) {
    next(error);
  }
};
