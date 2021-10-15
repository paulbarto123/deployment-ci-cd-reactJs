import { useMutation } from "react-query";

const useDeleteArticle = (deleteId, onSuccess, onError) => {
  const { mutate, data, isLoading, isError } = useMutation(
    async () => {
      const response = await fetch(`http://localhost:5000/myArticleData/${deleteId}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json"
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    { onError, onSuccess }
  );

  return { mutate, data, isLoading, isError };
};

export default useDeleteArticle;
