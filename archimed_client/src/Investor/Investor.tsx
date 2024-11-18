import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Bill } from "../Model/Bill";
import { get_investor_bills, get_due_date, create_capital_call } from "../utils/utils";
import { useState } from "react";

export default function Investor() {
  
  const[createCapital, setCreateCapital] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate()
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Ensure that the query only runs if the ID is valid (not undefined)
  const { data, error, isLoading } = useQuery<Bill[], Error>({
    queryKey: id ? ["bills", id] : [], // query key with dynamic ID, or empty array to prevent query from running if ID is undefined
    queryFn: () => get_investor_bills(id as string), // Call the API with the valid `id`
    enabled: !!id, // Only run the query if id is not undefined or null
  });

  const handle_capital = () => {
    if(!selectedIds.length) return window.alert("Select atleast one bill")
    let data = {
        investor_id: id,
        bill_ids: selectedIds,
        due_date: get_due_date()
    }
  create_capital_call(data)
  .then((response) => {
    if (response.success) {
      console.log("Capital call created:", response.data);
      window.alert("Invoice successfully generated")
    } else {
        window.alert(response.error)
      console.error("Error creating capital call:", response.error);
    }
  })
  .catch((error) => {
    console.error("Unexpected error:", error.message);
  });
    setCreateCapital(!createCapital)
  }

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        // If the ID is already selected, remove it
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        // If the ID is not selected, add it
        return [...prevSelectedIds, id];
      }
    });
  };

  const check_capital = () => {
    navigate(`/capital/${id}`);
  }

  if (isLoading) return <div>loading..</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="bg-blue-500 text-white p-4 rounded">
        List of this investor bill
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold ml-5 py-1 px-4 border border-gray-400 rounded shadow"
      onClick={handle_capital}>Create capital call</button>
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold ml-5 py-1 px-4 border border-gray-400 rounded shadow"
      onClick={check_capital}>List of capital calls</button>
      </div>
      <div className="overflow-x-auto mt-4 ">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2 border">Select</th>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Bill type</th>
              <th className="px-4 py-2 border">Bill amount</th>
              <th className="px-4 py-2 border">Billing year</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Invoice issued</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((bill: Bill) => (
              <tr
                className="hover:bg-gray-100"
                key={bill.id}
              >
                <td className="px-4 py-2 border">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(bill.id)}
                  onChange={() => handleCheckboxChange(bill.id)}
                />
              </td>
                <td className="px-4 py-2 border">{bill.id}</td>
                <td className="px-4 py-2 border">{bill.bill_type}</td>
                <td className="px-4 py-2 border">{bill.amount}</td>
                <td className="px-4 py-2 border">{bill.bill_year}</td>
                <td className="px-4 py-2 border">{bill.description}</td>
                <td className="px-4 py-2 border">{bill.capital == null ? 'No' : 'Yes'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  
}
