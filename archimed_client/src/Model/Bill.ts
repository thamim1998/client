export type Bill = {
    id: number;
    investor: number;
    investment: number;
    bill_type: string;
    amount: number;
    capital: number | null;
    bill_year:number;
    issue_date: string;
    description: string;
}