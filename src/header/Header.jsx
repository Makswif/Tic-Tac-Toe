import Image from "next/image";
import LogoSrc from "./Logo.svg";
import { Profile } from "../profile";
import { ArrowDownIcon } from "../game/Icons/arrow-down-icon";
import { UiButton } from "../uikit/ui-button";

export default function Header() {
  return (
    <header className="flex h-24 items-center px-8 bg-white shadow-lg ">
      <Image className="h-20 w-20" src={LogoSrc} alt="Logo" />
      <h1 className="m-6 font-[Roboto] text-[#e45651] text-4xl">
        TT <span className="text-[#225577]">Toe</span>
      </h1>
      <div className="w-px h-8 mx-6 bg-gray-200" />
      <UiButton className="w-44" variant="primary" size="md">
        Играть
      </UiButton>
      <button className="ml-auto flex items-center gap-2 text-start  hover:text-[hsl(225,100%,83%)] transition-colors">
        <Profile name="Paromovevg" rating="1230" />
        <ArrowDownIcon />
      </button>
    </header>
  );
}
