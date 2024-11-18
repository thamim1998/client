import { useQuery } from "@tanstack/react-query";
import { Capital } from "../Model/Capital";
import { get_capital, get_investor } from "../utils/utils";
import { useParams } from "react-router-dom";
import { Investor } from "../Model/Investor";

const CapitalDetail = () => {
  const { id } = useParams();

  const {
    data: capital,
    error: capitalError,
    isLoading: isCapitalLoading,
  } = useQuery<Capital, Error>({
    queryKey: ["capital", id], // query key with dynamic ID, or empty array to prevent query from running if ID is undefined
    queryFn: () => get_capital(id as string), // Call the API with the valid `id`
    enabled: !!id, // Only run the query if id is not undefined or null
  });

  const {
    data: investor,
    error: investorError,
    isLoading: isInvestorLoading,
  } = useQuery<Investor, Error>({
    queryKey: ["investor", capital?.investor_id], // query key with dynamic ID, or empty array to prevent query from running if ID is undefined
    queryFn: () => get_investor(capital?.investor_id as number), // Call the API with the valid `id`
    enabled: !!id, // Only run the query if id is not undefined or null
  });

  if (isCapitalLoading || isInvestorLoading) return <div>Loading...</div>;
  if (capitalError) return <div>Error: {capitalError.message}</div>;
  if (investorError) return <div>Error: {investorError.message}</div>;

  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg">
      <img
        className="w-full"
        src="data:image/jpeg;base64,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"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-6">
        <div className="font-bold text-xl mb-2">Capital Call</div>
        <p className="text-gray-100 text-base">IBAN: {investor?.iban}</p>
        <p className="text-gray-100 text-base">To: {investor?.email}</p>
        <p className="text-gray-100 text-base">Due Date: {capital?.due_date}</p>
        <p className="text-gray-100 text-base">
          Total amount: EUR {capital?.total_amount}{" "}
        </p>
      <p className="text-gray-100 text-base">Status: {capital?.status}</p>
      </div>
    </div>
  );
};

export default CapitalDetail;
