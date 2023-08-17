"use client"; 
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCustomerContext } from "@/app/context/CustomerContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCustomer = () => {
  const { setCustomers } = useCustomerContext(); // Access the setCustomers function from the customer context.

  // Validation schema to define form validation rules
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    name: Yup.string().required("Name is required").min(3, "Name is too short"),
    phone: Yup.number()
      .required("Phone number is required")
      .min(1000000000, "Invalid Phone Number!")
      .max(9999999999, "Invalid Phone Number!"),
  });

  // Initial values for the form fields
  const initialValues = {
    email: "",
    name: "",
    phone: "",
  };

  // Function to handle form submission
  const onSubmit = async (values, { resetForm }) => {
    try {
      // Send a POST request to add a new customer
      const response = await fetch("http://localhost:8000/api/v1/customer/add-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // If the request is successful, update the customers list
        const newCustomer = { ...values };
        toast.success('Customer added successfully!');
        setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
        resetForm(); // Clear the form fields after successful submission
      } else {        
        toast.error('Error adding customer! please try again');
        
      }
    } catch (error) {
      toast.error('Error adding customer! please try again');
    }
  };

  // Initialize formik form handling
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="flex justify-center mt-5">
      
      <div className="w-full sm:max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add Customer</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Email field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {/* Display email validation error */}
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600 mt-1">{formik.errors.email}</div>
            ) : null}
          </div>
          {/* Name field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {/* Display name validation error */}
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-600 mt-1">{formik.errors.name}</div>
            ) : null}
          </div>
          {/* Phone field */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {/* Display phone validation error */}
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-600 mt-1">{formik.errors.phone}</div>
            ) : null}
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all duration-200"
            disabled={formik.isSubmitting} // Disable the button during form submission
          >
            Add Customer
          </button>
        </form>
      </div>
      <ToastContainer autoClose={2000}/>
    </div>
  );
};

export default AddCustomer;
