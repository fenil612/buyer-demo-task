import { NavLink, useNavigate } from "react-router-dom";
import { buyerValidations } from "../validationsSchema/buyerValidation";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addBuyer } from "../redux/buyersReducer";

const AddBuyer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      buyingType: "",
      diamondPurchase: {
        diamondType: "",
        weight: "",
        price: "",
      },
      extraCharges: "",
    },
    validationSchema: buyerValidations,
    onSubmit: async (values) => {
      console.log("values==>", values);
      dispatch(addBuyer(values));
      navigate("/buyers");
      formik.resetForm();
    },
  });

  const { handleChange, handleSubmit, values, errors, touched, handleBlur } =
    formik;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800">
        <h1 className="text-2xl text-center font-bold text-gray-800 dark:text-white mb-6">
          Add Buyer Details
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-input border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-input border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className="form-input border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.address && errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="form-input border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.phone && errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="buyingType"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Buying Type
            </label>
            <select
              name="buyingType"
              id="buyingType"
              className="form-select mt-1"
              value={values.buyingType}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select</option>
              <option value="Retail">Retail</option>
              <option value="Wholesale">Wholesale</option>
            </select>
            {touched.buyingType && errors.buyingType && (
              <p className="text-red-500 text-sm mt-1">{errors.buyingType}</p>
            )}
          </div>

          {/* Diamond Purchase Details */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Diamond Purchase Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="diamondType"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Diamond Type
                </label>
                <input
                  type="text"
                  name="diamondPurchase.diamondType"
                  id="diamondType"
                  className="form-input border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  value={values.diamondPurchase.diamondType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.diamondPurchase?.diamondType &&
                  errors.diamondPurchase?.diamondType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.diamondPurchase.diamondType}
                    </p>
                  )}
              </div>
              <div>
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Weight
                </label>
                <input
                  type="number"
                  name="diamondPurchase.weight"
                  id="weight"
                  className="form-input border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  value={values.diamondPurchase.weight}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.diamondPurchase?.weight &&
                  errors.diamondPurchase?.weight && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.diamondPurchase.weight}
                    </p>
                  )}
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="diamondPurchase.price"
                  id="price"
                  className="form-input border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  value={values.diamondPurchase.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.diamondPurchase?.price &&
                  errors.diamondPurchase?.price && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.diamondPurchase.price}
                    </p>
                  )}
              </div>
            </div>
          </div>

          {/* Extra Charges */}
          <div>
            <label
              htmlFor="extraCharges"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Extra Charges
            </label>
            <input
              type="number"
              name="extraCharges"
              id="extraCharges"
              className="form-input border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              value={values.extraCharges}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.extraCharges && errors.extraCharges && (
              <p className="text-red-500 text-sm mt-1">{errors.extraCharges}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Add Buyer
            </button>
          </div>

          <p className="text-sm  text-center mt-4">
            See buyers list:{" "}
            <NavLink to="/buyers" className="text-primary-600 underline">
              Buyers List
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddBuyer;
