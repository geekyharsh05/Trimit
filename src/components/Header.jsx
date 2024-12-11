import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/contexts/UrlContext";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/useFetch";
import { logout } from "@/db/apiAuth";
import { toast } from "sonner";
import GlowButton from "./GlowButton/GlowButton";

const Header = () => {
  const { loading, fn: fnLogout } = useFetch(logout);
  const navigate = useNavigate();
  const location = useLocation(); 

  const { user, fetchUser } = UrlState();

  const handleLogout = async () => {
    try {
      await fnLogout();
      fetchUser();
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    }
  };

  const getInitials = (name) => {
    if (!name) return "A";
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("");
    return initials.toUpperCase();
  };

  const initials = getInitials(
    user?.user_metadata?.name || user?.user_metadata?.full_name
  );

  return (
    <>
      <nav className="py-4 flex justify-between items-center text-white ">
        <Link to="/">
          <img
            src="../assets/logo.svg"
            className="h-16 sm:h-8 md:h-12 lg:h-16 xl:h-18"
            alt="Trimit Logo"
          />
        </Link>
        <div className="flex gap-4">
          {!user ? (
              location.pathname === "/" && (
              <GlowButton onClick={() => navigate("/auth")}> Login </GlowButton>
            )
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src={
                      user?.user_metadata?.profile_pic ||
                      user?.user_metadata?.avatar_url
                    }
                  />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
  );
};

export default Header;
