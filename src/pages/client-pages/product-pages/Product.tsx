import { useState } from "react";
import { toast } from "react-toastify";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";
import CustomCheckboxInput from "@/components/shared/CustomCheckboxInput";
import CustomInput from "@/components/shared/CustomInput";
import CustomSearchInput from "@/components/shared/CustomSearchInput";
import DataTable from "@/components/shared/DataTable";
import Overlay from "@/components/shared/Overlay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { productsColumns, productsRows } from "@/constants/customerConstants";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface ModalState {
  isSingleDelete: boolean;
  isMultipleDelete: boolean;
  isAddEdit: boolean;
  isView: boolean;
}


const Product = () => {
  const [search, setSearch] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [modalState, setModalState] = useState<ModalState>({
    isSingleDelete: false,
    isMultipleDelete: false,
    isAddEdit: false,
    isView: false,
  });
  const navigate = useNavigate()

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
        <DropdownMenuItem>View</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEdit(row)}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleModal("isSingleDelete")}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const handleSingleDelete = () => {
    toast("Product deleted successfully", {
      type: "info",
    });
    toggleModal("isSingleDelete");
  };

  const handleEdit = (row: any) => {
    console.log(row)
    const { image, ...others } = row;
    const { props } = image;

    navigate('/shop/products/add-product', { state: { product: others, imageSrc: props.src } })
  };

  const handleAdd = () => {
    navigate('/shop/products/add-product')
  }

  return (
    <div className="page-container">
      <Card className="py-0">
        <CardHeader className="flex flex-wrap flex-row justify-between items-center">
          <h2 className="heading-4">Product</h2>
          <div className="flex items-center gap-3">
          <Button variant={'outline'}>
          Export Products</Button>
            <Button onClick={handleAdd}>
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-6">
            <CustomSearchInput

              className="md:w-[400px]"
              onSearchChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search Products by name"
            />
          </div>
          <DataTable
            columns={productsColumns}
            rows={productsRows}
            actions={actions}
            selectable={false}
          />
        </CardContent>
      </Card>

      {/* Confirmation Dialog for Single Delete */}
      <ConfirmationDialog
        isOpen={modalState.isSingleDelete}
        messageHeading="Delete Product"
        message="Are you sure you want to delete this product?"
        onOpenChange={() => toggleModal("isSingleDelete")}
        actionText="Delete"
        onActionClick={handleSingleDelete}
      />


    </div>
  );
};

export default Product;
