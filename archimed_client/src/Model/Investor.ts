export type Investor = {
    id: number;
    name: string;
    email: string;
    iban: string;
    invested_amount: number;
    subscription_fee_waved: boolean;
    membership_year:number
    is_active:boolean
};