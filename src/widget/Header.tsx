import {
  Link,
  Navbar,
  NavbarContent, NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useState } from "react";
import cn from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "../icons";

const items = {
  "Владимир Матлахов": "https://t.me/h0vvian",
  "Герман Багдасарян": "https://t.me/debagi4",
  "Иван Шкель": "https://t.me/lopharb",
  "Эдуард Захарян": "https://t.me/zakharyan_1",
  "Глеб Мисюк": "https://t.me/G_MISYUK",
};

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return <section>
    <Navbar
      classNames={{
        wrapper: "max-w-none container mx-auto",
        base: "bg-NeroBlack",
        menu: "bg-NeroBlack",
      }}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="md:hidden">
        <div className={"sm:px-4 container mx-auto flex flex-row flex-nowrap justify-between items-center"}>
          {location.pathname !== "/videoFilter/" && !isMenuOpen && <div
            className={"flex flex-row flex-nowrap items-center gap-1 cursor-pointer"}
            onClick={() => {
              navigate(`/videoFilter/`);
            }}
          >
            <ArrowLeftIcon />
            <span className={"pt-1 font-medium text-[16px] text-SilverChalice"}>Назад</span>
          </div>}
          <Link href={"/"} className={"text-Nero"}>
            <h2
              className={"font-black text-[20px] pt-1"}>{isMenuOpen ? "Над кейсом работали" : location.pathname === "/videoFilter/" ? "Проверка видео" : "Просмотр"}</h2>
          </Link>
          <NavbarMenuToggle
            className={cn("p-4 scale-125")}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        </div>
      </NavbarContent>

      <NavbarContent className="hidden md:flex">
        <div className={"container mx-auto flex flex-row flex-nowrap justify-between items-center"}>
          <span className={"font-black text-[20px]"}>Проверка видео</span>
        </div>
      </NavbarContent>

      <NavbarMenu className={"justify-between items-center"}>
        <div className={"flex flex-col gap-14 mt-[60px] px-12 w-full font-medium"}>
          {Object.entries(items).map(([name, link], index) => (
            <NavbarMenuItem key={index}>
              <Link
                className="w-full text-Nero font-[20px]"
                href={link}
                target={"_blank"}
                size="lg"
              >
                {name}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
        <div className={"text-Nero text-opacity-70 px-12 pb-12 w-full"}>
          © Электроплеоптико-церебросканирователи
        </div>
      </NavbarMenu>
    </Navbar>
  </section>;
};