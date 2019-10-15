import { ScrumElement } from '../models/scrum/ScrumElement';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BacklogManager {
  private elements: ScrumElement[] = []

  constructor() {}

  public addElement(el: ScrumElement) {
    this.elements.push(el)
  }

  public addElements(els: ScrumElement[]) {
    els.forEach(el => this.addElement(el))
  }

  public getElements() {
    return this.elements
  }

}
