import { body, param, query, ValidationChain } from "express-validator";

export const validateCreateProduct: ValidationChain[] = [
  body("name")
    .isString()
    .withMessage("The name of the product must be a string!")
    .notEmpty()
    .withMessage("The field 'name' can´t be empty!"),
  body("description")
    .isString()
    .withMessage("The description of the product must be a string!")
    .notEmpty()
    .withMessage("The field 'description' can´t be empty!")
    .isLength({ max: 100 })
    .withMessage("The length of the description can´t be higher than 100!"),
  body("price")
    .isFloat({ min: 1, max: 10000 })
    .withMessage(
      "The price of the product must be a float and higher than $1 and lower than 10000!"
    )
    .notEmpty()
    .withMessage("The field 'price' can´t be empty!"),
  body("isAvailable")
    .isBoolean()
    .withMessage("The field 'isAvailable' must be boolean")
    .notEmpty()
    .withMessage("The field 'isAvailable' can´t be empty!"),
  body("categoryId")
    .notEmpty()
    .withMessage("The field 'categoryId' can´t be empty!")
    .isInt()
    .withMessage("The field 'categoryId' must be an integer!"),
  body("restaurantId")
    .notEmpty()
    .withMessage("The field 'restaurantId' can´t be empty!")
    .isInt()
    .withMessage("The field 'restaurantId' must be an integer!"),
];

export const validateRegisterUser: ValidationChain[] = [
  body("firstName")
    .trim()
    .isString()
    .withMessage("First name must be a string!")
    .notEmpty()
    .withMessage("First name is required!")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters!")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("First name can only contain letters and spaces!"),
  body("surName")
    .trim()
    .isString()
    .withMessage("Surname must be a string!")
    .notEmpty()
    .withMessage("Surname is required!")
    .isLength({ min: 2, max: 50 })
    .withMessage("Surname must be between 2 and 50 characters!")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("Surname can only contain letters and spaces!"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address!")
    .notEmpty()
    .withMessage("Email is required!")
    .isLength({ max: 100 })
    .withMessage("Email cannot exceed 100 characters!"),
  body("password")
    .isString()
    .withMessage("Password must be a string!")
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 8, max: 100 })
    .withMessage("Password must be between 8 and 100 characters!")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character!"
    ),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match!");
    }
    return true;
  }),
  body("role")
    .optional()
    .isString()
    .withMessage("Role must be a string!")
    .isIn(["admin", "user"])
    .withMessage("Invalid role! Must be: admin or user")
    .default("admin"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean (true/false)!")
    .toBoolean()
    .default(true),
];

export const validateLoginUser: ValidationChain[] = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address!")
    .notEmpty()
    .withMessage("Email is required!")
    .isLength({ max: 100 })
    .withMessage("Email cannot exceed 100 characters!"),
  body("password")
    .isString()
    .withMessage("Password must be a string!")
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 8, max: 100 })
    .withMessage("Password must be between 8 and 100 characters!")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character!"
    ),
];

export const validateCreateRestaurant: ValidationChain[] = [
  body("name")
    .isString()
    .withMessage("The name of the restaurant must be a string!")
    .notEmpty()
    .withMessage("The field 'name' can't be empty!")
    .isLength({ max: 50 })
    .withMessage("The length of the name can't be higher than 50 characters!"),
  body("description")
    .isString()
    .withMessage("The description of the restaurant must be a string!")
    .notEmpty()
    .withMessage("The field 'description' can't be empty!")
    .isLength({ max: 200 })
    .withMessage(
      "The length of the description can't be higher than 200 characters!"
    ),
  body("address")
    .isString()
    .withMessage("The address of the restaurant must be a string!")
    .notEmpty()
    .withMessage("The field 'address' can't be empty!")
    .isLength({ max: 100 })
    .withMessage(
      "The length of the address can't be higher than 100 characters!"
    ),
  body("phone")
    .isString()
    .withMessage("The phone number must be a string!")
    .notEmpty()
    .withMessage("The field 'phone' can't be empty!")
    .matches(/^[\d\s\-()+]+$/)
    .withMessage("The phone number format is invalid!")
    .isLength({ min: 8, max: 20 })
    .withMessage("The phone number must be between 8 and 20 characters!"),
  body("isActive")
    .isBoolean()
    .withMessage("The field 'isActive' must be a boolean!")
    .notEmpty()
    .withMessage("The field 'isActive' can't be empty!"),
];


export const validateCreateCategory: ValidationChain[] = [
  body("name")
    .isString()
    .withMessage("The category name must be a string!")
    .notEmpty()
    .withMessage("The field 'name' can't be empty!")
    .isLength({ max: 50 })
    .withMessage("The length of the category name can't be higher than 50 characters!")
    .trim()
    .escape(),
  body("isActive")
    .isBoolean()
    .withMessage("The field 'isActive' must be a boolean!")
    .notEmpty()
    .withMessage("The field 'isActive' can't be empty!"),
];