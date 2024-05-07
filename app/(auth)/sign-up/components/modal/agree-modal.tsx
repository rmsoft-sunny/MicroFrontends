import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// 이용약관 동의 모달
export const AgreeModal = () => {
  return (
    <DialogHeader>
      <DialogTitle className="flex items-center justify-between">
        <p className="text-2xl font-bold">이용 약관 동의</p>
      </DialogTitle>
      <DialogDescription className="flex flex-col gap-10 overflow-y-auto pr-6 text-start text-slate-600">
        <h3 className="text-lg font-bold">개인정보 수집 및 이용에 대한 동의</h3>
        <p>
          <strong>○ 개인정보 수집ㆍ이용 목적</strong> <br />
          <p className="pl-4">✓ 과제 선정을 위한 평가‧심의, 과제 수행관리</p>
          <p className="pl-4">
            참여인력 규모, 과제 투입 인력의 적정성 판단(경력, 전공, 실적 등),
            과제 책임자/실무자 등 담당자 및 연락처 확인
          </p>
          <p className="pl-4">
            ✓ 개인 성명, 생년월일, 근무기관, 주소, 전화번호, 학력(학교, 전공,
            학위, 연구분야 등), 경력, 특허/논문 실적, 정부출연사업 수행실적,
            현재 수행중인 정부출연사업 전체 참여율 등에 대한 인적사항
          </p>
          <br />
          <p>
            <strong>○ 개인정보 보유ㆍ이용기간</strong> <br />
            <p className="pl-4">
              동의서가 작성된 시점부터 상기 개인정보 수집·이용 목적이 종료되는
              시점까지
            </p>
          </p>
          <br />
          <p>
            <strong>○ 관련 근거</strong> <br />
            <p className="pl-4">
              정보통신·방송 연구개발 관리규정 제6조, 제21조, 제23조, 제33조,
              제48조
              <br />
              정보통신·방송 연구개발 사업비 산정 및 정산 등에 관한 규정 제11조,
              제18조
              <br />
              정보통신·방송 기술개발사업 수행관리 지침 제29조, 제36조
              <br />
              정보통신·방송 기반조성사업 수행관리지침 제22조, 제29조
              <br />
            </p>
          </p>
          <br />
          <strong>※ 유의 사항</strong> <br />
          <p className="pl-4">
            귀하는 상기 동의를 거부할 수 있습니다. 해당 수집 항목은
            정보통신·방송 연구개발 수행에 반드시 필요한 사항으로 이에 대한
            동의를 하지 않을 경우에는 정보통신·방송 연구개발 참여 등에 제한을
            받으실 수 있습니다.
          </p>
          <br />
        </p>
      </DialogDescription>
    </DialogHeader>
  );
};

const div_class = "text-sm leading-[1.1375rem]";
const table_class = "border-[1px] border-slate-200";
const tr_class = "border-[1px] border-slate-200";
const th_class =
  "border-[1px] border-slate-200 px-4 py-4 text-center font-semibold text-slate-800";
const td_text_center_class =
  "border-[1px] border-slate-200 px-4 py-4 text-center";
const td_class = "border-[1px] border-slate-200 px-4 py-4";
