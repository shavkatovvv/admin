import React from "react";
import { Tabs } from "antd";
import { CreateSubCategory } from "./Create-Sub-Category";

export const TabSub: React.FC = () => (
    <Tabs
        defaultActiveKey="1"
        items={[
            {
                label: "Create-Sub-Category",
                key: "1",
                children: CreateSubCategory(),
            },
            {
                label: "Sub-Category",
                key: "2",
                children: "adsadasd",
            },
        ]}
    />
);
