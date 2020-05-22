import { Injectable, Type } from '@angular/core';
import { Filter, Filterable, Operator } from 'src/app/eat/model/filter.model';
import { Story } from 'src/app/eat/model/story.model';
import { Subject } from 'rxjs';
import { EventEmitter } from 'events';
import { BinaryOperator } from '@angular/compiler';
import { Tools } from './tools';
import { DateComparator } from './date-comparator';

function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filters = new Map<string, Filter[]>();

  emitter = new EventEmitter();

  constructor() { }

  add<T>(filter: Filter, clz: string): void {
    console.log("Adding filter: ", filter);
    if (this.filters.has(clz)) {
      this.filters.get(clz).push(filter);
    }
    else {
      this.filters.set(clz, [filter]);
    }

    this.emitter.emit(clz, this.filters.get(clz));
  }

  remove(filterSearch: string, clz: string) {
    if(this.filters.has(clz)) {
      let filters: Filter[] = this.filters.get(clz);
      filters.splice(filters.indexOf(filters.find(f => f.search === filterSearch)), 1);

      this.emitter.emit(clz, this.filters.get(clz));
    }
  }

  test<T>(filter: Filter, object: T): boolean {
    // on specific property
    if (filter.key && this.asProperty(filter.key, object)) {
      console.log("Search key [%s]", filter.key);
      return this.testKey(filter, object);
    }

    return Object.entries(object).some((k, v) => {
      // console.log("Test object:", k[0], k[1]);

      let objectValue = k[1];
      let value = filter.value;
      let operator = filter.operator ?? '?=';

      let valueMatch = false;

      // test number
      if (Tools.isNumber(objectValue)) {
        // console.log("Value is number", val);
        if ("date" === k[0]) {
          // console.log("History date: ", new Date(objectValue));
          valueMatch = this.testDateValues(Number(value), objectValue, operator);
        }

        else {
          valueMatch = this.testNumberValues(value, objectValue, operator)
        }

        if (valueMatch) {
          // console.log("Match finded for", object);
          return valueMatch;
        }
      }

      // test array
      else if (Array.isArray(objectValue)) {
        // console.log("Value is Array", val);
        valueMatch = objectValue.some(sub => this.test(filter, sub));

        if (valueMatch)
          return valueMatch;
      }

      // test object
      else if (typeof objectValue === 'object') {
        // console.log("Value is object", val);

        if (valueMatch)
          return valueMatch;
      }

      // test string
      else {
        // console.log("Value is string", val);
        valueMatch = this.testStringValues(value, objectValue, operator);

        if (valueMatch)
          return valueMatch;
      }

    });

  }

  computeTests<T>(object: T, clz: string): boolean {
    let clzFilters = this.filters.get(clz);
    return !clzFilters ? true : clzFilters.every(filter => this.test(filter, object));
  }

  filter<T>(objects: T[], clz: string): T[] {
    return objects.filter(obj => this.computeTests(obj, clz));
  }

  private asProperty(key: string, object: any): boolean {
    let keys: string[] = Object.keys(object);


    return keys.some(k => k === key);
  }

  private testKey<T>(filter: Filter, object: T) {
    // number value
    let searchValue = filter.value;
    let searchIsNumber = Tools.isNumber(searchValue);

    let value = object[filter.key];
    let valueIsNumber = Tools.isNumber(value);

    if (searchIsNumber || valueIsNumber) {
      if (searchIsNumber !== valueIsNumber) {
        console.log("types are incompatibles");
        return false;
      }

      else {
        let propertyNumberValue = value as number;
        let searchNumberValue = Number(searchValue);

        return this.testNumberValues(propertyNumberValue, searchNumberValue, filter.operator);
      }
    }

    // string value
    let valueOfProperty: string = value as string;
    valueOfProperty = valueOfProperty.trim();
    let searchValueString = searchValue as string;

    return this.testStringValues(valueOfProperty, searchValueString, filter.operator);
  }

  private testStringValues(expected, test, operator) {
    switch (operator) {
      case "?=":
        // console.log("test ?=");
        return test.search(expected) != -1;

      case "==":
        // console.log("test ==");
        return expected == test;

      case "!=":
        // console.log("test !=");
        return expected != test;

      default: // strict equality
        return expected === test;
    }

  }

  private testNumberValues(expected, test, operator) {
    switch (operator) {
      case "==":
        // console.log("test ==");
        return expected === test;
      case "!=":
        // console.log("test !=");
        return expected != test;
      case "<":
        // console.log("test <");
        return expected < test;
      case "<=":
        // console.log("test <=");
        return expected <= test;
      case ">":
        // console.log("test >");
        return expected > test;
      case ">=":
        // console.log("test >=");
        return expected >= test;

      default:
        return expected === test;

    }
  }

  private testDateValues(search: number, test: number, operator: Operator, test2?: number, operator2?: Operator) {
    let comparator = (d1: number, d2: number, op: Operator) => {
      switch (op) {
        case "?=":
          return DateComparator.compareUnit(d1, d2, 'year');
        case "==":
          return DateComparator.compare(d1, d2) == 0;
        case "!=":
          return DateComparator.compare(d1, d2) != 0;
        case "<":
          return DateComparator.before(d1, d2, true);
        case "<=":
          return DateComparator.before(d1, d2);
        case ">":
          return DateComparator.after(d1, d2);
        case ">=":
          return DateComparator.after(d1, d2, true);
      }
    };

    if (test2 && operator2) {
      let res1 = comparator(search, test, operator);
      let res2 = comparator(search, test2, operator2);
      return res1 && res2;
    }

    else return comparator(search, test, operator);

  }

}
