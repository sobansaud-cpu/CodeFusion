'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

type FeedbackItem = {
  id: string;
  userId?: string;
  email?: string;
  message: string;
  createdAt: string;
  status?: 'pending' | 'reviewed' | 'archived';
  adminResponse?: string;
};

export default function FeedbackPage() {
  const { user, loading } = useAuth();
  const [message, setMessage] = useState('');
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch('/api/feedback');
      const data = await res.json();
      if (data?.success) {
        // Filter out archived feedback for public view
        setFeedbacks((data.items || []).filter((f: FeedbackItem) => f.status !== 'archived'));
      }
    } catch (err) {
      console.error('Fetch feedbacks error', err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSubmit = async () => {
    if (!user) {
      alert('Please log in to submit feedback');
      return;
    }
    if (!message.trim()) {
      alert('Please enter your feedback');
      return;
    }

    try {
      setSubmitting(true);
      const token = await user.getIdToken();
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: message.trim() }),
      });
      const data = await res.json();
      if (data?.success) {
        setMessage('');
        await fetchFeedbacks();
      } else {
        alert(data?.error || 'Unable to send feedback');
      }
    } catch (err) {
      console.error('Submit feedback error', err);
      alert('Server error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-4">
            Community Feedback
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Help us improve CodeFusion by sharing your experience. Your feedback shapes our future!
          </p>
          <div className="flex items-center gap-4 mt-4">
            {user?.email && (
              <Link 
                href="/admin-login/feedback" 
                className="text-sm bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 px-4 py-2 rounded-full transition-all"
              >
                Manage Feedback
              </Link>
            )}
            <Link 
              href="/" 
              className="text-sm bg-gray-800/50 text-gray-400 hover:bg-gray-800 px-4 py-2 rounded-full transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-900/90 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Share Your Thoughts</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full rounded-xl bg-gray-800/50 p-4 text-white border border-gray-700/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                    placeholder="Your feedback matters! Share your experience, suggestions, or report any issues..."
                  />
                  <div className="text-xs text-gray-500 mt-2">
                    * All feedback is public and helps improve CodeFusion
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={handleSubmit}
                    disabled={submitting || loading || !message.trim()}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-8 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Submit Feedback'
                    )}
                  </button>

                  <div className="text-sm text-center sm:text-right text-gray-400">
                    {user ? (
                      <div className="flex items-center gap-2 justify-center sm:justify-end">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Posting as {user.email}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 justify-center sm:justify-end">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-yellow-500">Please log in to submit feedback</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Recent Feedback</h2>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {feedbacks.length === 0 ? (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8 text-center">
                  <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-gray-400 text-lg">No feedback yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                feedbacks.map((f) => (
                  <div
                    key={f.id}
                    className={`group bg-gray-900/50 backdrop-blur-sm border rounded-xl transition-all hover:border-gray-700/50 ${
                      f.status === 'reviewed'
                        ? 'border-green-800/30 shadow-lg shadow-green-900/10'
                        : 'border-gray-800/30'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-800 rounded-full p-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-300">
                              {f.email || 'Anonymous'}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(f.createdAt).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        {f.status === 'reviewed' && (
                          <span className="text-xs px-3 py-1 bg-green-900/20 text-green-400 rounded-full border border-green-800/30">
                            Reviewed
                          </span>
                        )}
                      </div>
                      <div className="text-gray-200 whitespace-pre-wrap">{f.message}</div>
                      {f.adminResponse && (
                        <div className="mt-4 pl-4 border-l-2 border-blue-500/30">
                          <div className="flex items-center gap-2 mb-2">
                            <img src="/CODEFUSION.png" alt="CodeFusion AI" className="w-5 h-5 rounded-full" />
                            <div className="text-sm text-blue-400 font-medium">CodeFusion.AI</div>
                          </div>
                          <div className="text-gray-400 text-sm">{f.adminResponse}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </div>
  );
}
