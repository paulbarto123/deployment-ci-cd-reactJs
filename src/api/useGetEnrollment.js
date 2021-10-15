import { useQuery } from "react-query";

const useGetEnrollment = () => {
  const { data, isLoading, isError } = useQuery(
    `enrollment:`,
    async () => {
        const response = await fetch(`http://localhost:5000/EnrollmentData/`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      }
  );
  return {data, isLoading, isError}
};

export default useGetEnrollment
