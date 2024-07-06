import { PulseLoader } from "react-spinners";

const ReqLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-auto bg-black/80 flex items-center justify-center z-50">
      <div className=" ">
        <PulseLoader color="#007a3f" />
      </div>
    </div>
  );
};

export default ReqLoader;
