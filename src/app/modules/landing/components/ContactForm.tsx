import { FC, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { submitContactMessage } from '../../../../services/contactService';
import { AnalyticsService } from '../../../../services/AnalyticsService';

const CONTACT_TOAST_ID = 'lp-contact-submit';

const ContactForm: FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      toast.error('Enter a valid email address.', { toastId: CONTACT_TOAST_ID });
      return;
    }

    if (trimmedMessage.length < 10) {
      toast.error('Message must be at least 10 characters.', { toastId: CONTACT_TOAST_ID });
      return;
    }

    try {
      setIsSubmitting(true);
      await submitContactMessage({ email: trimmedEmail, message: trimmedMessage });
      AnalyticsService.events.landingContactSubmit();
      setEmail('');
      setMessage('');
      toast.success('Message transmitted. We will get back to you.', {
        toastId: CONTACT_TOAST_ID,
        autoClose: 4000,
      });
    } catch {
      toast.error('Transmission failed. Try again or open a GitHub issue.', {
        toastId: CONTACT_TOAST_ID,
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="lp-contact-form" onSubmit={handleSubmit} noValidate>
      <div className="lp-contact-form-head">
        <span className="lp-contact-form-tag" aria-hidden="true">// UPLINK</span>
        <h3 className="lp-contact-form-title">Contact &amp; Suggestions</h3>
        <p className="lp-contact-form-desc">
          Bug reports, feature ideas, or feedback — drop a signal.
        </p>
      </div>

      <label className="lp-contact-field">
        <span className="lp-contact-label">Email</span>
        <input
          type="email"
          className="lp-contact-input"
          placeholder="you@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          maxLength={320}
          disabled={isSubmitting}
        />
      </label>

      <label className="lp-contact-field">
        <span className="lp-contact-label">Message</span>
        <textarea
          className="lp-contact-input lp-contact-textarea"
          placeholder="Describe your idea, issue, or suggestion..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          maxLength={5000}
          disabled={isSubmitting}
        />
      </label>

      <button
        type="submit"
        className="lp-contact-submit"
        disabled={isSubmitting}
      >
        <span className="lp-contact-submit-glow" aria-hidden="true" />
        {isSubmitting ? 'Transmitting…' : 'Send Transmission'}
      </button>
    </form>
  );
};

export default ContactForm;
