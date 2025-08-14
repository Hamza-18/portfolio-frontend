import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.scss']
})
export class HeaderNavigationComponent implements OnInit, AfterViewInit {
  
  currentSection: string = 'top';
  sections = ['top', 'about', 'projects', 'experience', 'contact'];
  sectionsOffsets: { [key: string]: number } = {};

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen for route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // After navigation ends, recalculate section offsets and check scroll position
      setTimeout(() => {
        this.calculateSectionOffsets();
        this.checkScrollPosition();
      }, 100);
    });
  }

  ngAfterViewInit() {
    // Calculate section offsets after view is initialized
    setTimeout(() => {
      this.calculateSectionOffsets();
      this.checkScrollPosition(); // Check initial position
    }, 100);
  }

  calculateSectionOffsets() {
    // Get all section elements and their positions
    this.sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        this.sectionsOffsets[section] = element.offsetTop;
      }
    });
    
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.checkScrollPosition();
  }

  checkScrollPosition() {
    const scrollPosition = window.pageYOffset;
    const headerHeight = document.querySelector('app-header-navigation')?.clientHeight || 0;
    const adjustedScrollPosition = scrollPosition + headerHeight + 50; // Add extra offset for better detection
    
    console.log('Scroll position:', scrollPosition, 'Adjusted position:', adjustedScrollPosition);
    
    // Default to top
    let activeSection = 'top';
    let highestVisibleSection = -1;
    
    // Find the section that's currently in view
    for (let i = 0; i < this.sections.length; i++) {
      const section = this.sections[i];
      const element = document.getElementById(section);
      
      if (element) {
        const offset = element.offsetTop;
        const height = element.offsetHeight;
        const bottom = offset + height;
        
        // If this is about section, be more aggressive with detection
        if (section === 'about' && scrollPosition > this.sectionsOffsets['top']) {
          const topSectionHeight = document.getElementById('top')?.offsetHeight || 0;
          if (scrollPosition > this.sectionsOffsets['top'] && 
              (scrollPosition < this.sectionsOffsets['projects'] || !this.sectionsOffsets['projects'])) {
            activeSection = 'about';
            break;
          }
        }
        
        // Check if we're in this section
        if (adjustedScrollPosition >= offset) {
          if (i > highestVisibleSection) {
            highestVisibleSection = i;
            activeSection = section;
          }
        }
      }
    }
    
    if (this.currentSection !== activeSection) {
      console.log('Changing active section from', this.currentSection, 'to', activeSection);
      this.currentSection = activeSection;
    }
  }

  scrollToSection(section: string, event: Event) {
    event.preventDefault();
    
    if (section === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.currentSection = 'top';
      return;
    }
    
    // Get the element
    const element = document.getElementById(section);
    if (!element) {
      console.error(`Element with id '${section}' not found!`);
      return;
    }
    
    // Calculate position with offset for fixed header
    const headerHeight = document.querySelector('app-header-navigation')?.clientHeight || 0;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight;
    
    // Scroll to the element
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Set active section
    this.currentSection = section;
  }
}
