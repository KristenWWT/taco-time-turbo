
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Settings, Heart, HelpCircle, LogOut } from "lucide-react";

interface MobileProfileProps {
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  handleLogout: () => void;
  setIsAuthModalOpen: (open: boolean) => void;
}

const MobileProfile = ({ isLoggedIn, user, handleLogout, setIsAuthModalOpen }: MobileProfileProps) => {
  if (!isLoggedIn) {
    return (
      <div className="px-4 pt-20 pb-20">
        <Card>
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <CardTitle>Welcome to Fuego Tacos!</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              Sign In / Sign Up
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const menuItems = [
    { icon: Settings, label: "Settings", action: () => {} },
    { icon: Heart, label: "Favorites", action: () => {} },
    { icon: HelpCircle, label: "Help & Support", action: () => {} },
    { icon: LogOut, label: "Logout", action: handleLogout }
  ];

  return (
    <div className="px-4 pt-20 pb-20">
      {/* Profile Header */}
      <Card className="mb-6">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <CardTitle>{user?.name}</CardTitle>
          <p className="text-gray-600 text-sm">{user?.email}</p>
        </CardHeader>
      </Card>

      {/* Menu Items */}
      <Card>
        <CardContent className="p-0">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.label}
                variant="ghost"
                onClick={item.action}
                className={`w-full justify-start p-4 h-auto ${
                  index < menuItems.length - 1 ? 'border-b' : ''
                } ${item.label === 'Logout' ? 'text-red-600 hover:text-red-700' : ''}`}
              >
                <IconComponent className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileProfile;
