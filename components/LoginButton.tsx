import { IconType } from "react-icons";
import { FcGoogle } from "react-icons/fc";

interface LoginButtonProps {
  type: string;
  Icon: IconType;
  onClick?: () => {};
}

const LoginButton = ({ type, Icon, onClick }: LoginButtonProps) => {
  return (
    <button
      className="flex items-center justify-center w-5/6 space-x-4 p-2 my-2 bg-white border border-black rounded hover:bg-slate-100 hover:cursor-pointer"
      onClick={onClick}
    >
      <Icon size="1.5em" />
      <p className="pointer-events-none select-none font-bold">Login with {type}</p>
    </button>
  );
};

export default LoginButton;
