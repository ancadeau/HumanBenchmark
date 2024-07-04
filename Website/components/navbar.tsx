// components/navbar.tsx
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav style={{ display: "flex", alignItems: "center", padding: "10px" }}>
      <div style={{ marginRight: "auto" }}>
        <Link href="/">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: "40px", cursor: "pointer" }}
          />
        </Link>
      </div>
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Link href="/play">Play</Link>
        <Link href="/leaderboard">Leaderboard</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/profile">
          <img
            src="/profile.png"
            alt="Profile"
            style={{
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
              marginLeft: "auto",
            }}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;