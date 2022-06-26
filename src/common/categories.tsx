import React, { ReactElement } from "react";
import announsment from "src/assets/categoryIcons/announsment.png";
import birthday from "src/assets/categoryIcons/birthday.png";
import salary from "src/assets/categoryIcons/salary.png";
import union from "src/assets/categoryIcons/union.png";
import holiday from "src/assets/categoryIcons/holiday.png";
import massage from "src/assets/categoryIcons/massage.png";
import gratitude from "src/assets/categoryIcons/gratitude.png";
import help from "src/assets/categoryIcons/help.png";

export interface ICategory {
  title: string;
  img: ReactElement;
}

export const categories = [
  {
    title: "Объявления",
    img: <img src={announsment} alt="Иконка Объявления" />,
  },
  {
    title: "День рождения",
    img: <img src={birthday} alt="Иконка день рождения" />,
  },
  {
    title: "Зарплата",
    img: <img src={salary} alt="Иконка Зарплата" />,
  },
  {
    title: "Профсоюз",
    img: <img src={union} alt="Иконка Профсоюз" />,
  },
  {
    title: "Праздник",
    img: <img src={holiday} alt="Иконка Праздник" />,
  },
  {
    title: "Массаж",
    img: <img src={massage} alt="Иконка Массаж" />,
  },
  {
    title: "Благодарность",
    img: <img src={gratitude} alt="Иконка Благодарность" />,
  },
  {
    title: "Нужна помощь",
    img: <img src={help} alt="Иконка Нужна помощь" />,
  },
];
