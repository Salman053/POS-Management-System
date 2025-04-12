import { DataTableColumnProps, SalesType } from "@/types";
import { BadgeDollarSign, Bell, House, ShoppingBag, ShoppingBasket, ShoppingCart, UsersRound, Wallet } from "lucide-react";

export const NavTabs = [

  {
    path: '/shop/home',
    label: 'Home',
    icon: House,
    filledIcon: House
  },
  {
    path: '/shop/products',
    label: 'Products',
    icon: ShoppingCart,
    filledIcon: ShoppingCart
  },
  {
    path: '/shop/expanses',
    label: 'Expense',
    icon: Wallet,
    filledIcon: Wallet
  },

  {
    path: '/shop/customers',
    label: 'Customers',
    icon: UsersRound,
    filledIcon: UsersRound
  },
  {
    path: '/shop/sales',
    label: 'Sales',
    icon: BadgeDollarSign,
    filledIcon: BadgeDollarSign
  },
  // {
  //   path: '/shop/pos',
  //   label: 'POS',
  //   icon: ShoppingBasket,
  //   filledIcon: ShoppingBasket
  // },
  {
    path: '/shop/alerts',
    label: 'Tracking',
    icon: Bell,
    filledIcon: Bell
  },
  {
    path: '/shop/recommendations',
    label: "AI",
    icon: ShoppingBag,
    filledIcon: ShoppingBag
  },




]
export const EXPENSE_CATEGORIES = [
  'Rent',
  'Staff Salary',
  'Utilities',
  'Inventory Purchase',
  'Equipment Maintenance',
  'POS Software',
  'Bank Charges',
  'Cleaning Supplies',
  'Packaging Materials',
  'Internet & Phone',
  'Security',
  'Marketing & Ads',
  'Insurance',
  'Training',
  'Other'
] as const;


export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];





export const productsColumns: DataTableColumnProps[] = [
  { label: "Name", key: "productName", sortable: true, },
  { label: "Quantity", key: "quantity", sortable: true },
  {
    label: "Alert Quantity",
    key: "alertQuantity",
    sortable: true,
  },
  { label: "Purchase Price", key: "purchasePrice", sortable: true },
  { label: "Sales Price", key: "salesPrice", sortable: true },
  // { label: "Stock Worth", key: "stockWorth", sortable: true },
  { label: "Category", key: "productCategory", sortable: true },
   {
    label: "Image",
    key: "productImage",
    sortable: false,
  }]

