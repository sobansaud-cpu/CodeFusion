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

export default function AdminFeedbackPage() {
  const { user, loading } = useAuth();
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [response, setResponse] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed' | 'archived'>('all');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Check for admin authentication
    const adminAuth = document.cookie.includes('adminAuth=true');
    if (!adminAuth) {
      window.location.href = '/admin-login/feedback';
      return;
    }
    if (!user) return;
    fetchFeedbacks();
  }, [user]);

  const fetchFeedbacks = async () => {
    try {
      const token = await user?.getIdToken();
      const res = await fetch('/api/admin/feedback', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data?.success) setFeedbacks(data.items || []);
    } catch (err) {
      console.error('Fetch feedbacks error', err);
    }
  };

  const handleUpdateStatus = async (id: string, status: FeedbackItem['status']) => {
    try {
      setSubmitting(true);
      const token = await user?.getIdToken();
      const res = await fetch(`/api/admin/feedback/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data?.success) {
        await fetchFeedbacks();
      }
    } catch (err) {
      console.error('Update status error', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendResponse = async () => {
    if (!selectedFeedback || !response.trim()) return;
    try {
      setSubmitting(true);
      const token = await user?.getIdToken();
      const res = await fetch(`/api/admin/feedback/${selectedFeedback.id}/respond`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ response: response.trim() }),
      });
      const data = await res.json();
      if (data?.success) {
        setResponse('');
        setSelectedFeedback(null);
        await fetchFeedbacks();
      }
    } catch (err) {
      console.error('Send response error', err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredFeedbacks = feedbacks.filter(f => 
    filter === 'all' ? true : f.status === filter
  );

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p className="text-red-500">Access denied. Admin login required.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Feedback Management</h1>
        <div className="flex items-center gap-4">
          <Link href="/feedback" className="text-sm text-gray-400 hover:text-white">
            View Public Feedback
          </Link>
          <button
            onClick={() => {
              document.cookie = 'adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
              window.location.href = '/admin-login/feedback';
            }}
            className="text-sm text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mb-6 flex gap-4">
        {(['all', 'pending', 'reviewed', 'archived'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {filteredFeedbacks.length === 0 && (
            <p className="text-gray-400">No feedback found.</p>
          )}
          {filteredFeedbacks.map((f) => (
            <div
              key={f.id}
              className={`p-4 rounded border ${
                selectedFeedback?.id === f.id
                  ? 'bg-gray-800 border-blue-500'
                  : 'bg-gray-900 border-gray-800'
              } cursor-pointer hover:border-blue-500 transition-colors`}
              onClick={() => setSelectedFeedback(f)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-400">
                  {f.email || 'Anonymous'} •{' '}
                  <span className="text-xs">
                    {new Date(f.createdAt).toLocaleString()}
                  </span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    f.status === 'pending'
                      ? 'bg-yellow-900 text-yellow-300'
                      : f.status === 'reviewed'
                      ? 'bg-green-900 text-green-300'
                      : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  {f.status || 'pending'}
                </span>
              </div>
              <div className="text-white whitespace-pre-wrap">{f.message}</div>
              {f.adminResponse && (
                <div className="mt-2 pl-4 border-l-2 border-blue-500">
                  <div className="text-xs text-gray-400 mb-1">Admin Response:</div>
                  <div className="text-gray-300">{f.adminResponse}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedFeedback && (
          <div className="bg-gray-900 p-6 rounded border border-gray-800 h-fit sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Manage Feedback</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Status</label>
                <div className="flex gap-2">
                  {(['pending', 'reviewed', 'archived'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(selectedFeedback.id, status)}
                      disabled={submitting}
                      className={`px-3 py-1 rounded text-sm ${
                        selectedFeedback.status === status
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Send Response
                </label>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  rows={4}
                  className="w-full rounded bg-gray-800 p-3 text-white mb-2"
                  placeholder="Write your response..."
                />
                <button
                  onClick={handleSendResponse}
                  disabled={submitting || !response.trim()}
                  className="bg-blue-600 px-4 py-2 rounded disabled:opacity-50 w-full"
                >
                  {submitting ? 'Sending...' : 'Send Response'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}