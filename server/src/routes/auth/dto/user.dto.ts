import { check } from "express-validator";
export interface RegisterInput {
  username: string;
  password: string;
}
// export const UserRegisterSchema = Joi.object({
// username: Joi.string().alphanum().min(3).max(30).required(),
// password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
// });

export const userRegisterValidator = () => [
  check("username")
    .notEmpty()
    .withMessage("username is required")
    .not()
    .custom((val) => /[^A-za-z0-9\s]/g.test(val))
    .withMessage("username must not use unique characters"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password length must be >=8"),
];
