export type DateUnit = 'day' | 'month' | 'year' | 'hour' | 'minute' | 'second' | 'millisecond';

export class DateComparator {
    static compare(date1: number, date2: number): number {
        if (date1 < date2) return -1;
        if (date1 > date2) return 1;
        return 0;
    }

    static before(date1: number, date2: number, strict?: boolean): boolean {
        let compare = this.compare(date1, date2);
        return strict ? compare < 0 : compare <= 0;
    }

    static after(date1: number, date2: number, strict?: boolean): boolean {
        let compare = this.compare(date1, date2);
        return strict ? compare > 0 : compare >= 0;
    }

    static in(date: number, start: number, end: number, strict?: boolean): boolean {
        return this.after(start, date, strict) &&
            this.before(date, end, strict);
    }

    static out(date: number, start: number, end: number, strict?: boolean): boolean {
        return !this.in(date, start, end, strict);
    }

    static compareUnit(date1: number, date2: number, eqTo: DateUnit): boolean {
        let d1 = new Date(date1);
        let d2 = new Date(date2);

        switch (eqTo) {
            case "day":
                return d1.getDate() == d2.getDate();

            case "month":
                return d1.getMonth() == d2.getMonth() && d1.getDate() == d1.getDate();

            case "year":
                return d1.getDate() == d2.getDate() &&
                    d2.getMonth() == d2.getMonth() &&
                    d1.getFullYear() == d2.getFullYear();

            case "hour":
                let hour1 = date1 / 3_600_000;
                let hour2 = date2 / 3_600_000;
                return hour1 === hour2;

            case "minute":
                let min1 = date1 / 60_000;
                let min2 = date2 / 60_000;
                return min1 === min2;

            case "second":
                let sec1 = date1 / 1_000;
                let sec2 = date2 / 1_000;
                return sec1 === sec2;

            case "millisecond": 
                return date1 === date2;

            default:
                return this.compareUnit(date1, date2, "year");
        }
    }

}