import Head from "next/head";
import { BsGithub } from "react-icons/bs";

const About = () => {
  return (
    <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2">
      <Head>
        <title>About - ZCal Clone</title>
      </Head>
      <div className="m-auto w-fit rounded-lg border-2 border-yellow-200 p-8">
        <p className="text-lg font-bold">Hoang Pham</p>

        <a href="https://github.com/kylepham" target="_blank" rel="noreferrer">
          <BsGithub size={30} className="m-auto fill-gray-500 hover:cursor-pointer hover:fill-gray-200" />
        </a>
      </div>
    </div>
  );
};

export default About;
