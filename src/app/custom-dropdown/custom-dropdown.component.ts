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


  groupSource = [];

  @Input() source: any; 
  
  defaultSettings: UISelectSettings = { 
    placeholder: 'Select One',
    minFilterLength: -1,
    primaryColor : '#00507D',
    itemHoverColor : '#F8F8F8',
    filterActiveColor: '#B3B3B3'
  };

  public _settings: UISelectSettings; // = {...this.defaultSettings}
  @Input() set settings(settings: UISelectSettings) {
    this._settings = {...this.defaultSettings,... settings};
    if (this._settings.sortBy) {
      this.source = _.sortBy(this.source, this._settings.sortBy);
    }
    if (this._settings.groupBy) {
        this.setGroupSource();
    }
  }
  filter = '';

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.style.setProperty('--dropdown-primary-color', this._settings.primaryColor);
    this.elementRef.nativeElement.style.setProperty('--dropdown-item-hover-color', this._settings.itemHoverColor);
    this.elementRef.nativeElement.style.setProperty('--dropdown-filter-active-color', this._settings.filterActiveColor);
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

  onFilterChange() {
    if (this.filter.length < this._settings.minFilterLength) {
      if (this._settings.groupBy) {
        this.setGroupSource(this.source);
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
      if (this._settings.groupBy) {
        this.setGroupSource(results);
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
      : this._settings.placeholder;
  }

  onDropdownClick() {
    this.dropdown = !this.dropdown;
  }
  getItemDisplayField(item) {
    return item[this._settings.displayField];
  }
  getItemImageField(item) {
    return item[this._settings.imageField];
  }

  setGroupSource(results = null) {
    if (!results) {
      results = this.source;
    }
    this.groupSource = [];
    const groups = _.groupBy(results, this._settings.groupBy);
    for (let key of Object.keys(groups)) {
      this.groupSource.push({
        group: key,
        items: groups[key]
      });
    }
  }
}


export interface UISelectSettings {
   displayField?: string; // field name to display
   imageField?: string; // field image to display
   placeholder?: string; // drowndown placeholder
   disabledFilter?: boolean; // flag for disable filter
   groupBy?: string; // field for grouping the source
   sortBy?: string; // field for sorting the source
   minFilterLength?: number; // minimum characters for filter
   roundedImg?: boolean; // image to display rounded
   primaryColor?: string; // Primary Color
   itemHoverColor?: string; // Highlight Color
   filterActiveColor?: string; // Filter Active Color
}