import { body } from 'express-validator';

const itemValidationRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required.')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters.'),
];

export { itemValidationRules };
