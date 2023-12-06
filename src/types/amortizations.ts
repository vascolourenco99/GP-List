export type Amortization = {
    schedule_date: string;
    state: "pending" | "paid";
    amount: number;
    project_id: number;
};
  