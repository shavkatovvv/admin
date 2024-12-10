import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetBanner } from "../service/query/useGetBanner";
import { useDeleteBanner } from "../service/mutation/useDeleteBanner";
import { client } from "../main";
import { Image } from "antd";
// import { useEditCategory } from "../service/mutation/useEditCat";

export interface DataType {
    key: string;
    id: string;
    render?: (image: string) => React.ReactNode;
    description: string;
}

const Banner: React.FC = () => {
    const [data, setData] = useState<DataType[]>([]);
    const navigate = useNavigate();
    const { data: BannerData } = useGetBanner();
    const { mutate: useDeleteB } = useDeleteBanner();
    // const { mutate: editCategory } = useEditCategory();

    useEffect(() => {
        if (BannerData) {
            const formattedData = BannerData.results.map((item: any) => ({
                id: item?.id?.toString(),
                key: item?.id?.toString(),
                image: item.image,
                description: item.description,
            }));
            setData(formattedData);
        }
    }, [BannerData]);

    const Delete = (id: string) => {
        useDeleteB(id, {
            onSuccess: () => {
                message.success("Banner deleted successfully");
                client.invalidateQueries({ queryKey: ["Banner"] });
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
                <Image src={text} alt="Banner" style={{ width: "100px" }} />
            ),
            editable: true,
        },
        {
            title: "Description",
            dataIndex: "description",
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
                        title="Are you sure to delete this banner?"
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
                onClick={() => navigate("/app/Banner-list/create-banner")}
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

export default Banner;
