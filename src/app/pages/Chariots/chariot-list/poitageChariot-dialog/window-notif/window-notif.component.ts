import { Component } from '@angular/core';
import { NbWindowRef, NbDateService } from '@nebular/theme';
import { TokenStorageService } from '../../../../auth/token-storage.service';

@Component({
  template: `
    <form class="form">
      <div class="form-group">
        <p style="font-size: 20px;">Pour pointer ce chariot, il faut que le validateur de chariot valide arriver des Articles des bon associer a ce chariot!!</p>
      </div>
    </form>
  `,
  styleUrls: ['window-notif.component.scss'],
})
export class WindowNotifComponent {
  constructor(private authService: TokenStorageService,public windowRef: NbWindowRef,protected dateService: NbDateService<Date>) {}

  close() {
    this.windowRef.close();
  }
}
