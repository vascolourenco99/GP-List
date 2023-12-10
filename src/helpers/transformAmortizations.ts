import { format } from 'date-fns';
import { Amortization as OriginalAmortization, TransformedAmortization } from '../types/';

export function transformAmortizations(amortizations: OriginalAmortization[]): TransformedAmortization[] {
  return amortizations.map((amortization) => {
    const { schedule_date, project_id, state, amount } = amortization;
    const [date, time] = schedule_date.split(' ');

    return {
      day: format(new Date(date), 'dd MMM yy'),
      hour: time,
      project: project_id,
      state: state,
      amount: amount
    };
  });
}