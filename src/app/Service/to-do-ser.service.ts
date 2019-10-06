import { Injectable } from '@angular/core';
import { Todocls } from '../todocls';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ToDoSerService {

  nextId: number;
  // jsonurl = "https://jsonplaceholder.typicode.com/todos";
  // jsonurl = "https://my-json-server.typicode.com/nidhichaurishiya777/json/todo";

  jsonurl = 'http://localhost:3000/todo';

  todolist: Todocls[];
  constructor(private http: HttpClient) {
  }

  getToDoList(): Observable<Todocls[]> {
    return this.http.get<Todocls[]>(this.jsonurl);
  }

  deleteItem(id): Observable<Todocls[]> {
    return this.http.delete<Todocls[]>(this.jsonurl + '/' + id);
  }

  setToDoList(listItemValue: Todocls) {
    return this.http.post(this.jsonurl, listItemValue);
  }




}
