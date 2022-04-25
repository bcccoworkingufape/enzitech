import { isValid, parseISO, format, subDays } from 'date-fns';

export class DateHelper {
  static checkValidDateStr(str: string): boolean {
    const valid = isValid(new Date(str));
    return valid;
  }

  static subtractDaysOfDate(date: Date, subtractValue: number): Date {
    return subDays(date, subtractValue);
  }

  static formatToISOString(date: Date): string {
    return format(date, 'yyyy-MM-dd');
  }

  static formatStringToUTC(date: string): Date {
    if (!this.checkValidDateStr(date)) {
      throw new Error('Invalid date');
    }
    return parseISO(date);
  }
}
