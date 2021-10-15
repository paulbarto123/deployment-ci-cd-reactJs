import { useMutation } from "react-query";
const useCreateProject = (project, onSuccess, onError) => {
  const { mutate, data, isLoading, isError } = useMutation(
    async () => {
      const response = await fetch(`http://localhost:5000/myProjectData`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(project), // body data type must match "Content-Type" header
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

export default useCreateProject;
