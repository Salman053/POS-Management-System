import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import CustomSearchInput from "@/components/shared/CustomSearchInput";
import DataTable from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { productsColumns, } from "@/constants/customerConstants";
import { ChevronDown, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMainContext } from "@/context/MainContext";
import { ExpenseType, MainContextType, ProductType } from "@/types";
import { deleteProduct } from "@/firebase/product-logic";
import { exportToCSV } from "@/lib/helpers";
import DefaultText from "@/components/shared/DefaultText";

interface ModalState {
  isSingleDelete: boolean;
  isMultipleDelete: boolean;
  isAddEdit: boolean;
  isView: boolean;
}


const Product = () => {
  const [search, setSearch] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [modifiedProducts, setModifiedProducts] = useState<ProductType[] | any>([])
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null)
  const { products } = useMainContext() as MainContextType
  const navigate = useNavigate()


  const [modalState, setModalState] = useState<ModalState>({
    isSingleDelete: false,
    isMultipleDelete: false,
    isAddEdit: false,
    isView: false,
  });

  // Toggle modal by key with strong typing.
  const toggleModal = (modal: keyof ModalState) => {
    setModalState((prev) => ({
      ...prev,
      [modal]: !prev[modal],
    }));
  };

  // Action dropdown for each row.
  const actions = (row: any) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>
          Action <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="cursor-pointer">
        <DropdownMenuItem onClick={() => handleViewProduct(row)}>View</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEdit(row)}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDeleteProduct(row)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const handleViewProduct = (row: ProductType) => {
    const cleanedData = {
      ...row,
      productImage: row.productImage.props.src
      // Remove any React elements or complex objects
    };

    navigate('/shop/products/details', {
      state: {
        cleanedData
      }
    });
  };
  const handleDeleteProduct = (row: ProductType) => {
    setSelectedProduct(row);
    toggleModal("isSingleDelete");
  };
  const deleteProductHandler = () => {
    setIsDeleting(true)
    deleteProduct(selectedProduct?.docId as string).then(() => {
      toggleModal("isSingleDelete");
      toast("Product deleted successfully", { type: "info" })
      setIsDeleting(false)
    }).catch((error: any) => {
      toggleModal("isSingleDelete");
      setIsDeleting(false)

      toast(error?.message || 'Something went wrong', { type: "info" })
    })

  }

  const handleEdit = (row: ProductType) => {
    const { productImage, ...others } = row;

    if (productImage?.props) {
      const { props } = productImage;
      navigate('/shop/products/add-product', { state: { product: others, productImage: props.src } })
    }
    navigate('/shop/products/add-product', { state: { product: others, productImage: productImage } })


  };

  const handleAdd = () => {
    navigate('/shop/products/add-product')
  }

  useEffect(() => {
    const modifyProductsData = async () => {
      try {

        if (!products) {
          return;
        }

        const modified = products.map(product => ({
          ...product,
          purchasePrice: "RS. " + (product.purchasePrice),
          salesPrice: "RS. " + (product.salesPrice),
          productImage: <img
            className="h-10 w-10 object-cover rounded-sm"
            src={product.productImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF9ftKCp4wA5IyCFrY-vdMvZ9D1Lkx1am2QseOlaSqnWLpIZ5ao2t5VBuADaKHEtccT_Q&usqp=CAU"}
            alt={product.productName}
          />,
        }));

        if (search) {
          const filtered = modified.filter(product =>
            product.productName.toLowerCase().includes(search.toLowerCase())
          );
          setModifiedProducts(filtered);
        } else {
          setModifiedProducts(modified);
        }
      } catch (error) {
        console.error('Error modifying products:', error);
        toast.error('Error processing products data');
      }
    };

    modifyProductsData();
  }, [products, search]);

  const handleExport = () => {
    try {
      const exportConfig = {
        fileName: 'products',
        excludeFields: ['id', 'docId', 'userId', 'createdAt', 'updatedAt'],

      };

      const exportData = modifiedProducts.map(({ productImage, ...others }: ProductType) => others);

      exportToCSV(exportData, exportConfig);
    } catch (error) {
      toast.error('Export failed');
    }
  };


  return (
    <div className="page-container">
      <Card className="py-0">
        <CardHeader className="flex flex-wrap flex-row justify-between items-center">
          <h2 className="heading-4">Product</h2>
          <div className="flex items-center gap-3">
            <Button onClick={handleExport} variant={'outline'}>
              Export Products</Button>
            <Button onClick={handleAdd}>
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-7">
            <CustomSearchInput

              className="md:w-[400px]"
              onSearchChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search Products by name"
            />
          </div>
          {
            modifiedProducts.length > 0 ? (
              <DataTable
                columns={productsColumns}
                rows={modifiedProducts}
                actions={actions}
                selectable={false}
                pagination={modifiedProducts.length !== 0}
              />
            ) :
              <DefaultText label="products"  />
          }

        </CardContent>
      </Card>

      {/* Confirmation Dialog for Single Delete */}
      <ConfirmationDialog
        isOpen={modalState.isSingleDelete}
        messageHeading="Delete Product"
        message="Are you sure you want to delete this product?"
        onOpenChange={() => toggleModal("isSingleDelete")}
        actionText="Delete"
        disable={isDeleting}
        onActionClick={deleteProductHandler}
      />


    </div>
  );
};

export default Product;
