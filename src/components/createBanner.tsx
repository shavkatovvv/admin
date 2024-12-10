import { useCreateBanner } from "../service/mutation/useCreateBanner";

import { message, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { ReusableFormBanner } from "../reusable/reusableForm-banner";

export const CreateBanner = () => {
    const { mutate } = useCreateBanner();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const submit = (values: { description: string; image: any[] }) => {
        const formData = new FormData();

        formData.append("description", values.description);

        if (values.image && values.image.length > 0) {
            const file = values.image[0].originFileObj;
            formData.append("image", file);
        } else {
            console.error("Image is undefined or empty.");
            return;
        }

        mutate(formData, {
            onSuccess: () => {
                message.success("Banner added successfully!");
                form.resetFields();
                navigate("/app/Banner-list");
            },
            onError: (error) => {
                message.error(`Failed to add banner: ${error.message}`);
            },
        });
    };

    return (
        <Form form={form} layout="vertical">
            <ReusableFormBanner submit={submit} form={form} />
        </Form>
    );
};
