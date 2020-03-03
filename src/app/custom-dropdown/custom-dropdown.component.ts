import { Component, OnInit, Input, SimpleChanges, OnChanges } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import * as _ from "lodash";

@Component({
  selector: "custom-dropdown",
  templateUrl: "./custom-dropdown.component.html",
  styleUrls: ["./custom-dropdown.component.scss"],
  providers: [
     {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AppInputComponent),
        multi: true
     }
   ]
})
export class CustomDropdownComponent implements OnInit, OnChanges, ControlValueAccessor {
  dropdown: boolean = false;

  private _value;

  public get value() {
    return this._value;
  }

  public set value(v) {
    this._value = v;
    this.onChange(this._value);
    this.onTouched();
  }



  flatSource = [];
  groupSource = [];


  @Input() source: any;
  @Input() displayField: string;
  @Input() placeholder: string = "Select One";
  @Input() disableFilter: boolean = false;
  @Input() groupBy: string;
  @Input() sortBy: string;
  @Input() selection: any;

  filter = "";
  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.source) {
      this.flatSource = this.source;
    }
    if (changes.sortBy) {
      this.flatSource = _.sortBy(this.source, this.sortBy);
    }
    if (changes.groupBy && this.flatSource) {
      this.setGroupSource(this.flatSource);
    }
  }
  onFilterChange(event) {
    debugger;
    let items = this.flatSource;
    if (this.filter.length === 0) {
      return this.groupBy ? this.groupSource : items;
    }

    let results = [];
    for (let index = 0; index < items.length; index++) {
      for (let key of Object.keys(items[index])) {
        const item = items[index];
        const field = item[key].toLowerCase();
        if (
          field.indexOf(this.filter.toLowerCase()) > -1 &&
          results.filter(f => f === item).length === 0
        ) {
          results.push(item);
        }
      }
    }
    this.flatSource = results;
    if (this.groupBy) {
      this.setGroupSource(results);
    }

  }

  select(item) {
    this.selection = item;
    this.dropdown = !this.dropdown;
  }
  getFieldTitle() {
    return this.selection
      ? this.getItemDisplayField(this.selection)
      : this.placeholder;
  }

  onDropdownClick() {
    this.dropdown = !this.dropdown;
  }
  getItemDisplayField(item) {
    return item[this.displayField];
  }

  setGroupSource(results) {
    const groups = _.groupBy(results, this.groupBy);
    for (let key of Object.keys(groups)) {
      this.groupSource.push({
        group: key,
        items: groups[key]
      });
    }
  }

}

