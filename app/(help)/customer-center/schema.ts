import { z } from "zod";

/**
 * 파일
 */
export const fileSchema = z.object({
  noticeFileIdx: z.number().readonly(),
  originalFilename: z.string().readonly(),
  fileUrl: z.string().readonly(),
});

/**
 * 공지사항
 */
export const noticeSchema = z.object({
  noticeIdx: z.number().readonly(),
  title: z.string(),
  content: z.string(),
  mainYn: z.enum(["Y", "N"]),
  noticeFileDTOS: z.array(fileSchema).nullish(),
  regDate: z.date(),
});

export type Notice = z.infer<typeof noticeSchema>;

export const noticeListSchema = z.array(
  noticeSchema.pick({
    noticeIdx: true,
    title: true,
    content: true,
    mainYn: true,
    regDate: true,
  }),
);

export type NoticeList = z.infer<typeof noticeListSchema>;

/**
 * FAQ
 */
export const FAQschema = z.object({
  faqIdx: z.number().readonly(),
  faqType: z.enum(["INQUIRY", "LOGIN", "WORK", "POINT"]),
  title: z.string(),
  content: z.string(),
});

export type FAQ = z.infer<typeof FAQschema>;

export const FAQListSchema = z.record(
  z.enum(["inquiryFaqList", "loginFaqList", "pointFaqList", "workFaqList"]),
  z.array(
    FAQschema.pick({
      faqIdx: true,
      title: true,
    }),
  ),
);

export type FAQList = z.infer<typeof FAQListSchema>;
