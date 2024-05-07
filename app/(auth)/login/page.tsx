import Link from "next/link";
import { LoginForm } from "./components/login-form/main";
import Image from "next/image";

const LoginPage = () => {
  return (
    <>
      <div className="container relative grid h-[830px] grid-cols-2 flex-col items-center justify-center rounded-2xl border p-0 shadow-2xl">
        <div className="relative flex h-full flex-col rounded-l-2xl bg-blue-900 p-10 text-white">
          <div className="relative flex items-center text-lg font-medium">
            <Image src="/image/logo.svg" width={40} height={40} alt="" />
            <p className="font-varela text-lg font-bold">CLIVE WORKS</p>
          </div>
          <div className="h-full">
            <div className="absolute bottom-[224px] left-0 z-10 h-[380px] w-full bg-gradient-to-t from-blue-900 via-blue-900/40 to-blue-900" />
            <video
              preload="auto"
              src="https://cnb97trxvnun.objectstorage.ap-seoul-1.oci.customer-oci.com/n/cnb97trxvnun/b/clive-dev-resource-2024/o/front%2Flogin-video.mp4"
              loop={true}
              autoPlay={true}
              muted={true}
              className="absolute left-0 top-0 h-full w-full"
            />
          </div>

          <div className="relative z-20 mt-auto ">
            <blockquote className="space-y-2">
              <p className="text-sm font-medium text-slate-200">
                클리브웍스는 언제 어디서나 누구나 할 수 있는 AI 데이터 구축
                크라우드 소싱 프로젝트로 <br /> AI를 함께 키워갈 크라우드
                워커분들을 모집하고 있습니다.
              </p>
              <footer className="font-varela font-bold text-slate-200">
                CLIVE WORKS
              </footer>
            </blockquote>
          </div>
        </div>
        <div>
          <div className="justify-ceter mx-auto flex w-[350px] flex-col items-center space-y-6">
            <div className="flex flex-col text-center">
              <Link
                href="/"
                className="font-varela text-[36px] font-bold text-primary"
              >
                CLIVE WORKS
              </Link>
              <p className="pb-6 text-sm text-muted-foreground">
                아이디와 비밀번호를 입력하여 로그인 할 수 있습니다.
              </p>

              {/* 로그인 폼 */}
              <LoginForm />

              <p className="px-6 pt-4 text-center text-sm text-muted-foreground">
                아래 링크를 통해 고객센터 와 FAQ를 방문해보세요.
                <br />
                <Link
                  href="/customer-center"
                  className="text-xs underline underline-offset-4 hover:text-primary"
                >
                  고객센터로 이동하기
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link
                  href="/customer-center/faq"
                  className="text-xs underline underline-offset-4 hover:text-primary"
                >
                  FAQ로 이동하기
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
