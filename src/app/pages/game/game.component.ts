import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @ViewChild('audioPlayer') audioPlayer!: HTMLAudioElement;

  listData: any;
  listHidden: any = localStorage.getItem('listHidden');
  selected: any = {};
  islearning: boolean = false;
  listAnswer: any = localStorage.getItem('listAnswer');
  dataQuestion: any = localStorage.getItem('question');
  listQuestionDisable: any = [];
  listAnswerDisable: any = [];
  listDataSort: any = [];
  showResult: boolean = false;
  animateWrong: boolean = false;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit() {
    this.http.get<any>('assets/data.json')
    .subscribe((data) => {
      this.listData = data;
    });

    this.http.get<any>('assets/data-sort.json')
    .subscribe((data) => {
      this.listDataSort = data;
    });
    this.listHidden = JSON.parse(this.listHidden) || [];
    this.listAnswer = JSON.parse(this.listAnswer) || [];
    this.dataQuestion = JSON.parse(this.dataQuestion) || {};

    console.log(this.selected);

    this.localStorageService.getStorageChangeObservable().subscribe(change => {
      // show/hide
      if (change.key === 'listHidden') {
        this.listHidden = change.newValue;
      } 
      // play sound
      if (change.key === 'playCorrect' || change.key === 'playInCorrect') {
        const sound = change.key === 'playCorrect' ? './assets/sound/dung.mp3' : './assets/sound/sai.mp3';
        this.listQuestionDisable = [...this.listQuestionDisable, this.dataQuestion];
        this.listAnswerDisable = [...this.listAnswerDisable, this.dataQuestion];
        
        if (change.key === 'playCorrect') {
          this.animateWrong = true;
        }
        // bỏ chọn
        this.selected = {}
        localStorage.setItem('select', JSON.stringify(this.selected))
        const audio = new Audio(sound);
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
            })
          return
        }

      }

      // check selected
      if (change.key === 'select') {
        this.selected = JSON.parse(change.newValue);
      } 

      // check random
      if (change.key === 'isRandom') {
        this.showResult = false;
        // lấy tìm trong mảng ngẫu nhiên
        const randomObject = this.getRandomObjectFromArray(this.listDataSort);
        this.dataQuestion = randomObject;
        localStorage.setItem('dataQuestion', JSON.stringify(randomObject))
      } 

      // check random
      if (change.key === 'showResult') {
        this.showResult = true;
      } 
      console.log('Storage changed:', change.key, change.newValue);
    });
  }

  getRandomObjectFromArray(array:any) {
    if (array.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    // Trả về object tại chỉ mục ngẫu nhiên
    return array[randomIndex];
  }

  checkHidden(arr: any, id: any) {
    const object = arr.find((item:any) => item.id === id);
    return object !== undefined ? true : false
  }
}
