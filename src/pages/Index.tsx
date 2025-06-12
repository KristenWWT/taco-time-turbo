
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, User, LogIn, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuthModal from "@/components/AuthModal";
import CartModal from "@/components/CartModal";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  spicyLevel?: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Classic Beef Taco",
    description: "Seasoned ground beef with lettuce, tomato, cheese, and sour cream",
    price: 3.99,
    category: "Tacos",
    image: "/placeholder.svg",
    spicyLevel: 1
  },
  {
    id: "2", 
    name: "Carnitas Taco",
    description: "Slow-cooked pork with onions, cilantro, and lime",
    price: 4.49,
    category: "Tacos",
    image: "/placeholder.svg",
    spicyLevel: 2
  },
  {
    id: "3",
    name: "Fish Taco",
    description: "Grilled fish with cabbage slaw and chipotle mayo",
    price: 4.99,
    category: "Tacos", 
    image: "/placeholder.svg",
    spicyLevel: 1
  },
  {
    id: "4",
    name: "Chicken Burrito",
    description: "Grilled chicken, rice, beans, cheese, and salsa wrapped in a flour tortilla",
    price: 8.99,
    category: "Burritos",
    image: "/placeholder.svg"
  },
  {
    id: "5",
    name: "Veggie Burrito", 
    description: "Black beans, rice, peppers, onions, and avocado",
    price: 7.99,
    category: "Burritos",
    image: "/placeholder.svg"
  },
  {
    id: "6",
    name: "Guacamole & Chips",
    description: "Fresh made guacamole with tortilla chips",
    price: 5.99,
    category: "Sides",
    image: "/placeholder.svg"
  },
  {
    id: "7",
    name: "Mexican Street Corn",
    description: "Grilled corn with mayo, cheese, chili powder, and lime",
    price: 4.99,
    category: "Sides", 
    image: "/placeholder.svg",
    spicyLevel: 2
  },
  {
    id: "8",
    name: "Horchata",
    description: "Traditional rice and cinnamon drink",
    price: 2.99,
    category: "Drinks",
    image: "/placeholder.svg"
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const { toast } = useToast();

  const categories = ["All", "Tacos", "Burritos", "Sides", "Drinks"];

  const filteredItems = selectedCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    setUser({ name: "John Doe", email });
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    toast({
      title: "Welcome back!",
      description: "You have successfully logged in.",
    });
  };

  const handleSignup = (name: string, email: string, password: string) => {
    // Simulate signup
    setUser({ name, email });
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    toast({
      title: "Account created!",
      description: "Welcome to Fuego Tacos!",
    });
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCart([]);
    toast({
      title: "Logged out",
      description: "Come back soon!",
    });
  };

  const handlePlaceOrder = () => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
      toast({
        title: "Please log in",
        description: "You need to log in to place an order.",
        variant: "destructive",
      });
      return;
    }

    if (cart.length === 0) {
      toast({
        title: "Empty cart",
        description: "Please add items to your cart first.",
        variant: "destructive",
      });
      return;
    }

    // Simulate order placement
    setCart([]);
    setIsCartModalOpen(false);
    toast({
      title: "Order placed!",
      description: "Your delicious tacos will be ready in 15-20 minutes.",
    });
  };

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-orange-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌮</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Fuego Tacos
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsCartModalOpen(true)}
                className="relative hover:bg-orange-50 border-orange-300"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
              
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Hello, {user?.name}</span>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="hover:bg-orange-50"
                  >
                    <User className="w-5 h-5 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent">
            Authentic Mexican Flavors
          </h2>
          <p className="text-xl mb-8 text-gray-700 max-w-2xl mx-auto">
            Fresh ingredients, traditional recipes, and bold flavors delivered fast. 
            Experience the taste of Mexico with every bite.
          </p>
          <Button 
            size="lg"
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-8 py-3"
          >
            Order Now
          </Button>
        </div>
      </section>

      {/* Menu Section */}
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
                  <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                    <span className="text-6xl">🌮</span>
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">🌮</span>
            </div>
            <h4 className="text-2xl font-bold">Fuego Tacos</h4>
          </div>
          <p className="text-gray-400 mb-4">Authentic Mexican cuisine delivered fresh and fast</p>
          <p className="text-sm text-gray-500">
            © 2024 Fuego Tacos. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onPlaceOrder={handlePlaceOrder}
        totalPrice={getTotalPrice()}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};

export default Index;
