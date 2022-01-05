
   
import { Component, EventEmitter, Input, OnInit ,Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input()  mainData;
  @Input () mainDataCopy;
  @Input()  displayData;
  @Input()  property;
  @Output() ChangedData = new EventEmitter;
  constructor() { }

  ngOnInit(): void {
  }

  fnShowFilter(show, clear) {
    show.style.display = "none";
    clear._elementRef.nativeElement.style.display = "contents"; 
  }
  
  
  applyFilterNew(value: any, colName: any) {
    let items = []
    if (value) {
      this.mainDataCopy.forEach((search) => {
        if(search[colName]){
        if (search[colName].toLowerCase().indexOf(value.toLowerCase()) > -1) {
          items.push(search)
        }
      }
      })
      this.mainData = items
  
    }
    else { this.mainData = this.mainDataCopy }
  
    this.ChangedData.emit(this.mainData)
   
  }
  
  fnHideFilter(key: string, show: any, clear: any, input: HTMLInputElement) {
    this.applyFilterNew('', key);
    show.style.display = "contents";
    clear._elementRef.nativeElement.style.display = "none";
    input.value = '';
  
  }

}