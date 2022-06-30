import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import LoginButton from "./LoginButton";

const Login = () => {
  return (
    <div className="flex w-[400px] flex-col items-center py-8">
      <h1 className="mb-8 text-2xl font-extrabold">Login</h1>

      <LoginButton type="Google" Icon={FcGoogle} onClick={() => signIn("google")} />
    </div>
  );
};

export default Login;
