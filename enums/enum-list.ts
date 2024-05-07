import { Enums } from "./enum";

// 정산 로그 타입
export const CalculateLogStatus = {
  REGISTER_AMOUNT: "정산 예산 등록",
  MODIFY_AMOUNT: "정산 예산 수정",
  REGISTER_ORGANIZATION_AMOUNT: "편성 예산 등록",
  MODIFY_ORGANIZATION_AMOUNT: "편성 예산 수정",
  PENDING_PAYMENT_AMOUNT: "정산 지급 예정 금액",
  SCHEDULED_TOTAL_AMOUNT: "정산 예정 합계 금액",
  CALCULATE_COMPLETE: "정산 완료",
} as const;

export const CalculateLogStatusEnum = new Enums(CalculateLogStatus);

// 성별 타입
export const GenderType = {
  WOMAN: "여성",
  MAN: "남성",
} as const;

export const GenderTypeEnum = new Enums(GenderType);

// 로그 타입
export const LogStatusType = {
  INSERT: "등록",
  UPDATE: "수정",
  DELETE: "삭제",
} as const;

export const LogStatusTypeEnum = new Enums(LogStatusType);

// 메타타입
export const MetaType = {
  VIDEO: "video",
  ATTACHMENT: "attachment",
  IMAGE: "image",
  COALITION: "coalition",
  INQUIRY: "inquiry",
  CUSTOMER_SERVICE: "customerService",
  SUBTITLE: "subtitle",
  TOY: "toy",
} as const;

export const MetaTypeEnum = new Enums(MetaType);

// 알림 타입
export const NotiType = {
  AUTH_EMAIL: "이메일 인증",
  FIND_PWD: "비밀번호 찾기",
  SIGN_UP: "회원가입",
} as const;

export const NotiTypeEnum = new Enums(NotiType);

// 질문 타입
export const QuestionType = {
  TEXT: "텍스트",
  FILE: "파일",
} as const;

export const QuestionTypeEnum = new Enums(QuestionType);

// 작업 지원 상태 타입
export const RequestStatusType = {
  WAIT: "대기",
  CONFIRM: "승인",
  REJECT: "반려",
} as const;

export const RequestStatusTypeEnum = new Enums(RequestStatusType);

// 역할 타입
export const RoleType = {
  SYSTEM_ADMIN: "시스템 관리자",
  PROJECT_ADMIN: "프로젝트 관리자",
  PROJECT_MANAGER: "프로젝트 운영자",
  PROJECT_VALIDATOR: "프로젝트 검수자",
  PROJECT_WORKER: "프로젝트 작업자",
  WORKER: "일반 작업자",
} as const;

export const RoleTypeEnum = new Enums(RoleType);

// 일감 상태 타입
export const TaskStatusType = {
  ORGANIZATION_WAIT: "편성 대기",
  ORGANIZATION_RESERVATION: "편성 예약",
  WITHDRAW: "회수",
  WAIT: "작업 대기",
  PROGRESS: "작업 진행",
  VALIDATE_WAITING: "검수 대기",
  VALIDATE_PROGRESS: "검수 진행",
  VALIDATE_REJECT: "검수 반려",
  REWORK: "재작업",
  FINAL_COMPLETE: "최종 완료",
} as const;

export const TaskStatusTypeEnum = new Enums(TaskStatusType);

// 사용자 상태 타입
export const UserStatusType = {
  ACTIVATE: "활성",
  BLACK: "정지",
  WITHDRAWN: "탈퇴",
  INACTIVE: "비활성",
} as const;

export const UserStatusTypeEnum = new Enums(UserStatusType);

// 작업 참여 상태 타입
export const WorkListType = {
  JOIN: "참여 중",
  NOT_JOIN: "참여 가능",
  END: "마감",
} as const;

export const WorkListTypeEnum = new Enums(WorkListType);

// Yn 타입
export const YnType = {
  Y: "Y",
  N: "N",
} as const;

export const YnTypeEnum = new Enums(YnType);

// 일감 상태 타입
export const InspectionStatusType = {
  VALIDATE_PROGRESS: "검수 진행",
  VALIDATE_REJECT: "검수 반려",
  FINAL_COMPLETE: "최종 완료",
} as const;

export const InspectionStatusTypeEnum = new Enums(InspectionStatusType);

export const BankType = {
  SU: "산업은행",
  KU: "기업은행",
  KM: "국민은행",
  SUH: "수협은행",
  SUHJ: "수협중앙회",
  NH: "농협은행",
  NHJ: "농협중앙회",
  UR: "우리은행",
  SC: "SC제일은행",
  HC: "한국씨티은행",
  DG: "대구은행",
  BS: "부산은행",
  GJ: "광주은행",
  JJ: "제주은행",
  JB: "전북은행",
  GN: "경남은행",
  SMGJ: "새마을금고중앙회",
  SIHJ: "신협중앙회",
  SAH: "상호저축은행",
  HSBC: "HSBC은행",
  DOI: "도이치은행",
  JPMG: "제이피모간체이스은행",
  BOA: "BOA은행",
  JG: "중국공상은행",
  SAJH: "산림조합중앙회",
  UCG: "우체국",
  KBE: "KEB하나은행",
  SIH: "신한은행",
  K: "K뱅크",
  KAO: "카카오뱅크",
  UAT: "유안타증권",
  KBJG: "KB증권",
  MR: "미래에셋대우",
  SSJG: "삼성증권",
  HTJG: "한국투자증권",
  NHJG: "NH투자증권",
  GBJG: "교보증권",
  HIJG: "하이투자증권",
  HDJG: "현대차투자증권",
  KWJG: "키움증권",
  EBJG: "이베스트투자증권",
  SKJG: "SK증권",
  DSJG: "대신증권",
  HHJG: "한화투자증권",
  HNT: "하나금융투자",
  SHT: "신한금융투자",
  DBJG: "동부증권",
  UJJG: "유진투자증권",
  MRJG: "메리츠종합금융증권",
  BGJG: "부국증권",
  SYJG: "신영증권",
  KFJG: "케이프투자증권",
  SBI: "SBI저축은행",
} as const;

export const BankTypeEnum = new Enums(BankType);

// 포인트 지급 상태 타입
export const PaymentStatusType = {
  WAITING_POINT_PAYMENT: "대기",
  PENDING_POINT_PAYMENT: "진행",
  COMPLETE_POINT_PAYMENT: "완료",
} as const;

export const PaymentStatusTypeEnum = new Enums(PaymentStatusType);

// 작업 내역 상태 타입
export const WorkerTaskStatusType = {
  PROGRESS: "작업 진행",
  VALIDATE_WAITING: "검수 대기",
  VALIDATE_PROGRESS: "검수 진행",
  VALIDATE_REJECT: "검수 반려",
  REWORK: "재작업",
  FINAL_COMPLETE: "최종 완료",
} as const;

export const WorkerTaskStatusTypeEnum = new Enums(TaskStatusType);
