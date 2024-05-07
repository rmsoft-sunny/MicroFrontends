import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CornerDownRight } from "lucide-react";
import FAQContent from "./faq-content";

export default function FAQAccordion({
  title,
  id,
}: {
  title: string;
  id: number;
}) {
  return (
    <AccordionItem
      value={id + "_" + title}
      className="pr-2 data-[state=open]:border-b-0 [&_*]:text-sm"
    >
      <AccordionTrigger className="px-2 py-4 font-semibold">
        {title}
      </AccordionTrigger>
      <AccordionContent className="bg-slate-100 py-3 pl-8 pr-2">
        <CornerDownRight className="mr-2 inline-flex h-4 w-4 align-text-top" />
        <FAQContent id={id} />
      </AccordionContent>
    </AccordionItem>
  );
}
