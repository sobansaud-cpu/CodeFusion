
'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("access_key", "218de58b-9b19-41ec-b356-824d07903ff4");
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("subject", formData.subject);
    data.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const res = await response.json();
      if (res.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert("Submission failed. Try again.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      alert("There was an error submitting the form.");
    }

    setLoading(false);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      content: 'sobansaud3@gmail.com',
      description: '24/7 available',
      color: 'from-purple-400 to-purple-300'
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone',
      content: '+92 329 9274846',
      description: 'Mon-Fri 9AM-6PM',
      color: 'from-indigo-400 to-indigo-300'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Location',
      content: 'Karachi, Pakistan',
      description: 'Heart of innovation',
      color: 'from-cyan-400 to-cyan-300'
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'Live Chat',
      content: 'Available 24/7',
      description: 'Instant support',
      color: 'from-purple-400 to-cyan-400'
    },
  ];

  const faqs = [
    {
      question: 'How does CodeFusion AI work?',
      answer: 'Just describe your idea in plain English, and our AI instantly generates a complete, functional, and responsive website with clean code.',
    },
    {
      question: 'What technologies does it support?',
      answer: 'CodeFusion AI supports 30+ programming languages and frameworks including HTML, CSS, JavaScript, React, Next.js, Vue.js, Angular, Python, Django, Flask, Node.js, and many more.',
    },
    {
      question: 'Can I customize the generated code?',
      answer: 'Yes! You get full access to the source code. You can edit, modify, and extend it however you like with no restrictions.',
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes, you can explore CodeFusion AI for free with limited features. Upgrade anytime to unlock the full power of automation.',
    },
    {
      question: 'Will I be able to preview and deploy my projects?',
      answer: 'Yes! CodeFusion AI currently supports full project generation with one-click GitHub export. We are continuously enhancing our deployment pipelines to offer even more seamless integration with cloud providers.',
    },
    {
      question: 'Does CodeFusion AI integrate with GitHub?',
      answer: 'Absolutely! You can export your projects directly to GitHub for version control, collaboration, or deployment.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] 
                        bg-gradient-radial from-purple-600/20 via-transparent to-transparent blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px]
                        bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Have questions, feedback, or partnership ideas? We're here 24/7 to help you build the future.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="pb-8">
              <CardTitle className="text-3xl font-black bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-16">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle2 className="h-24 w-24 mx-auto mb-6 text-cyan-400" />
                  </motion.div>
                  <h3 className="text-3xl font-black text-white mb-3">Message Sent!</h3>
                  <p className="text-gray-300 text-lg">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={submitHandler} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-300 font-medium">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-2 bg-white/5 border border-white/10 text-white rounded-2xl focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all h-12"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300 font-medium">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-2 bg-white/5 border border-white/10 text-white rounded-2xl focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all h-12"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-gray-300 font-medium">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="mt-2 bg-white/5 border border-white/10 text-white rounded-2xl focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all h-12"
                      placeholder="Partnership / Feature Request / Support"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-gray-300 font-medium">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="mt-2 bg-white/5 border border-white/10 text-white rounded-2xl focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                      placeholder="Tell us everything..."
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-700 hover:via-indigo-700 hover:to-cyan-700 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 h-14"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-3" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
                >
                  <div className="flex items-start gap-5">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${info.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{info.title}</h3>
                      <p className="text-2xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        {info.content}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">{info.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-32">
          <h2 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-16 text-center tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-xl rounded-3xl hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 group"
              >
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                    {faq.question}
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-32 text-center">
          <div className="bg-gradient-to-r from-purple-600/10 to-cyan-600/10 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
            <h2 className="text-4xl font-black text-white mb-6">
              Ready to build something amazing?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join 15K+ developers who are already building the future with CodeFusion AI.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-700 hover:via-indigo-700 hover:to-cyan-700 text-white font-bold text-xl px-12 py-7 rounded-3xl shadow-2xl hover:shadow-purple-500/60 transition-all duration-300"
              onClick={() => window.location.href = '/builder'}
            >
              Start Building Free
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}