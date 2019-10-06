import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ToDoSerService } from '../../Service/to-do-ser.service';
import { Todocls } from '../../todocls';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-to-do-input',
  templateUrl: './to-do-input.component.html',
  styleUrls: ['./to-do-input.component.css']

})
export class ToDoInputComponent implements OnInit {

  private listItem: string;
  private filterItem: string;
  fullList: Todocls[];
  dataSource = new MatTableDataSource();
  columnsToDisplay: string[] = ['id', 'title', 'completed', 'delete'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private todoserservice: ToDoSerService) {
    this.listItem = '';
  }

  ngOnInit() {
    this.getListItem();
  }
  delete(id) {
    this.todoserservice.deleteItem(id).subscribe((response) => {
      this.getListItem();
    });
  }
  addListItem() {
    const nextId = this.fullList[this.fullList.length - 1].id + 1;
    const listItemValue = new Todocls(nextId, nextId, this.listItem, true);
    this.todoserservice.setToDoList(listItemValue).subscribe((response) => {
      this.getListItem();
    });
  }

  applyFilter(filterValue: string) {
    this.filterItem = filterValue.trim().toLowerCase();
    this.getListItem();
  }

  getListItem() {
    this.todoserservice.getToDoList().subscribe(
      (list: Todocls[]) => {
        this.fullList = list;
        this.dataSource = new MatTableDataSource<Todocls>(list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filter = this.filterItem;
        console.log(this.dataSource);
      }
    );
  }

}