export const productsRows: any[] = [
  {
    name: "Head & Shoulders Shampoo",
    quantity: 10,
    alertQuantity: 5,
    purchasePrice: "Rs. 50",
    salesPrice: "Rs. 100",
    stockWorth: "Rs. 500",
    image: (
      <img
        src="https://dummyimage.com/40x40/cccccc/000000.png&text=H%26S"
        alt="Head & Shoulders Shampoo"
        className="h-10 w-10 object-cover rounded-sm"
      />
    ),
  },
  {
    name: "Dove Soap",
    quantity: 20,
    alertQuantity: 10,
    purchasePrice: "Rs. 40",
    salesPrice: "Rs. 80",
    stockWorth: "Rs. 800",
    image: (
      <img
        src="https://dummyimage.com/40x40/cccccc/000000.png&text=Dove"
        alt="Dove Soap"
        className="h-10 w-10 object-cover rounded-sm"
      />
    ),
  },
  {
    name: "Colgate Toothpaste",
    quantity: 15,
    alertQuantity: 7,
    purchasePrice: "Rs. 45",
    salesPrice: "Rs. 90",
    stockWorth: "Rs. 675",
    image: (
      <img
        src="https://dummyimage.com/40x40/cccccc/000000.png&text=Colgate"
        alt="Colgate Toothpaste"
        className="h-10 w-10 object-cover rounded-sm"
      />
    ),
  },
  {
    name: "Nescafe Coffee",
    quantity: 12,
    alertQuantity: 5,
    purchasePrice: "Rs. 200",
    salesPrice: "Rs. 400",
    stockWorth: "Rs. 2400",
    image: (
      <img
        src="https://dummyimage.com/40x40/cccccc/000000.png&text=Nescafe"
        alt="Nescafe Coffee"
        className="h-10 w-10 object-cover rounded-sm"
      />
    ),
  },
  {
    name: "Kellogg's Corn Flakes",
    quantity: 18,
    alertQuantity: 9,
    purchasePrice: "Rs. 150",
    salesPrice: "Rs. 300",
    stockWorth: "Rs. 2700",
    image: (
      <img
        src="https://dummyimage.com/40x40/cccccc/000000.png&text=Corn+Flakes"
        alt="Kellogg's Corn Flakes"
        className="h-10 w-10 object-cover rounded-sm"
      />
    ),
  },
  {
    name: "Tata Tea Premium",
    quantity: 25,
    alertQuantity: 10,
    purchasePrice: "Rs. 120",
    salesPrice: "Rs. 250",
    stockWorth: "Rs. 3000",
    image: (
      <img
        src="https://dummyimage.com/40x40/cccccc/000000.png&text=Tata+Tea"
        alt="Tata Tea Premium"
        className="h-10 w-10 object-cover rounded-sm"
      />
    ),
  },
  {
    name: "Amul Butter",
    quantity: 30,
    alertQuantity: 12,
    purchasePrice: "Rs. 50",
    salesPrice: "Rs. 100",
    stockWorth: "Rs. 3000",
    image: (
      <img
        src="https://dummyimage.com/40x40/cccccc/000000.png&text=Amul+Butter"
        alt="Amul Butter"
        className="h-10 w-10 object-cover rounded-sm"
      />
    ),
  },
  {
    name: "Maggi Noodles",
    quantity: 50,
    alertQuantity: 20,
    purchasePrice: "Rs. 12",
    salesPrice: "Rs. 25",
    stockWorth: "Rs. 1250",
    image: (
      <img
        src="https://dummyimage.com/40x40/cccccc/000000.png&text=Maggi"
        alt="Maggi Noodles"
        className="h-10 w-10 object-cover rounded-sm"
      />
    ),
  },
  {
    name: "Patanjali Honey",
    quantity: 22,
    alertQuantity: 10,
    purchasePrice: "Rs. 180",
    salesPrice: "Rs. 350",
    stockWorth: "Rs. 3850",
    image: (
      <img
        src="https://dummyimage.com/40x40/cccccc/000000.png&text=Honey"
        alt="Patanjali Honey"
        className="h-10 w-10 object-cover rounded-sm"
      />
    ),
  },
  {
    name: "Britannia Good Day Biscuits",
    quantity: 35,
    alertQuantity: 15,
    purchasePrice: "Rs. 25",
    salesPrice: "Rs. 50",
    stockWorth: "Rs. 1750",
    image: (
      <img
        src="https://dummyimage.com/40x40/cccccc/000000.png&text=Good+Day"
        alt="Britannia Good Day Biscuits"
        className="h-10 w-10 object-cover rounded-sm"
      />
    ),
  },
];





export const expensesColumns: DataTableColumnProps[] = [
  { label: "Date", key: "date", sortable: true, },
  { label: "Reference", key: "reference", sortable: true },
  {
    label: "Category",
    key: "category",
    sortable: true,
  },
  { label: "Amount", key: "amount", sortable: true },
]


export const expensesRows = [
  {
    date: "2022-01-01",
    reference: "123456",
    category: "Groceries",
    amount: "Rs. 100",
  },
  {
    date: "2022-02-01",
    reference: "789012",
    category: "Clothing",
    amount: "Rs. 200",
  },
  {
    date: "2022-03-01",
    reference: "345678",
    category: "Entertainment",
    amount: "Rs. 300",
  },
  {
    date: "2022-04-01",
    reference: "901234",
    category: "Groceries",
    amount: "Rs. 400",
  }
]


export const customerColumns: DataTableColumnProps[] = [
  {

    key: "customerName",
    label: "Name",
    sortKey: "name",
    sortable: true
  },
  {
    label: "Address",
    key: "address",
    sortable: true
  }
  , {
    label: "Phone",
    key: "contactNo",
    sortable: true
  },
  {
    label: "Dues",
    key: "totalDues",
    sortable: true
  },
  {
    label: "Paid",
    key: "totalPayments",
    sortable: true
  },
  {
    label: "Note",
    key: "note",
    sortable: true

  }
]

