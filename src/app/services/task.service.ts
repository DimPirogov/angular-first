import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
//import {Observable, of} from 'rxjs'; // httpClient returns obbservable
import { Task } from 'src/app/Task';
//import { TASKS } from 'src/app/mock-tasks'; //TASKS are comming from db.json
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http:HttpClient) { }

  //getTasks(): Task[] {
  getTasks(): Observable<Task[]> {
    //return TASKS;
    // const tasks = of(TASKS);
    // return tasks;

    return this.http.get<Task[]>(this.apiUrl)
    //specified in package.json scripts 'server': 'json-server --watch db.json --port 5000', so it gets/reads the db.json file instead of mock-tasks.ts
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions)
  }

}
