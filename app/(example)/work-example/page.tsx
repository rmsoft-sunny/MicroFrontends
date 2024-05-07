import { ExampleComponent } from "./_components/example";

const WorkExamplePage = () => {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <div className="item flex h-[300px] w-[400px] flex-col gap-4 rounded-lg bg-white p-8">
          <ExampleComponent />
        </div>
      </div>
    </>
  );
};

export default WorkExamplePage;