export const customerRows = [
  {
    name: "Ahmed Khan",
    address: "123 Elm St, Anytown, USA",
    phone: "555-555-0001",
    dues: "Rs. 700",
    note: "This is a note."
  }, {
    name: "Fatima Ali",
    address: "456 Oak St, Anytown, USA",
    phone: "555-555-0002",
    dues: "Rs. 800",
    note: "This is a note."
  }, {
    name: "Hassan Sheikh",
    address: "789 Pine St, Anytown, USA",
    phone: "555-555-0003",
    dues: "Rs. 900",
    note: "This is a note."
  }, {
    name: "Aisha Begum",
    address: "101 Maple St, Anytown, USA",
    phone: "555-555-0004",
    dues: "Rs. 1000",
    note: "This is a note."
  }, {
    name: "Omar Farooq",
    address: "202 Birch St, Anytown, USA",
    phone: "555-555-0005",
    dues: "Rs. 1100",
    note: "This is a note."
  }, {
    name: "Zainab Malik",
    address: "303 Cedar St, Anytown, USA",
    phone: "555-555-0006",
    dues: "Rs. 1200",
    note: "This is a note."
  }, {
    name: "Yusuf Siddiqui",
    address: "404 Spruce St, Anytown, USA",
    phone: "555-555-0007",
    dues: "Rs. 1300",
    note: "This is a note."
  }, {
    name: "Maryam Javed",
    address: "505 Willow St, Anytown, USA",
    phone: "555-555-0008",
    dues: "Rs. 1400",
    note: "This is a note."
  }, {
    name: "Ibrahim Qureshi",
    address: "606 Aspen St, Anytown, USA",
    phone: "555-555-0009",
    dues: "Rs. 1500",
    note: "This is a note."
  }, {
    name: "Sara Khan",
    address: "707 Redwood St, Anytown, USA",
    phone: "555-555-0010",
    dues: "Rs. 1600",
    note: "This is a note."
  }, {
    name: "Ali Raza",
    address: "808 Cypress St, Anytown, USA",
    phone: "555-555-0011",
    dues: "Rs. 1700",
    note: "This is a note."
  }, {
    name: "Nadia Hussain",
    address: "909 Sequoia St, Anytown, USA",
    phone: "555-555-0012",
    dues: "Rs. 1800",
    note: "This is a note."
  }, {
    name: "Bilal Ahmed",
    address: "1010 Fir St, Anytown, USA",
    phone: "555-555-0013",
    dues: "Rs. 1900",
    note: "This is a note."
  }, {
    name: "Layla Karim",
    address: "1111 Poplar St, Anytown, USA",
    phone: "555-555-0014",
    dues: "Rs. 2000",
    note: "This is a note."
  }, {
    name: "Mustafa Khan",
    address: "1212 Magnolia St, Anytown, USA",
    phone: "555-555-0015",
    dues: "Rs. 2100",
    note: "This is a note."
  }, {
    name: "Hiba Shah",
    address: "1313 Dogwood St, Anytown, USA",
    phone: "555-555-0016",
    dues: "Rs. 2200",
    note: "This is a note."
  }, {
    name: "Zaid Khan",
    address: "1414 Hickory St, Anytown, USA",
    phone: "555-555-0017",
    dues: "Rs. 2300",
    note: "This is a note."
  }, {
    name: "Amina Siddiqui",
    address: "1515 Chestnut St, Anytown, USA",
    phone: "555-555-0018",
    dues: "Rs. 2400",
    note: "This is a note."
  }, {
    name: "Hamza Malik",
    address: "1616 Sycamore St, Anytown, USA",
    phone: "555-555-0019",
    dues: "Rs. 2500",
    note: "This is a note."
  }, {
    name: "Noor Javed",
    address: "1717 Beech St, Anytown, USA",
    phone: "555-555-0020",
    dues: "Rs. 2600",
    note: "This is a note."
  }
]

