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
import Image from "next/image";
import logo from "@/public/logo.png";

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
      className="sticky top-0 z-50 navbar"
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
            <Image
              src={logo}
              alt="Logo"
              className="w-12 h-12"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={isLinkActive("/wdp/Group3/index.html")}>
          <Link
            color="foreground"
            href="/wdp/Group3/index.html"
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
              isLinkActive("/wdp/Group3/leaderboard.html") ? "text-primary" : "text-foreground"
            }`}
            href="/wdp/Group3/leaderboard.html"
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
                  ? isLinkActive("/wdp/Group3/")
                    ? "primary"
                    : "foreground"
                  : item === "LEADERBOARD"
                  ? isLinkActive("/wdp/Group3/leaderboard.html")
                    ? "primary"
                    : "foreground"
                  : "foreground"
              }
              href={
                item === "PLAY"
                  ? "/wdp/Group3/"
                  : item === "LEADERBOARD"
                  ? "/wdp/Group3/leaderboard.html"
                  : "/wdp/Group3/"
              }
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