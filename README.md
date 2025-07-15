# Quick Chops - Authentic Smoky Jollof Rice

A modern, responsive landing page for Quick Chops, featuring authentic Nigerian smoky jollof rice products. Built with modern web technologies and optimized for performance and accessibility.

## 🍚 About Quick Chops

Quick Chops brings the authentic flavors of West African cuisine to your table. Founded by a passionate home cook who grew up in Nigeria and emigrated to the US over 20 years ago, we specialize in ready-to-heat smoky jollof rice that captures the essence of traditional Nigerian party jollof.

## 🚀 Features

- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Modern UI/UX** - Clean, professional design with brand-consistent styling
- **Performance Optimized** - Fast loading with CDN-delivered assets
- **Accessibility Compliant** - Following web accessibility best practices
- **Contact Integration** - Ready-to-use contact form with Formspree integration
- **SEO Friendly** - Proper meta tags and semantic HTML structure

## 🛠 Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with modern features
- **Tailwind CSS** - Utility-first CSS framework
- **Pico CSS** - Minimal CSS framework for base styling
- **HTMX** - Modern interactions without heavy JavaScript
- **Google Fonts** - Custom typography (Inter + Playfair Display)

## 🎨 Design System

### Colors
- **Primary**: `#e07a5f` (Peach/orange from packaging)
- **Secondary**: `#3d405b` (Dark brown for text)
- **Accent**: `#f2cc8f` (Light peach for backgrounds)
- **Smoke**: `#6b705c` (Muted green-gray for accents)

### Typography
- **Body Text**: Inter (Modern sans-serif)
- **Headings**: Playfair Display (Elegant serif)

## 📁 Project Structure

```
quick_chops/
├── index.html          # Main landing page
├── img/               # Image assets
│   ├── packaging.jpg  # Product packaging image
│   └── story.jpg      # Story section image
├── .kiro/             # Kiro IDE configuration
└── README.md          # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- Local web server (optional, for development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ToXMon/quick_chops.git
cd quick_chops
```

2. Open `index.html` in your browser or serve with a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Visit `http://localhost:8000` in your browser

## 📧 Contact Form Setup

The contact form uses Formspree for handling submissions. To set it up:

1. Sign up at [Formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Replace `your-form-id` in the form action URL:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## 🌐 Deployment

This site can be deployed to any static hosting service:

- **Netlify**: Drag and drop the project folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Enable in repository settings
- **Firebase Hosting**: Use Firebase CLI

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: contact@quickchops.com
- **Website**: [Quick Chops](https://quickchops.com)
- **GitHub**: [@ToXMon](https://github.com/ToXMon)

## 🙏 Acknowledgments

- Nigerian culinary traditions that inspired this project
- The vibrant West African diaspora community
- Modern web development tools and frameworks

---

**Made with ❤️ from Mississippi, inspired by Nigeria**