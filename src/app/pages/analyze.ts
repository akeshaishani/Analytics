import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface AnalyticsData {
  url: string;
  timestamp: string;
  analytics: {
    performance: {
      performance_score: number;
      first_contentful_paint: number;
      largest_contentful_paint: number;
      speed_index: number;
      time_to_interactive: number;
      total_blocking_time: number;
      cumulative_layout_shift: number;
    };
    seo: {
      title: string;
      description: string;
      keywords: string[];
      h1_tags: string[];
      images_without_alt: number;
      internal_links: number;
      external_links: number;
    };
    traffic: {
      estimated_visits: number;
      bounce_rate: number;
      pages_per_session: number;
      avg_session_duration: number;
      top_countries: string[];
      traffic_sources: {
        direct: number;
        organic_search: number;
        social: number;
        referral: number;
        paid_search: number;
      };
    };
    security: {
      https_enabled: boolean;
      security_headers: {
        content_security_policy: boolean;
        x_frame_options: boolean;
        x_content_type_options: boolean;
        strict_transport_security: boolean;
      };
      ssl_certificate: boolean;
      security_score: number;
    };
  };
  summary: {
    overall_score: number;
    recommendations: string[];
  };
}

@Component({
  selector: 'app-analyze',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../templates/pages/analyze.html',
})
export class AnalyzeComponent implements OnInit {
  websiteUrl: string = '';
  analysisToken: string = '';
  analyticsData: AnalyticsData | null = null;
  isLoading: boolean = false;
  error: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    console.log('AnalyzeComponent initialized');

    this.route.queryParams.subscribe((params) => {
      console.log('Query params received:', params);

      this.websiteUrl = params['url'] || '';
      this.analysisToken = params['key'] || '';

      console.log('Extracted params:', { url: this.websiteUrl, token: this.analysisToken });

      if (!this.websiteUrl) {
        console.log('No URL provided, redirecting to home');
        this.router.navigate(['/']);
        return;
      }

      this.analyzeWebsite();
    });
  }

  private analyzeWebsite(): void {
    console.log('Starting website analysis for:', this.websiteUrl);

    this.isLoading = true;
    this.error = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'zap-api-key-12345',
      'x-client-id': 'zap-client-001',
    });

    const body = {
      url: this.websiteUrl,
    };

    console.log('Making API call with:', {
      url: 'http://localhost:3001/analytics/analyze',
      headers,
      body,
    });

    this.http
      .post<AnalyticsData>('http://localhost:3001/analytics/analyze', body, { headers })
      .subscribe({
        next: (data) => {
          console.log('API response received:', data);
          this.analyticsData = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Analytics API error:', error);
          this.error = 'Failed to analyze website. Please try again.';
          this.isLoading = false;
        },
      });
  }

  getPerformanceGrade(score: number): string {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  getGradeColor(score: number): string {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  }

  getScoreColor(score: number): string {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  }

  formatNumber(num: number): string {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  formatTime(ms: number): string {
    if (ms >= 1000) {
      return (ms / 1000).toFixed(2) + 's';
    }
    return Math.round(ms) + 'ms';
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${seconds}s`;
  }

  analyzeAnother(): void {
    this.router.navigate(['/']);
  }

  shareResults(): void {
    const shareUrl = window.location.href;
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        alert('Analysis link copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy link. Please copy manually: ' + shareUrl);
      });
  }

  // Additional helper methods for dashboard
  getScoreBackgroundColor(score: number): string {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-blue-100';
    if (score >= 70) return 'bg-yellow-100';
    if (score >= 60) return 'bg-orange-100';
    return 'bg-red-100';
  }

  getProgressBarColor(score: number): string {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  }

  getPerformanceBarWidth(value: number, maxValue: number): number {
    return Math.min((value / maxValue) * 100, 100);
  }

  getCLSBarWidth(cls: number): number {
    // CLS values: 0.1 = good, 0.25 = needs improvement, >0.25 = poor
    return Math.min((cls / 0.3) * 100, 100);
  }
}
