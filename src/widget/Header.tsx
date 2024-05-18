import { BurgerIcon } from "../icons";

export const Header = () => {
  return <header className={"px-6 py-4 flex flex-row flex-nowrap justify-between items-center"}>
    <span className={"font-black text-[20px]"}>Проверка видео</span>
    <div className={"p-4"}>
      <BurgerIcon />
    </div>
  </header>;
};