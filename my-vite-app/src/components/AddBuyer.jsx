import { NavLink, useNavigate } from "react-router-dom";
import { buyerValidations } from "../validationsSchema/buyerValidation";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addBuyer } from "../redux/buyersReducer";
import Input from "../utils/Input";
import Select from "../utils/Select";
import Textarea from "../utils/TextArea";

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

  const options = [
    { value: "Retail", label: "Retail" },
    { value: "Wholesale", label: "Wholesale" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800">
        <h1 className="text-2xl text-center font-bold text-gray-800 dark:text-white mb-6">
          Add Buyer Details
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              label="Name"
              name="name"
              id="name"
              formik={formik}
            />
            <Input
              type="text"
              label="Email"
              name="email"
              id="email"
              formik={formik}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Buying Type"
              name="buyingType"
              options={options}
              formik={formik}
            />
            <Input
              type="text"
              label="Phone"
              name="phone"
              id="phone"
              formik={formik}
            />
          </div>
          <Textarea label="Address" name="address" formik={formik} />

          {/* Diamond Purchase Details */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Diamond Purchase Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="text"
                label="Diamond Type"
                name="diamondPurchase.diamondType"
                id="diamondType"
                formik={formik}
              />
              <Input
                type="text"
                label="Diamond Weight"
                name="diamondPurchase.weight"
                id="weight"
                formik={formik}
              />

              <Input
                type="text"
                label="Diamond Price"
                name="diamondPurchase.price"
                id="price"
                formik={formik}
              />
            </div>
          </div>

          {/* Extra Charges */}
          <Input
            type="text"
            label="Extra Charges"
            name="extraCharges"
            id="extraCharges"
            formik={formik}
          />

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
