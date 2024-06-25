import React from "react";
import Logo from "./Logo";
import RightNavBar from "./RightNavBar";
import {Outlet} from "react-router-dom";

export default function RootLayout({children}) {
  return (
    <>
      <div className="min-h-screen max-h-svh max-w-full h-screen bg-background">
        <header className="h-[6%] w-full flex items-center shadow-md border-b">
          <nav className="h-full w-full flex items-center justify-between">
            <Logo />
            <RightNavBar />
          </nav>
        </header>
        <main className="h-[94%] w-full flex">
          <Outlet />
        </main>
      </div>
    </>
  );
}
