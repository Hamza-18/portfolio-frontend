import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {
  // Contact info
  email: string = 'hamzabashir1022@gmail.com';
  location: string = 'Mountain View, CA';

  // Social media
  socials = {
    github: {
      url: 'https://github.com/Hamza-18',
      username: '@Hamza-18'
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/hamza-bashir-3214a11ab/',
      name: 'Hamza Bashir'
    }
  };
  
  // Resume download
  resumeUrl: string = 'assets/Hamza Bashir.pdf';

  constructor() { }

  ngOnInit(): void {
    // Initialization code if needed
  }
}
