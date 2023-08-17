"use client"
import React, { createContext, useState } from "react";
export const CustomerContext = createContext();

export function CustomerProvider({children}) {
  // Declare state for Customers array
  const [customers, setCustomers] = useState([]);

  // Function to add a new Customer to the Customers array
  function addCustomer(customerEmail, customerName, customerPhone) {
    const newCustomer = { email: customerEmail, name: customerName, phone: customerPhone };

    // Check if the Customer already exists in the Customers array
    const isCustomerExists = customers.some(
      (customer) => customer.email === customerEmail
    );

    // If the Customer doesn't exist, add it to the Customers array
    if (!isCustomerExists) {
      setCustomers([...customers, newCustomer]);
    }
  }

  // Function to remove a Customer from the Customers array
  function removeCustomer(customerEmail) {
    // Create a new array excluding the Customer with the specified email
    const updatedCustomers = customers.filter(
      (customer) => customer.email !== customerEmail
    );

    // Update the Customers array with the new array
    setCustomers(updatedCustomers);
  }

  // Function to update customer details based on email
  function updateCustomer(customerEmail, updatedData) {
    // Create a new array with updated customer details
    const updatedCustomers = customers.map((customer) => {
      if (customer.email === customerEmail) {
        return { ...customer, ...updatedData };
      }
      return customer;
    });

    // Update the Customers array with the new array
    setCustomers(updatedCustomers);
  }

  return (
    // Provide the Customers array, addCustomer, removeCustomer, and updateCustomer functions to consuming components
    <CustomerContext.Provider
      value={{
        customers,
        addCustomer,
        removeCustomer,
        updateCustomer,
        setCustomers
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export const useCustomerContext = () => React.useContext(CustomerContext);
