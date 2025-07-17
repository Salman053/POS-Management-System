import { useMemo } from 'react'
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { SalesType } from '@/types'
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import InfoBadge from './InfoBadge'
// import { InfoBadge } from '@/components/shared/InfoBadge'

interface ProductSaleAnalysis {
  productName: string;
  totalQuantity: number;
  totalRevenue: number;
  averagePrice: number;
  saleFrequency: number;
}

const SalesAnalytics = ({ sales }: { sales: SalesType[] }) => {
  // Analyze product sales
  const productAnalysis = useMemo(() => {
    const analysis = new Map<string, ProductSaleAnalysis>();

    sales.forEach(sale => {
      sale.products.forEach(product => {
        const existing = analysis.get(product.productName) || {
          productName: product.productName,
          totalQuantity: 0,
          totalRevenue: 0,
          averagePrice: 0,
          saleFrequency: 0
        };

        existing.totalQuantity += product.quantity;
        existing.totalRevenue += product.salesPrice * product.quantity;
        existing.saleFrequency += 1;
        existing.averagePrice = existing.totalRevenue / existing.totalQuantity;

        analysis.set(product.productName, existing);
      });
    });

    return Array.from(analysis.values())
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 10); // Top 10 products
  }, [sales]);

  // Add AI Insights Analysis
  const aiInsights = useMemo(() => {
    if (!productAnalysis.length) return [];

    const insights = [];
    const topProduct = productAnalysis[0];
    const lowProduct = productAnalysis[productAnalysis.length - 1];

    // Revenue Trends
    insights.push({
      type: 'success',
      icon: <TrendingUp className="w-4 h-4" />,
      message: `${topProduct.productName} is your best performer with Rs.${topProduct.totalRevenue.toFixed(2)} in sales`
    });

    // Low Performance Alert
    if (lowProduct.totalRevenue < topProduct.totalRevenue * 0.2) {
      insights.push({
        type: 'warning',
        icon: <AlertTriangle className="w-4 h-4" />,
        message: `${lowProduct.productName} is underperforming. Consider reviewing pricing or marketing strategy.`
      });
    }

    // Stock Management
    const highFrequency = productAnalysis.find(p => p.saleFrequency > 10);
    if (highFrequency) {
      insights.push({
        type: 'info',
        icon: <DollarSign className="w-4 h-4" />,
        message: `Consider bulk ordering ${highFrequency.productName} due to high sales frequency.`
      });
    }

    // Price Optimization
    const lowMargin = productAnalysis.find(p => p.averagePrice < 50);
    if (lowMargin) {
      insights.push({
        type: 'error',
        icon: <TrendingDown className="w-4 h-4" />,
        message: `${lowMargin.productName} has a low average price. Review pricing strategy.`
      });
    }

    return insights;
  }, [productAnalysis]);

  

  return (
    <div className="space-y-6">
      {/* Existing charts grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Top Selling Products</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={productAnalysis}>
                <XAxis 
                  dataKey="productName" 
                  angle={-90}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`Rs. ${value.toFixed(2)}`, 'Revenue']}
                />
                <Bar 
                  dataKey="totalRevenue" 
                  fill="#2563EB"
                  name="Revenue"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Sales Insights & AI Tips</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Top Performing Products:</h4>
              <ul className="space-y-2">
                {productAnalysis.slice(0, 5).map((product) => (
                  <li key={product.productName} className="flex justify-between">
                    <span>{product.productName}</span>
                    <span className="text-gray-600">
                      Rs. {product.totalRevenue.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">AI Recommendations:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  • Focus on inventory management for top sellers
                </li>
                <li className="flex gap-2">
                  • Consider bulk purchase discounts for high-volume products
                </li>
                <li className="flex gap-2">
                  • Monitor sales patterns for seasonal trends
                </li>
                <li className="flex gap-2">
                  • Review pricing strategy for low-performing items
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Section */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Real-Time AI Insights</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {aiInsights.map((insight, index) => (
            <InfoBadge
              key={index}
              variant={insight.type as 'success' | 'warning' | 'error' | 'info'}
              message={insight.message}
              icon={true}

              size="lg"
            />
          ))}
          
          {/* Weekly Trends */}
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-2">Recommended Actions:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {productAnalysis.slice(0, 3).map((product) => (
                <li key={product.productName} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  {product.saleFrequency > 5 
                    ? `Maintain healthy stock levels for ${product.productName}`
                    : `Review marketing strategy for ${product.productName}`
                  }
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesAnalytics;