// pages/api/products/best-sellers.ts

// src/data/mock-products.ts
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;

  image: string; // 🆕 Add image field
}
export const demoProducts = [
  {
    id: 1,
    name: "Strawberries",
    category: "Fruits",
    price: 300,
    image: "https://source.unsplash.com/random/400x300?strawberries&sig=1",
  },
  {
    id: 2,
    name: "Bananas",
    category: "Fruits",
    price: 200,
    image: "https://source.unsplash.com/random/400x300?bananas&sig=2",
  },
  {
    id: 3,
    name: "Broccoli",
    category: "Vegetables",
    price: 300,
    image: "https://source.unsplash.com/random/400x300?broccoli&sig=3",
  },
  {
    id: 4,
    name: "Carrots",
    category: "Vegetables",
    price: 100,
    image: "https://source.unsplash.com/random/400x300?carrots&sig=4",
  },
  {
    id: 5,
    name: "Whole Milk",
    category: "Dairy",
    price: 320,
    image: "https://source.unsplash.com/random/400x300?milk&sig=5",
  },
  {
    id: 6,
    name: "Cheddar Cheese",
    category: "Dairy",
    price:123,
    image: "https://source.unsplash.com/random/400x300?cheddar&sig=6",
  },
  {
    id: 7,
    name: "Brown Eggs",
    category: "Dairy",
    price: 30,
    image: "https://source.unsplash.com/random/400x300?eggs&sig=7",
  },
  {
    id: 8,
    name: "Orange Juice",
    category: "Beverages",
    price: 120,
    image: "https://source.unsplash.com/random/400x300?orange-juice&sig=8",
  },
  {
    id: 9,
    name: "Apple Juice",
    category: "Beverages",
    price: 300,
    image: "https://source.unsplash.com/random/400x300?apple-juice&sig=9",
  },
  {
    id: 10,
    name: "Potatoes",
    category: "Vegetables",
    price: 150,
    image: "https://source.unsplash.com/random/400x300?potatoes&sig=10",
  },
  {
    id: 11,
    name: "Spinach",
    category: "Vegetables",
    price: 100,
    image: "https://source.unsplash.com/random/400x300?spinach&sig=11",
  },
  {
    id: 12,
    name: "Tomatoes",
    category: "Vegetables",
    price: 100,
    image: "https://source.unsplash.com/random/400x300?tomatoes&sig=12",
  },
  {
    id: 13,
    name: "Greek Yogurt",
    category: "Dairy",
    price: 200,
    image: "https://source.unsplash.com/random/400x300?yogurt&sig=13",
  },
  {
    id: 14,
    name: "Cereal",
    category: "Breakfast",
    price: 129,
    image: "https://source.unsplash.com/random/400x300?cereal&sig=14",
  },
  {
    id: 15,
    name: "Honey",
    category: "Pantry",
    price: 799,
    image: "https://source.unsplash.com/random/400x300?honey&sig=15",
  },
  {
    id: 16,
    name: "Peanut Butter",
    category: "Pantry",
    price: 900,
    image: "https://source.unsplash.com/random/400x300?peanut-butter&sig=16",
  },
  {
    id: 17,
    name: "Rice",
    category: "Pantry",
    price: 340,
    image: "https://source.unsplash.com/random/400x300?rice&sig=17",
  },
  {
    id: 18,
    name: "Bread",
    category: "Bakery",
    price: 200,
    image: "https://source.unsplash.com/random/400x300?bread&sig=18",
  },
  {
    id: 19,
    name: "Apples",
    category: "Fruits",
    price: 230,
    image: "https://source.unsplash.com/random/400x300?apples&sig=19",
  },
  {
    id: 20,
    name: "Lettuce",
    category: "Vegetables",
    price: 40,
    image: "https://source.unsplash.com/random/400x300?lettuce&sig=20",
  },
];

// src/hooks/useBestSellers.ts
import { useEffect, useState } from "react";

type WeatherSeasonInput = {
  weather: "Clear" | "Rainy" | "Cloudy" | "Hot" | "Cold";
  season: "Spring" | "Summer" | "Fall" | "Winter";
};

export const useBestSellers = ({ weather, season }: WeatherSeasonInput) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let categories: string[] = [];

    if (weather === "Clear" && season === "Spring") {
      categories = ["Fruits", "Vegetables", "Beverages", "Pantry Essentials"];
    } else if (season === "Summer") {
      categories = ["Fruits", "Beverages", "Snacks"];
    } else if (season === "Winter") {
      categories = ["Pantry Essentials", "Snacks", "Vegetables"];
    } else {
      categories = ["Pantry Essentials"];
    }

    const filtered = demoProducts.filter((p) => categories.includes(p.category));
    setProducts(filtered);
  }, [weather, season]);

  return products;
};
