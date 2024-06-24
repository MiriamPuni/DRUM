import { Injectable } from '@angular/core';
import { DrumsEnum, ISound } from '../model';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }
  private _drumKit:Array<ISound> = [
    {
      key: 'a',
      sound: DrumsEnum.Kick,
    },
    {
      key: 's',
      sound: DrumsEnum.Kick1,
    },
    {
      key: 'd',
      sound: DrumsEnum.Ride,
    },
    {
      key: 'f',
      sound: DrumsEnum.Snare,
    },
    {
      key: 'g',
      sound: DrumsEnum.Crash1,
    },
    {
      key: 'h',
      sound: DrumsEnum.GateKick,
    },
  ]
  public getDrumKit():ISound[]{
    return this._drumKit
  }
  private sound:HTMLAudioElement = new Audio()
  public playSound(sound:DrumsEnum):void{
    const filePath:string = `assets/audio/${sound}`
    this.sound = new Audio(filePath)
    this.sound.play().then(()=>{
      this.sound.remove()
    })
  }
}
