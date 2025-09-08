# AI Website Builder - Complete Solution

A comprehensive AI-powered website builder with admin dashboard, payment processing, and professional preview functionality.

## 🚀 Features

### Core Functionality
- **AI-Powered Website Generation** - Generate websites using multiple AI models
- **Multiple Framework Support** - React, Next.js, Vue.js, Python, Node.js, Django, PHP, HTML/CSS
- **Real-time Preview** - Live website preview with sandbox functionality
- **Code Editing** - Full code editing capabilities with syntax highlighting
- **Project Management** - Save, edit, and manage multiple projects

### AI Model Selection
- **Custom AI Models** - Choose from OpenAI GPT-4, Grok AI, Claude, Gemini, Cohere, Hugging Face, OpenRouter
- **API Key Integration** - Use your own API keys for custom AI models
- **Fallback Support** - Default AI model when no custom selection is made

### Payment System
- **Multiple Payment Methods**:
  - **Stripe** - Credit card payments with instant activation
  - **EasyPaisa** - Local Pakistani payment method
  - **JazzCash** - Local Pakistani payment method
- **Admin Approval System** - Manual review of local payments
- **Automatic Plan Activation** - Premium features unlocked on payment approval

### Admin Dashboard
- **User Management** - View all users, their plans, and usage statistics
- **Payment Processing** - Review and approve/reject EasyPaisa/JazzCash payments
- **Real-time Statistics** - Total users, premium users, pending payments, revenue
- **Screenshot Viewer** - View payment screenshots in full detail
- **User Actions** - Ban/unban users, manage user plans

### Professional Preview System
- **Live Website Preview** - Full website preview with browser-like interface
- **Code Viewing** - Syntax-highlighted code viewing for all project files
- **Terminal Integration** - Run commands and see output for backend projects
- **File Management** - Browse and select project files
- **Framework Detection** - Automatic framework-specific setup instructions

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Firebase (Firestore, Authentication)
- **Payment**: Stripe, EasyPaisa, JazzCash
- **AI**: Multiple AI model support with API key integration
- **Database**: Firestore for real-time data
- **Deployment**: Netlify, Vercel ready

## 📱 Payment Details

### EasyPaisa/JazzCash
- **Account Name**: Muhammad Noaman Sauod
- **Account Number**: 03232204085
- **Amount**: Rs. 6000 (Pro Plan)

### Stripe
- **Credit Cards**: Visa, MasterCard, American Express
- **Instant Processing**: Automatic premium activation

## 🔐 Admin Access

### Login Credentials
- **Email**: admin@websitebuilder.com
- **Password**: admin123456

### Access URLs
- **Admin Login**: `/admin-login`
- **Admin Dashboard**: `/admin`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project setup
- Stripe account (for credit card payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd website-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   NEXT_PUBLIC_API_URL=your_backend_api_url
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - **Main App**: http://localhost:3000
   - **Admin Login**: http://localhost:3000/admin-login
   - **Admin Dashboard**: http://localhost:3000/admin

## 📋 Usage Guide

### For Users

1. **Sign Up/Login** - Create account or sign in
2. **Choose Plan** - Select free or premium plan
3. **Generate Website** - Describe your website and select technology
4. **AI Model Selection** (Optional) - Choose custom AI model and provide API key
5. **Preview & Edit** - View generated website and make edits
6. **Download/Deploy** - Download project or deploy to platforms

### For Admins

1. **Login** - Use admin credentials
2. **Monitor Users** - View user statistics and manage accounts
3. **Process Payments** - Review EasyPaisa/JazzCash payment screenshots
4. **Approve/Reject** - Grant or deny premium access
5. **View Statistics** - Monitor system performance and revenue

### AI Model Integration

1. **Select Custom AI** - Check "Use custom AI model" option
2. **Choose Model** - Select from available AI providers
3. **Provide API Key** - Enter your API key securely
4. **Generate** - Website will be generated using your selected AI model

## 🔧 API Endpoints

### Admin APIs
- `GET /api/admin/users` - Fetch all users
- `GET /api/admin/payments` - Fetch payment requests
- `GET /api/admin/stats` - Fetch admin statistics
- `PUT /api/payment-status` - Update payment status

### Payment APIs
- `POST /api/payment-request` - Submit payment request
- `PUT /api/payment-status` - Approve/reject payment

### Project APIs
- `POST /api/generate` - Generate website
- `GET /api/project/:id` - Fetch project details

## 🎯 Key Features Explained

### AI Model Selection
Users can optionally choose their preferred AI model for website generation:
- **Default**: Uses system AI model
- **Custom**: User provides API key for specific AI service
- **Supported Models**: OpenAI, Grok, Claude, Gemini, Cohere, Hugging Face, OpenRouter

### Payment Processing
- **Stripe**: Automatic processing with instant activation
- **Local Methods**: Manual review with screenshot verification
- **Admin Workflow**: Review → Approve/Reject → User plan update

### Preview System
- **Live Preview**: Real-time website preview
- **Code View**: Syntax-highlighted source code
- **Terminal**: Framework-specific command execution
- **File Browser**: Project file navigation

## 🔒 Security Features

- **Admin Authentication** - Secure admin access
- **API Key Encryption** - User API keys are never stored
- **Payment Verification** - Screenshot-based payment validation
- **User Isolation** - Users can only access their own projects
- **Session Management** - Secure session handling

## 🚀 Deployment

### Netlify
```bash
npm run build
netlify deploy --prod
```

### Vercel
```bash
npm run build
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Monitoring & Analytics

- **User Statistics** - Registration, usage, plan distribution
- **Payment Analytics** - Revenue tracking, payment method usage
- **System Performance** - Generation success rates, error tracking
- **Admin Dashboard** - Real-time system overview

## 🔮 Future Enhancements

- **Email Notifications** - Payment approval notifications
- **Advanced Analytics** - Detailed usage analytics
- **Multi-admin Support** - Team management capabilities
- **Automated Testing** - AI-generated code testing
- **Template Library** - Pre-built website templates
- **Collaboration Tools** - Team project collaboration

## 🐛 Troubleshooting

### Common Issues

1. **Admin Dashboard Not Loading**
   - Check admin login status
   - Clear localStorage and login again

2. **Payment Requests Not Showing**
   - Verify Firestore connection
   - Check browser console for errors

3. **AI Model Not Working**
   - Verify API key validity
   - Check API key permissions

4. **Preview Not Loading**
   - Ensure project files are valid
   - Check iframe security settings

### Support

For technical support or questions:
- **Email**: sobansaud3@gmail.com
- **Documentation**: Check this README and code comments
- **Issues**: Create GitHub issue with detailed description

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 🙏 Acknowledgments

- **AI Providers** - OpenAI, Anthropic, Google, xAI, Cohere, Hugging Face
- **Payment Providers** - Stripe, EasyPaisa, JazzCash
- **Open Source Community** - Next.js, React, Tailwind CSS, Firebase

---

**Built with ❤️ by Muhammad Soban Saud**

*This is a production-ready website builder with enterprise-grade features and security.*
