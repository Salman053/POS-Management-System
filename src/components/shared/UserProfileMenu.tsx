import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { logOut } from '@/firebase/auth-logic/auth';
import { useNavigate } from 'react-router-dom';


const UserProfileMenu = ({
  userEmail = '',
  avatarSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS3mr0rOaAemqvSNKmzBD-I6mcpod9HFQuCw&s',
  initials = '',
  menuItems = [
    // { label: 'Profile', onClick: () => {} },
    { label: 'Settings', onClick: () => null },
    { label: 'Sign out', onClick: () => logOut() }

  ],
  showEmail = true,
  buttonVariant = 'ghost',
  align = 'end',
  className = ''
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={buttonVariant as any}
          className={`flex items-center gap-2 ${className}`}
        >
          <Avatar>
            <AvatarImage className='object-cover' src={avatarSrc} alt={userEmail} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          {showEmail && (
            <span title={userEmail} className="hidden  md:inline-flex">
              {userEmail.slice(0, 15)}...
            </span>
          )}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align as any}>
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            className={`${item.label === 'Sign out' ? 'text-red-500' : ''}`}
            key={`${item.label}-${index}`}
            onClick={item.onClick}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileMenu;