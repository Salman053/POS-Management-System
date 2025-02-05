  // Helper function to clean prices
 export  const cleanPrice = (price: any) => {
    if (!price) return 0; // Default value if undefined/null
    return Number(price.toString().replace(/Rs\.\s*/i, "").trim()) || 0;
};
