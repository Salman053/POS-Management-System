import React from 'react';
import { ProductType } from "@/types";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Package, AlertTriangle, DollarSign, Tag, Truck } from "lucide-react";
import { Button } from '@/components/ui/button';

const ProductDetails: React.FC = () => {
    const { cleanedData }: { cleanedData: ProductType } = useLocation().state || {};

    if (!cleanedData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Card className="w-96 p-6">
                    <div className="text-center space-y-2">
                        <Package className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="font-semibold text-lg">No Product Found</h3>
                        <p className="text-gray-500 text-sm">The requested product data is not available.</p>
                    </div>
                </Card>
            </div>
        );
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className='page-container'>
            <Button variant={"outline"} onClick={() => window.history.back()}> Back</Button>
            <div className="min-h-screen bg-gradient-to-br mt-6 from-gray-50 to-gray-100 ">
                <Card className=" mx-auto ">
                    <CardContent className="p-8">
                        {/* Header Section */}
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Image Section */}
                            <div className="lg:w-1/3">
                                <div className="relative group">
                                    {cleanedData.productImage ? (
                                        <img
                                            src={cleanedData.productImage as string}
                                            alt={cleanedData.productName}
                                            className="w-full aspect-square object-cover rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
                                            <Package className="h-16 w-16 text-gray-400" />
                                        </div>
                                    )}
                                    {cleanedData.featured && (
                                        <Badge className="absolute top-4 right-4 bg-yellow-500">
                                            ⭐ Featured
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Main Info Section */}
                            <div className="lg:w-2/3 space-y-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Badge variant="outline" className="text-sm">
                                            {cleanedData.productCategory}
                                        </Badge>
                                        <Badge variant="secondary" className="text-sm">
                                            ID: {cleanedData.barcode}
                                        </Badge>
                                    </div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {cleanedData.productName}
                                    </h1>
                                </div>

                                {/* Price Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Card className="bg-gray-50">
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Purchase Price</span>
                                                <span className="text-lg font-semibold">
                                                    {cleanedData.purchasePrice}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-green-50">
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Sales Price</span>
                                                <span className="text-lg font-semibold text-green-600">
                                                    {cleanedData.salesPrice}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Inventory Status */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-gray-900">Inventory Status</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3">
                                            <Package className="h-5 w-5 text-blue-500" />
                                            <div>
                                                <p className="text-sm text-gray-500">Current Stock</p>
                                                <p className="font-semibold">{cleanedData.quantity} units</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                                            <div>
                                                <p className="text-sm text-gray-500">Alert Threshold</p>
                                                <p className="font-semibold">{cleanedData.alertQuantity} units</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Supplier Info */}
                                <div className="flex items-center gap-3">
                                    <Truck className="h-5 w-5 text-gray-400" />
                                    <span className="text-gray-600">Supplied by:</span>
                                    <span className="font-medium">{cleanedData.supplier}</span>
                                </div>
                            </div>
                        </div>

                        <Separator className="my-8" />

                        {/* Footer with Timestamps */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>Created: {cleanedData.createdAt ? formatDate(cleanedData.createdAt) : 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <Clock className="h-4 w-4" />
                                <span>Last Updated: {cleanedData.updatedAt ? formatDate(cleanedData.updatedAt) : 'N/A'}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

    );
};

export default ProductDetails;