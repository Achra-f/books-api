import { body } from "express-validator";

export const bookPostValidationRules = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required').bail()
        .isLength({ min: 2, max: 100 }).withMessage('Title seems too short or too long')
        .matches(/^[a-zA-Z0-9À-ž\s'"\-:,.!?()]+$/).withMessage("Title name contains invalid characters")
        .escape(),

    body("author")
        .trim()
        .notEmpty().withMessage('Author is required').bail()
        .isLength({ min: 2, max: 50 }).withMessage('Author seems too short or too long')
        .matches(/^[a-zA-ZÀ-ž\s'-]+$/).withMessage('Author name contains invalid characters')
        .escape(),

    body('year')
        .notEmpty().withMessage('Year is required').bail()
        .isInt({ min: 0 }).withMessage('Year must be a valid number')
        .escape(),
];

export const bookPatchValidationRules = [
    body('title')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('Title seems too short or too long')
        .matches(/^[a-zA-Z0-9À-ž\s'"\-:,.!?()]+$/).withMessage("Title contains invalid characters")
        .escape(),

    body('author')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('Author seems too short or too long')
        .matches(/^[a-zA-ZÀ-ž\s'-]+$/).withMessage('Author contains invalid characters')
        .escape(),

    body('year')
        .optional()
        .isInt({ min: 0 }).withMessage('Year must be a valid number')
        .escape(),
];