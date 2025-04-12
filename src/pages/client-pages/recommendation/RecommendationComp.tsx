import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBestSellers } from "@/hooks/use-best-selling";
import { useWeather } from "@/hooks/use-weather";
import { getSeason } from "@/lib/utils";
import placeholder from '@/assets/nodata.webp'
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const categoryMap: Record<string, string[]> = {
  Spring: ["Allergy Relief", "Gardening Tools", "Outdoor Furniture", "Light Jackets", "Sports Gear"],
  Summer: ["Sunscreens", "Cotton Clothes", "Cooling Fans"],
  Winter: ["Heaters", "Moisturizers", "Wool Clothes"],
  Autumn: ["Windbreakers", "Dry Skin Creams", "Decor Items"],
  Rain: ["Umbrellas", "Waterproof Shoes", "Raincoats"],
};

const ProductRecommendations = () => {
  const season = getSeason();
  const navigate = useNavigate()
  const weather = useWeather();

  const recommendedCategories = categoryMap[season] ?? categoryMap[weather] ?? categoryMap["Spring"];

  const products = useBestSellers({ weather, season });
  // console.log(weather);
  // console.log(season);

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-center justify-between">
        <div className="">
          <h2 className="text-2xl font-bold text-gray-800">Recommended for You </h2>
          <h4 className="text-xl">
            {recommendedCategories.map((category, index) => (
              <span key={index}>
                {category}
                {index < recommendedCategories.length - 1 && ", "}
              </span>
            ))}
          </h4>
        </div>
        <div className="flex items-center justify-between gap-2">
         
          {/* <Button onClick={()=>navigate("/shop/chat")}>
            Chat with AI
          </Button> */}
          <div className="">
            <h4>Season: {season}</h4>
            <h4>Weather: {weather}</h4>
          </div>
        </div>
      </div>
      {/* Loading and Error Handling */}

      <div className="grid md:grid-cols-3 gap-4">
        {products.length === 0 ? (
          <p className="text-gray-500">No products available for this season or weather.</p>
        ) : (
          products.map((product: any) => (
            <Card key={product._id} className="rounded-xl shadow hover:shadow-md transition">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF9ftKCp4wA5IyCFrY-vdMvZ9D1Lkx1am2QseOlaSqnWLpIZ5ao2t5VBuADaKHEtccT_Q&usqp=CAU"}
                  alt={product.name}
                  className="h-32 object-cover w-full rounded"
                />
                <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                <p className="text-lg font-bold text-green-600 mt-1">Rs. {product.price}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

    </div>
  );
};

export default ProductRecommendations;
