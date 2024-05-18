import * as yup from "yup";

export const signupSchema = yup.object({
  username: yup
    .string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Username must contain only alphanumeric characters"
    )
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at max 30 characters")
    .required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must not exceed 30 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Password must contain only alphanumeric characters"
    )
    .required("Password is required"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export const loginSchema = yup.object({
  emailOrUsername: yup
    .string()
    .required("Email or username is required")
    .test(
      "is-email-or-username",
      "Invalid email address or username",
      function (value) {
        const { path, createError } = this;
        if (!value) return false;

        // Check if it contains '@'
        if (value.includes("@")) {
          try {
            // Attempt to validate as an email
            yup.string().email().validateSync(value);
            // If it's a valid email, return true
            return true;
          } catch (emailError) {
            // If it's not a valid email, return an error
            return createError({ path, message: "Invalid email address" });
          }
        } else {
          // If it doesn't contain '@', validate as a username
          const usernameSchema = yup
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(30, "Username must not exceed 30 characters")
            .matches(
              /^[a-zA-Z0-9]+$/,
              "Username must contain only alphanumeric characters"
            );
          try {
            // Attempt to validate as a username
            usernameSchema.validateSync(value);
            // If it's a valid username, return true
            return true;
          } catch (usernameError) {
            // If it's not a valid username, return an error
            return createError({ path, message: "Invalid username" });
          }
        }
      }
    ),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must not exceed 30 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Password must contain only alphanumeric characters"
    )
    .required("Password is required"),
});
