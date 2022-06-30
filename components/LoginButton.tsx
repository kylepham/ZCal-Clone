import { IconType } from "react-icons";

interface LoginButtonProps {
  type: string;
  Icon: IconType;
  onClick?: () => {};
}

const LoginButton = ({ type, Icon, onClick }: LoginButtonProps) => {
  return (
    <button
      className="my-2 flex w-5/6 items-center justify-center space-x-4 rounded border border-black bg-gray-800 p-2 hover:cursor-pointer hover:bg-gray-700"
      onClick={onClick}
    >
      <Icon size="1.5em" />

      <p className="pointer-events-none select-none font-bold">Login with {type}</p>
    </button>
  );
};

export default LoginButton;
