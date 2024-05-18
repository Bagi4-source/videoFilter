import {
  Link,
  Navbar,
  NavbarContent, NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useState } from "react";
import cn from "classnames";

const items = [
  "Владимир Матлахов",
  "Герман Багдасарян",
  "Иван Шкель",
  "Эдуард Захарян",
  "Глеб Мисюк",
];

export const Header = () => {
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
          <h2 className={"font-black text-[20px] pt-1"}>{isMenuOpen ? "Меню" : "Проверка видео"}</h2>
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
          <Link
            className="w-full text-Nero font-[20px]"
            href="#"
            size="lg"
          >
            Для вас старались:
          </Link>
          {items.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full text-Nero font-[20px]"
                href="#"
                size="lg"
              >
                {item}
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