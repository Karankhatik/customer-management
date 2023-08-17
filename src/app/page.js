"use client"
import { useEffect } from "react";
import { useCustomerContext } from "@/app/context/CustomerContext";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  // Retrieve customer-related context
  const { removeCustomer, customers, setCustomers } = useCustomerContext();
  const router = useRouter();

  // Fetch customer data on component mount
  useEffect(() => {
    getData();
  }, []);

  // Fetch customer data from API
  const getData = async () => {
    try {
      const response = await fetch("https://customer-management-server-4xbj.onrender.com/api/v1/customer/customers");
      const data = await response.json();
      setCustomers(data.customers);
    } catch (error) {
      toast.error('Error fetching customers! please try again');
    }
  };

  // Delete customer by email
  const onDelete = async (email) => {
    const confirmed = window.confirm("Are you sure you want to delete this customer?");
    if (!confirmed) {
      return; // User cancelled deletion
      toast.info('Customer deletion cancelled!');
    }

    try {
      const response = await fetch(`https://customer-management-server-4xbj.onrender.com/api/v1/customer/delete-customer/${email}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Successfully deleted from the database, update the local state.
        await removeCustomer(email);
        toast.success('Customer deleted successfully!');
      } else {
        throw new Error("Error deleting customer");
        toast.error('Error deleting customer! please try again');
      }
    } catch (error) {
      toast.error('Error deleting customer! please try again');      
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full bg-white border-collapse overflow-hidden rounded-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-2 md:px-4 text-left">Email</th>
                <th className="py-2 px-2 md:px-4 text-left">Name</th>
                <th className="py-2 px-2 md:px-4 text-left">Number</th>
                <th className="py-2 px-2 md:px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {customers.map((customer) => (
                <tr key={customer.email} className="border-t border-gray-300">
                  <td className="py-2 px-2 md:px-4">{customer?.email}</td>
                  <td className="py-2 px-2 md:px-4">{customer?.name}</td>
                  <td className="py-2 px-2 md:px-4">{customer?.phone}</td>
                  <td className="py-2 px-2 md:px-4">
                    <div className="flex flex-wrap space-x-2">
                      <button
                        className="text-xs font-medium shadow-md px-2 py-1 md:px-3 md:py-2 rounded bg-blue-500 hover:bg-blue-600 transition-all duration-200 ease-in-out text-white"
                        onClick={() => router.push(`/${customer?.email}`)}
                      >
                        View More
                      </button>&nbsp; &nbsp;
                      <button
                        className="text-xs font-medium shadow-md px-2 py-1 md:px-3 md:py-2 rounded bg-blue-500 hover:bg-blue-600 transition-all duration-200 ease-in-out text-white"
                        onClick={() => onDelete(customer?.email)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer autoClose={2000}/>
    </div>
  );
}
