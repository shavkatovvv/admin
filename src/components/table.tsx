import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetCategory } from "../service/mutation/useGetCategory";
import { useDeleteCategory } from "../service/mutation/useDeleteCat";
import { client } from "../main";

export interface DataType {
    key: string;
    id: string;
    render?: (image: string) => React.ReactNode;
    title: string;
}

const TableComponent: React.FC = () => {
    const [data, setData] = useState<DataType[]>([]);
    const navigate = useNavigate();
    const { data: categoryData } = useGetCategory();
    const { mutate: deleteCategory } = useDeleteCategory();

    useEffect(() => {
        if (categoryData) {
            console.log("Fetched Category Data:", categoryData.results);
            const formattedData = categoryData.results.map((item) => ({
                id: item?.id.toString(),
                key: item?.id.toString(),
                image: item.image,
                title: item.title,
            }));
            setData(formattedData);
        }
    }, [categoryData]);

    const Delete = (id: string) => {
        deleteCategory(id, {
            onSuccess: () => {
                message.success("Category deleted successfully");
                client.invalidateQueries({ queryKey: ["category"] });
            },
        });
    };

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
                <img src={text} alt="category" style={{ width: "100px" }} />
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
                    <Button
                        type="primary"
                        onClick={() => navigate(`edit-category/${record.id}`)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this category?"
                        onConfirm={() => Delete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            style={{
                                marginLeft: "10px",
                                backgroundColor: "red",
                                color: "white",
                            }}
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
                onClick={() => navigate("Tab-category")}
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

export default TableComponent;
