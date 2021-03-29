import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { Layout, Menu, Breadcrumb, Row, Col, Avatar } from "antd";
import {
  FileSearchOutlined,
  AppstoreOutlined,
  FileDoneOutlined,
  DashboardOutlined,
  ImportOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const animatedOpatciy = keyframes`
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
`;

const Logo = styled.a`
  padding: 10px 0px;
  padding-left: -5px;
  color: #fff;
  font-family: "OswaldMedium";
  justify-content: center;
  display: flex;
  font-size: 28px;
  animation: ${(props) => (props.opacity === "false" ? animatedOpatciy : null)}
    1s ease-in forwards;

  &:hover {
    color: #fff;
  }
`;

const ProfileSection = styled(Row)`
  padding: 15px;
  background-color: #002140;
`;

const ProfileEmail = styled.p`
  color: #fff;
  margin: 0px;
  font-size: 16px;
`;
const ProfileUsername = styled.span`
  color: #fff;
  font-size: 12px;
`;

const Divider = ({ title, collapsed }) => (
  <p
    className={
      collapsed ? "style__mydivider style__centered" : "style__mydivider"
    }
  >
    {title}
  </p>
);

class Dashboard extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => this.setState({ collapsed });

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          breakpoint="lg"
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          <Logo opacity={collapsed.toString()}>
            {collapsed ? "MN" : "Market Mini"}
          </Logo>
          <ProfileSection justify="center">
            <Col span={collapsed ? 24 : 8}>
              <Avatar size={45} icon={<UserOutlined />} />
            </Col>
            {!collapsed && (
              <Col span={16}>
                <ProfileEmail>John Doe</ProfileEmail>
                <ProfileUsername>johndoe@gmail.com</ProfileUsername>
              </Col>
            )}
          </ProfileSection>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Divider title="Home" collapsed={collapsed} />
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            <Divider title="Content" collapsed={collapsed} />
            <Menu.Item key="2" icon={<FileSearchOutlined />}>
              Category
            </Menu.Item>
            <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Products">
              <Menu.Item key="3">All product</Menu.Item>
              <Menu.Item key="4">Add new</Menu.Item>
            </SubMenu>
            <Menu.Item key="5" icon={<FileDoneOutlined />}>
              Transaction
            </Menu.Item>
            <Divider title="Utilities" collapsed={collapsed} />
            <Menu.Item key="6" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
            <Divider title="Account" collapsed={collapsed} />
            <Menu.Item key="7" icon={<UserOutlined />}>
              Profile
            </Menu.Item>
            <Menu.Item danger={true} key="8" icon={<ImportOutlined />}>
              Sign Out
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              Bill is a cat.
            </div>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
