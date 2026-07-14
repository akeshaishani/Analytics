import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: '../templates/pages/contact.html',
})
export class ContactComponent {
  contactData = {
    name: '',
    email: '',
    message: '',
  };

  isLoading = false;

  onSubmit(): void {
    if (this.isValidForm()) {
      this.isLoading = true;

      // Simulate API call
      setTimeout(() => {
        console.log('Contact form submitted:', this.contactData);
        alert('Thank you for your message! We will get back to you soon.');
        this.resetForm();
        this.isLoading = false;
      }, 2000);
    }
  }

  private isValidForm(): boolean {
    return !!(this.contactData.name && this.contactData.email && this.contactData.message);
  }

  private resetForm(): void {
    this.contactData = {
      name: '',
      email: '',
      message: '',
    };
  }
}
