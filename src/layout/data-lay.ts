import { NotificationOutlined, UserOutlined } from "@ant-design/icons";

interface MenuItem {
    id: number;
    label: string;
    icon: React.ComponentType;
    path: string;
}

export const data: MenuItem[] = [
    {
        id: 1,
        label: "table",
        icon: NotificationOutlined,
        path: "tabll",
    },
    {
        id: 2,
        label: "create",
        icon: UserOutlined,
        path: "/app/user-create",
    },
];
