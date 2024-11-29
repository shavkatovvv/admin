import { UserOutlined } from "@ant-design/icons";

interface MenuItem {
    id: number;
    label: string;
    icon: React.ComponentType;
    path: string;
}

export const data: MenuItem[] = [
    {
        id: 1,
        label: "category-list",
        icon: UserOutlined,
        path: "tabll",
    },
];