export const salesColumns: DataTableColumnProps[] = [
  {
    label: "Bill No",
    sortable: true,
    key: "billNo"
  },
  {
    label: "Customer Name",
    key: "customerName",
    sortable: true

  },
  {
    label: 'Date/Time',
    key: 'date',
    sortable: true
  }

  , {
    label: "Total Bill",
    key: "totalBill",
    sortable: true
  }, {
    label: "Paid Bill",
    key: "paidAmount",
    sortable: true
  }
  , {
    label: "Phone",
    key: "phone",
    sortable: false
  }
  // , {
  //   label: "Phone",
  //   key: "products",
  //   sortable: false
  // }
]

export const salesRows = [
  {
    billNo: 1,
    customerName: "John Doe",
    dateTime: "2023-09-01",
    phone: "1234567890",
    totalBill: 100,
    paidBill: 80
  }, {
    billNo: 2,
    customerName: "Jane Smith",
    dateTime: "2023-09-02",
    phone: "9876543210",
    totalBill: 150,
    paidBill: 120
  }, {
    billNo: 3,
    customerName: "Bob Johnson",
    dateTime: "2023-09-03",
    phone: "5555555555",
    totalBill: 200,
    paidBill: 180
  },
  {
    billNo: 4,
    customerName: "Alice Brown",
    dateTime: "2023-09-04",
    phone: "1111111111",
    totalBill: 250,
    paidBill: 220


  }
]


export const DashboardRecentSalesColumns: DataTableColumnProps[] = [
  // {
  //   label: "Bill No",
  //   key: "billNo",
  //   sortable: true
  // },
  {
    label: "Customer Name",
    key: "customerName",
    sortable: true
  },
  {
    label: "Bill",
    key: "totalBill",
    sortable: true
  },
  {
    label: "Date/Time",
    key: "date",
    sortable: true
  },
  // {
  //   label: "Phone",
  //   key: "phone",
  //   sortable: false
  // },
  {
    label: "From",
    key: "from",
    sortable: false
  }
]


export const DashboardRecentSalesData = [
  {
    billNo: "001",
    customerName: "Ahmed Khan",
    totalBill: "Rs. 700",
    dateTime: "2023-10-01 10:00 AM",
    phone: "555-555-0001",
    from: "Store"
  },
  {
    billNo: "002",
    customerName: "Fatima Ali",
    totalBill: "Rs. 800",
    dateTime: "2023-10-01 11:00 AM",
    phone: "555-555-0002",
    from: "Online"
  },
  {
    billNo: "003",
    customerName: "Hassan Sheikh",
    totalBill: "Rs. 900",
    dateTime: "2023-10-01 12:00 PM",
    phone: "555-555-0003",
    from: "Store"
  },
  {
    billNo: "004",
    customerName: "Aisha Begum",
    totalBill: "Rs. 1000",
    dateTime: "2023-10-01 01:00 PM",
    phone: "555-555-0004",
    from: "Online"
  },
  {
    billNo: "005",
    customerName: "Omar Farooq",
    totalBill: "Rs. 1100",
    dateTime: "2023-10-01 02:00 PM",
    phone: "555-555-0005",
    from: "Store"
  },
  {
    billNo: "006",
    customerName: "Zainab Malik",
    totalBill: "Rs. 1200",
    dateTime: "2023-10-01 03:00 PM",
    phone: "555-555-0006",
    from: "Online"
  },
  {
    billNo: "007",
    customerName: "Yusuf Siddiqui",
    totalBill: "Rs. 1300",
    dateTime: "2023-10-01 04:00 PM",
    phone: "555-555-0007",
    from: "Store"
  },
  {
    billNo: "008",
    customerName: "Maryam Javed",
    totalBill: "Rs. 1400",
    dateTime: "2023-10-01 05:00 PM",
    phone: "555-555-0008",
    from: "Online"
  },
  {
    billNo: "009",
    customerName: "Ibrahim Qureshi",
    totalBill: "Rs. 1500",
    dateTime: "2023-10-01 06:00 PM",
    phone: "555-555-0009",
    from: "Store"
  },
  {
    billNo: "010",
    customerName: "Sara Khan",
    totalBill: "Rs. 1600",
    dateTime: "2023-10-01 07:00 PM",
    phone: "555-555-0010",
    from: "Online"
  },
  {
    billNo: "011",
    customerName: "Ali Raza",
    totalBill: "Rs. 1700",
    dateTime: "2023-10-01 08:00 PM",
    phone: "555-555-0011",
    from: "Store"
  },
  {
    billNo: "012",
    customerName: "Nadia Hussain",
    totalBill: "Rs. 1800",
    dateTime: "2023-10-01 09:00 PM",
    phone: "555-555-0012",
    from: "Online"
  },
  {
    billNo: "013",
    customerName: "Bilal Ahmed",
    totalBill: "Rs. 1900",
    dateTime: "2023-10-01 10:00 PM",
    phone: "555-555-0013",
    from: "Store"
  },
  {
    billNo: "014",
    customerName: "Layla Karim",
    totalBill: "Rs. 2000",
    dateTime: "2023-10-01 11:00 PM",
    phone: "555-555-0014",
    from: "Online"
  },
  {
    billNo: "015",
    customerName: "Mustafa Khan",
    totalBill: "Rs. 2100",
    dateTime: "2023-10-02 12:00 AM",
    phone: "555-555-0015",
    from: "Store"
  },
  {
    billNo: "016",
    customerName: "Hiba Shah",
    totalBill: "Rs. 2200",
    dateTime: "2023-10-02 01:00 AM",
    phone: "555-555-0016",
    from: "Online"
  },
  {
    billNo: "017",
    customerName: "Zaid Khan",
    totalBill: "Rs. 2300",
    dateTime: "2023-10-02 02:00 AM",
    phone: "555-555-0017",
    from: "Store"
  },
  {
    billNo: "018",
    customerName: "Amina Siddiqui",
    totalBill: "Rs. 2400",
    dateTime: "2023-10-02 03:00 AM",
    phone: "555-555-0018",
    from: "Online"
  },
  {
    billNo: "019",
    customerName: "Hamza Malik",
    totalBill: "Rs. 2500",
    dateTime: "2023-10-02 04:00 AM",
    phone: "555-555-0019",
    from: "Store"
  },
  {
    billNo: "020",
    customerName: "Noor Javed",
    totalBill: "Rs. 2600",
    dateTime: "2023-10-02 05:00 AM",
    phone: "555-555-0020",
    from: "Online"
  }
];



