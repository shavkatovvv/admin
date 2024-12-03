import React, { useState } from "react";
import { Form, Input, Button, Upload } from "antd";

interface ReusableFormProps {
    submit: (values: any) => void;
    form: any;
}

export const ReusableForm: React.FC<ReusableFormProps> = ({ submit, form }) => {
    const [fileList, setFileList] = useState<any[]>([]);

    const handleFileChange = ({ fileList: newFileList }: any) => {
        setFileList(newFileList);
    };

    const handleFileRemove = (file: any) => {
        setFileList(fileList.filter((item) => item.uid !== file.uid));
    };

    const uploadProps = {
        beforeUpload: () => {
            return false;
        },
        fileList,
        onChange: handleFileChange,
        onRemove: handleFileRemove,
    };

    return (
        <>
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please enter a title!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="Image" name="image">
                <Upload accept="image/*" {...uploadProps}>
                    <Button>Select image</Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() =>
                        submit({ ...form.getFieldsValue(), image: fileList })
                    }
                >
                    Submit
                </Button>
            </Form.Item>
        </>
    );
};
