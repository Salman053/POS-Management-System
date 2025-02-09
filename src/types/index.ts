// Define the type for our context state
export type MainContextType = {
  currentUser: any;
  expenses: ExpenseType[]
  dues: DuesType[]
  payments: PaymentType[]
  customers: CustomerType[]
  products: ProductType[]
  setCurrentUser: any;
  loading: boolean
  theme: string;
  toggleTheme: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  userPreferences: Record<string, unknown>;
  setUserPreferences: React.Dispatch<
    React.SetStateAction<Record<string, unknown>>
  >;
};


export type CustomAvatarStackProps = {
  users: {
    docId: string;
    src: string;
    name: string;
    status?: "active" | "inactive" | "enrolled";
  }[];
  className?: string;
};

export type UseToggle = [boolean, () => void];

export interface ProductType {
  docId?: string;
  barcode: string;
  productName: string;
  productCategory: string;
  purchasePrice: number;
  salesPrice: number;
  quantity: number;
  id?: string;

  alertQuantity: number;
  productImage: File | string | any; // string for URLs of existing images
  userId: string;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
  description?: string;
  supplier?: string;
  featured: string
}

export interface ExpenseType {
  docId?: string;
  id?: string;
  date: string;
  category: string;
  amount: number;
  reference?: string;
  note?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerType {
  docId?: string;
  customerName: string;
  address?: string;
  contactNo: string;
  note?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  totalDues: number;
  totalPayments: number;
}


export interface PaymentType {
  amount: number;
  docId?: string;

  date: string;
  description?: string;
  customerId: string;
  userId: string;
}


export interface DuesType extends PaymentType {}
export type DataTableColumnProps = {
  label: string;
  key: string;
  sortable?: boolean;
  sortKey?: string;
  render?: (value: any) => JSX.Element
}