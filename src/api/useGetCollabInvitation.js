import { useQuery } from "react-query";

const useGetCollabInvitation = () => {
  const { data, isLoading, isError } = useQuery(`collab:`, async () => {
    const response = await fetch(`http://localhost:5000/collabInvitation/`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

  console.log(data);
  return { data, isLoading, isError };
};

export default useGetCollabInvitation;
