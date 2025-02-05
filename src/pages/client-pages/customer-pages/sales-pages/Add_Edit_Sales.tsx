import CustomInput from "@/components/shared/CustomInput"
import CustomSelect from "@/components/shared/CustomSelect"
import CustomTextArea from "@/components/shared/CustomTextArea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const Add_Edit_Sales = () => {
    return (
        <div className="page-container">
            <Button variant={'outline'} className="mb-4" onClick={() => window.history.back()}>
                Back
            </Button>
            <Card>

                <CardHeader>
                    <div className="">
                        <h4 className="heading-4">Add Sales</h4>
                        <h6 className="muted-text">
                            fill all the fields to add your sales
                        </h6>
                    </div>
                </CardHeader>
                <CardContent>
                    <form action="" onSubmit={(e) => e.preventDefault()} className="grid grid-cols-2 gap-x-5 gap-3">
                        <CustomInput label="Date *"  type="date" />
                        <CustomSelect options={["Customer 1", "Customer 2"]} label="Customer " />

                        <CustomInput label="Name *" />
                        <CustomInput label="Phone *"  type="number"/>
                        <CustomInput label="Address *"  />
                        <CustomInput label="Paid Amount *"  type="number" />
                        <CustomInput label="Pending Amount *"  type="number"  />
                        <CustomInput label="Dues *"   type="number" />

                        <CustomTextArea className="col-span-2" label="Note" />
                        <div className="flex col-span-2 mt-2 items-center justify-end gap-4">
                            <Button className="px-6" variant={'outline'}>Cancel</Button>
                            <Button className="px-6">Add Sales</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Add_Edit_Sales