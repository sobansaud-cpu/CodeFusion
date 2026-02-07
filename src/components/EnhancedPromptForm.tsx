"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from "@/context/AuthContext";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  Code2,
  Globe,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  X,
  Wand2,
  ChevronDown,
  ChevronUp,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

interface EnhancedPromptFormProps {
  onSubmitAction: (
    prompt: string,
    language: string,
    options?: {
      projectType?: string;
      aiModel?: string;
      apiKey?: string;
      hasImage?: boolean;
      imageFile?: File | null;
      frontendFramework?: string;
      backendFramework?: string;
      databaseType?: string;
    }
  ) => void;
  loading: boolean;
  remainingGenerations: number;
  initialPrompt?: string;
  userPlan?: string; // 'free' | 'pro' etc. Controls which frameworks/databases to show
}

const FRONTEND_FRAMEWORKS = [
  { value: 'react', label: 'React.js', icon: '⚛️', description: 'Modern React with hooks and modern patterns' },
  { value: 'nextjs', label: 'Next.js', icon: '▲', description: 'Full-stack React framework with SSR' },
  { value: 'angular', label: 'Angular', icon: '🅰️', description: 'Enterprise-grade TypeScript framework' },
  { value: 'vue', label: 'Vue.js', icon: '💚', description: 'Progressive JavaScript framework' },
  { value: 'svelte', label: 'Svelte', icon: '🟢', description: 'Cybernetically enhanced web apps' },
  { value: 'nuxt', label: 'Nuxt.js', icon: '💚', description: 'Vue.js framework with SSR' },
  { value: 'gatsby', label: 'Gatsby', icon: '🟣', description: 'Static site generator for React' },
  { value: 'html', label: 'Plain HTML, CSS, JavaScript', icon: '🌐', description: 'Vanilla web technologies' }
];

const BACKEND_FRAMEWORKS = [
  { value: 'nodejs-express', label: 'Node.js (Express)', icon: '🟢', description: 'JavaScript runtime with Express framework' },
  { value: 'nodejs-nestjs', label: 'Node.js (NestJS)', icon: '🔴', description: 'Progressive Node.js framework' },
  { value: 'python-django', label: 'Python (Django)', icon: '🐍', description: 'High-level Python web framework' },
  { value: 'python-flask', label: 'Python (Flask)', icon: '🐍', description: 'Lightweight Python web framework' },
  { value: 'python-fastapi', label: 'Python (FastAPI)', icon: '🐍', description: 'Modern, fast Python API framework' },
  { value: 'php-laravel', label: 'PHP (Laravel)', icon: '🐘', description: 'Elegant PHP web framework' },
  { value: 'php-codeigniter', label: 'PHP (CodeIgniter)', icon: '🐘', description: 'Lightweight PHP framework' },
  { value: 'ruby-rails', label: 'Ruby (Rails)', icon: '💎', description: 'Convention over configuration framework' },
  { value: 'ruby-sinatra', label: 'Ruby (Sinatra)', icon: '💎', description: 'Lightweight Ruby web framework' },
  { value: 'java-spring', label: 'Java (Spring Boot)', icon: '☕', description: 'Enterprise Java framework' },
  { value: 'csharp-dotnet', label: 'C# (.NET Core)', icon: '🔷', description: 'Microsoft\'s cross-platform framework' },
  { value: 'go-gin', label: 'Go (Gin)', icon: '🔵', description: 'High-performance Go web framework' },
  { value: 'go-echo', label: 'Go (Echo)', icon: '🔵', description: 'Minimalist Go web framework' },
  { value: 'rust-actix', label: 'Rust (Actix)', icon: '🦀', description: 'Powerful Rust web framework' },
  { value: 'rust-rocket', label: 'Rust (Rocket)', icon: '🦀', description: 'Type-safe Rust web framework' }
];

const DATABASE_TYPES = [
  { value: 'sqlite', label: 'SQLite', icon: '🗄️', description: 'Lightweight file-based database' },
  { value: 'postgresql', label: 'PostgreSQL', icon: '🐘', description: 'Advanced open-source database' },
  { value: 'mysql', label: 'MySQL', icon: '🐬', description: 'Popular relational database' },
  { value: 'mongodb', label: 'MongoDB', icon: '🍃', description: 'NoSQL document database' },
  { value: 'redis', label: 'Redis', icon: '🔴', description: 'In-memory data structure store' },
  { value: 'sqlserver', label: 'SQL Server', icon: '🔷', description: 'Microsoft relational database' },
  { value: 'oracle', label: 'Oracle', icon: '🔶', description: 'Enterprise relational database' },
  { value: 'couchdb', label: 'CouchDB', icon: '🛋️', description: 'NoSQL document-oriented database' }
];

