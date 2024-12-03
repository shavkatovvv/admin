import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetSubCategory } from "../service/mutation/useGetSub";

export interface DataType {
    key: string;
    id: string;
    image: string;
    title: string;
    parent: {
        title: string;
        id: number;
    } | null;
}

export const SubCategory: React.FC = () => {
    const [data, setData] = useState<DataType[]>([]);
    const { data: categorySubData } = useGetSubCategory();
    const navigate = useNavigate();

    useEffect(() => {
        if (categorySubData?.results) {
            const formattedData = categorySubData?.results?.map((item) => ({
                id: item?.id.toString(),
                key: item?.id.toString(),
                image: item?.image,
                title: item?.title,
                parent: item.parent ? item.parent.title : null,
            }));

            setData(formattedData);
        }
    }, [categorySubData]);

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            width: "25%",
            editable: false,
        },
        {
            title: "Image",
            dataIndex: "image",
            width: "25%",
            render: (text: string) => (
                <img src={text} alt="subcategory" style={{ width: "100px" }} />
            ),
            editable: true,
        },
        {
            title: "Title",
            dataIndex: "title",
            width: "25%",
            editable: true,
        },

        {
            title: "Parent Category",
            dataIndex: "parent",
            width: "25%",
            editable: true,
        },
        {
            title: "Action",
            dataIndex: "action",
            width: "25%",
        },
    ];

    return (
        <>
            <Button
                style={{ marginBottom: "20px" }}
                type="primary"
                onClick={() => navigate("Tab-Sub-category")}
            >
                Create
            </Button>

            <Table<DataType>
                columns={columns}
                dataSource={data}
                size="middle"
            />
        </>
    );
};
