import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  @Output() trainingExit = new EventEmitter ();
  progress = 0;
  progressColor = 'accent';
  timer: any;
  progressMessage = ' Let\'s get started, 1 2 3  go go go !';

  constructor(private dialog: MatDialog) { }

  onStop() {
    clearInterval (this.timer);
   const dialogRef = this.dialog.open(StopTrainingComponent, {data: {
      progress: this.progress }
  });

  dialogRef.afterClosed().subscribe(result => {

    if (result) {
      this.trainingExit.emit();
    } else { this.startResumeTimer(); }
  });
  }

  startResumeTimer() {


    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      switch (this.progress) {
       case 25 :  this.progressMessage = ' keep going, You are Doing it !! '; break;
       case 50 :  this.progressMessage = ' You\'re Half way There, You got this !!'; break;
       case 75 :  this.progressMessage = ' You\'re almost there, a little more !!! '; break;
       case 100 : this.progressMessage = ' Great Work !! Work-Out completed !!!';
                  this.progressColor = 'primary'; break;


      }
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
     }, 1000);


  }

  ngOnInit() {
    this.startResumeTimer();
  }

}
