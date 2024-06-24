import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AudioService } from './srevices/audio.service';
import { CommonModule } from '@angular/common';
import { KeyComponent } from './components/key/key.component';
import { ISound } from './model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, KeyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'drumSet';
  public drumKit:ISound[];
  constructor(private audioService:AudioService){
    this.drumKit = audioService.getDrumKit()
  }
}
