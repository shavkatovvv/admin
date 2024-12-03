import { useCreateCategory } from "../service/mutation/useCreateCategory";
import { ReusableForm } from "../reusable/reusablefom";
import { RcFile } from "antd/es/upload";
import { message, Form } from "antd";
import { useNavigate } from "react-router-dom";
export const CreateCategory = () => {
    const { mutate } = useCreateCategory();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const submit = (values: { title: string; image: { file: RcFile } }) => {
        const formData = new FormData();

        formData.append("title", values.title);

        if (values.image) {
            formData.append("image", values.image.file);
        }

        mutate(formData, {
            onSuccess: () => {
                message.success("Category added successfully!");
                form.resetFields();
                navigate("/app");
            },
            onError: (error) => {
                message.error(`Failed to add category: ${error.message}`);
            },
        });
    };

    return (
        <>
            <ReusableForm submit={submit} form={form} />
        </>
    );
};
