import { Component, OnInit, HostListener } from '@angular/core';
import { LocalStorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService
    ) {}

  @HostListener('window:storage', ['$event'])
  onStorageChange(event: StorageEvent) {
    this.localStorageService.handleStorageChange(event);
  }

  ngOnInit() {}
}
