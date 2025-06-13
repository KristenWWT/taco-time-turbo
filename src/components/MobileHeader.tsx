
import { Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileHeaderProps {
  title: string;
  showMenu?: boolean;
  onMenuClick?: () => void;
}

const MobileHeader = ({ title, showMenu = false, onMenuClick }: MobileHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          {showMenu && (
            <Button variant="ghost" size="sm" onClick={onMenuClick}>
              <Menu className="w-5 h-5" />
            </Button>
          )}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌮</span>
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {title}
            </h1>
          </div>
        </div>
        
        <Button variant="ghost" size="sm">
          <Bell className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default MobileHeader;
