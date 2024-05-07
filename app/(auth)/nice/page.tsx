"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

const NiceConfirm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useLocalStorage("enc_data", "");
  const encData = searchParams.get("enc_data");

  useEffect(() => {
    if (!window.opener) return router.back();
    if (!encData) return;
    setValue(encData);
    window.close();
  }, [router, encData, setValue]);

  return <></>;
};

const NiceConfirmPage = () => {
  return (
    <Suspense>
      <NiceConfirm />
    </Suspense>
  );
};

export default NiceConfirmPage;
