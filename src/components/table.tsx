import React, { useEffect, useState } from "react";
import type { TableProps } from "antd";
import {
    Form,
    Input,
    InputNumber,
    Popconfirm,
    Typography,
    Table,
    message,
    Button,
    Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateCategory } from "../service/mutation/useCreateCategory";
import { useGetCategory } from "../service/mutation/useGetCategory";

export interface Create {
    img: File;
    name: string;
    change: string;
}

interface DataType {
    key: string;
    img: string;
    name: string;
    change: string;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text";
    record: DataType;
    index: number;
}

const TableComponent: React.FC = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState<DataType[]>([]);
    const [editingKey, setEditingKey] = useState("");
    const [fileList, setFileList] = useState<any[]>([]);
    const { mutate } = useCreateCategory();
    const { data: categoryData } = useGetCategory();

    useEffect(() => {
        if (categoryData) {
            console.log("Fetched Category Data:", categoryData);
            const formattedData = categoryData.map((item: any) => ({
                key: item.id.toString(),
                img: item.img,
                name: item.name,
                change: "Edit",
            }));
            setData(formattedData);
        }
    }, [categoryData]);

    const onFinish = (data: Create) => {
        mutate(data, {
            onSuccess: () => {
                message.success("Category created successfully");
            },
        });
    };

    const isEditing = (record: DataType) => record.key === editingKey;

    const edit = (record: Partial<DataType> & { key: React.Key }) => {
        form.setFieldsValue({ img: "", name: "", change: "", ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as DataType;

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const handleUploadChange = (info: any) => {
        let newFileList = [...info.fileList];

        newFileList = newFileList.slice(-1);
        newFileList = newFileList.map((file) => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });

        setFileList(newFileList);

        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const columns = [
        {
            title: "Image",
            dataIndex: "img",
            width: "25%",
            render: (text: string) => (
                <img src={text} alt="category" style={{ width: "100px" }} />
            ),
            editable: true,
        },
        {
            title: "Name",
            dataIndex: "name",
            width: "25%",
            editable: true,
        },
        {
            title: "Change",
            dataIndex: "operation",
            render: (_: any, record: DataType) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{ marginRight: 8 }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link
                        disabled={editingKey !== ""}
                        onClick={() => edit(record)}
                    >
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns: TableProps<DataType>["columns"] = columns.map(
        (col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: (record: DataType) => ({
                    record,
                    inputType: col.dataIndex === "name" ? "text" : "number",
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                }),
            };
        }
    );

    return (
        <>
            (
            <Form form={form} component={false}>
                <Table<DataType>
                    components={{
                        body: { cell: EditableCell },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{ onChange: cancel }}
                />
            </Form>
            )
            <Form
                name="basic"
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, paddingTop: "50px" }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    label="Upload Image"
                    name="img"
                    rules={[
                        {
                            required: true,
                            message: "Please upload an image!",
                        },
                    ]}
                >
                    <Upload
                        name="file"
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        headers={{ authorization: "authorization-text" }}
                        fileList={fileList}
                        onChange={handleUploadChange}
                    >
                        <Button icon={<UploadOutlined />}>
                            Click to Upload
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input the category name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default TableComponent;