export const dashboardCustomerColumns: DataTableColumnProps[] = [
  {
    label: "Name",
    key: "customerName",
    sortable: true
  },
  {
    label: "Dues",
    key: "totalDues",
    sortable: true
  }
  , {
    label: "Phone",
    key: "contactNo",
    sortable: true
  }

]


export const dashboardCustomerData = [
  {
    name: "Ahmed Khan",
    dues: "Rs. 700",
    phone: "555-555-0001"
  },
  {
    name: "Fatima Ali",
    dues: "Rs. 800",
    phone: "555-555-0002"
  },
  {
    name: "Hassan Sheikh",
    dues: "Rs. 900",
    phone: "555-555-0003"
  },
  {
    name: "Aisha Begum",
    dues: "Rs. 1000",
    phone: "555-555-0004"
  },
  {
    name: "Omar Farooq",
    dues: "Rs. 1100",
    phone: "555-555-0005"
  },
  {
    name: "Zainab Malik",
    dues: "Rs. 1200",
    phone: "555-555-0006"
  },
  {
    name: "Yusuf Siddiqui",
    dues: "Rs. 1300",
    phone: "555-555-0007"
  },
  {
    name: "Maryam Javed",
    dues: "Rs. 1400",
    phone: "555-555-0008"
  },
  {
    name: "Ibrahim Qureshi",
    dues: "Rs. 1500",
    phone: "555-555-0009"
  },
  {
    name: "Sara Khan",
    dues: "Rs. 1600",
    phone: "555-555-0010"
  }
];



export const InvoiceTableColumn:DataTableColumnProps[] = [
{
  key:"s.no",
  label:"S.No"
},
{
  key:"p.Name",
  label:"P.Name"
},
{
  key:"weight",
  label:"Weight"
},
{
  key:"price",
  label:"Price"
},
{
  key:"quantity",
  label:"Quantity"
},
{
  key:"subTotal",
  label:"subTotal"
},
]