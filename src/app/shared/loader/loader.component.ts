import { Component, OnInit } from '@angular/core';
import { LoaderState } from './loader';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  show = false;
  private subscription: Subscription;
  color = 'primary';
  mode = 'indeterminate';

  loadingSubscription: Subscription;
  message: string;
  constructor(private loaderService: LoaderService) {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
        this.message = state.text
      });
  }

  ngOnInit() {}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
