import { useMutation } from "react-query";

const useUpdateEnrollment = (enrollment, onSuccess, onError) => {
  const { mutate, data, isLoading, isError } = useMutation(
    async () => {
      const response = await fetch(`http://localhost:5000/EnrollmentData/${enrollment.id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer", 
        body: JSON.stringify(enrollment),
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

export default useUpdateEnrollment;