const AI_MODELS = [
  { value: 'gemini', label: 'Gemini 2.5 Flash', description: 'Google\'s fastest multimodal model (Recommended)' },
  { value: 'gemini-pro', label: 'Gemini 1.5 Pro', description: 'Google\'s advanced multimodal model' },
  { value: 'gpt-4o', label: 'GPT-4 Omni', description: 'OpenAI\'s flagship multimodal model' },
  { value: 'gpt-4', label: 'GPT-4 Turbo', description: 'OpenAI\'s powerful text model' },
  { value: 'claude-3-opus', label: 'Claude 3 Opus', description: 'Anthropic\'s most capable model' },
  { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet', description: 'Anthropic\'s balanced model' },
  { value: 'llama-3-70b', label: 'Llama 3 70B', description: 'Meta\'s open-source model' },
  { value: 'mixtral-8x7b', label: 'Mixtral 8x7B', description: 'Mixture of Experts model' },
  { value: 'openrouter', label: 'OpenRouter Custom', description: 'Connect your OpenRouter API' }
];

export const EnhancedPromptForm: React.FC<EnhancedPromptFormProps> = ({
  onSubmitAction,
  loading,
  remainingGenerations,
  initialPrompt = ''
  , userPlan = 'free'
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [projectType, setProjectType] = useState<'frontend' | 'backend' | 'fullstack'>('frontend');
  const [frontendFramework, setFrontendFramework] = useState('html');
  const [backendFramework, setBackendFramework] = useState('nodejs-express');
  const [databaseType, setDatabaseType] = useState('sqlite');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [aiModel, setAiModel] = useState('gemini');
  const [customApiKey, setCustomApiKey] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<'frontend' | 'backend' | 'database' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  // Determine plan: prefer prop, otherwise context
  const { userProfile } = useAuth();
  const plan = (userPlan as string) || userProfile?.plan || 'free';
  const isPremium = plan === 'pro' || plan === 'premium';

  // Filtered option lists based on plan
  const frontendOptions = isPremium
    ? FRONTEND_FRAMEWORKS
    : FRONTEND_FRAMEWORKS.filter((f) => ['html', 'nextjs', 'gatsby', 'vue'].includes(f.value));

  const backendOptions = isPremium
    ? BACKEND_FRAMEWORKS
    : [
      // selected 8 backend options for free users
      BACKEND_FRAMEWORKS.find((b) => b.value === 'nodejs-express')!,
      BACKEND_FRAMEWORKS.find((b) => b.value === 'nodejs-nestjs')!,
      BACKEND_FRAMEWORKS.find((b) => b.value === 'python-django')!,
      BACKEND_FRAMEWORKS.find((b) => b.value === 'python-flask')!,
      BACKEND_FRAMEWORKS.find((b) => b.value === 'python-fastapi')!,
      BACKEND_FRAMEWORKS.find((b) => b.value === 'php-laravel')!,
      BACKEND_FRAMEWORKS.find((b) => b.value === 'ruby-rails')!,
      BACKEND_FRAMEWORKS.find((b) => b.value === 'java-spring')!,
    ].filter(Boolean) as typeof BACKEND_FRAMEWORKS;

  const databaseOptions = isPremium
    ? DATABASE_TYPES
    : DATABASE_TYPES.filter((d) => ['mongodb', 'redis', 'oracle', 'couchdb', 'mysql'].includes(d.value));

  // Ensure selected values remain valid if user plan changes or lists are filtered
  useEffect(() => {
    if (!frontendOptions.some((f) => f.value === frontendFramework)) {
      setFrontendFramework(frontendOptions[0]?.value || 'html');
    }
    if (!backendOptions.some((b) => b.value === backendFramework)) {
      setBackendFramework(backendOptions[0]?.value || BACKEND_FRAMEWORKS[0].value);
    }
    if (!databaseOptions.some((d) => d.value === databaseType)) {
      setDatabaseType(databaseOptions[0]?.value || DATABASE_TYPES[0].value);
    }
  }, [plan]);


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('Image size must be less than 10MB');
        return;
      }
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      toast.success('Image uploaded successfully! It will be analyzed with your prompt.');
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info('Image removed');
  };

  const enhancePrompt = () => {
    const enhanced = `Create a complete, production-ready ${projectType} application with the following requirements: ${prompt}. 
    Include modern UI/UX design principles, responsive layout, accessibility features, and clean, maintainable code structure.`;
    setPrompt(enhanced);
    toast.success('Prompt enhanced!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.error('Please enter a project description');
      return;
    }
    const options: any = {
      projectType,
      aiModel,
      apiKey: customApiKey || undefined
    };
    if (selectedImage) {
      options.hasImage = true;
      options.imageFile = selectedImage;
    }
    if (projectType === 'fullstack') {
      options.frontendFramework = frontendFramework;
      options.backendFramework = backendFramework;
      options.databaseType = databaseType;
      onSubmitAction(prompt, `${frontendFramework}+${backendFramework}`, options);
    } else if (projectType === 'frontend') {
      onSubmitAction(prompt, frontendFramework, options);
    } else if (projectType === 'backend') {
      onSubmitAction(prompt, backendFramework, options);
    }
  };

  const getProjectTypeDescription = () => {
    if (projectType === 'frontend') {
      return 'Generate a frontend application with modern UI frameworks and instant live preview';
    } else if (projectType === 'backend') {
      return 'Generate a backend API with database integration and terminal execution';
    } else {
      return `Generate a complete full-stack application with ${frontendOptions.find(f => f.value === frontendFramework)?.label} frontend, ${backendOptions.find(f => f.value === backendFramework)?.label} backend, and ${databaseOptions.find(d => d.value === databaseType)?.label} database`;
    }
  };

  const getGenerationLimitColor = () => {
    if (remainingGenerations === 0) return 'text-red-500';
    if (remainingGenerations <= 1) return 'text-yellow-500';
    return 'text-green-500';
  };

  const toggleSection = (section: 'frontend' | 'backend' | 'database') => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="space-y-5 text-gray-200">
      {/* Project Type Selection */}
      <Card className="bg-gradient-to-br from-[#0b1220] via-[#151426] to-[#0b1220] border border-[#232336]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Sparkles className="h-5 w-5 text-blue-400" />
            Project Type
          </CardTitle>
          <CardDescription className="text-slate-300">
            Choose your project type: Frontend, Backend, or Full-Stack application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setProjectType('frontend')}
              className={`p-4 rounded-lg border-2 transition-all hover:shadow-md w-full text-center ${projectType === 'frontend'
                  ? 'border-blue-400 bg-gradient-to-br from-[#04263f] to-[#07243a] shadow-lg'
                  : 'border-slate-700 bg-[#071024] hover:border-slate-600'
                }`}
            >
              <Code2 className="h-8 w-8 mx-auto mb-2 text-blue-300" />
              <h3 className="font-semibold text-white">Frontend</h3>
              <p className="text-sm text-slate-300">Website UI/UX</p>
            </button>

            <button
              type="button"
              onClick={() => setProjectType('backend')}
              className={`p-4 rounded-lg border-2 transition-all hover:shadow-md w-full text-center ${projectType === 'backend'
                  ? 'border-emerald-400 bg-gradient-to-br from-[#03343a] to-[#072a36] shadow-lg'
                  : 'border-slate-700 bg-[#071024] hover:border-slate-600'
                }`}
            >
              <Settings className="h-8 w-8 mx-auto mb-2 text-emerald-300" />
              <h3 className="font-semibold text-white">Backend</h3>
              <p className="text-sm text-slate-300">API & database logic</p>
            </button>

            <button
              type="button"
              onClick={() => setProjectType('fullstack')}
              className={`p-4 rounded-lg border-2 transition-all hover:shadow-md w-full text-center ${projectType === 'fullstack'
                  ? 'border-indigo-400 bg-gradient-to-br from-[#2b1b3b] to-[#071024] shadow-lg'
                  : 'border-slate-700 bg-[#071024] hover:border-slate-600'
                }`}
            >
              <Globe className="h-8 w-8 mx-auto mb-2 text-indigo-300" />
              <h3 className="font-semibold text-white">Full-Stack</h3>
              <p className="text-sm text-slate-300">Complete application</p>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Project Description with Enhanced Features */}
      <Card className="bg-gradient-to-br from-[#0b1220] via-[#151426] to-[#0b1220] border border-[#232336]">
        <CardHeader>
          <CardTitle className="text-white">Project Description</CardTitle>
          <CardDescription className="text-cyan-200">Describe what you want to build in detail</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your project in detail... For example: 'Create a modern e-commerce website with user authentication, product catalog, shopping cart, and payment integration. Include a responsive design with dark mode support.'"
              className="min-h-[120px] resize-none pr-20 bg-[#0b1220] text-gray-100 placeholder-cyan-300"
              disabled={loading}
            />

            {/* Action buttons inside the textarea */}
            <div className="absolute right-2 bottom-2 flex gap-2">
              {/* Image Upload Button */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:opacity-90"
                disabled={loading}
              >
                <ImageIcon className="h-4 w-4 text-blue-100" />
              </Button>

              {/* Enhance Prompt Button */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={enhancePrompt}
                className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:opacity-90"
                disabled={loading || !prompt.trim()}
              >
                <Wand2 className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4 p-3 border rounded-lg relative border-[#232336] bg-[#0b1220]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Image Preview</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeImage}
                  className="h-6 w-6 p-0 text-slate-300 hover:text-red-500"
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-32 object-contain rounded-md"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Framework Selection */}
      <Card className="bg-gradient-to-br from-[#0b1220] via-[#151426] to-[#0b1220] border border-[#232336]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Code2 className="h-5 w-5 text-blue-300" />
            {projectType === 'frontend' ? 'Frontend Framework' :
              projectType === 'backend' ? 'Backend Framework' : 'Technology Stack'}
          </CardTitle>
          <CardDescription className="text-cyan-200">{getProjectTypeDescription()}</CardDescription>
        </CardHeader>
        <CardContent>
          {projectType === 'frontend' ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <Label className="text-sm font-medium text-cyan-200">Choose Frontend Framework</Label>
              </div>
              <p className="text-sm text-slate-300">
                Select your preferred frontend technology. Live preview will be available in future.
              </p>
              {/* Frontend Framework Dropdown */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => toggleSection('frontend')}
                  className="flex items-center justify-between w-full p-4 rounded-lg border border-slate-700 hover:border-slate-600 bg-[#071024] transition-all"
                  aria-expanded={expandedSection === 'frontend'}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                    <div className="text-left">
                      <h3 className="font-semibold text-white">Frontend Framework</h3>
                      <p className="text-sm text-slate-300">
                        {frontendOptions.find(f => f.value === frontendFramework)?.label}
                      </p>
                    </div>
                  </div>
                  {expandedSection === 'frontend' ? (
                    <ChevronUp className="h-5 w-5 text-slate-300" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-300" />
                  )}
                </button>

                {expandedSection === 'frontend' && (
                  <div className="pl-8 pr-4 pb-4">
                    <Select value={frontendFramework} onValueChange={setFrontendFramework}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a frontend framework" />
                      </SelectTrigger>
                      <SelectContent>
                        {frontendOptions.map((framework) => (
                          <SelectItem key={framework.value} value={framework.value}>
                            <div className="flex items-center gap-2">
                              <span>{framework.icon}</span>
                              <span className="text-sm">{framework.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-cyan-200 mt-2">
                      {frontendOptions.find(f => f.value === frontendFramework)?.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : projectType === 'backend' ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                <Label className="text-sm font-medium text-cyan-200">Choose Backend Framework</Label>
              </div>
              <p className="text-sm text-slate-300">
                Select your preferred backend technology. One click deploy in future.
              </p>
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => toggleSection('backend')}
                  className="flex items-center justify-between w-full p-4 rounded-lg border border-slate-700 hover:border-slate-600 bg-[#071024] transition-all"
                  aria-expanded={expandedSection === 'backend'}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                    <div className="text-left">
                      <h3 className="font-semibold text-white">Backend Framework</h3>
                      <p className="text-sm text-slate-300">
                        {backendOptions.find(f => f.value === backendFramework)?.label}
                      </p>
                    </div>
                  </div>
                  {expandedSection === 'backend' ? (
                    <ChevronUp className="h-5 w-5 text-slate-300" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-300" />
                  )}
                </button>

                {expandedSection === 'backend' && (
                  <div className="pl-8 pr-4 pb-4">
                    <Select value={backendFramework} onValueChange={setBackendFramework}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a backend framework" />
                      </SelectTrigger>
                      <SelectContent>
                        {backendOptions.map((framework) => (
                          <SelectItem key={framework.value} value={framework.value}>
                            <div className="flex items-center gap-2">
                              <span>{framework.icon}</span>
                              <span>{framework.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-cyan-200 mt-2">
                      {backendOptions.find(f => f.value === backendFramework)?.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Technology Stack Overview */}
              <div className="text-center py-4 rounded-lg border border-[#232336] bg-gradient-to-r from-[#071022] to-[#0b1220]">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Full-Stack Technology Stack
                </h3>
                <p className="text-sm text-slate-300">
                  Choose your preferred technologies for a complete application
                </p>
              </div>

              {/* Frontend Framework Dropdown */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => toggleSection('frontend')}
                  className="flex items-center justify-between w-full p-4 rounded-lg border border-slate-700 hover:border-slate-600 bg-[#071024] transition-all"
                  aria-expanded={expandedSection === 'frontend'}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                    <div className="text-left">
                      <h3 className="font-semibold text-white">Frontend Framework</h3>
                      <p className="text-sm text-slate-300">
                        {FRONTEND_FRAMEWORKS.find(f => f.value === frontendFramework)?.label}
                      </p>
                    </div>
                  </div>
                  {expandedSection === 'frontend' ? (
                    <ChevronUp className="h-5 w-5 text-slate-300" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-300" />
                  )}
                </button>

                {expandedSection === 'frontend' && (
                  <div className="pl-8 pr-4 pb-4">
                    <Select value={frontendFramework} onValueChange={setFrontendFramework}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a frontend framework" />
                      </SelectTrigger>
                      <SelectContent>
                        {frontendOptions.map((framework) => (
                          <SelectItem key={framework.value} value={framework.value}>
                            <div className="flex items-center gap-2">
                              <span>{framework.icon}</span>
                              <span>{framework.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-cyan-200 mt-2">
                      {frontendOptions.find(f => f.value === frontendFramework)?.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Backend Framework Dropdown */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => toggleSection('backend')}
                  className="flex items-center justify-between w-full p-4 rounded-lg border border-slate-700 hover:border-slate-600 bg-[#071024] transition-all"
                  aria-expanded={expandedSection === 'backend'}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                    <div className="text-left">
                      <h3 className="font-semibold text-white">Backend Framework</h3>
                      <p className="text-sm text-slate-300">
                        {backendOptions.find(f => f.value === backendFramework)?.label}
                      </p>
                    </div>
                  </div>
                  {expandedSection === 'backend' ? (
                    <ChevronUp className="h-5 w-5 text-slate-300" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-300" />
                  )}
                </button>

                {expandedSection === 'backend' && (
                  <div className="pl-8 pr-4 pb-4">
                    <Select value={backendFramework} onValueChange={setBackendFramework}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a backend framework" />
                      </SelectTrigger>
                      <SelectContent>
                        {backendOptions.map((framework) => (
                          <SelectItem key={framework.value} value={framework.value}>
                            <div className="flex items-center gap-2">
                              <span>{framework.icon}</span>
                              <span>{framework.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-cyan-200 mt-2">
                      {backendOptions.find(f => f.value === backendFramework)?.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Database Type Dropdown */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => toggleSection('database')}
                  className="flex items-center justify-between w-full p-4 rounded-lg border border-slate-700 hover:border-slate-600 bg-[#071024] transition-all"
                  aria-expanded={expandedSection === 'database'}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <div className="text-left">
                      <h3 className="font-semibold text-white">Database</h3>
                      <p className="text-sm text-slate-300">
                        {databaseOptions.find(d => d.value === databaseType)?.label}
                      </p>
                    </div>
                  </div>
                  {expandedSection === 'database' ? (
                    <ChevronUp className="h-5 w-5 text-slate-300" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-300" />
                  )}
                </button>

                {expandedSection === 'database' && (
                  <div className="pl-8 pr-4 pb-4">
                    <Select value={databaseType} onValueChange={setDatabaseType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a database" />
                      </SelectTrigger>
                      <SelectContent>
                        {databaseOptions.map((db) => (
                          <SelectItem key={db.value} value={db.value}>
                            <div className="flex items-center gap-2">
                              <span>{db.icon}</span>
                              <span>{db.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-cyan-200 mt-2">
                      {databaseOptions.find(d => d.value === databaseType)?.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Advanced Options with More Models */}
      <Card className="bg-gradient-to-br from-[#0b1220] via-[#151426] to-[#0b1220] border border-[#232336]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Settings className="h-5 w-5 text-slate-200" />
            Advanced Options
          </CardTitle>
          <CardDescription className="text-cyan-200">Customize AI model and additional settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showAdvanced"
                checked={showAdvancedOptions}
                onChange={(e) => setShowAdvancedOptions(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="showAdvanced" className="text-slate-200">Show advanced options</Label>
            </div>

            {showAdvancedOptions && (
              <div className="space-y-4 pl-6 border-l-2 border-slate-700">
                <div className="space-y-2">
                  <Label className="text-sm">AI Model</Label>
                  <Select value={aiModel} onValueChange={setAiModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {AI_MODELS.map((model) => (
                        <SelectItem key={model.value} value={model.value}>
                          <div className="text-sm">{model.label} - <span className="text-xs text-cyan-200">{model.description}</span></div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {aiModel === 'openrouter' && (
                  <div className="space-y-2">
                    <Label className="text-sm">OpenRouter API Key</Label>
                    <Input
                      type="password"
                      placeholder="Enter your OpenRouter API key"
                      value={customApiKey}
                      onChange={(e) => setCustomApiKey(e.target.value)}
                    />
                    <p className="text-xs text-cyan-200">Required for OpenRouter models</p>
                  </div>
                )}

                {(aiModel === 'gpt-4o' || aiModel === 'gpt-4' ||
                  aiModel === 'claude-3-opus' || aiModel === 'claude-3-sonnet') && (
                    <div className="space-y-2">
                      <Label>API Key (Optional)</Label>
                      <Input
                        type="password"
                        placeholder={`Enter your ${aiModel.includes('gpt') ? 'OpenAI' : 'Anthropic'} API key`}
                        value={customApiKey}
                        onChange={(e) => setCustomApiKey(e.target.value)}
                      />
                      <p className="text-xs text-cyan-200">
                        Leave empty to use our default API key (limited availability)
                      </p>
                    </div>
                  )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Generation Limits */}
      <Card className="border border-[#c86a2b] bg-gradient-to-br from-[#3a1f09] to-[#071022]">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-200">
              <AlertCircle className="h-5 w-5 text-orange-400" />
              <span className="font-medium">Generation Limits</span>
            </div>
            <Badge variant={remainingGenerations === 0 ? "destructive" : "secondary"}>
              {remainingGenerations} remaining
            </Badge>
          </div>
          <p className="text-sm text-cyan-200 mt-2">
            You have <span className={getGenerationLimitColor()}>{remainingGenerations}</span> generations remaining today.
            {remainingGenerations === 0 && (
              <span className="text-red-400 font-medium"> Upgrade to Pro for more generations!</span>
            )}
          </p>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        onClick={handleSubmit}
        disabled={loading || remainingGenerations === 0 || !prompt.trim()}
        className="w-full h-10 text-sm font-medium rounded-md bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white shadow-md"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 mr-2" />
            {projectType === 'fullstack' ? 'Generate Full-Stack App' : 'Generate Website'}
          </>
        )}
      </Button>

      {/* Project Summary */}
      {prompt.trim() && (
        <Card className="bg-[#071022] border border-[#232336]">
          <CardContent className="pt-4 text-cyan-200">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-blue-400" />
              <span className="font-medium">Project Summary</span>
            </div>
            <div className="space-y-2 text-sm text-slate-300">
              <p><strong>Type:</strong> {
                projectType === 'frontend' ? 'Frontend Application' :
                  projectType === 'backend' ? 'Backend Application' :
                    'Full-Stack Application'
              }</p>
              {projectType === 'frontend' ? (
                <p><strong>Framework:</strong> {frontendOptions.find(f => f.value === frontendFramework)?.label}</p>
              ) : projectType === 'backend' ? (
                <p><strong>Framework:</strong> {backendOptions.find(f => f.value === backendFramework)?.label}</p>
              ) : (
                <>
                  <p><strong>Frontend:</strong> {frontendOptions.find(f => f.value === frontendFramework)?.label}</p>
                  <p><strong>Backend:</strong> {backendOptions.find(f => f.value === backendFramework)?.label}</p>
                  <p><strong>Database:</strong> {databaseOptions.find(d => d.value === databaseType)?.label}</p>
                </>
              )}
              <p><strong>AI Model:</strong> {AI_MODELS.find(m => m.value === aiModel)?.label}</p>
              {selectedImage && <p><strong>Image:</strong> Attached for analysis</p>}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};