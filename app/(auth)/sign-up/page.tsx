import { PhaseMain } from "./components/phase/main";

const SignUpPage = () => {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center ">
        <div className="my-8 w-[400px] rounded-2xl border p-4 shadow-lg">
          <PhaseMain />
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
