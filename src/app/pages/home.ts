import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: '../templates/pages/home.html'
})
export class HomeComponent {
  websiteUrl: string = '';
  isAnalyzing: boolean = false;

  constructor(private router: Router) {}

  onAnalyze(): void {
    console.log('Analyze button clicked!', this.websiteUrl);
    
    if (!this.websiteUrl.trim()) {
      alert('Please enter a website URL');
      return;
    }

    // Auto-add https:// if no protocol is specified
    let formattedUrl = this.formatUrl(this.websiteUrl.trim());
    
    // Update the input field with the formatted URL
    this.websiteUrl = formattedUrl;

    // Validate URL format
    if (!this.isValidUrl(formattedUrl)) {
      alert('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    this.isAnalyzing = true;
    
    // Generate a simple token for this analysis
    const token = this.generateAnalysisToken();
    
    console.log('Navigating to analyze page with:', { url: formattedUrl, token });
    
    // Navigate to analyze page with URL parameter
    this.router.navigate(['/analyze'], {
      queryParams: {
        url: formattedUrl,
        key: token
      }
    }).then(() => {
      console.log('Navigation successful');
    }).catch((error) => {
      console.error('Navigation failed:', error);
      this.isAnalyzing = false;
    });
  }

  private formatUrl(url: string): string {
    // Remove any leading/trailing whitespace
    url = url.trim();
    
    // If URL doesn't start with http:// or https://, add https://
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    // Remove trailing slash if present
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    
    return url;
  }

  private isValidUrl(string: string): boolean {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  private generateAnalysisToken(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  onUrlInput(): void {
    // Real-time URL formatting as user types
    if (this.websiteUrl && !this.websiteUrl.includes('://')) {
      // Show a preview of what will be analyzed (but don't change the input value yet)
    }
  }

  onGetStarted(): void {
    console.log('Get Started clicked!');
  }
}