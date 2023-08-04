import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  listData:any = [];
  listHidden: any = localStorage.getItem('listHidden');
  dataSelect: any = {};
  flagRandom: boolean = false;
  playCorrect: boolean = false;
  playInCorrect: boolean = false;
  dataQuestion: any = localStorage.getItem('dataQuestion');
  flagShowResult: any = false;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.listHidden = JSON.parse(this.listHidden) || [];
    this.dataQuestion = JSON.parse(this.dataQuestion) || {};
    
    this.http.get<any>('assets/data.json')
    .subscribe((data) => {
      this.listData = data;
    });
  }

  checkAnswer(isCorrect: any) {
    if (isCorrect) {
      this.playCorrect = !this.playCorrect;
      localStorage.setItem('playCorrect', this.playCorrect.toString());

    } else {
      this.playInCorrect = !this.playInCorrect;
      localStorage.setItem('playInCorrect', this.playInCorrect.toString());
    }
  }

  checkSelect(data: any) {
    this.dataSelect = data;
    localStorage.setItem('select', JSON.stringify(data))
  }

  random() {
    this.flagRandom = !this.flagRandom;
    localStorage.setItem('isRandom', JSON.stringify(this.flagRandom));
  }


  compareAnswer() {
     const question:any = localStorage.getItem('dataQuestion');
     this.dataQuestion = JSON.parse(question);
     console.log(this.dataQuestion, this.dataSelect);
     
    if (this.dataQuestion && this.dataSelect) {
      if (this.dataSelect.id === this.dataQuestion.id) {
        this.checkAnswer(true)
      } else this.checkAnswer(false)
    } else { alert('Chọn đáp án và random câu hỏi')}
  }

  showResult() {
    this.flagShowResult = !this.flagShowResult;
    localStorage.setItem('showResult', JSON.stringify(this.flagShowResult));
  }
}
