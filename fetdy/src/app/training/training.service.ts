import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
providedIn: 'root'
})

export class TrainingService {

  private availableExercise: Exercise[] = [

    {id: 'crunches', name: 'Sit-Ups', duration: 30, calories: 9 },
    {id: 'touch-toe', name: 'Stretches', duration: 180, calories: 15 },
    {id: 'side-lunges', name: 'Push-Ups', duration: 120, calories: 18 },
    {id: 'burpees', name: 'Pull-Ups', duration: 60, calories: 8 },
  ];

  private runningExercise: Exercise;
  exerciseChanged = new Subject<Exercise>();
  private exercises: Exercise [] = [];

  getAvailableExercises() {
    return this.availableExercise.slice();
  }

  startExercise(selectedId: string) {

    this.runningExercise = this.availableExercise.find(ex =>  ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {

    this.exercises.push({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {

    this.exercises.push({...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
       calories: this.runningExercise.calories * (progress / 100),
      date: new Date(), state: 'cancelled'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);

  }

  getCompletedCancelledExercise() {
    return this.exercises.slice();
  }

  getRunningExercise() {
    return {...this.runningExercise };
  }

}
