import * as Yup from "yup";

export const buyerValidations = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string().required("Phone is required"),
  buyingType: Yup.string().required("Buying Type is required"),
  diamondPurchase: Yup.object({
    diamondType: Yup.string().required("Diamond Type is required"),
    weight: Yup.number()
      .required("Weight is required")
      .positive("Weight must be positive")
      .min(0.1, "Weight must be at least 0.1"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive")
      .min(0.1, "Price must be at least 0.1"),
  }).required("Diamond Purchase is required"),
  extraCharges: Yup.number()
    .required("Extra Charges are required")
    .positive("Extra Charges must be positive")
    .min(0, "Extra Charges must be at least 0"),
});
