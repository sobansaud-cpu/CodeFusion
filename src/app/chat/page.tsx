'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Send,
  Bot,
  User,
  Image as ImageIcon,
  Loader2,
  Sparkles,
  Copy,
  Plus,
  MessageSquare,
  Menu,
  X,
  Trash2,
  Edit3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Code,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'image' | 'generated-image' | 'code';
  imageUrl?: string;
  isImageGeneration?: boolean;
  codeLanguage?: string;
}

interface ChatConversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export default function ChatPage() {
  const { user, signOut } = useAuth();

  // Chat state
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editingConversationId, setEditingConversationId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (conversations.length === 0) {
      createNewConversation();
    }
  }, []);

  // Load conversation messages when switching
  useEffect(() => {
    if (currentConversationId) {
      const conversation = conversations.find(c => c.id === currentConversationId);
      if (conversation) {
        setMessages(conversation.messages);
      }
    }
  }, [currentConversationId, conversations]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus edit input when editing starts
  useEffect(() => {
    if (editingConversationId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingConversationId]);

  // Helper functions
  const generateConversationTitle = (firstMessage: string): string => {
    const words = firstMessage.split(' ').slice(0, 6);
    return words.join(' ') + (firstMessage.split(' ').length > 6 ? '...' : '');
  };

  const createNewConversation = () => {
    const welcomeMessage: Message = {
      id: '1',
      role: 'assistant',
      content: "👋 Hey! I'm **CodeFusion AI**, your smart coding assistant. I can help you with:\n\n🚀 **Code Generation** – Build websites, apps & APIs\n🔍 **Code Review** – Analyze and improve your code\n🐛 **Debugging** – Find and fix errors\n📚 **Learning** – Explain concepts & best practices\n🖼️ **Image Analysis** – Understand and work with visuals\n🎨 **Image Generation** – Create unique designs for your projects\n\n✨ Fact: I was proudly created by **Muhammad Soban Saud**, Founder of CodeFusion.AI.",
      timestamp: new Date(),
      type: 'text'
    };

    const newConversation: ChatConversation = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [welcomeMessage],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
    setMessages([welcomeMessage]);
  };

  const deleteConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(c => c.id !== conversationId));
    if (currentConversationId === conversationId) {
      const remaining = conversations.filter(c => c.id !== conversationId);
      if (remaining.length > 0) {
        setCurrentConversationId(remaining[0].id);
      } else {
        createNewConversation();
      }
    }
  };

  const updateConversationTitle = (conversationId: string, newTitle: string) => {
    setConversations(prev => prev.map(c =>
      c.id === conversationId
        ? { ...c, title: newTitle, updatedAt: new Date() }
        : c
    ));
    setEditingConversationId(null);
    setEditingTitle('');
  };

  const updateConversationMessages = (conversationId: string, newMessages: Message[]) => {
    setConversations(prev => prev.map(c =>
      c.id === conversationId
        ? { ...c, messages: newMessages, updatedAt: new Date() }
        : c
    ));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('Image size must be less than 10MB');
        return;
      }
      setSelectedImage(file);
      toast.success('Image selected. Add your message and send!');
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() && !selectedImage) return;
    if (!user) {
      toast.error('Please sign in to use the chat feature');
      return;
    }

    if (!currentConversationId) {
      createNewConversation();
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim() || 'Analyze this image',
      timestamp: new Date(),
      type: selectedImage ? 'image' : 'text',
      imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : undefined
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    // Update conversation title if it's the first user message
    if (messages.length === 1 && messages[0].role === 'assistant') {
      const title = generateConversationTitle(userMessage.content);
      updateConversationTitle(currentConversationId, title);
    }

    setInput('');
    setIsLoading(true);

    try {
      let response;

      if (selectedImage) {
        // Convert image to base64
        const reader = new FileReader();
        const imageBase64 = await new Promise<string>((resolve) => {
          reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(',')[1];
            resolve(base64);
          };
          reader.readAsDataURL(selectedImage);
        });

        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: input.trim() || 'Analyze this image',
            userId: user.uid,
            imageData: imageBase64,
            conversationId: currentConversationId
          }),
        });
      } else {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: input.trim(),
            userId: user.uid,
            conversationId: currentConversationId
          }),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        type: data.intent === 'image_generation' ? 'generated-image' : 'text',
        imageUrl: data.imageUrl,
        isImageGeneration: data.intent === 'image_generation'
      };

      const finalMessages = [...newMessages, aiResponse];
      setMessages(finalMessages);
      updateConversationMessages(currentConversationId, finalMessages);

      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Failed to get AI response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-600 px-1 py-0.5 rounded text-sm">$1</code>');
  };

  const detectCodeBlocks = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index)
        });
      }

      // Add code block
      parts.push({
        type: 'code',
        language: match[1] || 'javascript',
        content: match[2].trim()
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex)
      });
    }

    return parts.length > 0 ? parts : [{ type: 'text', content }];
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Bot className="w-16 h-16 mx-auto mb-4 text-blue-400" />
          <h2 className="text-2xl font-bold text-white mb-2">Sign in to continue</h2>
          <p className="text-gray-400">Please sign in to use Ask CodeFusion</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-900 text-white flex overflow-hidden">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-gray-950 border-r border-gray-800 flex flex-col overflow-hidden"
      >
        <div className="p-4 border-b border-gray-800">
          <Button
            onClick={createNewConversation}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-2">
          <AnimatePresence>
            {conversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`group relative mb-2 rounded-lg p-3 cursor-pointer transition-all hover:bg-gray-800 ${
                  currentConversationId === conversation.id ? 'bg-gray-800' : ''
                }`}
                onClick={() => setCurrentConversationId(conversation.id)}
              >
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  {editingConversationId === conversation.id ? (
                    <Input
                      ref={editInputRef}
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onBlur={() => updateConversationTitle(conversation.id, editingTitle)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          updateConversationTitle(conversation.id, editingTitle);
                        } else if (e.key === 'Escape') {
                          setEditingConversationId(null);
                          setEditingTitle('');
                        }
                      }}
                      className="bg-gray-700 border-gray-600 text-white text-sm h-6 px-2"
                    />
                  ) : (
                    <span className="text-sm text-gray-300 truncate flex-1">
                      {conversation.title}
                    </span>
                  )}
                </div>

                {/* Conversation Actions */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingConversationId(conversation.id);
                      setEditingTitle(conversation.title);
                    }}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                  >
                    <Edit3 className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conversation.id);
                    }}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.displayName || user?.email || 'User'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="text-gray-400 hover:text-white h-8 w-8 p-0"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white"
            >
              {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ask CodeFusion
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Online</span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mb-6 ${message.role === 'user' ? 'ml-12' : 'mr-12'}`}
                >
                  <div className={`flex space-x-4 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>

                    {/* Message Content */}
                    <div className="flex-1 min-w-0">
                      <div className={`rounded-2xl p-4 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white ml-auto max-w-[80%]'
                          : 'bg-gray-800/50 backdrop-blur-sm text-gray-100 border border-gray-700/50'
                      }`}>
                        {message.imageUrl && (
                          <div className="mb-3">
                            <img
                              src={message.imageUrl}
                              alt={message.isImageGeneration ? "Generated Image" : "Uploaded"}
                              className="max-w-full h-auto rounded-lg border border-gray-600"
                              style={{ maxHeight: '300px' }}
                            />
                            {message.isImageGeneration && (
                              <div className="mt-2 flex items-center space-x-2 text-xs text-purple-300">
                                <Sparkles className="w-3 h-3" />
                                <span>AI Generated Image</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Render message content with code blocks */}
                        <div className="space-y-3">
                          {detectCodeBlocks(message.content).map((part, index) => (
                            <div key={index}>
                              {part.type === 'code' ? (
                                <div className="relative">
                                  <div className="flex items-center justify-between bg-gray-900 px-4 py-2 rounded-t-lg border-b border-gray-700">
                                    <div className="flex items-center space-x-2">
                                      <Code className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm text-gray-400 capitalize">{part.language}</span>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => copyToClipboard(part.content)}
                                      className="text-gray-400 hover:text-white h-6 px-2"
                                    >
                                      <Copy className="w-3 h-3" />
                                    </Button>
                                  </div>
                                  <SyntaxHighlighter
                                    language={part.language}
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: '0 0 0.5rem 0.5rem',
                                      fontSize: '0.875rem'
                                    }}
                                  >
                                    {part.content}
                                  </SyntaxHighlighter>
                                </div>
                              ) : (
                                <div
                                  className="prose prose-invert max-w-none"
                                  dangerouslySetInnerHTML={{ __html: formatMessage(part.content) }}
                                />
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Message Actions */}
                        {message.role === 'assistant' && (
                          <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-700/50">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(message.content)}
                              className="text-gray-400 hover:text-white h-6 px-2 text-xs"
                            >
                              <Copy className="w-3 h-3 mr-1" />
                              Copy
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 mr-12"
              >
                <div className="flex space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-gray-300 text-sm">CodeFusion is thinking...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800 p-4">
          <div className="max-w-4xl mx-auto">
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{selectedImage.name}</p>
                      <p className="text-xs text-gray-400">
                        {(selectedImage.size / 1024 / 1024).toFixed(1)} MB • Ready to analyze
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedImage(null)}
                    className="text-gray-400 hover:text-white h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            <div className="relative">
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Message CodeFusion AI... (Try: 'Generate an image of a sunset' or 'Create a React component')"
                    className="min-h-[60px] max-h-[200px] bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 resize-none rounded-2xl px-4 py-3 pr-12 backdrop-blur-sm focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    disabled={isLoading}
                  />

                  {/* Input Actions */}
                  {/* <div className="absolute right-3 bottom-3 flex items-center space-x-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isLoading}
                      className="text-gray-400 hover:text-white h-8 w-8 p-0"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || (!input.trim() && !selectedImage)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 h-12 px-6 rounded-2xl shadow-lg"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div> */}

              <div className="absolute right-3 bottom-3 flex items-center space-x-2">
  {/* Hidden file input */}
  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="hidden"
  />

  {/* Image Upload Button */}
  <Button
    variant="ghost"
    size="sm"
    onClick={() => fileInputRef.current?.click()}
    disabled={isLoading}
    className="flex items-center justify-center text-gray-400 hover:text-white h-12 w-12 rounded-2xl shadow-lg bg-gray-800"
  >
    <ImageIcon className="w-5 h-5" />
  </Button>

  {/* Send Button */}
  <Button
    onClick={handleSendMessage}
    disabled={isLoading || (!input.trim() && !selectedImage)}
    className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 w-12 rounded-2xl shadow-lg"
  >
    {isLoading ? (
      <Loader2 className="w-5 h-5 animate-spin" />
    ) : (
      <Send className="w-5 h-5" />
    )}
  </Button>
</div>


              {/* Quick Tips */}
              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>💡 Try: "Generate an image of..."</span>
                  <span>🔧 Or: "Create a React component"</span>
                </div>
                <div>
                  Press Enter to send • Shift+Enter for new line
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
