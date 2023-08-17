"use client"
import { useState, useEffect } from "react";
import { useCustomerContext } from "@/app/context/CustomerContext";

export default function ViewMore({ params }) {
  // Get customer data from the context
  const { customers } = useCustomerContext();
  
  // State to hold the selected customer
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    // Decode the customer email from the URL params
    const decodedEmail = decodeURIComponent(params.customer);
    
    // Find the customer with the decoded email
    const foundCustomer = customers.find((c) => c.email === decodedEmail);
    
    // Update the customer state
    setCustomer(foundCustomer);
  }, [params.customer, customers]);

  return (
    <div className="flex justify-center mt-4 items-center">
      <div className="p-4 w-1/2">
        {customer ? (
          // Display customer information if available
          <div className="bg-white rounded-lg shadow-md p-2">
            <div className="flex items-center mb-4">
              <h2 className="text-lg font-semibold">{customer.name}</h2>
            </div>
            <p className="text-gray-700">Email {customer.email}</p>
            <p className="text-gray-700">Phone {customer.phone}</p>
          </div>
        ) : (
          // Display loading message while customer data is being fetched
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
