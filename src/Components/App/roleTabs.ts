import { APP_ROLES } from "../../shared/contants";
import tabsJson, { NavBarScreenType } from "./tabs";

type RolesType = typeof APP_ROLES[number]["key"];

const roleTabs: Record<RolesType, NavBarScreenType[]> = {
    ROLE_ADMINISTRATOR: [tabsJson.Главная],
    ROLE_MEDICAL_WORKER: [tabsJson.Главная],
    ROLE_VOLUNTEER: [tabsJson.Главная],
    ROLE_VOLUNTEER_COORDINATOR: [tabsJson.Главная],
    ROLE_PATIENT: [tabsJson.Главная],
    ROLE_GUEST: [tabsJson.Главная],
};

export default roleTabs;