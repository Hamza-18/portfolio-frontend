import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.scss']
})
export class HeaderNavigationComponent implements OnInit {
  
  currentSection: string = 'top';

  ngOnInit() {
    this.onScroll(); // initialize on page load
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const sections = ['top', 'about', 'projects', 'experience', 'contact'];
    const scrollPosition = window.pageYOffset + 100; // offset for early activation

    for (let section of sections) {
      const el = document.getElementById(section);
      if (el) {
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;

        if (scrollPosition >= top && scrollPosition < bottom) {
          this.currentSection = section;
          return;
        }
      }
    }

    this.currentSection = 'top';
  }

  scrollToSection(section: string, event: Event) {
    event.preventDefault();
    if (section === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
