import { useQuery } from "@tanstack/react-query";
import { Capital } from "../Model/Capital";
import { useNavigate, useParams } from "react-router-dom";
import { get_investor_capital_calls, validate_capital } from "../utils/utils";

export const CapitalList = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  // Ensure that the query only runs if the ID is valid (not undefined)
  const { data, error, isLoading } = useQuery<Capital[], Error>({
    queryKey: id ? ["capitals", id] : [], // query key with dynamic ID, or empty array to prevent query from running if ID is undefined
    queryFn: () => get_investor_capital_calls(id as string), // Call the API with the valid `id`
    enabled: !!id, // Only run the query if id is not undefined or null
  });

  const validateCapital = (id: number) => {
    let data = {
      status: "validated",
    };
    validate_capital(id, data)
      .then((response) => {
        if (response.success) {
          console.log("Capital call created:", response.data);
          window.alert(response.data["Detail"]);
        } else {
          window.alert(response.error);
          console.error("Error creating capital call:", response.error);
        }
      })
      .catch((error) => {
        console.error("Unexpected error:", error.message);
      });
  };

  const handleRowClick = (id : number) => {
    navigate(`/capital/detail/${id}`); // Navigate to the desired route
  };

  if (isLoading) return <div>loading..</div>;

  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <div className="overflow-x-auto mt-4 ">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Billing Id's</th>
              <th className="px-4 py-2 border">Total Amount</th>
              <th className="px-4 py-2 border">Issued on</th>
              <th className="px-4 py-2 border">Due Date</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((capital: Capital) => (
              <tr className="hover:cursor-pointer" key={capital.id}       onClick={()=>handleRowClick(capital.id)}
>
                <td className="px-4 py-2 border">{capital.id}</td>
                <td className="px-4 py-2 border">{capital.bills.join(", ")}</td>
                <td className="px-4 py-2 border">{capital.total_amount}</td>
                <td className="px-4 py-2 border">{capital.issue_date}</td>
                <td className="px-4 py-2 border">{capital.due_date}</td>
                <td className="px-4 py-2 border">{capital.status}</td>
                <td
                  className="px-4 py-2 border"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the row's onClick from firing when clicking the button
                  }}
                >
                  {capital.status == "validated" ? (
                    "Capital is validated"
                  ) : (
                    <button
                      onClick={() => validateCapital(capital.id)}
                      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    >
                      Validate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
