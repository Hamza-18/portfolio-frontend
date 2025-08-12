import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayText = '';
  currentPart = 0;
  showSkills = false;
  private textParts = [
    'Hello, it\'s Hamza.',
  ];
  private index = 0;
  private typingSpeed = 100;
  private newLineDelay = 300;
  private showSkillsDelay = 500;

  constructor() {
    this.showSkills = false;
  }

  ngOnInit() {
    this.typeText();
  }

  private typeText() {
    if (this.currentPart >= this.textParts.length) return;
    
    const currentText = this.textParts[this.currentPart];
    if (this.index < currentText.length) {
      this.displayText += currentText.charAt(this.index);
      this.index++;
      setTimeout(() => this.typeText(), this.typingSpeed);
    } else if (this.currentPart < this.textParts.length - 1) {
      this.displayText += '\n';
      this.currentPart++;
      this.index = 0;
      setTimeout(() => this.typeText(), this.newLineDelay);
    } else if (!this.showSkills) {
      setTimeout(() => this.showSkills = true, this.showSkillsDelay);
      setTimeout(() => this.typeText(), 100); // Adjust speed here (100ms)
    }
  }
}
