# Work Page Guide

## Overview
The Work page has been successfully created following your portfolio's design principles. It features a clean, minimalist design with smooth animations and a responsive layout.

## Features

### 1. **Dynamic Content Management**
All work items are managed through `/src/data/content.js` in the `works` array.

### 2. **Category Filtering**
- Filter works by category: ALL, WEB DEVELOPMENT, MOBILE APP, UI/UX DESIGN, FULL STACK
- Add/modify categories in `workCategories` array

### 3. **Work Card Properties**
Each work item includes:
- `id`: Unique identifier
- `title`: Project name
- `year`: Year completed
- `category`: Project category
- `description`: Brief description
- `image`: Path to project image
- `tags`: Array of technologies/skills used
- `liveUrl`: Live project URL (optional)
- `githubUrl`: GitHub repository URL (optional)

## How to Add New Work Items

1. Open `/src/data/content.js`
2. Add a new object to the `works` array:

```javascript
{
  id: 7, // Increment the ID
  title: 'Your Project Name',
  year: '2024',
  category: 'WEB DEVELOPMENT', // Must match a category in workCategories
  description: 'Brief description of your project and what it accomplishes.',
  image: 'src/assets/your-image.jpg', // Add image to src/assets folder
  tags: ['React', 'Node.js', 'MongoDB'], // Technologies used
  liveUrl: 'https://your-project.com', // Optional
  githubUrl: 'https://github.com/yourusername/project' // Optional
}
```

## Navigation

- **Home → Work**: Click "WORK" in navigation or "VIEW WORK" button
- **Work → Home**: Click "PAMU" logo or "BACK TO HOME" button

## Adding Project Images

1. Place your project images in `/src/assets/` folder
2. Update the `image` property in your work item to match the file path
3. Recommended image dimensions: 16:9 aspect ratio (e.g., 1600x900px)

## Customization

### Add New Categories
Edit `workCategories` array in `/src/data/content.js`:
```javascript
workCategories: ['ALL', 'WEB DEVELOPMENT', 'MOBILE APP', 'UI/UX DESIGN', 'FULL STACK', 'YOUR NEW CATEGORY'],
```

### Modify Styling
- Main styles: `/src/App.css` (see "Work Page Styles" section)
- Component styles: `/src/components/Work.jsx` (Tailwind classes)

## Design Principles Followed

✅ Bold, large typography
✅ Smooth hover animations and transitions
✅ Minimalist black and white color scheme
✅ Responsive grid layout
✅ Card-based design with elevation on hover
✅ Consistent spacing and padding
✅ Intersection Observer for scroll animations
✅ Smooth scrolling and navigation

## Testing

Run your development server:
```bash
npm run dev
```

Then navigate to:
- Home page: `http://localhost:5173/`
- Work page: `http://localhost:5173/work`

## Next Steps

1. Replace placeholder images with actual project screenshots
2. Update work items with your real projects
3. Add more categories if needed
4. Customize colors/spacing to your preference
5. Add project detail pages (optional enhancement)
