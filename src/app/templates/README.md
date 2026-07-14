# Templates Folder

This folder contains all HTML templates for the ZAP Angular application, organized for better maintainability and development experience.

## 📁 Structure

```
templates/
├── components/           # Component templates
│   ├── header.component.html
│   ├── card.component.html
│   └── button.component.html
└── pages/               # Page templates
    ├── home.component.html
    ├── about.component.html
    └── contact.component.html
```

## 🎯 Benefits

- **Centralized Templates**: All HTML templates in one location
- **Better Organization**: Clear separation between component and page templates
- **Easy Navigation**: Quickly find any template file
- **Syntax Highlighting**: Full HTML syntax highlighting and formatting
- **Team Collaboration**: Designers can easily locate and edit templates

## 🔧 Usage

Templates are referenced from component TypeScript files using relative paths:

```typescript
@Component({
  selector: 'app-example',
  templateUrl: '../../templates/components/example.component.html'
})
export class ExampleComponent { }
```

## 📝 Template Guidelines

### HTML Structure
- Use semantic HTML elements (`<header>`, `<section>`, `<article>`, etc.)
- Maintain consistent indentation (2 spaces)
- Add HTML comments to separate major sections

### Tailwind CSS Classes
- Group utility classes logically (layout, typography, colors)
- Use responsive prefixes consistently (`sm:`, `md:`, `lg:`)
- Apply hover and focus states for interactive elements
- Maintain consistent spacing patterns

### Angular Directives
- Use structural directives properly (`*ngIf`, `*ngFor`)
- Implement proper event binding (`(click)`, `(submit)`)
- Use property binding for dynamic values (`[class]`, `[src]`)
- Apply template reference variables when needed (`#templateVar`)

## 🎨 Styling Conventions

### Component Templates
```html
<div class="component-wrapper">
  <!-- Component content -->
</div>
```

### Page Templates
```html
<div class="min-h-screen bg-gray-50">
  <!-- Hero Section -->
  <section class="py-16">
    <!-- Section content -->
  </section>
  
  <!-- Additional sections -->
</div>
```

## 📋 Template Checklist

- [ ] Semantic HTML structure
- [ ] Proper Tailwind CSS classes
- [ ] Responsive design considerations
- [ ] Angular directives correctly implemented
- [ ] Accessibility attributes (ARIA labels, alt text)
- [ ] Consistent formatting and indentation
- [ ] HTML comments for major sections