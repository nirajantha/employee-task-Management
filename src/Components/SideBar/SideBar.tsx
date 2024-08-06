import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  FormOutlined,
  FileOutlined,
  UsergroupAddOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to="/dashboard">Dashboard</Link>, "1", <DashboardOutlined />),
  getItem(<Link to="/employee">Employee</Link>, "2", <UsergroupAddOutlined />, [
    getItem(
      <Link to="/employee/add-employee"> Add Employee</Link>,
      "4",
      <PlusCircleOutlined />
    ),
  ]),
  getItem(<Link to="/task">Task</Link>, "3", <FormOutlined />),
  getItem("Files", "9", <FileOutlined />),
];

const { Sider } = Layout;
const SideBar: React.FC = () => {
  const { token } = theme.useToken();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value: any) => setCollapsed(value)}
    >
      {/* style={{backgroundColor:token.colorBgBase}} */}
      {!collapsed ? (
        <div className="demo-logo-vertical">Nirajan </div>
      ) : (
        <div className="demo-logo-vertical">thapa</div>
      )}

      <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />
      {/* style={{backgroundColor:token.colorBgBase}} */}
    </Sider>
  );
};

export default SideBar;
