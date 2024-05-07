import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="container grid h-screen max-w-[1400px] items-center bg-background">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
