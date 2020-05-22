import { Injectable } from '@angular/core';

export type Operator = '?=' | '==' | '!=' | '<' | '>' | '>=' | '<=';
type UnionKeyToValue<U extends string> = {
    [K in U]: K
};
const _operators: UnionKeyToValue<Operator> = {
    "?=": '?=',
    "==": "==",
    "!=": "!=",
    "<": "<",
    "<=": "<=",
    ">": ">",
    ">=": ">="
};
export const OPERATORS = Object.freeze(_operators);

export function StaticImplements<T>() {
    return <U extends T>(constructor: U) => { constructor };
}

export interface Filterable<T> {
    classname: string;
}

export interface Filter {
    key?: string,
    operator?: Operator,
    value: string,
    search: string
}

@Injectable({
    providedIn: 'root'
})
export class FilterParser {

    constructor() { }

    async parse<T>(search: string) {
        // split key from value
        /* 1. look for "=" char
            -> before = is key
            -> after = is value
        */


        /*
        2. if key finded
        -> look for "type of" data for key
        + key value type is long -> look for "operators" char (> >= <= < == !=)
        + key value type is string -> look for "*" wild card
        
        3. value only
        + look for "value" in any "type of value type" 
        */

        let filter = this.splitKeyValue(search);
        this.searchDate(filter);

        return filter;
    }

    /**
     * Search if operators exists in search
     * @param search user search
     */
    splitKeyValue(search: string): Filter {
        let pattern = /(([a-zA-Z0-9_-]+)( )?(\?=|==|!=|<|>|<=|>=)+( )?)?(.*)+/gi;
        let match = pattern.exec(search);

        return {
            key: match[2],
            operator: OPERATORS[match[4]],
            value: match[6],
            search: search
        }
    }

    // date pattern = dd/mm/yyyy
    searchDate(filter: Filter) {
        let value = filter.value;
        let datePattern = /^(?<day>[0-9]{1,2})+(?<separator>(\/|\-|\.|\ ))+(?<month>[0-9]{2}|jan|feb|mar|apr|may|jun|jui|aug|sep|oct|nov|dec)+((\k<separator>)+(?<year>([0-9]{2}|[0-9]{4})))?$/gi;

        let match = datePattern.exec(value);
        console.log("match: ", match);
        if (match) {
            let group = match.groups;
            let year = `${group['year'] ?? new Date().getFullYear()}`;
            let ymd = `${year}/${group['month']}/${group['day']}`;

            let date = new Date(ymd);
            if(date.toString() != "Invalid Date") {
                filter.value = date.getTime().toString();
            }
        }
    }

}
