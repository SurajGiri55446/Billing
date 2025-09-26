import { ToWords } from 'to-words';
export const formatInvoiceData = (invoiceData) => {
	const {
	  title,
	  company = {},
	  invoice = {},
	  account = {},
	  billing = {},
	  shipping = {},
	  tax = 0,
	  notes = "",
	  items = [],
	  logo = "",
	} = invoiceData || {};
  
	const currencySymbol = "₹";
	const subtotal = items.reduce((acc, item) => acc + (item.qty * item.amount), 0);
	const taxAmount = subtotal * (tax / 100);

const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      name: 'Rupee',
      plural: 'Rupees',
      symbol: '₹',
      fractionalUnit: {
        name: 'Paisa',
        plural: 'Paise',
        symbol: '',
      },
    },
  },
});

	const total = subtotal + taxAmount;
    const totalInWords = toWords.convert(total);
	return {
	  title,
	  companyName: company.name,
	  companyAddress: company.address,
	  companyPhone: company.phone,
	  invoiceNumber: invoice.number,
	  invoiceDate: invoice.date,
	  paymentDate: invoice.dueDate,
  
	  accountName: account.name,
	  accountNumber: account.number,
	  accountIfscCode: account.ifsccode,
  
	  billingName: billing.name,
	  billingAddress: billing.address,
	  billingPhone: billing.phone,
  
	  shippingName: shipping.name,
	  shippingAddress: shipping.address,
	  shippingPhone: shipping.phone,
  
	  currencySymbol,
	  tax,
	  items,
	  notes,
	  subtotal,
	  taxAmount,
	  total,
	  logo, 
	  totalInWords,
	};
  };

// formatInvoice.js
export const formatData = (dataStr) => {
	if (!dataStr) return "N/A";
  
	const date = new Date(dataStr);
	if (isNaN(date)) return "Invalid Date";
  
	return date.toLocaleDateString("en-GB", {
	  day: "2-digit",
	  month: "short",
	  year: "numeric",
	});
  };
  
  
  
  