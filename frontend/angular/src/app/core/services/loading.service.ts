import { computed, Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private requests = signal(0);

  readonly loading = computed(() => this.requests() > 0);

  show() {
    this.requests.update(v => v + 1);
  }

  hide() {
    this.requests.update(v => Math.max(0, v - 1));
  }

}