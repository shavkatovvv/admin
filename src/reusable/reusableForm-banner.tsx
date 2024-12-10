import React, { useState } from "react";
import { Form, Input, Button, Upload } from "antd";

interface ReusableFormProps {
    submit: (values: any) => void;
    form: any;
}

export const ReusableFormBanner: React.FC<ReusableFormProps> = ({
    submit,
    form,
}) => {
    const [fileList, setFileList] = useState<any[]>([]);

    const handleFileChange = ({ fileList: newFileList }: any) => {
        setFileList(newFileList);

        form.setFieldValue("image", newFileList);
    };

    const uploadProps = {
        beforeUpload: () => false,
        fileList,
        onChange: handleFileChange,
    };

    return (
        <>
            <Form.Item
                style={{ width: "400px" }}
                label="Description"
                name="description"
                rules={[{ required: true, message: "Please enter a title!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Image"
                name="image"
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
                rules={[{ required: true, message: "Please upload an image!" }]}
            >
                <Upload accept="image/*" {...uploadProps}>
                    <Button>Select image</Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="button"
                    onClick={() => submit(form.getFieldsValue())}
                >
                    Submit
                </Button>
            </Form.Item>
        </>
    );
};
