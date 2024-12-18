import {
    UserOutlined,
    BlockOutlined,
    DingtalkSquareFilled,
    BarcodeOutlined,
} from "@ant-design/icons";

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
        path: "/app",
    },

    {
        id: 2,
        label: "Sub-category-list",
        icon: BlockOutlined,
        path: "Sub-category",
    },

    {
        id: 3,
        label: "Brand-list",
        icon: DingtalkSquareFilled,
        path: "Brand-list",
    },

    {
        id: 4,
        label: "Banner-list",
        icon: BarcodeOutlined,
        path: "Banner-list",
    },
];
