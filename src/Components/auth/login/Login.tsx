import { useForm } from "react-hook-form";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { jwtDecode } from "jwt-decode";
import { Https } from "../../../utils/http";
import AuthHook from "../../../customHook/AuthHook";
import { notify } from "../../../utils/toastify";
import { toast } from "react-toastify";

type formValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { setAuth } = AuthHook();

  const navigate = useNavigate();

  const form = useForm<formValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: formValues) => {
    try {
      const res = await Https.post("/token", data);
      console.log("loginRes>>", res);
      if (res) {
        setAuth(res?.data?.email);
        localStorage.setItem("user", res?.data?.email);
        const decodedToken = jwtDecode(res.data.access_token);
        localStorage.setItem("token", JSON.stringify(decodedToken));
        notify.showSuccess("welcom back", { theme: "dark" });
        navigate("/dashboard");
      }
    } catch (error) {
      notify.showError("error occured");
    }
  };
  return (
    <>
      <div className=" login-form h-[100vh] w-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col justify-center items-center gap-[2rem] p-[2rem]  "
        >
          <h2 className="text-[white]">Admin Login Form</h2>

          <div className="flex flex-col w-[20rem]">
            <label htmlFor="email">Email</label>
            <input
              className=" p-2"
              id="email"
              type="email"
              {...register("email")}
            />
            <p className="text-[red]">{errors.email?.message}</p>
          </div>

          <div className="flex flex-col w-[20rem]">
            <label htmlFor="password">Password</label>
            <input
              className=" p-2"
              type="password"
              id="password"
              {...register("password")}
            />
            <p className="text-[red]">{errors.password?.message}</p>
          </div>
          <button className=" p-2 w-full" type="submit">
            Login
          </button>
          <p className="text-center text-[white]">Or sign up using</p>
          <div className="flex w-full justify-center items-center gap-2">
            <span className="social-media">
              <FontAwesomeIcon icon={faFacebook} color="white" />
            </span>
            <span className="social-media">
              <FontAwesomeIcon icon={faGoogle} color="white" />
            </span>
            {/* <span>facebook</span> */}
          </div>
          <span className="text-[white]">
            Dont have an account ?
            <Link className="text-[white] hover:text-[red]" to="/signup">
              {" "}
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
