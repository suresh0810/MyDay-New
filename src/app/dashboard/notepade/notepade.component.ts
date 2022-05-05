import { Component, OnInit ,HostBinding, EventEmitter, Output, ElementRef} from '@angular/core';


export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Component({
  selector: 'app-notepade',
  templateUrl: './notepade.component.html',
  styleUrls: ['./notepade.component.scss']
})
export class NotepadeComponent implements OnInit {

  @Output() dismiss = new EventEmitter();
  @Output() focusout = new EventEmitter();
  recognition:any;
  constructor(private el:ElementRef) {
    const {webkitSpeechRecognition} : IWindow = <IWindow><unknown>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.onresult = (event)=> {
      this.el.nativeElement.querySelector(".content").innerText += event.results[0][0].transcript
      console.log(event.results[0][0].transcript) 
      document.getElementById('toolbar').focus();
    };
   }

  ngOnInit(): void {
  }

  onDismiss(event){
    this.dismiss.emit(event);
  }
  
  onFocusOut(event){
    this.focusout.emit(event)
  }

  record(event) {
    this.recognition.start();
  }

}

