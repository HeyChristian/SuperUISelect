import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  forwardRef,
  ElementRef
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import * as _ from "lodash";

@Component({
  selector: "custom-dropdown",
  templateUrl: "./custom-dropdown.component.html",
  styleUrls: ["./custom-dropdown.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDropdownComponent),
      multi: true
    }
  ]
})
export class CustomDropdownComponent
  implements OnInit, OnChanges, ControlValueAccessor {
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
  onChange: any = () => { };
  onTouched: any = () => { };

  private flatSource = [];
  private groupSource = [];

  @Input() source: any; //  source list
  @Input() displayField: string; // field name to display
  @Input() imageField: string; // field image to display
  @Input() placeholder: string = 'Select One'; // drowndown placeholder
  @Input() disableFilter: boolean = false; // flag for disable filter
  @Input() groupBy: string; // field for grouping the source
  @Input() sortBy: string; // field for sorting the source
  @Input() minFilterLength: number = 1; // minimum characters for filter

  // COLOUR SCHEME
  @Input() primaryColor: string = '#00507D'; // Primary Color
  @Input() itemHoverColor: string = '#F8F8F8'; // Highlight Color
  @Input() filterActiveColor: string = '#B3B3B3'; // Filter Active Color

  filter = '';

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.style.setProperty('--dropdown-primary-color', this.primaryColor);
    this.elementRef.nativeElement.style.setProperty('--dropdown-item-hover-color', this.itemHoverColor);
    this.elementRef.nativeElement.style.setProperty('--dropdown-filter-active-color', this.filterActiveColor);
  }

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.sortBy) {
      this.source = _.sortBy(this.source, this.sortBy);
    }
    if (changes.source) {
      this.flatSource = this.source;
    }
    if (changes.groupBy && this.flatSource) {
      this.setGroupSource(this.flatSource);
    }
  }
  onFilterChange() {
    if (this.filter.length < this.minFilterLength) {
      if (this.groupBy) {
        this.setGroupSource(this.source);
      } else {
        this.flatSource = this.source;
      }
    } else {
      let items = this.source;
      let results = [];
      for (let index = 0; index < items.length; index++) {
        for (let key of Object.keys(items[index])) {
          const item = items[index];
          const field = item[key].toLowerCase();
          const isExist = results.filter(f => f === item).length > 0;
          const isMatch = field.indexOf(this.filter.toLowerCase()) !== -1;
          if (isMatch && !isExist) {
            results.push(item);
          }
        }
      }
      if (this.groupBy) {
        this.setGroupSource(results);
      } else {
        this.flatSource = results;
      }
    }
  }

  select(item) {
    this.value = item;
    this.dropdown = !this.dropdown;
  }
  getFieldTitle() {
    return this._value
      ? this.getItemDisplayField(this.value)
      : this.placeholder;
  }

  onDropdownClick() {
    this.dropdown = !this.dropdown;
  }
  getItemDisplayField(item) {
    return item[this.displayField];
  }

  setGroupSource(results) {
    this.groupSource = [];
    const groups = _.groupBy(results, this.groupBy);
    for (let key of Object.keys(groups)) {
      this.groupSource.push({
        group: key,
        items: groups[key]
      });
    }
  }
}
