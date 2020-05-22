export class Tools {
    static uuid(): string {
        return Math.floor((1 + Math.random()) * 0x1_000).toString(16);
    }

    static isNumber(value: any): boolean {
        return !isNaN(Number(value));
    }
}