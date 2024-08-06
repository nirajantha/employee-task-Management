import React, { useEffect, useState } from "react";
import {
  Avatar,
  ConfigProvider,
  Dropdown,
  Layout,
  MenuProps,
  Switch,
  theme,
} from "antd";
import moment from "moment";

import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

interface headerProps {
  Mode: () => void;
}

const HeaderComponent: React.FC<headerProps> = ({ Mode }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState<string>(
    moment().format("MMMM Do YYYY, h:mm:ss a")
  );
  const { token } = theme.useToken();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={logout}>
          Logout
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Setting
        </a>
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header
        style={{
          color: token.colorTextBase,
          backgroundColor: token.colorBgBase,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ConfigProvider theme={{}}>
          <Switch
            checkedChildren="Light"
            unCheckedChildren="Dark"
            defaultChecked
            onChange={Mode}

            // style={{color:token.colorText,backgroundColor:token.colorBgBase,border:`2px solid ${token.colorPrimaryBorder}`}}
          />
        </ConfigProvider>

        <span className="font-bold">
          {currentTime} <ClockCircleOutlined className="font-bold" spin />
        </span>

        <Dropdown menu={{ items }} placement="bottom" arrow>
          <Avatar icon={<UserOutlined />} size={"large"} />
        </Dropdown>
      </Header>
    </>
  );
};

export default HeaderComponent;
