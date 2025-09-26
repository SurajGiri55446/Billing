import React, { createContext, useState } from "react";

export const AppContext = createContext();

const initialInvoiceData = {
  title: "New Invoice",
  billing: { name: "", phone: "", address: "" },
  shipping: { name: "", phone: "", address: "" },
  invoice: { number: "", date: "", duedate: "" },
  account: { name: "", number: "", ifsccode: "" },
  company: { name: "", phone: "", address: "" },
  tax: 0,
  notes: " ",
  items: [
    {
      name: "",
      qty: "",
      amount: "",
      description: "",
      total: 0,
    },
  ],
  logo: " ",
};

export const AppContextProvider = ({ children }) => {
  const [invoiceTitle, setInvoiceTitle] = useState("New Invoice");
  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <AppContext.Provider
      value={{
        invoiceTitle,
        setInvoiceTitle,
        invoiceData,
        setInvoiceData,
        selectedTemplate,
        setSelectedTemplate,
        initialInvoiceData,
        baseUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
