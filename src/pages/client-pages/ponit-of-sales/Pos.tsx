import ConfirmationDialog from "@/components/shared/ConfirmationDialog"
import CustomInput from "@/components/shared/CustomInput"
import CustomSearchInput from "@/components/shared/CustomSearchInput"
import CustomSelect from "@/components/shared/CustomSelect"
import DataTable from "@/components/shared/DataTable"
import InfoBadge from "@/components/shared/InfoBadge"
import Overlay from "@/components/shared/Overlay"
import ProductCard from "@/components/shared/ProductCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { InvoiceTableColumn } from "@/constants/customerConstants"
import { useState } from "react"
import { toast } from "react-toastify"

const Pos = () => {
    const [activeTab, setActiveTab] = useState('featured');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [modalState, setModalState] = useState({
        isProductModalOpen: false,
        isInvoiceModalOpen: false,
        isRemoveProductModalOpen: false
    })

    const toggleModal = (type: "isProductModalOpen" | "isInvoiceModalOpen" | "isRemoveProductModalOpen") => { setModalState((prev) => ({ ...prev, [type]: !prev[type] })) }

    const handleSelectProduct = (product: any) => {
        toggleModal("isProductModalOpen")
    }
    const addProduct = () => {
        toast("Product added successfully in the invoice table", { type: "info", className: "text-xs", autoClose: 600 })
        toggleModal("isProductModalOpen")
    }

    const handleRemoveProduct = (row: any) => {
        toggleModal("isRemoveProductModalOpen")

    }
    const removeProduct = () => {
        toast("Product removed successfully from the invoice table", { type: "info", className: "text-xs", autoClose: 600 })
        toggleModal("isRemoveProductModalOpen")
    }
    const tabs = [
        { id: "featured", label: "Featured Products" },
        { id: "all", label: "All Products" },
    ];

    const products = [
        {
            id: 1,
            name: "Coca-Cola 500ml",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAUZN8KaNpThlm4QM_rJrnadXDoZWiZJXGGw&s",
            price: 1.99,
            quantity: 10,
            category: "500ml",
        },
        {
            id: 2,
            name: "Pepsi 500ml",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDEGmAQ2n3cQ6zYzggbL1u6Gz3RXCZTq34Lw&s",
            price: 1.89,
            quantity: 15,
            category: "500ml",
        },
        {
            id: 3,
            name: "Fanta Orange 500ml",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP3Xl6EZklp98U8AoE6N5CnVd4EjDDXugXjA&s",
            price: 2.09,
            quantity: 8,
            category: "500ml",
        },
        {
            id: 4,
            name: "Sprite 500ml",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFA2A0E9Kpa5rD0JxgH4Tki8XptHfFNXqZwg&s",
            price: 1.95,
            quantity: 12,
            category: "500ml",
        },
        {
            id: 5,
            name: "Mountain Dew 500ml",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLJDYYOf0TWdmj79JjL8wRfNGjQ05rT_BILw&s",
            price: 2.19,
            quantity: 14,
            category: "500ml",
        },
        {
            id: 6,
            name: "Dr Pepper 500ml",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAC3J7voohUYOg65tdY_VbDNjPtkdb8B-7Eg&s",
            price: 2.25,
            quantity: 9,
            category: "500ml",
        },
        {
            id: 7,
            name: "7UP 500ml",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUH19nXjV0Ft5wFkNFFqH6Gp_zjL5Wp2XZpg&s",
            price: 1.79,
            quantity: 11,
            category: "500ml",
        },
        {
            id: 8,
            name: "Red Bull 250ml",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVnqR8RFPiHHL6AK_BWKNdeHqDfB2uAYo0dQ&s",
            price: 2.99,
            quantity: 6,
            category: "250ml",
        }
    ];


    const actions = (row: any) => (
        <span onClick={() => handleRemoveProduct(row)}>
            Remove
        </span>
    )

    return (
        <div className="page-container pb-3">

            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <Card className="order-2 md:order-1">
                    <CardHeader>
                        <div className="">
                            <h4 className="heading-4">Make a sales</h4>
                            <h6 className="muted-text">fill all the fields to add your sales</h6>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            actions={actions}
                            rows={[]}
                            selectable={false}
                            pagination={false}
                            columns={InvoiceTableColumn}
                        />

                        <div className="mt-3">
                            <Separator />

                        </div>
                        <div className="grid grid-cols-2 mt-4 gap-2">
                            <CustomInput label="Date" type="date" />
                            <CustomSelect label="Customer" options={["Customer 1", "Customer 2"]} />
                            <CustomInput label="Customer Name" />
                            <CustomInput label="Phone" type="number" />
                            <CustomInput label="Address" className="col-span-2" />
                            <div className="col-span-2 mt-3">
                                <Separator />
                            </div>
                            <h4 className="col-span-2 heading-4">
                                Sales Details
                            </h4>
                            <CustomInput label="Selected Products" type="number" />
                            <CustomInput label="Total Invoice" type="number" />
                            <CustomInput label="Sub Total" type="number" />
                            <CustomInput label="Paid Amount" type="number" />
                            <CustomInput label="Pending Amount" type="number" />
                            <CustomInput label="Dues" type="number" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="">
                    <CardHeader>
                        <div className="">
                            <h4 className="heading-4">Products List</h4>
                            <h6 className="muted-text">
                                select your products
                            </h6>
                        </div>

                    </CardHeader>
                    <CardContent>
                        <div className="relative border-b border-gray-300">
                            <div className="flex items-center w-full ">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        className={`relative py-2  
                                            flex-1 border px-2 text-xs border-blue-1  font-medium transition-all duration-600 ${activeTab === tab.id ? "text-white bg-blue-1" : "text-gray-500 hover:text-blue-500"
                                            }`}
                                        onClick={() => setActiveTab(tab.id)}
                                        aria-pressed={activeTab === tab.id}
                                    >
                                        {tab.label}

                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center my-3  justify-end ">
                            <CustomSearchInput placeholder="Search ... " value={searchQuery} onSearchChange={(e) => setSearchQuery(e.target.value)} inputClassName="" className="  md:w-[300px]" />
                        </div>

                        <div className="mt-6">
                            {activeTab === 'featured' && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {products.map((product) => (
                                        <ProductCard quantity={product.quantity} category={product.category} key={product.id} id={product.id} image={product.image} name={product.name} price={product.price} onClick={() => handleSelectProduct(product)} />
                                    ))}
                                </div>
                            )}
                            {activeTab === 'all' && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {products.slice(0, 6).map((product) => (
                                        <ProductCard quantity={product.quantity} category={product.category} key={product.id} id={product.id} image={product.image} name={product.name} price={product.price} onClick={() => handleSelectProduct(product)} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex items-center justify-end mt-6 gap-2">
                <Button variant={'outline'} className="px-5">
                    Cancel
                </Button>
                <Button className="bg-green-500 px-8 hover:bg-green-800   " >
                    Print
                </Button>
                <Button className="px-12">
                    Save
                </Button>

            </div>
            <Overlay isOpen={modalState.isProductModalOpen} onClose={() => toggleModal('isProductModalOpen')}>
                <InfoBadge size="sm" message="Enter the quantity and also you can change the price of the product  " />
                <div className="grid grid-cols-2 mt-5 gap-3">
                    <CustomInput
                        label="Quantity *"
                        type="number"

                    />
                    <CustomInput
                        label="Price *"
                        type="number"
                    />
                    <div className="col-span-2 flex items-center justify-end gap-3 mt-5">
                        <Button onClick={() => toggleModal("isProductModalOpen")} variant={"outline"}>
                            Cancel
                        </Button>
                        <Button className="px-6" onClick={addProduct}>
                            Add
                        </Button>
                    </div>
                </div>
            </Overlay>
            <ConfirmationDialog
                isOpen={modalState.isRemoveProductModalOpen}
                onOpenChange={() => toggleModal("isRemoveProductModalOpen")}
                onActionClick={removeProduct}
                message="Are you sure you want to remove this product?"
                messageHeading="Remove Product?"
                actionText="Remove"
            />
        </div>
    )
}

export default Pos