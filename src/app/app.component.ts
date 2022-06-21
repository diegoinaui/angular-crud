import { ApiService } from './services/api.service';
import { DialogComponent } from './dialog/dialog.component';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular13-crud';

  displayedColumns: string[] = [
    'id',
    'name',
    'category',
    'price',
    'freshness',
    'date',
    'comment',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '700px',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllProducts();
        }
      });
  }

  editProduct(product: any) {
    this.dialog
      .open(DialogComponent, {
        width: '700px',
        data: product,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'update') {
          this.getAllProducts();
        }
      });
  }

  getAllProducts() {
    this.api.getProduct().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        alert('Error getting products');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: (res) => {
        alert('Product deleted successfully');
        this.getAllProducts();
      },
      error: () => {
        alert('Error deleting product!!!');
      },
    });
  }
}
