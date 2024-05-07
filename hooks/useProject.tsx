import { useLocalStorage } from "usehooks-ts";

interface ProjectType {
  projectIdx: number;
  name: string;
  path: string;
}

export const useProject = () => {
  const [project] = useLocalStorage("project", "", {
    deserializer: (value) => JSON.parse(value),
  });

  if (project === "") return null;

  return project as ProjectType;
};
