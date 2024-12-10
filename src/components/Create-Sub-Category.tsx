import React, { useEffect, useState } from "react";
import { message, Tabs } from "antd";
import { useForm } from "antd/es/form/Form";
import { RcFile } from "antd/es/upload";
import { useCreateSubCategory } from "../service/mutation/useCreateSub";
import { useCreateAtt } from "../service/mutation/useCreateAtt";
import { useNavigate } from "react-router-dom";
import { SubCategoryForm } from "./SubCatForm";
import { AttributeForm } from "./attributeForm";

export interface attr_listType {
    category: number[];
    title: string;
    values: string[];
}

export interface Value {
    value: string;
}

export interface Attribute {
    title: string;
    values: Value[];
}

export interface FormValues {
    attr_list: Attribute[];
}

export const CreateSubCategory: React.FC = () => {
    const { mutate: SubcategoryMutate, data: SubData } = useCreateSubCategory();
    const [activeKey, setActiveKey] = useState<string>("1");
    const { mutate: AttributeMutate } = useCreateAtt();
    const [form] = useForm();
    const navigate = useNavigate();
    const [categoryId, setCategoryId] = useState<number | null>(null);

    useEffect(() => {
        if (SubData && SubData.id) {
            setCategoryId(SubData.id);
        }
    }, [SubData]);

    const AddSubCategory = (data: {
        title: string;
        image: { file: RcFile };
        parent: string;
    }) => {
        const formData = new FormData();

        formData.append("title", data?.title);
        if (data.image) {
            formData.append("image", data.image.file);
        }
        formData.append("parent", data?.parent);

        SubcategoryMutate(formData, {
            onSuccess: (response) => {
                message.success("Category added successfully");

                form.resetFields();
                setActiveKey("2");
                setCategoryId(response.id);
            },
            onError: (error: any) => {
                message.error(`Failed to add category: ${error.message}`);
            },
        });
    };

    const SubmitAttribute = (data: FormValues) => {
        if (categoryId === null) {
            message.error("Category ID is missing.");
            return;
        }

        const attr_list: attr_listType[] = data.attr_list.map((item) => ({
            category: [categoryId],
            title: item.title,
            values: item.values.map((value) => value.value),
        }));

        AttributeMutate(
            { attr_list },
            {
                onSuccess: () => {
                    message.success("Attributes added successfully");
                    form.resetFields();
                    navigate("/app/Sub-category");
                },
                onError: (error: any) => {
                    message.error(`Failed to add attributes: ${error.message}`);
                },
            }
        );
    };

    return (
        <div>
            <Tabs activeKey={activeKey} onChange={setActiveKey}>
                <Tabs.TabPane tab="Create Subcategory" key="1">
                    <SubCategoryForm
                        isEdit={false}
                        createSubmit={AddSubCategory}
                        form={form}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Attributes" key="2">
                    {categoryId ? (
                        <AttributeForm submit={SubmitAttribute} />
                    ) : (
                        <p>Please create a subcategory first.</p>
                    )}
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
};
