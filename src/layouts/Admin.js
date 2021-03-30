import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  useHistory,
  useLocation,
  useParams,
  Route,
  Switch,
} from "react-router-dom";
import { Layout, Menu, Breadcrumb, Row, Col, Avatar, Modal } from "antd";
import {
  AppstoreOutlined,
  FileDoneOutlined,
  DashboardOutlined,
  ImportOutlined,
  SettingOutlined,
  UserOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

import routes from "../configs/routes";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { confirm } = Modal;

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

const TimerSection = styled.div`
  height: 40px;
  width: 100px;
  background-color: #002140;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Time = styled.span`
  color: #fff;
  font-size: 11px;
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

const Admin = () => {
  const [time, setTime] = useState(new Date());
  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumb, newBreadcrumb] = useState({
    section: "Home",
    path: "Dashboard",
  });

  let history = useHistory();
  let location = useLocation();
  let params = useParams();

  const onCollapse = (collapsed) => setCollapsed(collapsed);

  const signOutModal = () => {
    confirm({
      title: "Sign Out",
      icon: <ExclamationCircleFilled />,
      content: "Are you sure gonna sign out ?",
      okText: "Sure",
      centered: true,
      okType: "danger",
      cancelText: "Cancel",

      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const setBreadcrumb = (link = "/admin/dashboard") => {
    let section;

    let path = link.split("/")[2];
    path = path.charAt(0).toUpperCase() + path.slice(1);

    if (path === "Dashboard") {
      section = "Home";
    } else if (
      path === "Category" ||
      path === "Product" ||
      path === "Transaction"
    ) {
      section = "Content";
    } else if (path === "Settings") {
      section = "Utilities";
    } else if (path === "Profile") {
      section = "Account";
    } else {
      section = "Error";
      path = "Error";
    }

    newBreadcrumb({ section, path });
  };

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    console.log(history, "history");
    console.log(location.pathname, "location");
    console.log(params, "params");
    setBreadcrumb(location.pathname);

    return () => {
      clearInterval(interval);
    };
  }, [location]);

  const pushTo = (path = "/") => {
    history.push("/admin" + path);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        breakpoint="lg"
        collapsed={collapsed}
        onCollapse={onCollapse}
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
          <Menu.Item
            onClick={() => pushTo("/dashboard")}
            key="1"
            icon={<DashboardOutlined />}
          >
            Dashboard
          </Menu.Item>
          <Divider title="Content" collapsed={collapsed} />
          <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Products">
            <Menu.Item onClick={() => pushTo("/product")} key="2">
              All product
            </Menu.Item>
            <Menu.Item onClick={() => pushTo("/category")} key="3">
              All category
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            onClick={() => pushTo("/transaction")}
            key="4"
            icon={<FileDoneOutlined />}
          >
            Transaction
          </Menu.Item>
          <Divider title="Utilities" collapsed={collapsed} />
          <Menu.Item
            onClick={() => pushTo("/settings")}
            key="5"
            icon={<SettingOutlined style={{ textAlign: "center" }} />}
          >
            Settings
          </Menu.Item>
          <Divider title="Account" collapsed={collapsed} />
          <Menu.Item
            onClick={() => pushTo("/profile")}
            key="6"
            icon={<UserOutlined />}
          >
            Profile
          </Menu.Item>
          <Menu.Item
            danger={true}
            onClick={signOutModal}
            key="7"
            icon={<ImportOutlined />}
          >
            Sign Out
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            backgroundColor: "#001529",
          }}
        >
          <TimerSection>
            <Time>
              {time.getHours()} : {time.getMinutes()} : {time.getSeconds()}
            </Time>
          </TimerSection>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} separator=">">
            <Breadcrumb.Item>{breadcrumb.section}</Breadcrumb.Item>
            <Breadcrumb.Item>{breadcrumb.path}</Breadcrumb.Item>
          </Breadcrumb>

          <Switch>
            {routes.map((route, key) => {
              return (
                <Route
                  path={route.layout + route.path}
                  component={route.component}
                  key={key}
                />
              );
            })}
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Market Mini @2021 by Elwandy T.D.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;
