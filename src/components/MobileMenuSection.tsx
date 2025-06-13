
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";
import { MenuItem } from "@/data/menuData";

interface CartItem extends MenuItem {
  quantity: number;
}

interface MobileMenuSectionProps {
  filteredItems: MenuItem[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  updateQuantity: (id: string, change: number) => void;
}

const MobileMenuSection = ({
  filteredItems,
  categories,
  selectedCategory,
  setSelectedCategory,
  cart,
  addToCart,
  updateQuantity
}: MobileMenuSectionProps) => {
  const renderSpicyLevel = (level?: number) => {
    if (!level) return null;
    return (
      <div className="flex items-center gap-1">
        {[...Array(level)].map((_, i) => (
          <span key={i} className="text-red-500 text-xs">🌶️</span>
        ))}
      </div>
    );
  };

  return (
    <div className="px-4 pb-20">
      {/* Category Filter - Horizontal Scroll */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap text-sm ${
              selectedCategory === category 
                ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" 
                : "border-orange-300 hover:bg-orange-50"
            }`}
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Menu Items - Single Column for Mobile */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const cartItem = cart.find(cartItem => cartItem.id === item.id);
          
          return (
            <Card key={item.id} className="overflow-hidden border-orange-200">
              <div className="flex">
                <div className="w-24 h-24 flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 p-3">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    {renderSpicyLevel(item.spicyLevel)}
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">
                      ${item.price.toFixed(2)}
                    </span>
                    
                    {cartItem ? (
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="font-semibold text-sm w-6 text-center">
                          {cartItem.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => addToCart(item)}
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-xs px-3 py-1"
                        size="sm"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MobileMenuSection;
