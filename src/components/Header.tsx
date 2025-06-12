
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, User, LogIn } from "lucide-react";

interface HeaderProps {
  getTotalItems: () => number;
  setIsCartModalOpen: (open: boolean) => void;
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  setIsAuthModalOpen: (open: boolean) => void;
  handleLogout: () => void;
}

const Header = ({
  getTotalItems,
  setIsCartModalOpen,
  isLoggedIn,
  user,
  setIsAuthModalOpen,
  handleLogout
}: HeaderProps) => {
  return (
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
  );
};

export default Header;
