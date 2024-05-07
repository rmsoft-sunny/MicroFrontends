import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// 개인정보 처리방침 모달
export const PolicyModal = () => {
  return (
    <DialogHeader>
      <DialogTitle className="flex items-center justify-between">
        <p className="text-2xl font-bold">개인정보 처리방침</p>
      </DialogTitle>
      <DialogDescription className="flex flex-col gap-2 overflow-y-auto pr-6 text-start text-slate-600">
        <h3 className="text-lg font-bold">개인정보의 제3자 제공에 대한 동의</h3>
        <p>
          <strong>① 개인정보의 제3자 제공 목적</strong> <br />
          <p className="pl-4">
            ✓ 국가연구개발사업 참여제한 여부 확인 및 채무불이행 정보 등 신용조회
          </p>
          <p className="pl-4">
            ✓ 사업 감사를 목적으로 한 감사기관(국회, 감사원 등)의 요구자료 대응
          </p>
          <p className="pl-4">✓ 정부출연사업 등의 과제 참여율 합계 확인</p>
          <p className="pl-4">
            ✓ 과제관리를 목적으로 한 주무부처의 요구자료 대응
          </p>
          <br />
          <p>
            <strong>② 개인정보를 제공받는 자</strong> <br />
            <p className="pl-4">
              과학기술정보통신부부, 국회, 감사원 등 정부기관, 국가연구개발사업
              관리기관 및 신용조회 위탁기관
            </p>
          </p>
          <br />
          <p>
            <strong>③ 개인정보를 제공받는 자의 이용목적</strong> <br />
            <p className="pl-4">①과 동일</p>
          </p>
          <br />
          <p>
            <strong>⑤ 개인정보를 제공 받는자의 개인정보 보유ㆍ이용 기간</strong>
            <br />
            <p className="pl-4">
              동의서가 작성된 시점부터 상기 개인정보의 제3자 제공목적 달성
              시까지
            </p>
          </p>
          <br />
          <p>
            <strong>⑥ 관련 근거</strong> <br />
            <p className="pl-4">
              국가연구개발사업의 관리 등에 관한 규정 제25조, 정보통신·방송
              연구개발 관리규정 제10조
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
