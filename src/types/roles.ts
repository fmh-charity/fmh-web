import type { APP_ROLES } from "../shared/contants";

export type AllRolesNamesType = (typeof APP_ROLES)[number]["key"];
