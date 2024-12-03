import { useEffect, useState } from "react";
import { useCreateSubCategory } from "../service/mutation/useCreateSub";
import { RcFile } from "antd/es/upload";
import { message, Form, Select } from "antd";
import { DataType } from "../components/table";
import { useGetCategory } from "../service/mutation/useGetCategory";
import { useNavigate } from "react-router-dom";
import { ReusableForm } from "../reusable/reusablefom";

export const CreateSubCategory = () => {
    const { mutate } = useCreateSubCategory();
    const [data, setData] = useState<DataType[]>([]);
    const [form] = Form.useForm();
    const { data: categoryData } = useGetCategory();
    const navigate = useNavigate();

    useEffect(() => {
        if (categoryData) {
            const formattedData = categoryData.results.map((item) => ({
                id: item.id.toString(),
                key: item.id.toString(),
                title: item.title,
            }));
            setData(formattedData);
        }
    }, [categoryData]);

    const Submit = (values: {
        title: string;
        image: { file: RcFile };
        select: string;
    }) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("parent", values.select);
        if (values.image) {
            formData.append("image", values.image.file);
        }

        mutate(formData, {
            onSuccess: () => {
                message.success("Subcategory added successfully!");
                form.resetFields();
                // navigate("/app/Sub-category/Tab-Sub-category/Sub-category");
            },
            onError: (error) => {
                message.error(`Failed to add subcategory: ${error.message}`);
            },
        });
    };

    return (
        <Form autoComplete="off" form={form} onFinish={Submit}>
            <Form.Item
                label="Select Parent"
                name="select"
                rules={[
                    {
                        required: true,
                        message: "Please select a parent category!",
                    },
                ]}
            >
                <Select
                    style={{ width: 200 }}
                    allowClear
                    placeholder="Select a parent category"
                >
                    {data.map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                            {item.title}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <ReusableForm submit={Submit} form={form} />
        </Form>
    );
};
