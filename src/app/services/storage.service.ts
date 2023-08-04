import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageChangeSubject = new Subject<{ key: any, newValue: any }>();

  getStorageChangeObservable(): Observable<{ key: any, newValue: any }> {
    return this.storageChangeSubject.asObservable();
  }

  handleStorageChange(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      this.storageChangeSubject.next({
        key: event.key,
        newValue: event.newValue
      });
    }
  }
}
