import { Type } from '@angular/core';

export interface Filter {
    key?: string,
    value: string
}

export class FilterParser {
    
    constructor() { }

    parse<T>(search: string, type: Type<T>) {
        // split key from value
        /* 1. look for "=" char
            -> before = is key
            -> after = is value

            2. if key finded
                -> look for "type of" data for key
                    + key value type is long -> look for "operators" char (> >= <= < == !=)
                    + key value type is string -> look for "*" wild card

            3. value only
                + look for "value" in any "type of value type" 
        */


    }
}