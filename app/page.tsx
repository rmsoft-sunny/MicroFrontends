import { MainNavigation } from "@/components/common/nav/main";
import { FirstSectionComponent } from "@/components/main/first-section";
import { SecondSectionComponent } from "@/components/main/second-section";
import { ThirdSectionComponent } from "@/components/main/third-section";
import { LastSectionComponent } from "@/components/main/last-section";
import { FourthSectionComponent } from "@/components/main/fourth-section";
import { FifthSectionComponent } from "@/components/main/fifth-section";
import { FooterComponent } from "@/components/main/footer";

const HomePage = () => {
  return (
    <>
      <header>
        <nav>
          <MainNavigation className="w-full" />
        </nav>
      </header>
      <main className="grid justify-center overflow-x-hidden">
        <div className="w-[1920px]">
          <section className="relative grid max-w-[1920px]">
            <FirstSectionComponent />
          </section>
          <section className="flex h-[1050px] w-full max-w-[1920px] flex-col items-center justify-center bg-[#EEF5FF]">
            <SecondSectionComponent />
          </section>
          <section className="flex h-[220px] w-full max-w-[1920px] flex-col items-center justify-center bg-[#FCFBFB]">
            <ThirdSectionComponent />
          </section>
          <section className="grid h-[1050px] w-full max-w-[1920px] bg-white">
            <FourthSectionComponent />
          </section>
          <section className="flex h-[900px] w-full max-w-[1920px] flex-col items-center justify-center bg-[#283E90]">
            <FifthSectionComponent />
          </section>
          <section className="relative w-full max-w-[1920px]">
            <LastSectionComponent />
          </section>
        </div>
      </main>
      <footer className="h-[200px] px-40 py-10">
        <FooterComponent />
      </footer>
    </>
  );
};

export default HomePage;
