// import React from "react";

// import { Form, message } from "antd";

// import { useEditCategory } from "../service/mutation/useEditCat";
// import { ReusableForm } from "../reusable/reusablefom";

// const EditCategoryComponent = ({ category }: { category: any }) => {
//     const [form] = Form.useForm();
//     const { mutate: editCategory } = useEditCategory();
//     const [fileList, setFileList] = React.useState([]);

//     const onFinish = (values: any) => {
//         const { title } = values;
//         const formData = new FormData();
//         formData.append("title", title);

//         if (fileList.length > 0) {
//             formData.append("image", fileList[0]);
//         }

//         editCategory(
//             { id: category.id, data: formData },
//             {
//                 onSuccess: () => {
//                     message.success("Category edited successfully");
//                 },
//             }
//         );
//     };

//     const handleUploadChange = ({ fileList }: { fileList: any }) => {
//         setFileList(fileList);
//     };

//     return <ReusableForm submit={onFinish} form={form} />;
// };

// export default EditCategoryComponent;
