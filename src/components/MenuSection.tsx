
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";
import { MenuItem } from "@/data/menuData";

interface CartItem extends MenuItem {
  quantity: number;
}

interface MenuSectionProps {
  filteredItems: MenuItem[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  updateQuantity: (id: string, change: number) => void;
}

const MenuSection = ({
  filteredItems,
  categories,
  selectedCategory,
  setSelectedCategory,
  cart,
  addToCart,
  updateQuantity
}: MenuSectionProps) => {
  const renderSpicyLevel = (level?: number) => {
    if (!level) return null;
    return (
      <div className="flex items-center gap-1">
        {[...Array(level)].map((_, i) => (
          <span key={i} className="text-red-500 text-sm">🌶️</span>
        ))}
      </div>
    );
  };

  return (
    <section id="menu" className="py-16 px-4">
      <div className="container mx-auto">
        <h3 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Menu</h3>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category 
                ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" 
                : "border-orange-300 hover:bg-orange-50"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const cartItem = cart.find(cartItem => cartItem.id === item.id);
            
            return (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-orange-200 hover:border-orange-300">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    {renderSpicyLevel(item.spicyLevel)}
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      ${item.price.toFixed(2)}
                    </span>
                    
                    {cartItem ? (
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-semibold text-lg w-8 text-center">
                          {cartItem.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => addToCart(item)}
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
