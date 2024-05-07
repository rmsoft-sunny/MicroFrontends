export interface WorkListType {
  workIdx: number;
  workName: string;
  summary: string;
  applyYn: "Y" | "N";
  joinWorkerCnt: number;
  progress: number;
  minUnitPrice: number;
  maxUnitPrice: number;
}

export interface ProjectListType {
  projectIdx: number;
  projectName: string;
  projectCode: string;
  noticeIdx: number;
  noticeTitle: string;
  workDTOList: WorkListType[];
}

interface ProjectReqData {
  itemCnt: 20;
  itemList: ProjectListType[];
}

export interface GetProjectListResType {
  joinProjectWorkList: ProjectReqData;
  availableProjectWorkList: ProjectReqData;
  closedProjectWorkList: ProjectReqData;
}

export interface NoticeDetailType {
  noticeIdx: number;
  title: string;
  content: string;
  mainYn: "Y" | "N";
  regDate: string;
  noticeFileDTOS: {
    noticeFileIdx: number;
    originalFilename: string;
    fileUrl: string;
  }[];
}

export interface NoticeListType {
  noticeIdx: number
  title: string
  regDate: string
  mainYn: "Y" | "N"
}