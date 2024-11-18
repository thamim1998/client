import { Bill } from "../Model/Bill"
import { Capital } from "../Model/Capital";
import { Investor } from "../Model/Investor"

export const get_due_date = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 30);
    const newDate = currentDate.toISOString().split('T')[0];
    return newDate
}

export const get_all_investors = async (): Promise<Investor[]> => {
    const response = await fetch('http://127.0.0.1:8000/api/investors')
    if(!response.ok){
        throw new Error('Network response error')
    }
    return response.json()
}

export const get_investor_bills = async (id: string): Promise<Bill[]> => {
    const response = await fetch(`http://127.0.0.1:8000/api/bills/investor/${id}`)
    if(!response.ok){
        throw new Error(response.statusText)
    }
    return response.json()
}

export const create_capital_call = async (data: {investor_id: string|undefined; due_date: string;bill_ids:number[]}) => {
    const response = await fetch(`http://127.0.0.1:8000/api/capital/create`, {
        method: 'POST', // Specify the method as POST
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(data), // Convert the object to a JSON string
      });
      const result = await response.json()
      if (response.ok) {
        return { success: true, data: result }; // Return success with data if the response is OK
      } else {
        return { success: false, error: result.error || response.statusText }; // Return the error if not OK
      }
}

export const get_investor_capital_calls = async(id:string): Promise<Capital[]> =>{
   const response = await fetch(`http://127.0.0.1:8000/api/capital/investor/${id}`)
   if(!response.ok){
    throw new Error(response.statusText)
}
return response.json()
}

export const validate_capital = async(id  : number, data:{status:string}) => {
  const response = await fetch(`http://127.0.0.1:8000/api/capital/update/${id}`, {
    method: 'PATCH', // Specify the method as POST
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
    },
    body: JSON.stringify(data), // Convert the object to a JSON string
  });
  const result = await response.json()
  if (response.ok) {
    return { success: true, data: result }; // Return success with data if the response is OK
  } else {
    return { success: false, error: result.error || response.statusText }; // Return the error if not OK
  }
}

export const get_capital = async (id: string): Promise<Capital> => {
  const response = await fetch(`http://127.0.0.1:8000/api/capital/${id}`)
  if(!response.ok){
      throw new Error(response.statusText)
  }
  return response.json()
}

export const get_investor = async (id: number): Promise<Investor> => {
  const response = await fetch(`http://127.0.0.1:8000/api/investor/${id}`)
  if(!response.ok){
      throw new Error(response.statusText)
  }
  return response.json()
}
