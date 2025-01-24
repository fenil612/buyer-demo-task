const Textarea = ({ label, name, id, rows = 4, formik }) => {
  return (
    <div>
      <label
        htmlFor={id || name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 py-1"
      >
        {label}
      </label>
      <textarea
        rows={rows}
        name={name}
        id={id || name}
        className="form-input border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
        value={formik?.values?.[name] || ""}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
      />
      {formik?.touched?.[name] && formik?.errors?.[name] && (
        <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default Textarea;
