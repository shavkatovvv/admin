import React from "react";
import { data } from "./data-lay";
import { Layout, Menu, Typography, Button, MenuProps } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Content, Sider } = Layout;

interface MenuItem {
    id: number;
    label: string;
    icon: React.ComponentType;
    path: string;
    children?: MenuItem[];
}

const item: MenuProps["items"] = data.map((item: MenuItem) => ({
    key: item.id,
    label: <Link to={item.path}>{item.label}</Link>,
    icon: React.createElement(item.icon),
    children: item.children?.map((child) => ({
        key: child.id,
        label: <Link to={child.path}>{child.label}</Link>,
    })),
}));

export const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <div className="wrapper">
            <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
                <Header
                    style={{
                        backgroundColor: "#001529",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <div
                        className="demo-logo"
                        style={{
                            color: "white",
                            fontSize: "24px",
                            fontWeight: "bold",
                        }}
                    >
                        ADMIN
                    </div>
                </Header>
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}
                        width={200}
                        style={{ backgroundColor: "#001529" }}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={["1"]}
                            defaultOpenKeys={["sub1"]}
                            style={{
                                height: "100%",
                                borderRight: 0,
                                backgroundColor: "#001529",
                                color: "white",
                                transition: "background-color 0.3s ease",
                            }}
                            items={item}
                            theme="dark"
                        />
                    </Sider>
                    <Layout style={{ padding: "24px", transition: "all 0.2s" }}>
                        <Content
                            style={{
                                padding: "24px",
                                background: "#fff",
                                borderRadius: "8px",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                                transition: "transform 0.3s ease",
                            }}
                        >
                            <Typography
                                onClick={() => setCollapsed(!collapsed)}
                            >
                                <Button
                                    type="primary"
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{ marginBottom: 16 }}
                                >
                                    {collapsed ? "Open" : "Close"} Menu
                                </Button>
                            </Typography>
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
};
