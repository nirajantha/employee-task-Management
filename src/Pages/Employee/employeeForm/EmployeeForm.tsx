import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, theme } from "antd";
import { schema } from "./FormSchema";
import axios from "axios";
import { notify } from "../../../utils/toastify";

type formValues = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const EmployeeForm: React.FC = () => {
  const { token } = theme.useToken();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: formValues) => {
    try {
      const res = await axios.post(
        "https://above-horse-mildly.ngrok-free.app/api/v1/users/create",
        data
      );
      if (res) {
        notify.showSuccess("employee added successfully");
      }
    } catch (error) {
      notify.showError("error while adding employee");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col border-[2px] p-4 gap-2 justify-center items-center"
        style={{ backgroundColor: token.colorBgBase, color: token.colorText }}
      >
        <div className="flex flex-col w-full">
          <label htmlFor="username">username</label>
          <input
            type="text"
            {...register("name")}
            placeholder="enter your name"
            id="username"
            className="p-2 border-b-2"
            style={{
              backgroundColor: token.colorBgBase,
              color: token.colorText,
            }}
          />
          <p className="text-[red]">{errors.name?.message}</p>
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="email">email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="admin@example.com"
            id="email"
            className="p-2 border-b-2"
            style={{
              backgroundColor: token.colorBgBase,
              color: token.colorText,
            }}
          />
          <p className="text-[red]">{errors.email?.message}</p>
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="password">password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="password"
            id="password"
            className="p-2 border-b-2"
            style={{
              backgroundColor: token.colorBgBase,
              color: token.colorText,
            }}
          />
          <p className="text-[red]">{errors.password?.message}</p>
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            {...register("passwordConfirm")}
            id="cpassword"
            placeholder="confirm password"
            className="p-2 border-b-2"
            style={{
              backgroundColor: token.colorBgBase,
              color: token.colorText,
            }}
          />
          <p className="text-[red]">{errors.passwordConfirm?.message}</p>
        </div>

        <Button htmlType="submit">submit</Button>
        {/* type="submit"
          className="p-2 rounded w-[10rem]"
          style={{
            backgroundColor: token.colorBgBase,
            color: token.colorText,
            border: `2px solid ${token.colorText}`,
          }}
        /> */}
      </form>
    </>
  );
};

export default EmployeeForm;
