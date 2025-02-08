import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateFormService {
  private dataArray = new BehaviorSubject<any>(null);
  data$ = this.dataArray.asObservable();

  sendData(data: any) {
    this.dataArray.next(data);
  }

  constructor() { }
}