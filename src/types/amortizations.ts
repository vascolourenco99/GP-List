export type Amortization = {
    schedule_date: string;
    day: number;
    state: "pending" | "paid";
    amount: number;
    project: number;
};
  