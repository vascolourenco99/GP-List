export type Amortization = {
  schedule_date: string;
  state: "pending" | "paid";
  amount: number;
  project_id: number;
};

export type TransformedAmortization = {
  day: string;
  hour: string;
  project: number;
  state: "pending" | "paid";
  amount: number;
};
