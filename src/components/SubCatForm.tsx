import React from "react";
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    Card,
    Upload,
    Select,
    // UploadFile,
} from "antd";
import { useGetCategory } from "../service/query/useGetCategory";
import { UploadOutlined } from "@ant-design/icons";

export interface AttributeValuesType {
    title?: string;
    values?: {
        value?: string;
        value_id?: number;
    }[];
    category_id?: number;
    attribute_id?: number;
    attributes?: string[] | any;
}

interface SubCreateFormProps {
    createSubmit: (data: any) => void;
    form: any;
    // initialValues?: initalSubValuesType;
    isEdit?: boolean;
}

export const SubCategoryForm: React.FC<SubCreateFormProps> = ({
    createSubmit,
    // initialValues,
    // isEdit,
    form,
}) => {
    const { data: CategoryData } = useGetCategory();
    const { Option, OptGroup } = Select;
    // const formProps = isEdit ? { ...initialValues } : {};
    // const defaultFileList: UploadFile[] = [
    //     {
    //         uid: "-1",
    //         name: `${initialValues?.title}`,
    //         status: "done",
    //         url: `${initialValues?.image}`,
    //     },
    // ];
    return (
        <div>
            <Card
                title="Create Category"
                bordered={false}
                style={{
                    width: "100%",
                    margin: "20px auto",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f9f9f9",
                }}
            >
                <Form
                    form={form}
                    onFinish={createSubmit}
                    // initialValues={{ ...formProps }}
                    layout="vertical"
                    style={{
                        padding: "20px",
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                    }}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="parent"
                                label="Category"
                                rules={[
                                    {
                                        required: true,
                                        message: "Category is required",
                                    },
                                ]}
                            >
                                <Select
                                    // defaultValue={initialValues?.category}
                                    style={{ width: 200 }}
                                >
                                    <OptGroup label="Category">
                                        {CategoryData?.results.map(
                                            (item: any) => {
                                                return (
                                                    <Option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.title}
                                                    </Option>
                                                );
                                            }
                                        )}
                                    </OptGroup>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[
                                    {
                                        required: true,
                                        message: "Title is required",
                                    },
                                ]}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter category title"
                                    style={{
                                        borderRadius: "5px",
                                        maxWidth: "600px",
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: "Image is required",
                                    },
                                ]}
                                label={"img"}
                                name={"image"}
                                valuePropName="file"
                            >
                                <Upload
                                    listType="picture"
                                    beforeUpload={() => false}
                                    // defaultFileList={
                                    //     isEdit ? defaultFileList : []
                                    // }
                                    accept="image"
                                    maxCount={1}
                                >
                                    <Button
                                        type="primary"
                                        icon={<UploadOutlined />}
                                    >
                                        Upload
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    style={{
                                        fontWeight: "bold",
                                        maxWidth: "600px",
                                    }}
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};
