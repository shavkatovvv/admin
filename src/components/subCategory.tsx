import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetSubCategory } from "../service/query/useGetSub";
import { useDeleteCategory } from "../service/mutation/useDeleteCat";
import { client } from "../main";

interface Parent {
    id: number;
    title: string;
}

export interface DataType {
    key: string;
    id: string;
    image: string;
    title: string;
    parent: Parent;
}

export const SubCategory: React.FC = () => {
    const [data, setData] = useState<DataType[]>([]);
    const { data: categorySubData } = useGetSubCategory();
    const navigate = useNavigate();
    const { mutate } = useDeleteCategory();

    const Delete = (id: string) => {
        mutate(id, {
            onSuccess: () => {
                message.success("Sub-Category deleted successfully");
                client.invalidateQueries({ queryKey: ["category"] });
            },
        });
    };

    useEffect(() => {
        if (categorySubData?.results) {
            const formatData = categorySubData?.results?.map((item) => {
                const parent = item?.parent;

                const formatParent: Parent =
                    typeof parent === "number"
                        ? { id: parent, title: "Unknown" }
                        : parent || { id: 0, title: "Unknown" };

                return {
                    id: item?.id?.toString(),
                    key: item?.id?.toString(),
                    image: item?.image,
                    title: item?.title,
                    parent: formatParent,
                };
            });

            setData(formatData);
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
            title: "Parent Category",
            dataIndex: "parent",
            width: "25%",
            render: (parent: Parent) => parent?.title,
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
            title: "Action",
            dataIndex: "action",
            width: "25%",
            render: (_: any, record: DataType) => (
                <>
                    {/* <Button
                        type="primary"
                        onClick={() => navigate(`Tab-Sub-category/${record.id}`)}
                    >
                        Edit
                    </Button> */}
                    {/* <Button
                        style={{ marginLeft: "10px" }}
                        type="primary"
                        danger
                        onClick={() => Delete(record.id)}
                    >
                        Delete
                    </Button> */}

                    <Popconfirm
                        title="Are you sure you want to delete this Sub-category?"
                        onConfirm={() => Delete(record.id)}
                    >
                        <Button
                            style={{ marginLeft: "10px" }}
                            type="primary"
                            danger
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <>
            <Button
                style={{ marginBottom: "20px" }}
                type="primary"
                onClick={() =>
                    navigate("/app/Sub-category/sub-category-create")
                }
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
