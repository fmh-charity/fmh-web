import About24 from "./24/about.svg?react";
import App24 from "./24/app.svg?react";
import Attention24 from "./24/Attention.svg?react";
import Bed24 from "./24/bed.svg?react";
import Check24 from "./24/check.svg?react";
import Docs24 from "./24/docs.svg?react";
import EyeSlash24 from "./24/eye-slash.svg?react";
import Eye24 from "./24/eye.svg?react";
import Filter24 from "./24/filter.svg?react";
import Hand24 from "./24/hand.svg?react";
import Heart24 from "./24/heart.svg?react";
import Help24 from "./24/help.svg?react";
import Home24 from "./24/Home.svg?react";
import Hospital24 from "./24/hospital.svg?react";
import Left24 from "./24/left.svg?react";
import Menu24 from "./24/Menu.svg?react";
import News24 from "./24/news.svg?react";
import Notificatons24 from "./24/Notificatons.svg?react";
import Patients24 from "./24/patients.svg?react";
import Right24 from "./24/right.svg?react";
import Search24 from "./24/search.svg?react";
import Settings24 from "./24/settings.svg?react";
import User24 from "./24/user.svg?react";
import Workers24 from "./24/workers.svg?react";
import Calendar24 from "./24/Календарь.svg?react";
import Ellipse24 from "./24/ellipse.svg?react";
import ActionDefault24 from "./24/ActionDefault.svg?react";
import ActionHover24 from "./24/ActionHover.svg?react";
import Camera24 from "./24/camera.svg?react";

import Cancel16 from "./16/cancel.svg?react";
import Change16 from "./16/change.svg?react";
import Check16 from "./16/check.svg?react";
import Close16 from "./16/close.svg?react";
import Down16 from "./16/Down.svg?react";
import Edit16 from "./16/edit.svg?react";
import Filter16 from "./16/Filter.svg?react";
import Plus16 from "./16/plus.svg?react";
import Sorter16 from "./16/sorter down.svg?react";
import Trash16 from "./16/trash.svg?react";
import Up16 from "./16/Up.svg?react";
import Heart16 from "./16/heart.svg?react";
import Attention16 from "./16/attention.svg?react";
import Calendar16 from "./16/calendar.svg?react";

const Icon24Obj = {
  About24,
  App24,
  Attention24,
  Bed24,
  Check24,
  Docs24,
  EyeSlash24,
  Eye24,
  Filter24,
  Hand24,
  Heart24,
  Help24,
  Home24,
  Hospital24,
  Left24,
  Menu24,
  News24,
  Notificatons24,
  Patients24,
  Right24,
  Search24,
  Settings24,
  User24,
  Workers24,
  Calendar24,
  Ellipse24,
  ActionDefault24,
  ActionHover24,
  Camera24,
};

const Icon16Obj = {
  Cancel16,
  Change16,
  Check16,
  Close16,
  Down16,
  Edit16,
  Filter16,
  Plus16,
  Sorter16,
  Trash16,
  Up16,
  Heart16,
  Attention16,
  Calendar16,
};

export const Icon: {
  [k in keyof typeof Icon24Obj | keyof typeof Icon16Obj]: React.FC<
    React.SVGProps<SVGSVGElement>
  >;
} = { ...Icon24Obj, ...Icon16Obj };
