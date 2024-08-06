import React from "react";
import { Breadcrumb } from "antd";
import { useLocation, Link } from "react-router-dom";

const routeNameMap: any = {
  "/": "Admin",
  "/employee": "Employee",
  "/task": "Task",
};

const DynamicBreadCrumb: React.FC = () => {
  const location = useLocation();

  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const breadcrumbItems = [
    <Breadcrumb.Item key="admin">
      <Link to="/">Admin</Link>
    </Breadcrumb.Item>,
  ].concat(
    pathSnippets.map((_, index) => {
      const url = `${pathSnippets.slice(0, index + 1).join("/")}`;
      const name = routeNameMap[url] || url.split("/").pop();

      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{name}</Link>
        </Breadcrumb.Item>
      );
    })
  );

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>{breadcrumbItems}</Breadcrumb>
  );
};

export default DynamicBreadCrumb;
