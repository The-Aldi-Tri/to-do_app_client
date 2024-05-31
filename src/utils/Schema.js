import * as yup from "yup";

// Username schema
const usernameSchema = yup
  .string()
  .matches(
    /^[a-zA-Z0-9]+$/,
    "Username must contain only alphanumeric characters"
  )
  .min(3, "Username must be at least 3 characters")
  .max(50, "Username must be at most 50 characters")
  .required("Username is required");

// Email schema
const emailSchema = yup
  .string()
  .email("Invalid email address")
  .required("Email is required");

// Password schema
const passwordSchema = yup
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must not exceed 128 characters")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(
    /^[a-zA-Z0-9]+$/,
    "Password must contain only alphanumeric characters"
  )
  .required("Password is required");

// Register schema
export const registerSchema = yup.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Confirm password must match password")
    .required("Confirmation Password is required"),
});

// Login schema
export const loginSchema = yup.object({
  email_or_username: yup
    .string()
    .test(
      "is-email-or-username",
      "Must be a valid email or username",
      function (value) {
        const { path, createError } = this;
        const isEmail = emailSchema.isValidSync(value);
        const isUsername = usernameSchema.isValidSync(value);
        if (!isEmail && !isUsername) {
          return createError({
            path,
            message: "Must be a valid email or username",
          });
        }
        return true;
      }
    )
    .required("Email or Username is required"),
  password: passwordSchema,
  remember_me: yup.boolean().required("Remember me is required"),
});

// Change password schema
export const changePasswordSchema = yup.object({
  current_password: passwordSchema,
  new_password: yup
    .string()
    .min(8, "New password must be at least 8 characters")
    .max(128, "New password must not exceed 128 characters")
    .matches(/[a-z]/, "New password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "New password must contain at least one uppercase letter")
    .matches(/[0-9]/, "New password must contain at least one number")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "New password must contain only alphanumeric characters"
    )
    .notOneOf(
      [yup.ref("current_password")],
      "New password must be different from current password"
    )
    .required("New Password is required"),
});

export const editProfileSchema = yup.object({
  username: usernameSchema,
  email: emailSchema,
});

export const taskSchema = yup.object({
  task: yup
    .string()
    .min(3, "Task must be at least 3 characters")
    .max(100, "Task must not exceed 100 characters")
    .required("Task is required"),
  details: yup.string().max(350, "Task must not exceed 350 characters"),
  finished: yup.boolean().required("Finished is required"),
});
