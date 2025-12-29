import { Request, Response, NextFunction } from "express";
import { body, param, query, ValidationChain } from "express-validator";
const { Product, Restaurant, Category, User } = require("../../models");
import { Op } from "sequelize";

export const validateExistantUser_login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const result = await User.findOne({ where: { email: email } });
    if (!result) {
      res.status(400).json({
        error: `Invalid credentials`,
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

export const validateExistantUser_register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const result = await User.findOne({ where: { email: email } });
    if (result) {
      res.status(400).json({
        error: `A user with the email ${email} already exists.`,
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

export const validateExistantCreateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId, restaurantId } = req.body;
  try {
    const category = await Category.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      res.status(404).json({
        error: "Category not found",
        success: false,
      });
      return;
    }
    const restaurant = await Restaurant.findOne({
      where: { id: restaurantId },
    });
    if (!restaurant) {
      res.status(404).json({
        error: "Restaurant not found",
        success: false,
      });
      return;
    }
    next();
  } catch (error: any) {
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const validateExistantCreateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  try {
    const restaurant = await Restaurant.findOne({
      where: { name: name },
    });
    if (restaurant) {
      res.status(404).json({
        error: "A restaurant with that name already exists!",
        success: false,
      });
      return;
    }
    next();
  } catch (error: any) {
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const validateExistantCreateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  try {
    const category = await Category.findOne({
      where: { name: name },
    });
    if (category) {
      res.status(404).json({
        error: "A category with that name already exists!",
        success: false,
      });
      return;
    }
    next();
  } catch (error: any) {
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const validateExistantDeleteProd = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  try {
    const product = await Product.findOne({
      where: { id: id },
    });
    if (!product) {
      res.status(404).json({
        error: "A product with that id not exists!",
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const validateExistantDeleteCat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  try {
    const category = await Category.findOne({
      where: { id: id },
    });
    if (!category) {
      res.status(404).json({
        error: "A category with that id not exists!",
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const validateExistantDeleteRest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    const restaurant = await Restaurant.findOne({
      where: { id: id },
    });
    if (!restaurant) {
      res.status(404).json({
        error: "A restaurant with that id not exists!",
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const validateExistanProd_byId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: { id: id, isAvailable: true },
    });
    if (!product || product.isAvailable == false) {
      res.status(404).json({
        error: "A product with that id not exists!",
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const validateExistanProd_byCat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;
  try {
    const product = await Product.findOne({
      where: { categoryId: categoryId, isAvailable: true },
    });
    if (!product || product.isAvailable == false) {
      res.status(404).json({
        error: "A product with that categoryId not exists!",
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const validateExistanProd_byRest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { restaurantId } = req.params;
  try {
    const product = await Product.findOne({
      where: { restaurantId: restaurantId, isAvailable: true },
    });
    if (!product || product.isAvailable == false) {
      res.status(404).json({
        error: "A product with that restaurantId not exists!",
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const validateExistanRest_byId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findOne({
      where: { id: id },
    });
    if (!restaurant) {
      res.status(404).json({
        error: "A restaurant with that id not exists!",
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const validateExistantRes_byName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nameSlug } = req.params;
  try {
    const restaurant = await Restaurant.findOne({
      where: { name: nameSlug },
    });
    if (!restaurant) {
      res.status(404).json({
        error: "A restaurant with that name not exists!",
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const validateExistanCat_byId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({
      where: { id: id },
    });
    if (!category) {
      res.status(404).json({
        error: "A category with that id not exists!",
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const validateExistantCat_byName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nameSlug } = req.params;
  try {
    const category = await Category.findOne({
      where: { name: nameSlug },
    });
    if (!category) {
      res.status(404).json({
        error: "A category with that name not exists!",
        success: false,
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};

export const validateExistantRes_bySearchName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const search_name = String(req.query.searchTerm);

  try {
    const restaurants = await Restaurant.findAll({
      where: {
        name: {
          [Op.like]: `%${search_name}%`,
        },
      },
    });
    if (!restaurants || restaurants.length === 0) {
      res.status(404).json({
        error: "A restaurant with that name not exists!",
        success: false,
      });
      return;
    }
    next();
  } catch (error) {
    console.error("Error searching restaurants:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      success: false,
    });
  }
};
