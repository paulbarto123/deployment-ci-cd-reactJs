import { useQuery } from "react-query";

const useGetProjects = () => {
  const { data, isLoading, isError } = useQuery(
    `project:`,
    async () => {
        const response = await fetch(`http://localhost:5000/myProjectData/`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      }
  );


  return {data, isLoading, isError}
};

export default useGetProjects
