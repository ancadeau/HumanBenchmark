import {
  Avatar,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarItem,
} from "@nextui-org/react";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { deleteAuthCookie } from "@/actions/auth.action";
import { ProfileIcon } from "../icons/ProfileIcon";
import { LogoutIcon } from "../icons/LogoutIcon";

export const UserDropdown = () => {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await deleteAuthCookie();
    router.replace("/login");
  }, [router]);


  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            isBordered
            color="primary"
            as="button"
            size="md"
            src="profile.png"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownSection title="Signed in as : MyUserName">
          <DropdownItem
            key="profile"
            href="/profile"
            startContent={<ProfileIcon className={iconClasses} />}
          >
            Profile
          </DropdownItem>
          <DropdownItem
            key="logout"
            className="text-danger"
            color="danger"
            startContent={
              <LogoutIcon className={cn(iconClasses, "text-danger")} />
            }
            onPress={handleLogout}
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
