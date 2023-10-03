"use client";

import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
  FcReading,
  FcMoneyTransfer,
  FcDataSheet,
} from "react-icons/fc";
import { FaLanguage } from "react-icons/fa";
import { PiCookingPotBold } from "react-icons/pi";
import { GiMaterialsScience } from "react-icons/gi";
import { SiCoinmarketcap } from "react-icons/si";

import { Category } from "@prisma/client";
import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: {
    id: string;
    name: string;
  }[];
}

const iconMap: Record<Category["name"], IconType> = {
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Fitness: FcSportsMode,
  Accounting: FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  Filmmaking: FcFilmReel,
  Engineering: FcEngineering,
  Cooking: PiCookingPotBold,
  "Language Learning": FaLanguage,
  Science: GiMaterialsScience,
  Writing: FcReading,
  Marketing: SiCoinmarketcap,
  Economics: FcMoneyTransfer,
  "Data Science": FcDataSheet,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          value={item.id}
          icon={iconMap[item.name]}
        />
      ))}
    </div>
  );
};
