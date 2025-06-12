
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import AuthModal from "@/components/AuthModal";
import CartModal from "@/components/CartModal";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import Footer from "@/components/Footer";
import { menuItems, categories, MenuItem } from "@/data/menuData";

interface CartItem extends MenuItem {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Header
        getTotalItems={getTotalItems}
        setIsCartModalOpen={setIsCartModalOpen}
        isLoggedIn={isLoggedIn}
        user={user}
        setIsAuthModalOpen={setIsAuthModalOpen}
        handleLogout={handleLogout}
      />

      <HeroSection />

      <MenuSection
        filteredItems={filteredItems}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cart={cart}
        addToCart={addToCart}
        updateQuantity={updateQuantity}
      />

      <Footer />

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
