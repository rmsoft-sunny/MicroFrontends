import { FindInfoMain } from "./components/find/main";

const FindInfoPage = () => {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center ">
        <div className="my-8 w-[400px] rounded-2xl border p-4 shadow-lg">
          <div className="flex h-full w-full flex-col">
            <header className="flex justify-center p-2 font-varela text-3xl font-bold text-blue-500">
              CLIVE WORKS
            </header>
            <main>
              <FindInfoMain />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindInfoPage;
