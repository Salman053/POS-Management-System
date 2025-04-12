import UserProfileMenu from './UserProfileMenu';
import FullscreenButton from './FullScreenButton';
import { useMainContext } from '@/context/MainContext';
import { MainContextType } from '@/types';
import { logOut } from '@/firebase/auth-logic/auth';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const { currentUser } = useMainContext() as MainContextType
  const navigate  = useNavigate()

  return (
    <header className="border-b flex items-center justify-between bg-white ">
      <div className="container justify-between flex  flex-1 h-16  items-center px-4">


        {/* Logo & Welcome Message */}
        <div className="">
          <h2 className="md:text-xl font-bold">Eazy POS Solution</h2>
          <p className="md:text-sm text-xs text-muted-foreground">Welcome back, {currentUser.username} 👋🏻</p>
        </div>

        {/* Search Bar - Hidden on Mobile
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8 w-full"
              />
            </div>
          </div>
        </div> */}
      </div>

      {/* Right Section */}
      <div className="px-5 flex items-center gap-2">


        {/* Notifications
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-7 w-7" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-2">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between p-4">
              <p className="text-sm font-medium">Notifications</p>
              <Button variant="ghost" size="sm">
                Mark all as read
              </Button>
            </div>
            {/* Sample Notifications */}
        {/* <DropdownMenuItem className="p-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.jpg" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <p className="text-sm">New message from User</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>  */}


        <UserProfileMenu menuItems={[
          { label: 'Settings', onClick: async () => navigate("/shop/settings") },
          { label: 'Sign out', onClick: () => logOut() }
        ]} userEmail={currentUser.email} />
        <FullscreenButton />

      </div>

    </header>
  );
};

export default Header;