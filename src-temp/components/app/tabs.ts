export interface NavBarScreenType {
    title: string,
    to: string,
    icon: string
}

const tabsJson: Record<string, NavBarScreenType> = {
    "Главная": {
        title: "Главная",
        to: "/",
        icon: "fa fa-home"
    },
    "Пациенты": {
        title: "Пациенты",
        to: "/",
        icon: "fa fa-user"
    },
    "Просьбы": {
        title: "Просьбы",
        to: "/",
        icon: "fa fa-heart"
    },
    "Хоспис": {
        title: "Хоспис",
        to: "/",
        icon: "fa fa-hospital-o"
    }
} as const;

export default tabsJson;