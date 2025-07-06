import React, { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface FavoritesContextType {
  favoriteProducts: Product[];
  addToFavorites: (product: Product) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  const addToFavorites = (product: Product) => {
    setFavoriteProducts((prevFavorites) => [...prevFavorites, product]);
  };

  return (
    <FavoritesContext.Provider value={{ favoriteProducts, addToFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
    return context;
  
};