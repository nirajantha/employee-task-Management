import React, { useState } from "react";
import { ConfigProvider, Layout, theme } from "antd";
import FooterComponent from "./Components/Footer/FooterComponent";
import HeaderComponent from "./Components/Header/HeaderComponent";
import SideBar from "./Components/SideBar/SideBar";
import Employee from "./Pages/Employee/Employee";
import {
  BrowserRouter as Router,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Task from "./Pages/Task/Task";
import DynamicBreadCrumb from "./Components/DynamicBreadCrumb/DynamicBreadCrumb";
import AddEmployee from "./Pages/Employee/addEmployee/AddEmployee";
import Login from "./Components/auth/login/Login";
import DashBoard from "./Pages/dashBoard/DashBoard";
// import AuthHook from './customHook/AuthHook';
// import { ToastContainer, toast } from 'react-toastify';
// import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AuthHook from "./customHook/AuthHook";

const { Content } = Layout;

interface privateProps {
  children: React.ReactNode;
}

const jwtToken = localStorage.getItem("token");

console.log("token>>", JSON.stringify(jwtToken));

// eslint-disable-next-line react-refresh/only-export-components
const PrivateRoutes: React.FC<privateProps> = ({ children }) => {
  const { auth } = AuthHook();
  console.log("auth>>", auth);
  const email = localStorage.getItem("user");
  const lightTheme = {
    colorPrimary: "#d4cece",
    colorTextBase: "black",
    colorBgBase: "#ffffff",
    colorPrimaryBorder: "black",
    colorTextLightSolid: "black",
  };
  const darkTheme = {
    colorPrimary: "#382c46",
    colorTextBase: "white",
    colorBgBase: "#2b292c",
    colorPrimaryBorder: "white",
    colorTextLightSolid: "white",
  };
  const [currentTheme, setCurrentTheme] = useState<boolean>(false);

  const themeMode = () => {
    setCurrentTheme(!currentTheme);
  };
  if (!email) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <ConfigProvider
        theme={{
          token: currentTheme ? darkTheme : lightTheme,
          components: {
            Switch: {
              handleBg: currentTheme ? "white" : "#747278",
            },
            Layout: {
              triggerBg: currentTheme ? "#3c3d3c " : "#ECECEC ",
              triggerColor: currentTheme ? "white" : "black",
            },
          },
        }}
      >
        <Layout style={{ minHeight: "100vh" }}>
          <SideBar />
          <Layout style={{ minHeight: "20vh" }}>
            <HeaderComponent Mode={themeMode} />
            <Content style={{ margin: "0 16px" }}>
              <DynamicBreadCrumb />

              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: currentTheme ? "#2b292c" : "#ffffff",
                  borderRadius: currentTheme ? "#2b292c" : "#ffffff",
                }}
              >
                {children}
              </div>
            </Content>

            <FooterComponent />
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoutes>
            <DashBoard />
          </PrivateRoutes>
        }
      />
      <Route
        path="/employee"
        element={
          <PrivateRoutes>
            <Employee />
          </PrivateRoutes>
        }
      />
      <Route
        path="/employee/add-employee"
        element={
          <PrivateRoutes>
            <AddEmployee />
          </PrivateRoutes>
        }
      />

      <Route
        path="/task"
        element={
          <PrivateRoutes>
            <Task />
          </PrivateRoutes>
        }
      />
    </>
  )
);
