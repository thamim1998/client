import { useQuery } from "@tanstack/react-query";
import { get_all_investors } from "../utils/utils";
import { Investor } from "../Model/Investor";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery<Investor[], Error>({
    queryKey: ["investors"],
    queryFn: get_all_investors,
  });

  const handle_click = (id: number) => {
    navigate(`/investor/${id}`);
  };

  if (isLoading) return <div>loading..</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="bg-blue-500 text-white p-4 rounded">
        List of Investor's

      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">IBAN</th>
              <th className="px-4 py-2 border">Invested Amount</th>
              <th className="px-4 py-2 border">Member Since</th>
              <th className="px-4 py-2 border">Active Member </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((investor) => (
              <tr
                className="hover:bg-gray-100"
                key={investor.id}
                onClick={() => handle_click(investor.id)}
              >
                <td className="px-4 py-2 border">{investor.id}</td>
                <td className="px-4 py-2 border">{investor.name}</td>
                <td className="px-4 py-2 border">{investor.email}</td>
                <td className="px-4 py-2 border">{investor.iban}</td>
                <td className="px-4 py-2 border">{investor.invested_amount}</td>
                <td className="px-4 py-2 border">{investor.membership_year}</td>
                <td className="px-4 py-2 border">
                  {investor.is_active ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
