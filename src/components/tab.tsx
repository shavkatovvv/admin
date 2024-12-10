import React from "react";
import { Tabs } from "antd";
import { CreateCategory } from "./create-category";

export const Tabb: React.FC = () => (
    <Tabs
        defaultActiveKey="1"
        items={[
            {
                label: "Create Category",
                key: "1",
                children: <CreateCategory />,
            },
            {
                label: "Sub-Category",
                key: "2",
                children: "subCategory",
            },
        ]}
    />
);
