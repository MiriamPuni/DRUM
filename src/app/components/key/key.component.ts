import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, debounceTime, filter, fromEvent, map, tap } from 'rxjs';
import { AudioService } from '../../srevices/audio.service';
import { DrumsEnum, ISound } from '../../model';

@Component({
  selector: 'app-key',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './key.component.html',
  styleUrl: './key.component.scss'
})
export class KeyComponent implements OnInit, OnDestroy {
  @Input() set sound(sound:ISound){
    this._sound = sound
  }
  public isPlaying:boolean = false
  private _sound:ISound = {
    key : '', 
    sound:DrumsEnum.Kick
  }
  get sound():ISound{
    return this._sound
  }
  public keyDown$:Observable<KeyboardEvent>
  private supsciption:Subscription = new Subscription()
  constructor( private audioService : AudioService){
    this.keyDown$ = fromEvent(document, 'keypress').pipe(
      map(data=>data as KeyboardEvent),
      filter(data=>data.key === this.sound.key),
      tap(data=>{
      audioService.playSound(this.sound.sound)
      this.isPlaying = true
      setTimeout(() => {
        this.isPlaying = false
      }, 500);
    }))//,
    // debounceTime(400),
    // tap(_=>{this.isPlaying = false})
  }
  onClick():void{
    this.isPlaying = true
    this.audioService.playSound(this.sound.sound)
    setTimeout(() => {
      this.isPlaying = false
    }, 5000);
  }

  ngOnInit(): void {
    this.supsciption.add(this.keyDown$.subscribe())
    
  }
  ngOnDestroy(): void {
    this.supsciption.unsubscribe()
  }

}
