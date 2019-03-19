import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart = new EventEmitter<void>();

  exercises: any[] = [
    {value: 'crunches', viewValue: 'Sit-Ups'},
    {value: 'touch-toes', viewValue: 'Stretches'},
    {value: 'side-lunges', viewValue: 'Push-Ups'},
    {value: 'burpees', viewValue: 'Pull-Ups'}
  ];

  constructor() { }

  onStartTraining() {
    this.trainingStart.emit();
  }

  ngOnInit() {
  }

}
