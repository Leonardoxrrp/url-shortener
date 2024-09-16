import { Link, useNavigate } from 'react-router-dom'
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "./ui/dropdown-menu"
  import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { LinkIcon, LogOut } from 'lucide-react'

function Header() {

    const navigate = useNavigate()
    const user = true
  return (
    <nav className='py-4 flex justify-between items-center'>
        <Link to="/">
        <h3>logo here</h3>
        </Link>
        {
            !user ? <Button onClick={() => navigate("/auth")}>Login</Button> : (
<DropdownMenu>
  <DropdownMenuTrigger className='w-10 rounded-full overflow-hidden'>
  <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>LR</AvatarFallback>
</Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Leonardo Rojas</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="cursor-pointer">
        <LinkIcon  className='mr-2 h-4 w-4' />
        My links
        </DropdownMenuItem>
    <DropdownMenuItem className="text-red-400 cursor-pointer">
        <LogOut className='mr-2 h-4 w-4' />
        <span>
        Logout
        </span>
        </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
            )
        }
        
    </nav>
  )
}

export default Header