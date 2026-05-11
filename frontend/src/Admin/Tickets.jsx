import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inbox, Archive, Eye, X, House, PhoneCall, Check, Clock, Mail, User, MessageSquare, ChevronDown, ChevronUp, Send } from 'lucide-react';

// --- Reusable Components ---

/**
 * Gets a color class based on the submission status.
 * @param {string} status - The status ('Pending', 'Approved', 'Resolved')
 * @returns {string} Tailwind CSS color classes
 */
const getStatusClasses = (status) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Resolved':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

/**
 * A reusable status badge component.
 * @param {{status: string}} props
 */
const StatusBadge = ({ status }) => (
  <span
    className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClasses(status)}`}
  >
    {status}
  </span>
);

/**
 * A custom dropdown component for changing status.
 * @param {{currentStatus: string, onChange: (newStatus: string) => void}} props
 */
const StatusSelector = ({ currentStatus, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const statuses = ['pending', 'resolved'];
  const availableStatuses = statuses.filter(s => s !== currentStatus);

  const handleSelect = (newStatus) => {
    onChange(newStatus);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between min-w-[120px] px-3 py-1.5 text-sm font-medium rounded-md border ${getStatusClasses(currentStatus)} transition-all duration-150 hover:bg-opacity-80`}
      >
        {currentStatus}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 z-10 w-full mt-1 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg"
          >
            <div className="py-1">
              {availableStatuses.map((status) => (
                <button
                  key={status}
                  onClick={() => handleSelect(status)}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                >
                  {status}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * Modal component for viewing submission details.
 * @param {{submission: object, onClose: () => void, onStatusChange: (id: number, newStatus: string) => void}} props
 */
const SubmissionModal = ({ submission, onClose, onStatusChange }) => {
  const [replyMessage, setReplyMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState(null);

  if (!submission) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } },
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (replyMessage.trim().length === 0) return;

    setIsSending(true);
    setSendSuccess(false);
    setSendError(null);

    // Simple email reply using mailto link (client-side only)
    try {
      const subject = `Re: ${submission.subject}`;
      const body = `Dear ${submission.name},\n\n${replyMessage}\n\nBest regards,\nHostelLite Support Team`;
      
      const mailtoLink = `mailto:${submission.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoLink, '_blank');
      
      setSendSuccess(true);
      setReplyMessage('');
      
      // Optionally update status to 'Approved' after replying
      // onStatusChange(submission.id, 'Approved');
      
    } catch (e) {
      console.error("Reply error:", e);
      setSendError('Failed to open email client. Please try manually.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
        className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
      >
        <motion.div
          key="modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow-2xl"
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </motion.button>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ticket Details</h2>
          <div className="mb-4">
            <StatusSelector
              currentStatus={submission.status}
              onChange={(newStatus) => onStatusChange(submission.id, newStatus)}
            />
          </div>

          <div className="space-y-4 text-gray-700 max-h-[60vh] overflow-y-auto pr-2">
            <div className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-md">
              <User size={18} className="mr-3 text-blue-500" />
              <strong>Name :</strong>
              <span className="ml-2">{submission.name}</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-md">
              <Mail size={18} className="mr-3 text-blue-500" />
              <strong>Email :</strong>
              <a href={`mailto:${submission.email}`} className="ml-2 text-blue-500 hover:underline">
                {submission.email}
              </a>
            </div>
            <div className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-md">
              <Clock size={18} className="mr-3 text-blue-500" />
              <strong>Submitted :</strong>
              <span className="ml-2">{new Date(submission.submitted_at).toLocaleString()}</span>
            </div>
            <div className="flex items-start p-3 bg-gray-50 border border-gray-200 rounded-md">
              <MessageSquare size={18} className="mr-3 text-blue-500 shrink-0" />
              <strong>Subject :</strong>
              <span className="ml-2 font-semibold text-gray-800">{submission.subject}</span>
            </div>
            <div className="flex items-start p-3 bg-gray-50 border border-gray-200 rounded-md">
              <House size={18} className="mr-3 text-blue-500 shrink-0" />
              <strong>Hostel :</strong>
              <span className="ml-2 font-semibold text-gray-800">{submission.organization}</span>
            </div>
            <div className="flex items-start p-3 bg-gray-50 border border-gray-200 rounded-md">
              <PhoneCall size={18} className="mr-3 text-blue-500 shrink-0" />
              <strong>Contact :</strong>
              <span className="ml-2 font-semibold text-gray-800">{submission.phone_number}</span>
            </div>
            <div className="flex items-start p-3 bg-gray-50 border border-gray-200 rounded-md">
              <MessageSquare size={18} className="mr-3 text-blue-500 shrink-0" />
              <strong>Message :</strong>
              <span className="ml-2 font-semibold text-gray-800">{submission.message}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- Main Application Component ---

/**
 * Main Contact Us Admin component.
 */
export default function Tickets() {
  const [activeSubmissions, setActiveSubmissions] = useState([]);
  const [archivedSubmissions, setArchivedSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [currentView, setCurrentView] = useState('active'); // 'active' or 'archived'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches submissions from the PHP backend.
   */
  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost/HMS/backend/Admin/tickets.php');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.success) {
        // Filter active vs. resolved submissions
        const active = data.submissions.filter(s => s.status !== 'resolved');
        const archived = data.submissions.filter(s => s.status === 'resolved');
        setActiveSubmissions(active);
        setArchivedSubmissions(archived);
      } else {
        throw new Error(data.message || 'Failed to fetch submissions.');
      }
    } catch (e) {
      console.error("API Error:", e);
      setError('Failed to load submissions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on initial component mount
  useEffect(() => {
    fetchSubmissions();
  }, []);

  /**
   * Handles changing the status of a submission.
   * @param {number} id - The ID of the submission to update.
   * @param {string} newStatus - The new status.
   */
  const handleStatusChange = async (id, newStatus) => {
    // Optimistically update the UI first
    let submissionToMove;
    let originalActive = [...activeSubmissions];
    let originalArchived = [...archivedSubmissions];

    if (newStatus === 'resolved') {
      // Moving from active to archived
      submissionToMove = activeSubmissions.find(s => s.id === id);
      if (submissionToMove) {
        submissionToMove.status = newStatus;
        setActiveSubmissions(activeSubmissions.filter(s => s.id !== id));
        setArchivedSubmissions([submissionToMove, ...archivedSubmissions]);
      }
    } else {
      // Moving from archived to active (or updating within active)
      submissionToMove = archivedSubmissions.find(s => s.id === id);
      if (submissionToMove) {
        // Moving from archived to active
        submissionToMove.status = newStatus;
        setArchivedSubmissions(archivedSubmissions.filter(s => s.id !== id));
        setActiveSubmissions([submissionToMove, ...activeSubmissions]);
      } else {
        // Just updating status within the active list
        setActiveSubmissions(
          activeSubmissions.map(s =>
            s.id === id ? { ...s, status: newStatus } : s
          )
        );
      }
    }

    // Send update to PHP backend
    try {
      const response = await fetch('http://localhost/HMS/backend/Admin/tickets.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status.');
      }
      
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || 'Server error on update.');
      }
      
      // If successful, the optimistic update is correct
      
    } catch (e) {
      console.error("API Update Error:", e);
      // Roll back the optimistic update on failure
      setActiveSubmissions(originalActive);
      setArchivedSubmissions(originalArchived);
      setError('Failed to update status. Please try again.');
    }
  };

  const submissionsToShow = currentView === 'active' ? activeSubmissions : archivedSubmissions;
  const TabButton = ({ view, label, icon: Icon }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all ${
        currentView === view
          ? 'bg-white text-blue-600 shadow-sm'
          : 'text-gray-500 hover:bg-white/50 hover:text-blue-600'
      }`}
    >
      <Icon size={18} className="mr-2" />
      {label}
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8 bg-gray-100 text-gray-900 min-h-screen font-sans"
    >
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">TICKETS</h1>
        <p className="text-lg text-gray-600 mt-1">View and manage user queries</p>
      </header>

      {/* --- Tabs --- */}
      <div className="flex p-1 mb-6 space-x-2 bg-gray-200 rounded-lg max-w-md">
        <TabButton view="active" label="Active Inquiries" icon={Inbox} />
        <TabButton view="archived" label="Archived" icon={Archive} />
      </div>

      {/* --- Content Area --- */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Loading Inquiries...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-64 p-4 text-center text-red-600">
            <X size={24} className="mr-2" />
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">From</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Subject</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Organization</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase hidden md:table-cell">Submitted</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {submissionsToShow.length === 0 ? (
                    <motion.tr
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                        {currentView === 'active' ? 'No active inquiries.' : 'No archived inquiries.'}
                      </td>
                    </motion.tr>
                  ) : (
                    submissionsToShow.map((submission) => (
                      <motion.tr
                        layout
                        key={submission.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{submission.name}</div>
                          <div className="text-sm text-gray-500">{submission.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700 max-w-xs truncate">{submission.subject}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700 max-w-xs truncate">{submission.organization}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700 max-w-xs truncate">{submission.phone_number}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                          {new Date(submission.submitted_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusSelector
                            currentStatus={submission.status}
                            onChange={(newStatus) => handleStatusChange(submission.id, newStatus)}
                          />
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedSubmission(submission)}
                            className="p-2 text-blue-500 rounded-full hover:bg-blue-100"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- Modal --- */}
      <AnimatePresence>
        {selectedSubmission && (
          <SubmissionModal
            submission={selectedSubmission}
            onClose={() => setSelectedSubmission(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}