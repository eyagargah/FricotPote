import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss']
})
export class PageLoaderComponent {
constructor( private spinner: NgxSpinnerService){}
openSpinner(){
  this.spinner.show();

    setTimeout(() => {
         this.spinner.hide();
    }, 2000);
 }
}
