import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.scss']
})
export class HeaderNavigationComponent implements AfterViewInit, OnDestroy {

  currentSection = 'top';
  sections = ['top', 'about', 'projects', 'experience', 'contact'];

  private observer?: IntersectionObserver;
  private visibility = new Map<string, number>();
  private scrollRoot: Element | null = null; // set to your scroll container if not window
  private headerHeight = 0;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => setTimeout(() => this.setupObserver(), 0));
  }

  ngAfterViewInit(): void {
    this.setupObserver();
    window.addEventListener('resize', this.handleResize, { passive: true });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    window.removeEventListener('resize', this.handleResize);
  }

  // If your app uses a custom scrolling div, set it here.
  // Example: this.scrollRoot = document.querySelector('.content-scroll');
  private detectScrollRoot() {
    this.scrollRoot = null; // keep null to use window; change if you use a scrollable container
  }

  private handleResize = () => {
    this.headerHeight = document.querySelector('app-header-navigation')?.clientHeight || 0;
    this.setupObserver();
  };

  private getSectionElements(): HTMLElement[] {
    return this.sections
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
  }

  private setupObserver() {
    // Clean up
    this.observer?.disconnect();
    this.visibility.clear();

    this.headerHeight = document.querySelector('app-header-navigation')?.clientHeight || 0;
    this.detectScrollRoot();

    const targets = this.getSectionElements();
    if (!targets.length) return;

    // Many thresholds so we get smooth visibility ratios
    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);

    this.observer = new IntersectionObserver(
      entries => {
        // Update visibility ratios
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          this.visibility.set(id, entry.intersectionRatio);
        }

        // Pick the section with the highest ratio (> 0)
        let bestId = 'top';
        let bestRatio = -1;
        for (const id of this.sections) {
          const r = this.visibility.get(id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }

        // Top/bottom edge cases
        const scrollY = (this.scrollRoot ? (this.scrollRoot as HTMLElement).scrollTop : window.scrollY) || 0;
        const maxScroll = this.scrollRoot
          ? (this.scrollRoot as HTMLElement).scrollHeight - (this.scrollRoot as HTMLElement).clientHeight
          : document.documentElement.scrollHeight - window.innerHeight;

        if (scrollY <= 2) bestId = 'top';
        if (Math.abs(scrollY - maxScroll) < 2) {
          // If at bottom, prefer the last section that actually exists
          for (let i = this.sections.length - 1; i >= 0; i--) {
            if (document.getElementById(this.sections[i])) {
              bestId = this.sections[i];
              break;
            }
          }
        }

        if (this.currentSection !== bestId) this.currentSection = bestId;
      },
      {
        root: this.scrollRoot,                         // null = window
        threshold: thresholds,
        rootMargin: `-${this.headerHeight}px 0px 0px 0px` // account for sticky header
      }
    );

    // Observe each section
    for (const el of targets) {
      this.visibility.set(el.id, 0);
      this.observer.observe(el);
    }

    // Kick an initial evaluation
    setTimeout(() => this.forceEvaluateInitial(targets), 0);
  }

  private forceEvaluateInitial(targets: HTMLElement[]) {
    // If nothing is intersecting yet (e.g., sections too short), pick by scroll position
    const scrollY = this.scrollRoot
      ? (this.scrollRoot as HTMLElement).scrollTop
      : window.scrollY;

    let active = 'top';
    for (const el of targets) {
      if ((el.offsetTop - this.headerHeight) <= scrollY) active = el.id;
    }
    this.currentSection = active;
  }

  scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (!el) return;

    const top = this.scrollRoot
      ? el.getBoundingClientRect().top + (this.scrollRoot as HTMLElement).scrollTop - this.headerHeight
      : el.getBoundingClientRect().top + window.scrollY - this.headerHeight;

    if (this.scrollRoot) {
      (this.scrollRoot as HTMLElement).scrollTo({ top, behavior: 'smooth' });
    } else {
      window.scrollTo({ top, behavior: 'smooth' });
    }

    this.currentSection = sectionId;
  }
}
