import { ApiService } from './../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  private categoriesList: Array<any> = [
    { name: 'Fruits', id: 'Fruits' },
    { name: 'Vegetables', id: 'Vegetables' },
    { name: 'Electronic', id: 'Electronic' },
  ];

  private freshnessList: Array<any> = [
    'Brand New',
    'Second Hand',
    'Refurbished',
  ];

  form!: FormGroup;

  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialog: MatDialogRef<DialogComponent>
  ) {}

  get categories() {
    return this.categoriesList;
  }

  get freshnesses() {
    return this.freshnessList;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.form.patchValue(this.editData);
    }
  }

  submitProduct() {  
    if (this.form.valid) {
      if (!this.editData) {
        this.addProduct();
      } else {
        this.updateProduct();
      }
    }
  }

  private addProduct() {
    this.api.postProduct(this.form.value).subscribe({
      next: (res) => {
        this.form.reset();
        this.dialog.close('save');
      },
      error: () => {
        alert('Error adding product');
      },
    });
  }

  private updateProduct() {
    this.api.putProduct(this.editData.id, this.form.value).subscribe({
      next: (res) => {
        alert("Product updated successfully");
        this.form.reset();
        this.dialog.close('update');
      },
      error: () => {
        alert('Error updating product');
      },
    });
  }
}
