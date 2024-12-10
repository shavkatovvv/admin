import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetBrand } from "../service/query/useGetBrand";
import { useDeleteBrand } from "../service/mutation/useDeleteBrand";
import { client } from "../main";
// import { useEditCategory } from "../service/mutation/useEditCat";

export interface DataType {
    key: string;
    id: string;
    render?: (image: string) => React.ReactNode;
    title: string;
}

const Brand: React.FC = () => {
    const [data, setData] = useState<DataType[]>([]);
    const navigate = useNavigate();
    const { data: BrandData } = useGetBrand();
    const { mutate: useDeleteB } = useDeleteBrand();
    // const { mutate: editCategory } = useEditCategory();

    useEffect(() => {
        if (BrandData) {
            const formattedData = BrandData.results.map((item) => ({
                id: item?.id?.toString(),
                key: item?.id?.toString(),
                image: item.image,
                title: item.title,
            }));
            setData(formattedData);
        }
    }, [BrandData]);

    const Delete = (id: string) => {
        useDeleteB(id, {
            onSuccess: () => {
                message.success("Brand deleted successfully");
                client.invalidateQueries({ queryKey: ["Brand"] });
            },
        });
    };

    // const Edit = (id: string) => {
    //     editCategory(id, {
    //         onSuccess: () => {
    //             message.success("Category edited successfully");
    //             client.invalidateQueries({ queryKey: ["category"] });
    //         },
    //     });
    // };

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
                <Image src={text} alt="Brand" style={{ width: "100px" }} />
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
                        onClick={() =>
                            navigate(`app/category-edit/${record.id}`)
                        }
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this brand?"
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
                onClick={() => navigate("/app/Brand-list/create-brand")}
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

export default Brand;
