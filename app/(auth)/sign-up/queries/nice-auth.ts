import axios from "axios";

export const fetchNiceAuthentication = async ({
  returnUrl,
}: {
  returnUrl: string;
}) => {
  const response = await axios.get(
    `/api/client/auth/nice/identity?returnUrl=${returnUrl}`,
  );
  return response;
};
