import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Square, Terminal, Copy, Download } from 'lucide-react';
import { toast } from 'sonner';

interface TerminalRunnerProps {
  files: Array<{
    path: string;
    content: string;
  }>;
  framework: string;
  projectId: string;
}

const FRAMEWORK_COMMANDS = {
  'nodejs-express': {
    install: 'npm install',
    start: 'npm start',
    dev: 'npm run dev',
    description: 'Node.js Express Server'
  },
  'nodejs-nestjs': {
    install: 'npm install',
    start: 'npm run start',
    dev: 'npm run start:dev',
    description: 'NestJS Application'
  },
  'python-django': {
    install: 'pip install -r requirements.txt',
    start: 'python manage.py runserver',
    dev: 'python manage.py runserver',
    description: 'Django Web Application'
  },
  'python-flask': {
    install: 'pip install -r requirements.txt',
    start: 'python app.py',
    dev: 'flask run --debug',
    description: 'Flask Web Application'
  },
  'python-fastapi': {
    install: 'pip install -r requirements.txt',
    start: 'uvicorn main:app --reload',
    dev: 'uvicorn main:app --reload --host 0.0.0.0 --port 8000',
    description: 'FastAPI Application'
  },
  'php-laravel': {
    install: 'composer install',
    start: 'php artisan serve',
    dev: 'php artisan serve --host=0.0.0.0 --port=8000',
    description: 'Laravel Application'
  },
  'php-codeigniter': {
    install: 'composer install',
    start: 'php -S localhost:8000',
    dev: 'php -S localhost:8000',
    description: 'CodeIgniter Application'
  },
  'ruby-rails': {
    install: 'bundle install',
    start: 'rails server',
    dev: 'rails server -b 0.0.0.0 -p 3000',
    description: 'Ruby on Rails Application'
  },
  'ruby-sinatra': {
    install: 'bundle install',
    start: 'ruby app.rb',
    dev: 'ruby app.rb',
    description: 'Sinatra Application'
  },
  'java-spring': {
    install: 'mvn clean install',
    start: 'mvn spring-boot:run',
    dev: 'mvn spring-boot:run -Dspring-boot.run.profiles=dev',
    description: 'Spring Boot Application'
  },
  'csharp-dotnet': {
    install: 'dotnet restore',
    start: 'dotnet run',
    dev: 'dotnet watch run',
    description: '.NET Core Application'
  },
  'go-gin': {
    install: 'go mod tidy',
    start: 'go run main.go',
    dev: 'go run main.go',
    description: 'Go Gin Application'
  },
  'go-echo': {
    install: 'go mod tidy',
    start: 'go run main.go',
    dev: 'go run main.go',
    description: 'Go Echo Application'
  },
  'rust-actix': {
    install: 'cargo build',
    start: 'cargo run',
    dev: 'cargo watch -x run',
    description: 'Rust Actix Application'
  },
  'rust-rocket': {
    install: 'cargo build',
    start: 'cargo run',
    dev: 'cargo watch -x run',
    description: 'Rust Rocket Application'
  }
};

export const TerminalRunner: React.FC<TerminalRunnerProps> = ({ files, framework, projectId }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState<string>('');
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = FRAMEWORK_COMMANDS[framework as keyof typeof FRAMEWORK_COMMANDS];

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const addOutput = (text: string, type: 'command' | 'output' | 'error' = 'output') => {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = type === 'command' ? '$ ' : type === 'error' ? '❌ ' : '  ';
    setOutput(prev => [...prev, `[${timestamp}] ${prefix}${text}`]);
  };

  const runCommand = async (command: string) => {
    if (isRunning) {
      toast.error('A command is already running');
      return;
    }

    setIsRunning(true);
    setCurrentCommand(command);
    addOutput(command, 'command');

    try {
      // Simulate command execution
      addOutput('Starting command execution...', 'output');
      
      // In a real implementation, this would connect to a backend service
      // that can execute commands in a sandboxed environment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (command.includes('install')) {
        addOutput('Installing dependencies...', 'output');
        await new Promise(resolve => setTimeout(resolve, 3000));
        addOutput('Dependencies installed successfully!', 'output');
      } else if (command.includes('start') || command.includes('run')) {
        addOutput(`Starting ${commands?.description || 'application'}...`, 'output');
        await new Promise(resolve => setTimeout(resolve, 2000));
        addOutput('Server started successfully!', 'output');
        addOutput('Application is running on http://localhost:8000', 'output');
        addOutput('Press Ctrl+C to stop the server', 'output');
      }
    } catch (error) {
      addOutput(`Error: ${error}`, 'error');
    } finally {
      setIsRunning(false);
      setCurrentCommand('');
    }
  };

  const stopCommand = () => {
    setIsRunning(false);
    setCurrentCommand('');
    addOutput('Command stopped by user', 'output');
  };

  const clearOutput = () => {
    setOutput([]);
  };

  const copyOutput = () => {
    const outputText = output.join('\n');
    navigator.clipboard.writeText(outputText);
    toast.success('Terminal output copied to clipboard');
  };

  const downloadProject = () => {
    // Create a simple download of the project files
    const projectData = {
      projectId,
      framework,
      files: files.map(file => ({
        path: file.path,
        content: file.content
      }))
    };
    
    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectId}-project.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Project files downloaded');
  };

  if (!commands) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Terminal Runner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Terminal execution not available for framework: {framework}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="h-5 w-5" />
          Terminal Runner - {commands.description}
        </CardTitle>
        <div className="flex gap-2 flex-wrap">
          <Button
            size="sm"
            onClick={() => runCommand(commands.install)}
            disabled={isRunning}
            variant="outline"
          >
            <Play className="h-4 w-4 mr-1" />
            Install Dependencies
          </Button>
          <Button
            size="sm"
            onClick={() => runCommand(commands.dev)}
            disabled={isRunning}
            variant="outline"
          >
            <Play className="h-4 w-4 mr-1" />
            Start Development
          </Button>
          <Button
            size="sm"
            onClick={() => runCommand(commands.start)}
            disabled={isRunning}
            variant="outline"
          >
            <Play className="h-4 w-4 mr-1" />
            Start Production
          </Button>
          {isRunning && (
            <Button
              size="sm"
              onClick={stopCommand}
              variant="destructive"
            >
              <Square className="h-4 w-4 mr-1" />
              Stop
            </Button>
          )}
          <Button
            size="sm"
            onClick={clearOutput}
            variant="ghost"
          >
            Clear
          </Button>
          <Button
            size="sm"
            onClick={copyOutput}
            variant="ghost"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
          <Button
            size="sm"
            onClick={downloadProject}
            variant="ghost"
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div
          ref={terminalRef}
          className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-96 overflow-y-auto"
        >
          {output.length === 0 ? (
            <div className="text-gray-500">
              Terminal ready. Click a command button to start.
            </div>
          ) : (
            output.map((line, index) => (
              <div key={index} className="whitespace-pre-wrap">
                {line}
              </div>
            ))
          )}
          {isRunning && (
            <div className="flex items-center gap-2 mt-2">
              <div className="animate-spin h-4 w-4 border-2 border-green-400 border-t-transparent rounded-full"></div>
              <span>Running: {currentCommand}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
