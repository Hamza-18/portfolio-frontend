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
      url: 'https://github.com/yourusername',
      username: '@yourusername'
    },
    linkedin: {
      url: 'https://linkedin.com/in/yourusername',
      name: 'Your Name'
    },
    twitter: {
      url: 'https://twitter.com/yourusername',
      username: '@yourusername'
    }
  };
  
  // Resume download
  resumeUrl: string = 'assets/Hamza Bashir.pdf';

  constructor() { }

  ngOnInit(): void {
    // Initialization code if needed
  }
}
