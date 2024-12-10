import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space } from "antd";

export interface FormDataType {
    submit: (values: any) => void;
    data?: object | any;
    form?: any;
    isLoading?: boolean;
    defaultFileList?: any;
}

export interface AttrValue {
    category: number[];
    title: string;
    values: string[];
}

export const AttributeForm: React.FC<FormDataType> = ({
    submit,
    data,
    isLoading,
}) => {
    const [form] = Form.useForm();

    const initialData = {
        attr_list:
            data?.attr_list?.map((item: AttrValue) => ({
                title: item.title,
                values: item.values || [],
            })) || [],
    };

    return (
        <>
            {!isLoading && (
                <Form
                    onFinish={submit}
                    layout="vertical"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    form={form}
                    name="dynamic_form_complex"
                    style={{ maxWidth: 600 }}
                    initialValues={initialData}
                    autoComplete="off"
                >
                    <Form.List name="attr_list">
                        {(fields, { add, remove }) => (
                            <div
                                style={{
                                    display: "flex",
                                    rowGap: 16,
                                    flexDirection: "column",
                                }}
                            >
                                {fields.map((field) => (
                                    <Card
                                        size="small"
                                        title={`Item ${field.name + 1}`}
                                        key={field.key}
                                        extra={
                                            <CloseOutlined
                                                onClick={() =>
                                                    remove(field.name)
                                                }
                                                style={{
                                                    color: "red",
                                                    cursor: "pointer",
                                                }}
                                            />
                                        }
                                    >
                                        <Form.Item
                                            label="Name"
                                            name={[field.name, "title"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please enter a name!",
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Attributes">
                                            <Form.List
                                                name={[field.name, "values"]}
                                            >
                                                {(subFields, subOpt) => (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                            rowGap: 16,
                                                        }}
                                                    >
                                                        {subFields.map(
                                                            (subField) => (
                                                                <Space
                                                                    key={
                                                                        subField.key
                                                                    }
                                                                >
                                                                    <Form.Item
                                                                        name={[
                                                                            subField.name,
                                                                            "value",
                                                                        ]}
                                                                        rules={[
                                                                            {
                                                                                required:
                                                                                    true,
                                                                                message:
                                                                                    "Please enter a value!",
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <Input placeholder="Add attribute" />
                                                                    </Form.Item>
                                                                    <CloseOutlined
                                                                        onClick={() =>
                                                                            subOpt.remove(
                                                                                subField.name
                                                                            )
                                                                        }
                                                                        style={{
                                                                            color: "red",
                                                                            cursor: "pointer",
                                                                        }}
                                                                    />
                                                                </Space>
                                                            )
                                                        )}
                                                        <Button
                                                            type="dashed"
                                                            onClick={() =>
                                                                subOpt.add()
                                                            }
                                                            block
                                                        >
                                                            + Add Sub Item
                                                        </Button>
                                                    </div>
                                                )}
                                            </Form.List>
                                        </Form.Item>
                                    </Card>
                                ))}
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                >
                                    + Add Item
                                </Button>
                            </div>
                        )}
                    </Form.List>
                    <Form.Item style={{ marginTop: "30px" }}>
                        <Button type="primary" htmlType="submit">
                            Send
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </>
    );
};
