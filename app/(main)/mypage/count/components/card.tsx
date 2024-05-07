"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useGetCalculationAmount } from "../queries/get-amount";

interface CardProps {
  completeAmount: number;
  pendingAmount: number;
}

export const CountCard = () => {
  const getAmount = useGetCalculationAmount() as CardProps | null;

  return (
    <div className="flex w-full gap-4">
      <Card className="w-1/2 px-6 py-4">
        <p className="pb-2 text-base font-bold text-zinc-700">정산 완료</p>
        <div className="flex items-center justify-between">
          <Image src="/icon/count.svg" width={60} height={60} alt="count" />
          <div>
            <div className="flex justify-end gap-1 text-2xl font-bold leading-normal text-primary">
              <p> {getAmount?.completeAmount.toLocaleString() ?? 0} </p>
              <p className="text-zinc-500">P</p>
            </div>
            <p className="text-end text-sm font-normal leading-[21px] text-zinc-600">
              부가세를 제외한 금액으로 정산됩니다.
            </p>
          </div>
        </div>
      </Card>

      <Card className="w-1/2 px-6 py-4">
        <div className="flex items-center gap-2">
          <p className="pb-2 text-base font-bold text-zinc-700">정산 예정</p>
          <p className="pb-2 text-sm font-normal text-zinc-700">
            ( 정산 진행, 대기 상태입니다. )
          </p>
        </div>

        <div className="flex items-center justify-between">
          <Image src="/icon/money.svg" width={60} height={60} alt="count" />
          <div>
            <div className="flex justify-end gap-1 text-2xl font-bold leading-normal text-green-500">
              <p> {getAmount?.pendingAmount.toLocaleString() ?? 0} </p>
              <p className="text-zinc-500">P</p>
            </div>
            <p className="text-end text-sm font-normal leading-[21px] text-zinc-600">
              부가세를 제외한 금액으로 정산됩니다.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
