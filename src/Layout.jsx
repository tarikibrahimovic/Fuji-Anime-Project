import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import Logo from "./img/fuji-logo.png";
import Sidebar from "./components/Navbar/Navbar";
import FooterReal from "./components/Footer/Footer";
import DropDown from "./components/DropDown/DropDown";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar";

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          paddingRight: "calc(var(--mantine-aside-width, 0px) + 0.1px)",
          paddingTop: "calc(var(--mantine-header-height, 0px) + 0.1px)",
          paddingLeft: "calc(var(--mantine-navbar-width, 0px) + 0.1px)",
          paddingBottom:
            "calc(var(--mantine-footer-height, 0px) + 1px) !important",
          "@media (max-width: 766px)": {
            paddingRight: "0px",
          },
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 150, lg: 150 }}
        >
          <Sidebar setOpened={setOpened} opened={opened}/>
        </Navbar>
      }
      footer={<FooterReal />}
      header={
        <Header height={70}>
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
            className="bg-dark w-full justify-between"
          >
            <div className="flex">
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Link to="/layout/home">
                <img
                  src={Logo}
                  alt=""
                  className="w-9 h-9 lg:ml-3 sm:ml-5 cursor-pointer"
                />
              </Link>
              <Link to="/layout/home">
                <h1 className="text-white text-3xl font-bold pl-3 cursor-pointer">
                  Fuji
                </h1>
              </Link>
            </div>
            <SearchBar />
            <DropDown />
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
}
