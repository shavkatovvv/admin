import { useCreateBrand } from "../service/mutation/useCreateBrand";
import { ReusableForm } from "../reusable/reusablefom";
import { message, Form } from "antd";
import { useNavigate } from "react-router-dom";

export const CreateBrand = () => {
    const { mutate } = useCreateBrand();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const submit = (values: { title: string; image: any[] }) => {
        const formData = new FormData();

        formData.append("title", values.title);

        if (values.image && values.image.length > 0) {
            const file = values.image[0].originFileObj;
            formData.append("image", file);
        } else {
            console.error("Image is undefined or empty.");
            return;
        }

        mutate(formData, {
            onSuccess: () => {
                message.success("Brand added successfully!");
                form.resetFields();
                navigate("/app/Brand-list");
            },
            onError: (error) => {
                message.error(`Failed to add brand: ${error.message}`);
            },
        });
    };

    return (
        <Form form={form} layout="vertical">
            <ReusableForm submit={submit} form={form} />
        </Form>
    );
};
