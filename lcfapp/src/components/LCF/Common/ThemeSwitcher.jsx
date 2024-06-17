import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {DesktopIcon, MoonIcon, SunIcon} from "@radix-ui/react-icons";
import React from "react";
import {useTheme} from "./ThemeProvider";

export default function ThemeSwitcher() {
  const {setTheme} = useTheme();
  return (
    <Tabs defaultValue="system">
      <TabsList>
        <TabsTrigger value="light" onClick={() => setTheme("light")}>
          <SunIcon />
        </TabsTrigger>
        <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
          <MoonIcon />
        </TabsTrigger>
        <TabsTrigger value="system" onClick={() => setTheme("system")}>
          <DesktopIcon />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
