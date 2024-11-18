// {
//     "id": 6,
//     "investor_id": 5,
//     "bills": [],
//     "total_amount": "0.00",
//     "status": "pending",
//     "issue_date": "2024-11-17",
//     "due_date": "2024-12-17"
// },

export type Capital = {
id: number;
investor_id :number
bills: number[]
total_amount: number
status : string
issue_date: string
due_date : string
}