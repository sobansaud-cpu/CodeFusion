import React from 'react';
import Link from 'next/link';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Features — What CodeFusion AI Builds for You
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
            A powerful AI website builder that generates complete, production-ready websites across
            frontend frameworks, backend stacks and databases — with clear plan limits and pro-only
            capabilities.
          </p>
        </header>

        <main className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: summary & limits */}
          <section className="lg:col-span-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Summary</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">
              CodeFusion AI auto-generates websites using a curated set of frontend frameworks,
              backend frameworks and databases. Each generated website can include a full stack
              (frontend + backend + database) using any supported combination.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Front-end</span>
                <span className="text-sm text-gray-500">8 frameworks</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Back-end</span>
                <span className="text-sm text-gray-500">15 frameworks</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Databases</span>
                <span className="text-sm text-gray-500">8 databases</span>
              </div>

              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 border rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  Total supported languages/stacks per generated website: <strong>31</strong>
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Generation limits</h3>
                <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <li>
                    <strong>Free plan:</strong> 3 generations per day. Access to a core set of
                    popular languages and frameworks (see lists below).
                  </li>
                  <li>
                    <strong>Pro / Premium:</strong> 20 generations per day and the ability to
                    generate full websites across 30+ languages and stacks with advanced features.
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <Link href="/pricing" className="inline-block w-full text-center px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-95">
                  Compare Plans
                </Link>
              </div>
            </div>
          </section>

          {/* Middle column: Supported languages */}
          <section className="lg:col-span-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Supported Frontend Frameworks (8)</h2>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">We generate responsive, accessible UI using modern frontend tools.</p>

            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li className="text-sm text-gray-700 dark:text-gray-200">• React.js</li>
              <li className="text-sm text-gray-700 dark:text-gray-200">• Next.js</li>
              <li className="text-sm text-gray-700 dark:text-gray-200">• Vue.js</li>
              <li className="text-sm text-gray-700 dark:text-gray-200">• Gatsby</li>
              <li className="text-sm text-gray-700 dark:text-gray-200">• Svelte</li>
              <li className="text-sm text-gray-700 dark:text-gray-200">• Nuxt.js</li>
              <li className="text-sm text-gray-700 dark:text-gray-200">• Plain HTML/CSS/JS</li>
              <li className="text-sm text-gray-700 dark:text-gray-200">• Angular</li>
            </ul>

            <div className="mt-6 border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Supported Databases (8)</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Choose the right persistence for your project.</p>
              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-200">
                <li>• MongoDB</li>
                <li>• Redis</li>
                <li>• MySQL</li>
                <li>• PostgreSQL</li>
                <li>• Oracle</li>
                <li>• CouchDB</li>
                <li>• SQLite</li>
                <li>• SQL Server</li>
              </ul>
            </div>
          </section>

          {/* Right column: Backends and features */}
          <section className="lg:col-span-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Supported Backend Frameworks (15)</h2>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">From lightweight microservices to enterprise-grade APIs.</p>

            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-200">
              <li>• Node.js (Express)</li>
              <li>• Node.js (NestJS)</li>
              <li>• Python (Django)</li>
              <li>• Python (Flask)</li>
              <li>• Python (FastAPI)</li>
              <li>• PHP (Laravel)</li>
              <li>• PHP (CodeIgniter)</li>
              <li>• Ruby (Rails)</li>
              <li>• Ruby (Sinatra)</li>
              <li>• Java (Spring Boot)</li>
              <li>• C# (.NET Core)</li>
              <li>• Go (Gin)</li>
              <li>• Go (Echo)</li>
              <li>• Rust (Actix)</li>
              <li>• Rust (Rocket)</li>
            </ul>

            <div className="mt-6 border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Key product features</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                <li>• Full project generation: frontend, backend, and database wiring in a single run.</li>
                <li>• Responsive, accessible UI built with modern best practices.</li>
                <li>• Clean, maintainable project structure with setup and deployment guides.</li>
                <li>• Code preview, download (ZIP), and GitHub push integrations.</li>
                <li>• Optional image-based prompt enhancement (analyze an image and include it in the generated UI).</li>
                <li>• Environment-aware templates (Vercel, Netlify, Docker-ready, CI hints).</li>
                <li>• API endpoints scaffolded with authentication and sample tests.</li>
                <li>• Feature flags and advanced options for Pro users (more models, custom API keys).</li>
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">How generation works</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Provide a detailed prompt describing the website, pick the desired stack, and CodeFusion AI will generate a ready-to-run project. Free users get a curated subset of stacks to try; Pro users unlock the full range and higher daily generation limits.
              </p>
            </div>
          </section>
        </main>

        {/* Full-width features section */}
        <section className="mt-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Complete Feature List</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">A concise, professional list of everything CodeFusion AI provides.</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-200">
              <li>• Production-ready project scaffolding for frontend, backend and database.</li>
              <li>• Component-based UI with responsive layouts and accessibility baked in.</li>
              <li>• SSR and SSG-ready templates for frameworks that support them.</li>
              <li>• Serverless-ready API scaffolds and Docker support for container deployments.</li>
              <li>• Authentication templates and example user flows.</li>
              <li>• Database migrations and seed examples for supported databases.</li>
              <li>• CI/CD recommendations and sample configuration snippets.</li>
              <li>• Inline documentation and setup instructions inside the generated repo.</li>
            </ul>

            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-200">
              <li>• GitHub integration to push generated projects directly to a repository.</li>
              <li>• ZIP download for quick local testing and inspection.</li>
              <li>• Model selection and advanced options for Pro users (custom API keys, larger models).</li>
              <li>• Image-aware generation: attach an image and the AI will produce UI elements inspired by it.</li>
              <li>• Reasonable defaults and opinionated patterns to make projects maintainable.</li>
              <li>• Lightweight telemetry to improve templates (opt-out available).</li>
              <li>• Priority support and onboarding for Pro customers.</li>
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Try it</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Go to the builder and describe your project; pick a stack and generate a website in minutes.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/builder" className="px-4 py-2 rounded-md bg-gradient-to-r from-green-500 to-blue-600 text-white text-sm">
                Open Builder
              </Link>
              <Link href="/pricing" className="px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-200">
                View Pricing
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
