import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CustomerFooter from "../Customer-site/components/layout/Footer/CustomerFooter";
import { useDispatch, useSelector } from "react-redux";
import { getApiUsers } from "../../store/action";
import { AppDispatch } from "../../store";
import { ToastContainer, toast } from "react-toastify";
import { registerAPI } from "../../Api/auth";
import { IUser } from "../../Interface";
const Register = () => {
  const data = useSelector((state: any) => state?.userReducer?.users);
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [confirmPassword, setConfirmPassword] = useState<any>("");
  const [success, setSuccess] = useState<any>("");
  const [error, setError] = useState<any>();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getApiUsers());
  }, []);
  const register = async (e: any) => {
    e.preventDefault();
    const checkUser = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    const newUser = {
      email: email,
      password: password,
      refreshToken: "",
      avatar: "",
      firstName: "",
      lastName: "",
      role: data?.length === 0 ? 1 : 2,
    };
    const checkError = validate(checkUser);
    if (checkError.isError === false) {
      const response = await registerAPI(newUser);
      if (response.data.success === true) {
        toast.success("Đăng Ký Thành Công");
        setTimeout(() => {
          setEmail("");
          dispatch(getApiUsers());
          navigate("/auth/login");
        }, 3000);
      } else {
        toast.error("Đăng ký thất bại");
      }
    }
  };
  const validate = (user: any) => {
    const newError = {
      isError: false,
      emailMSG: "",
      passwordMSG: "",
      confirmPassWordMSG: "",
    };
    const checkData = data?.find((item: any) => item.email === user.email);
    if (checkData) {
      newError.isError = true;
      newError.emailMSG = "Email đã tồn tại ! ";
    }
    const regxEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!user.email.match(regxEmail)) {
      newError.isError = true;
      newError.emailMSG = "Email không đúng định dạng - Vui lòng nhập lại";
    }
    if (user.password.length < 8 || user.password.length > 30) {
      newError.isError = true;
      newError.passwordMSG =
        "Vui lòng tạo mật khẩu lớn hơn 8 và nhỏ hơn 30 ký tự";
    }
    if (user.password !== user.confirmPassword) {
      newError.isError = true;
      newError.confirmPassWordMSG = "Mật khẩu không trùng nhau";
    }
    setError(newError);
    return newError;
  };
  return (
    <>
      <div className="w-[40%] max-w-full px-3 mx-auto mt-0 mb-10 md:flex-0 shrink-0">
        <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
            <h1 className="text-red-600 font-bold text-xl mb-10">
              VitoPerfume
            </h1>
            <h1>Đăng Ký </h1>
          </div>
          <div className="flex-auto p-6">
            <form role="form text-left ">
              <div className="mb-4">
                {error?.isError === true && (
                  <p className="text-green-700 w-[70%] m-auto mb-2">
                    {error.emailMSG}{" "}
                  </p>
                )}
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  aria-describedby="email-addon"
                  aria-label="Email"
                  placeholder="Email"
                  className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-[70%] m-auto appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  type="email"
                />
              </div>
              <div className="mb-4">
                {error?.isError === true && (
                  <p className="text-green-700 w-[70%] m-auto mb-2">
                    {error.passwordMSG}{" "}
                  </p>
                )}
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby="password-addon"
                  aria-label="Password"
                  placeholder="Mật khẩu"
                  className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-[70%] m-auto appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  type="password"
                />
              </div>
              <div className="mb-4">
                {error?.isError === true && (
                  <p className="text-green-700 w-[70%] m-auto mb-2">
                    {error.confirmPassWordMSG}
                  </p>
                )}
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  aria-describedby="password-addon"
                  aria-label="Password"
                  placeholder="Nhập lại mật khẩu"
                  className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-[70%] m-auto appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  type="password"
                />
              </div>
              <div className="text-center">
                <button
                  onClick={register}
                  className="inline-block mt-5 px-6 py-3 w-[70%] m-auto font-bold text-center bg-black text-white uppercase align-middle transition-all   border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md   from-black-900 to-slate-800 hover:border-slate-700  "
                  type="button"
                >
                  Đăng Ký
                </button>
              </div>
              <div className="flex justify-between w-[70%] m-auto  mt-5 ">
                {error?.isError === false && (
                  <p className="text-green-700">{success} </p>
                )}
                <p className=" leading-normal text-sm">
                  Bạn đã có tài khoản?
                  <NavLink to={"/auth/login"} className={"ml-2"}>
                    Đăng nhập
                  </NavLink>
                </p>
                <NavLink to={"/"}>Trang chủ</NavLink>
              </div>
            </form>
          </div>
          <div className="flex flex-wrap px-3 -mx-3 sm:px-6 xl:px-12">
            <div className="relative w-full max-w-full px-3 mt-2 text-center shrink-0 mb-4">
              <p className="z-20 inline px-4  font-semibold leading-normal bg-white text-sm text-slate-400">
                hoặc đăng nhập với Google
              </p>
            </div>
            <div className="w-2/12   m-auto max-w-full px-1 mr-auto flex-0">
              <a className="inline-block w-full px-6 py-3 mb-4 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 64 64"
                  height="32px"
                  width="24px"
                >
                  <g
                    fillRule="evenodd"
                    fill="none"
                    strokeWidth={1}
                    stroke="none"
                  >
                    <g
                      fillRule="nonzero"
                      transform="translate(3.000000, 2.000000)"
                    >
                      <path
                        fill="#4285F4"
                        d="M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267"
                      />
                      <path
                        fill="#34A853"
                        d="M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667"
                      />
                      <path
                        fill="#FBBC05"
                        d="M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782"
                      />
                      <path
                        fill="#EB4335"
                        d="M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769"
                      />
                    </g>
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <CustomerFooter />
    </>
  );
};

export default Register;
