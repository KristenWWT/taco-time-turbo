
import { useState } from "react";
import { Home, Search, ShoppingCart, User, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MobileNavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  getTotalItems: () => number;
  setIsCartModalOpen: (open: boolean) => void;
  isLoggedIn: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
}

const MobileNavBar = ({
  activeTab,
  setActiveTab,
  getTotalItems,
  setIsCartModalOpen,
  isLoggedIn,
  setIsAuthModalOpen
}: MobileNavBarProps) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'menu', icon: Search, label: 'Menu' },
    { id: 'cart', icon: ShoppingCart, label: 'Cart' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  const handleCartClick = () => {
    setIsCartModalOpen(true);
  };

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
    } else {
      setActiveTab('profile');
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const IconComponent = item.icon;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex flex-col items-center space-y-1 p-2 relative ${
                isActive ? 'text-orange-500' : 'text-gray-500'
              }`}
              onClick={() => {
                if (item.id === 'cart') {
                  handleCartClick();
                } else if (item.id === 'profile') {
                  handleProfileClick();
                } else {
                  setActiveTab(item.id);
                }
              }}
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
              {item.id === 'cart' && getTotalItems() > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavBar;
