// import React from "react";
// import { Form, message, UploadFile } from "antd";
// import { useEditCategory } from "../service/mutation/useEditCat";
// import { ReusableForm } from "../reusable/reusablefom";

// interface Category {
//     id: string;
//     title: string;
// }

// interface FormValues {
//     title: string;
// }

// const EditCategoryComponent = ({ category }: { category: Category }) => {
//     const [form] = Form.useForm();
//     const { mutate: editCategory } = useEditCategory();
//     const [fileList, setFileList] = React.useState<UploadFile[]>([]);

//     React.useEffect(() => {
//         form.setFieldsValue({ title: category.title });
//     }, [category, form]);

//     const onFinish = (values: FormValues) => {
//         const { title } = values;
//         const formData = new FormData();
//         formData.append("title", title);

//         if (fileList[0]?.originFileObj) {
//             formData.append("image", fileList[0].originFileObj);
//         }

//         editCategory(
//             { id: category.id, data: formData },
//             {
//                 onSuccess: () => {
//                     message.success("Category edited successfully");
//                 },
//                 onError: (error) => {
//                     message.error(`Error: ${error.message}`);
//                 },
//             }
//         );
//     };

//     const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
//         setFileList(fileList);
//     };

//     return <ReusableForm submit={onFinish} form={form} />;
// };

// export default EditCategoryComponent;
