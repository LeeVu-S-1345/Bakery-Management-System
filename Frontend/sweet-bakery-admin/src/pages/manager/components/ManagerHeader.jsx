import { Menu, User } from "lucide-react";

const ManagerHeader = ({
  onMenuClick,
  userName = "Ngo Minh Ngoc",
  userEmail = "ngoc.nm235984@sis.hust.edu.vn",
  userRole = "Owner",
}) => {
  return (
    <header className="bg-primary h-14 flex items-center px-4">
      {/* Hamburger Menu */}
      <button
        onClick={onMenuClick}
        className="text-primary-foreground hover:opacity-70 transition-opacity mr-4"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Logo */}
      <div className="bg-card rounded-lg p-1.5 w-10 h-10 flex items-center justify-center">
        <span className="text-primary text-sm font-script">SB</span>
      </div>

      {/* User Info Card */}
      <div className="ml-6 bg-card rounded-full px-4 py-2 flex items-center gap-3 shadow-sm">
        <div className="w-8 h-8 rounded-full border border-muted-foreground flex items-center justify-center">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="text-sm">
          <div className="font-medium text-foreground">
            {userName} - {userRole}
          </div>
          <div className="text-xs text-muted-foreground">Mail: {userEmail}</div>
        </div>
      </div>
    </header>
  );
};

export default ManagerHeader;
