import {
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import React from "react";
import { UserDropdown } from "./user-dropdown";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export const MyNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const menuItems = ["PLAY", "LEADERBOARD"];

  const isLinkActive = (path: string) => pathname === path;

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="sticky top-0 z-50"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent className="sm:hidden">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="start">
        <NavbarBrand>
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-10" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={isLinkActive("/")}>
          <Link
            color="foreground"
            href="/"
            className={`${
              isLinkActive("/") ? "text-primary" : "text-foreground"
            }`}
          >
            PLAY
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isLinkActive("/leaderboard")}>
          <Link
            className={`${
              isLinkActive("/leaderboard") ? "text-primary" : "text-foreground"
            }`}
            href="/leaderboard"
            aria-current={isLinkActive("/leaderboard") ? "false" : "false"}
          >
            LEADERBOARD
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <UserDropdown />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                item === "PLAY"
                  ? isLinkActive("/") ? "primary" : "foreground"
                  : item === "LEADERBOARD"
                  ? isLinkActive("/leaderboard") ? "primary" : "foreground"
                  : "foreground"
              }
              href={item === "PLAY" ? "/" : item === "LEADERBOARD" ? "/leaderboard" : "/"}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

// export const MyNavbar = ({ children }: Props) => {
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);

//   const menuItems = ["PLAY", "LEADERBOARD"];

//   return (
//     <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//       <Navbar
//         classNames={{
//           item: [
//             "flex",
//             "relative",
//             "h-full",
//             "items-center",
//             "data-[active=true]:after:content-['']",
//             "data-[active=true]:after:absolute",
//             "data-[active=true]:after:bottom-0",
//             "data-[active=true]:after:left-0",
//             "data-[active=true]:after:right-0",
//             "data-[active=true]:after:h-[2px]",
//             "data-[active=true]:after:rounded-[2px]",
//             "data-[active=true]:after:bg-primary",
//           ],
//         }}
//       >
//         <NavbarContent className="md:hidden">
//           <BurguerButton />
//         </NavbarContent>
//         <NavbarBrand className="w-fit">
//           <Link href="/">
//             <img src="/logo.png" alt="Logo" className="h-10" />
//           </Link>
//         </NavbarBrand>
//         <NavbarContent className="hidden sm:flex gap-4" justify="center">
//           <NavbarItem>
//             <Link color="foreground" href="#">
//               PLAY
//             </Link>
//           </NavbarItem>
//           <NavbarItem isActive>
//             <Link href="#" aria-current="page">
//               LEADERBOARD
//             </Link>
//           </NavbarItem>
//         </NavbarContent>
//         <NavbarContent
//           justify="end"
//           className="w-fit data-[justify=end]:flex-grow-0"
//         >
//           <NavbarContent>
//             <UserDropdown />
//           </NavbarContent>
//         </NavbarContent>
//       </Navbar>
//     </div>
//   );
// };
