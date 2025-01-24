import { getIn } from "formik";

const Input = ({ label, className, type, name, id, formik }) => {
  // Use Formik's getIn utility to handle nested values and errors
  const value = getIn(formik.values, name);
  const error = getIn(formik.errors, name);
  const touched = getIn(formik.touched, name);

  return (
    <div>
      <label
        htmlFor={id || name}
        className={
          className
            ? className
            : "block text-sm font-medium text-gray-700 dark:text-gray-300 py-1"
        }
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id || name}
        className="form-input border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
        value={value || ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {touched && error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
