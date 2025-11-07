"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
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
  LogOut,
  ChevronLeft,
  Code,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "text" | "image" | "generated-image" | "code";
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

  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editingConversationId, setEditingConversationId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (conversations.length === 0) {
      createNewConversation();
    }
  }, []);

  useEffect(() => {
    if (currentConversationId) {
      const conversation = conversations.find((c) => c.id === currentConversationId);
      if (conversation) setMessages(conversation.messages);
    }
  }, [currentConversationId, conversations]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (editingConversationId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingConversationId]);

  const generateConversationTitle = (firstMessage: string): string => {
    const words = firstMessage.split(" ").slice(0, 6);
    return words.join(" ") + (firstMessage.split(" ").length > 6 ? "..." : "");
  };

  // Responsive toggle for sidebar in small screens will be controlled by sidebarOpen state
  // Layout adjustments will use Tailwind CSS flex-col on mobile and flex-row on medium+ screens

  // Create new conversation with welcome message
  const createNewConversation = () => {
    const welcomeMessage: Message = {
      id: "1",
      role: "assistant",
      content:
        "👋 Hey! I'm **CodeFusion AI**, your smart coding assistant. I can help you with:\n\n🚀 **Code Generation** – Build websites, apps & APIs\n🔍 **Code Review** – Analyze and improve your code\n🐛 **Debugging** – Find and fix errors\n📚 **Learning** – Explain concepts & best practices\n🖼️ **Image Analysis** – Understand and work with visuals\n🎨 **Image Generation** – Create unique designs for your projects\n\n✨ Fact: I was proudly created by **Muhammad Soban Saud**, Founder of CodeFusion.AI.",
      timestamp: new Date(),
      type: "text",
    };

    const newConversation: ChatConversation = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [welcomeMessage],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setConversations((prev) => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
    setMessages([welcomeMessage]);
  };

  const deleteConversation = (conversationId: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== conversationId));
    if (currentConversationId === conversationId) {
      const remaining = conversations.filter((c) => c.id !== conversationId);
      if (remaining.length > 0) setCurrentConversationId(remaining[0].id);
      else createNewConversation();
    }
  };

  const updateConversationTitle = (conversationId: string, newTitle: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId ? { ...c, title: newTitle, updatedAt: new Date() } : c
      )
    );
    setEditingConversationId(null);
    setEditingTitle("");
  };

  const updateConversationMessages = (conversationId: string, newMessages: Message[]) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId ? { ...c, messages: newMessages, updatedAt: new Date() } : c
      )
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size must be less than 10MB");
        return;
      }
      setSelectedImage(file);
      toast.success("Image selected. Add your message and send!");
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() && !selectedImage) return;
    if (!user) {
      toast.error("Please sign in to use the chat feature");
      return;
    }

    if (!currentConversationId) {
      createNewConversation();
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim() || "Analyze this image",
      timestamp: new Date(),
      type: selectedImage ? "image" : "text",
      imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    if (messages.length === 1 && messages[0].role === "assistant") {
      const title = generateConversationTitle(userMessage.content);
      updateConversationTitle(currentConversationId, title);
    }

    setInput("");
    setIsLoading(true);

    try {
      let response;

      if (selectedImage) {
        const reader = new FileReader();
        const imageBase64 = await new Promise<string>((resolve) => {
          reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(",")[1];
            resolve(base64);
          };
          reader.readAsDataURL(selectedImage);
        });

        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/image`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: input.trim() || "Analyze this image",
            userId: user.uid,
            imageData: imageBase64,
            conversationId: currentConversationId,
          }),
        });
      } else {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: input.trim(),
            userId: user.uid,
            conversationId: currentConversationId,
          }),
        });
      }

      if (!response.ok) throw new Error("Failed to get AI response");

      const data = await response.json();

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
        type: data.intent === "image_generation" ? "generated-image" : "text",
        imageUrl: data.imageUrl,
        isImageGeneration: data.intent === "image_generation",
      };

      const finalMessages = [...newMessages, aiResponse];
      setMessages(finalMessages);
      updateConversationMessages(currentConversationId, finalMessages);

      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Failed to get AI response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const formatMessage = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(
        /`(.*?)`/g,
        '<code class="bg-gray-600 px-1 py-0.5 rounded text-sm">$1</code>'
      );
  };

  const detectCodeBlocks = (content: string) => {
    const codeBlockRegex = /``````/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          content: content.slice(lastIndex, match.index),
        });
      }
      parts.push({
        type: "code",
        language: "javascript",
        content: match[1].trim(),
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({
        type: "text",
        content: content.slice(lastIndex),
      });
    }

    return parts.length > 0 ? parts : [{ type: "text", content }];
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <Bot className="w-16 h-16 mx-auto mb-4 text-blue-400" />
          <h2 className="text-2xl font-bold text-white mb-2">Sign in to continue</h2>
          <p className="text-gray-400">Please sign in to use Ask CodeFusion</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] bg-gradient-to-br from-[#0a0a13] via-[#181825] to-[#0a0a13] text-gray-100 flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? (typeof window !== 'undefined' && window.innerWidth < 768 ? '80vw' : 260) : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed md:relative top-0 left-0 h-full bg-gradient-to-b from-[#181825] to-[#0a0a13] border-r border-[#232336] flex flex-col overflow-hidden shrink-0 z-40 md:w-64 shadow-xl"
        style={{ minWidth: sidebarOpen ? (typeof window !== 'undefined' && window.innerWidth < 768 ? '80vw' : 260) : 0, maxWidth: 320 }}
      >
        <div className="p-4 border-b border-[#232336]">
          <Button
            onClick={createNewConversation}
            className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-500 text-white border-0 rounded-xl shadow-md"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 min-w-[180px] max-w-xs md:max-w-none">
          <AnimatePresence>
            {conversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`group relative mb-2 rounded-xl p-3 cursor-pointer transition-all duration-200 hover:bg-[#232336] ${
                  currentConversationId === conversation.id ? "bg-[#232336] border border-purple-600/30" : "border border-transparent"
                }`}
                onClick={() => {
                  setCurrentConversationId(conversation.id);
                  if(typeof window !== 'undefined' && window.innerWidth < 768) setSidebarOpen(false);
                }}
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
                        if (e.key === "Enter") {
                          updateConversationTitle(conversation.id, editingTitle);
                        } else if (e.key === "Escape") {
                          setEditingConversationId(null);
                          setEditingTitle("");
                        }
                      }}
                      className="bg-gray-700 border-gray-600 text-white text-sm h-6 px-2"
                    />
                  ) : (
                    <span className="text-sm text-gray-300 truncate flex-1">{conversation.title}</span>
                  )}
                </div>

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
                    aria-label="Edit conversation title"
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
                    aria-label="Delete conversation"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="p-4 border-t border-[#232336] flex-shrink-0">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 rounded-full flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-100 truncate">{user?.displayName || user?.email || "User"}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="text-gray-400 hover:text-purple-400 h-8 w-8 p-0 shrink-0"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#181825] to-[#232336] backdrop-blur-xl border-b border-[#232336] p-3 sm:p-4 flex items-center justify-between flex-shrink-0 sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white transition-colors duration-200 -ml-2 md:hidden"
              aria-label="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 rounded-lg flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent select-none">
                Ask CodeFusion
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-2 min-w-max">
            <div className="flex items-center space-x-1 text-xs text-gray-400 select-none">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Online</span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 md:py-6 scrollbar-thin scrollbar-thumb-purple-600/50 hover:scrollbar-thumb-purple-500 scrollbar-track-transparent">
          <div className="w-full max-w-3xl mx-auto flex flex-col space-y-4 md:space-y-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-end gap-2 sm:gap-4 w-full max-w-[90%] sm:max-w-[85%] md:max-w-[70%] ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-purple-600 to-cyan-600"
                          : "bg-gradient-to-r from-indigo-600 to-cyan-600"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div
                        className={`rounded-2xl p-3 sm:p-4 break-words ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-purple-700 via-indigo-700 to-cyan-700 text-white max-w-full border border-purple-700/30 shadow-md"
                            : "bg-[#181825]/80 backdrop-blur-md text-gray-100 border border-[#232336] shadow"
                        }`}
                      >
                        {message.imageUrl && (
                          <div className="mb-3">
                            <img
                              src={message.imageUrl}
                              alt={message.isImageGeneration ? "Generated Image" : "Uploaded"}
                              className="max-w-full h-auto rounded-lg border border-gray-600"
                              style={{ maxHeight: "300px" }}
                            />
                            {message.isImageGeneration && (
                              <div className="mt-2 flex items-center space-x-2 text-xs text-purple-300 select-none">
                                <Sparkles className="w-3 h-3" />
                                <span>AI Generated Image</span>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="space-y-3">
                          {detectCodeBlocks(message.content).map((part, index) => (
                            <div key={index}>
                              {part.type === "code" ? (
                                <div className="relative">
                                  <div className="flex items-center justify-between bg-gray-900 px-4 py-2 rounded-t-lg border-b border-gray-700 select-text">
                                    <div className="flex items-center space-x-2">
                                      <Code className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm text-gray-400 capitalize select-text">
                                        {part.language}
                                      </span>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => copyToClipboard(part.content)}
                                      className="text-gray-400 hover:text-white h-6 px-2"
                                      aria-label="Copy code"
                                    >
                                      <Copy className="w-3 h-3" />
                                    </Button>
                                  </div>
                                  <SyntaxHighlighter
                                    language={part.language}
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: "0 0 0.5rem 0.5rem",
                                      fontSize: "0.875rem",
                                    }}
                                  >
                                    {part.content}
                                  </SyntaxHighlighter>
                                </div>
                              ) : (
                                <div
                                  className="prose prose-invert max-w-none break-words"
                                  dangerouslySetInnerHTML={{ __html: formatMessage(part.content) }}
                                />
                              )}
                            </div>
                          ))}
                        </div>

                        {message.role === "assistant" && (
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

            {isLoading && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="justify-end flex">
                <div className="flex space-x-4 max-w-[85%] md:max-w-[70%]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                    <span className="text-gray-300 text-sm select-none">CodeFusion is thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-gradient-to-r from-[#181825] to-[#232336] backdrop-blur-xl border-t border-[#232336] p-3 sm:p-4 flex-shrink-0 sticky bottom-0">
          <div className="max-w-3xl mx-auto">
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm flex items-center justify-between"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
                    <ImageIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 overflow-hidden">
                    <p className="text-sm font-medium text-white truncate">{selectedImage.name}</p>
                    <p className="text-xs text-gray-400">
                      {(selectedImage.size / 1024 / 1024).toFixed(1)} MB • Ready to analyze
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-400 hover:text-white h-8 w-8 p-0 shrink-0"
                  aria-label="Remove selected image"
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            )}

            <div className="relative flex items-end gap-2 sm:gap-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message CodeFusion AI..."
                className="min-h-[50px] max-h-[200px] bg-[#181825]/80 border border-[#232336] text-gray-100 placeholder-gray-400 resize-none rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 pr-12 backdrop-blur-xl focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 flex-1 text-sm sm:text-base shadow"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
                aria-label="Chat input"
              />
              <div className="absolute right-12 bottom-2 flex items-center gap-3">
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
                  className="text-cyan-400 hover:text-white h-10 w-10 p-0"
                  aria-label="Upload image"
                >
                  <ImageIcon className="w-6 h-6" />
                </Button>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || (!input.trim() && !selectedImage)}
                className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-500 text-white border-0 h-12 w-12 rounded-2xl shadow-lg flex items-center justify-center"
                aria-label="Send message"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-4">
                <span>💡 Try: "Generate an image of..."</span>
                <span>🔧 Or: "Create a React component"</span>
              </div>
              <div>Press Enter to send • Shift+Enter for new line</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
