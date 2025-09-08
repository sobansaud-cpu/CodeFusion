'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';

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
      description: 'Send us an email anytime',
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone',
      content: '+92 329 9274846',
      description: '',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Residence',
      content: 'Karachi, Pakistan',
      description: 'Located in the heart of the city',
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'Live Chat',
      content: 'Available 24/7',
      description: 'Chat with our support team',
    },
  ];

const faqs = [
  {
    question: 'How does CodeFusion AI work?',
    answer:
      'Just describe your idea in plain English, and our AI instantly generates a complete, functional, and responsive website with clean code.',
  },
  {
    question: 'What technologies does it support?',
    answer:
      'CodeFusion AI supports 30+ programming languages and frameworks including HTML, CSS, JavaScript, React, Next.js, Vue.js, Angular, Python, Django, Flask, Node.js, and many more.',
  },
  {
    question: 'Can I customize the generated code?',
    answer:
      'Yes! You get full access to the source code. You can edit, modify, and extend it however you like with no restrictions.',
  },
  {
    question: 'Is there a free trial available?',
    answer:
      'Yes, you can explore CodeFusion AI for free with limited features. Upgrade anytime to unlock the full power of automation.',
  },
  {
    question: 'Will I be able to preview and deploy my projects?',
    answer:
      'Currently, you can generate and edit projects, but live preview and one-click deploy options are coming very soon in future updates.',
  },
  {
    question: 'Does CodeFusion AI integrate with GitHub?',
    answer:
      'Absolutely! You can export your projects directly to GitHub for version control, collaboration, or deployment.',
  },
];


  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have questions about CodeFusion AI? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-green-500 text-6xl mb-4">✓</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={submitHandler} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-gray-300">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-blue-500 mt-1">{info.icon}</div>
                    <div>
                      <h3 className="text-white font-semibold">{info.title}</h3>
                      <p className="text-blue-400">{info.content}</p>
                      <p className="text-gray-400 text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
