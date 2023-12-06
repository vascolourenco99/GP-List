import { format } from 'date-fns';
import { Amortization } from '../types/';

export function transformAmortizations(amortizations: Amortization[]): any[] {
  return amortizations.map((amortization) => {
    const { schedule_date, project_id, ...rest } = amortization;
    const [date, time] = schedule_date.split(' ');

    return {
      day: format(new Date(date), 'dd MMM yy'),
      hour: time,
      project: project_id,
      ...rest,
    };
  });
}