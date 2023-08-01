import { ReactComponent as About24 } from "./24/about.svg";
import { ReactComponent as App24 } from "./24/app.svg";
import { ReactComponent as Attention24 } from "./24/Attention.svg";
import { ReactComponent as Bed24 } from "./24/bed.svg";
import { ReactComponent as Check24 } from "./24/check.svg";
import { ReactComponent as Docs24 } from "./24/docs.svg";
import { ReactComponent as EyeSlash24 } from "./24/eye-slash.svg";
import { ReactComponent as Eye24 } from "./24/eye.svg";
import { ReactComponent as Filter24 } from "./24/filter.svg";
import { ReactComponent as Hand24 } from "./24/hand.svg";
import { ReactComponent as Heart24 } from "./24/heart.svg";
import { ReactComponent as Help24 } from "./24/help.svg";
import { ReactComponent as Home24 } from "./24/Home.svg";
import { ReactComponent as Hospital24 } from "./24/hospital.svg";
import { ReactComponent as Left24 } from "./24/left.svg";
import { ReactComponent as Menu24 } from "./24/Menu.svg";
import { ReactComponent as News24 } from "./24/news.svg";
import { ReactComponent as Notificatons24 } from "./24/Notificatons.svg";
import { ReactComponent as Patients24 } from "./24/patients.svg";
import { ReactComponent as Right24 } from "./24/right.svg";
import { ReactComponent as Search24 } from "./24/search.svg";
import { ReactComponent as Settings24 } from "./24/settings.svg";
import { ReactComponent as User24 } from "./24/user.svg";
import { ReactComponent as Workers24 } from "./24/workers.svg";
import { ReactComponent as Calendar24 } from "./24/Календарь.svg";
import { ReactComponent as Ellipse24 } from "./24/ellipse.svg";
import { ReactComponent as ActionDefault24 } from "./24/ActionDefault.svg";
import { ReactComponent as ActionHover24 } from "./24/ActionHover.svg";
import { ReactComponent as Camera24 } from "./24/camera.svg";

import { ReactComponent as Cancel16 } from "./16/cancel.svg";
import { ReactComponent as Change16 } from "./16/change.svg";
import { ReactComponent as Check16 } from "./16/check.svg";
import { ReactComponent as Close16 } from "./16/close.svg";
import { ReactComponent as Down16 } from "./16/Down.svg";
import { ReactComponent as Edit16 } from "./16/edit.svg";
import { ReactComponent as Filter16 } from "./16/Filter.svg";
import { ReactComponent as Plus16 } from "./16/plus.svg";
import { ReactComponent as Sorter16 } from "./16/sorter down.svg";
import { ReactComponent as Trash16 } from "./16/trash.svg";
import { ReactComponent as Up16 } from "./16/Up.svg";
import { ReactComponent as Heart16 } from "./16/heart.svg";
import { ReactComponent as Attention16 } from "./16/attention.svg";
import { ReactComponent as Calendar16 } from "./16/calendar.svg";

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
