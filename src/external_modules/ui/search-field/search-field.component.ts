import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {Tag} from 'src/app/eat/model/tag.model';
import { Filter, FilterParser } from 'src/app/eat/model/filter.model';
import { FilterService } from 'src/service/story/filter.service';
import { Story } from 'src/app/eat/model/story.model';

@Component({
  selector: 'search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [
    // {name: 'Lemon', color: "primary"},
    // {name: 'Lime', color: "warn"},
    // {name: 'Apple', color: ''},
    // {name: 'Peach', color: 'none'},
    // {name: 'Mint', color: 'accent'},
    // {name: 'Orange', color: 'orange'},
  ];

  constructor(private filterParser: FilterParser,
    private filterService: FilterService) { }

  ngOnInit(): void { }

  async add(event: MatChipInputEvent): Promise<void> {
    const input = event.input;
    const value = event.value;

    // create filter
    if((value || '').trim()) {
      let filter: Filter = await this.filterParser.parse(value.trim());

      this.filterService.add<Story>(filter, Story.classname);
      
      this.tags.push({
        name: filter.search
      });
    }
    
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);
    
    if (index >= 0) {
      this.filterService.remove(tag.name, Story.classname);
      this.tags.splice(index, 1);
    }
  }
}
