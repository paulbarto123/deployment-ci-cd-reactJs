import { useQuery } from "react-query";

const useGetArticles = () => {
  const { data, isLoading, isError } = useQuery(
    `article:`,
    async () => {
        const response = await fetch(`http://localhost:5000/myArticleData/`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      }
  );

      console.log(data)
  return {data, isLoading, isError}
};

export default useGetArticles
