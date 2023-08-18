"use client"
import React, { useState, useEffect } from "react";
import { useCustomerContext } from "@/app/context/CustomerContext";

export default function ViewMore({ params }) {
  const { customers } = useCustomerContext();

  const [customer, setCustomer] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");

  useEffect(() => {
    const decodedEmail = decodeURIComponent(params.customer);
    const foundCustomer = customers.find((c) => c.email === decodedEmail);
    setCustomer(foundCustomer);
  }, [params.customer, customers]);

  const handleUpdate = () => {
    if (!customer) return;

    // Prepare the updated customer data
    const updatedData = {
      name: updatedName || customer.name,
      email: updatedEmail || customer.email,
      phone: updatedPhone || customer.phone,
    };

    // Send update request to the API using the fetch API
    fetch(`https://customer-management-server-4xbj.onrender.com/api/v1/customer/update-customer/${customer.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update customer information locally
        setCustomer({ ...customer, ...updatedData });

        // Clear update input fields
        setUpdatedName("");
        setUpdatedEmail("");
        setUpdatedPhone("");
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

  return (
    <div className="flex justify-center mt-4 items-center">
      <div className="p-4">
        {customer ? (
          <div className="bg-white rounded-lg shadow-md p-2">
            <div className="flex items-center mb-4">
              <h2 className="text-lg font-semibold">{customer.name}</h2>
            </div>
            <p className="text-gray-700">Email {customer.email}</p>
            <p className="text-gray-700">Phone {customer.phone}</p>

            {/* Update form */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="New Name"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
              <input
                type="text"
                placeholder="New Email"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="New Phone"
                value={updatedPhone}
                onChange={(e) => setUpdatedPhone(e.target.value)}
              />
              <button className="px-4 py-2 mt-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all duration-200" onClick={handleUpdate}>Update</button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
