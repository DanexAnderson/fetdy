import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  // @Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[] = [];

 /*  exercise: any[] = [
    {value: 'crunches', viewValue: 'Sit-Ups'},
    {value: 'touch-toes', viewValue: 'Stretches'},
    {value: 'side-lunges', viewValue: 'Push-Ups'},
    {value: 'burpees', viewValue: 'Pull-Ups'}
  ]; */

  constructor(private trainingService: TrainingService) { }

  onStartTraining(form: NgForm) {
   // this.trainingStart.emit();
  this.trainingService.startExercise(form.value.exercise);
  }

  ngOnInit() {

    this.exercises = this.trainingService.getAvailableExercises();
  }

}
