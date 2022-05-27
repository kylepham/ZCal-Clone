import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { BsMicrosoft } from "react-icons/bs";
import LoginButton from "./LoginButton";

const Login = () => {
  return (
    <div className="flex flex-col items-center w-[400px] bg-zinc-50 py-8">
      <h1 className="text-2xl font-extrabold mb-8">Login</h1>
      <LoginButton type="Google" Icon={FcGoogle} onClick={() => signIn("google")} />
      <LoginButton type="Microsoft (coming soon)" Icon={BsMicrosoft} />
    </div>
  );
};

export default Login;
