import React from "react";
import Cookies from "js-cookie";
import { Button, Input, Form, Typography, message } from "antd";
import { useLogin } from "./login";
import { useNavigate } from "react-router-dom";
import { ILogin } from "./login";

export const LoginUser: React.FC = () => {
    const { mutate } = useLogin();
    const navigate = useNavigate();

    const onFinish = (data: ILogin) => {
        mutate(data, {
            onSuccess: (res) => {
                Cookies.set("Token", res.data.token);
                navigate("/app");
                message.success("Login successfully");
            },
        });
    };
    return (
        <div className="container" style={containerStyle}>
            <Form
                name="basic"
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={formStyle}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Typography.Title level={2} style={titleStyle}>
                    Login
                </Typography.Title>
                <Form.Item
                    label="phone_number"
                    name="phone_number"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}
                >
                    <Input
                        placeholder="Enter your phone number"
                        style={inputStyle}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password
                        placeholder="Enter your password"
                        style={inputStyle}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={buttonStyle}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

// Styles
const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
    padding: "20px",
};

const formStyle: React.CSSProperties = {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "400px",
    animation: "fadeIn 0.5s ease-in-out",
};

const titleStyle: React.CSSProperties = {
    textAlign: "center",
    marginBottom: "24px",
    color: "#001529",
};

const inputStyle: React.CSSProperties = {
    borderRadius: "4px",
    padding: "10px",
    fontSize: "16px",
};

const buttonStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#001529",
    borderColor: "#001529",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    fontSize: "16px",
};
