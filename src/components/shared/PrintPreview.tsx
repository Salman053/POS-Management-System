import { Button } from "../ui/button";

interface PrintPreviewProps {
  documentContent?: React.ReactNode;
  title?: string;
  onPrint?:any
}


const DemoReceipt = () => (
  <div className=" mx-auto">
    <div className="text-center mb-6">
      <h3 className="text-xl font-bold"> Store Name</h3>
      <p className="text-sm text-gray-600">123 Business Street</p>
      <p className="text-sm text-gray-600">New York, NY 10001</p>
      <p className="text-sm text-gray-600">Tel: (555) 123-4567</p>
    </div>

    <div className="mb-6">
      <div className="flex justify-between text-sm mb-2">
        <span>Receipt #: INV-2025-001</span>
        <span>Date: {new Date().toLocaleDateString()}</span>
      </div>
      <div className="text-sm mb-4">
        <p>Customer: John Doe</p>
        <p>Email: john.doe@example.com</p>
      </div>
    </div>

    <div className="mb-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b  ">
            <th className="text-left  px-4 py-2">Item</th>
            <th className="text-left px-4  py-2">Qty</th>
            <th className="text-left px-4  py-2">Price</th>
            <th className="text-left px-4  py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 px-4">Premium Widget</td>
            <td className="text-left  px-4">2</td>
            <td className="text-left  px-4">$29.99</td>
            <td className="text-left  px-4">$59.98</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4">Basic Gadget</td>
            <td className="text-left  px-4">1</td>
            <td className="text-left  px-4">$19.99</td>
            <td className="text-left  px-4">$19.99</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4">Super Tool</td>
            <td className="text-left  px-4">3</td>
            <td className="text-left  px-4">$15.99</td>
            <td className="text-left  px-4">$47.97</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="border-t pt-4">
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>$127.94</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Tax (8.875%):</span>
        <span>$11.35</span>
      </div>
      <div className="flex justify-between font-bold">
        <span>Total:</span>
        <span>$139.29</span>
      </div>
    </div>

    <div className="mt-8 text-center text-sm text-gray-600">
      <p>Thank you for your business!</p>
      <p>Please keep this receipt for your records.</p>
    </div>
  </div>
);


const PrintPreview = ({
  documentContent = <DemoReceipt />,
  title = "Print Preview",
  onPrint
}: PrintPreviewProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg w-full flex flex-col max-h-[90vh]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <Button onClick={onPrint} className='  '>
          Print
        </Button>
      </div>
      {/* Preview Content */}
      <div className="flex-1 overflow-auto  bg-gray-50 min-h-[400px]">
        <div className="bg-white shadow-sm   p-6">
          {documentContent}
        </div>
      </div>
    </div>
  )
}

export default PrintPreview