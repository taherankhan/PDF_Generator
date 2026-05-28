import { FC } from 'react';
import LegalLayout from './LegalLayout';
import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_DOMAIN,
  LEGAL_OPERATOR,
  LEGAL_PRODUCT_NAME,
  LEGAL_SITE_NAME,
} from './legalMeta';

const PrivacyPolicyPage: FC = () => (
  <LegalLayout title="Privacy Policy">
    <p>
      This Privacy Policy describes how {LEGAL_OPERATOR} (&quot;we&quot;, &quot;us&quot;) collects,
      uses, and shares information when you use {LEGAL_SITE_NAME} — {LEGAL_PRODUCT_NAME} — at{' '}
      {LEGAL_DOMAIN} and related subdomains (the &quot;Service&quot;).
    </p>

    <h2>1. Summary</h2>
    <ul>
      <li>
        <strong>Editor &amp; PDF export:</strong> Markdown and previews are processed in your browser.
        We do not receive your document content unless you explicitly use optional cloud share links or
        the contact form.
      </li>
      <li>
        <strong>Hash-based sharing:</strong> Share URLs that use the <code>#d=...</code> fragment keep
        payload data in the browser; the fragment is not sent to our hosting server on page load.
      </li>
      <li>
        <strong>Analytics:</strong> We may use Google Analytics 4 and Vercel Analytics to understand
        usage (pages, events). See Section 5.
      </li>
      <li>
        <strong>Contact form:</strong> If enabled, messages you submit are stored in our database
        provider (Supabase) to respond to you.
      </li>
    </ul>

    <h2>2. Information we collect</h2>
    <p>
      <strong>Information you provide:</strong> Email and message text when you submit the contact or
      feedback form. Optional cloud share payloads (markdown and theme id) if you choose to save a share
      link to our database.
    </p>
    <p>
      <strong>Automatic technical data:</strong> IP address, browser type, device type, referring URL,
      and similar logs may be collected by our hosting (e.g. Vercel), analytics providers, or database
      provider for security and operations.
    </p>
    <p>
      <strong>Local storage:</strong> The Service may use browser storage for UI preferences. We do not
      use it to upload your editor content without your action.
    </p>

    <h2>3. How we use information</h2>
    <ul>
      <li>Operate, secure, and improve the Service</li>
      <li>Respond to contact and support requests</li>
      <li>Provide optional share-link and realtime collaboration features</li>
      <li>Measure aggregate usage and fix errors</li>
      <li>Comply with law and enforce our Terms</li>
    </ul>

    <h2>4. Legal bases (EEA/UK)</h2>
    <p>
      Where GDPR applies: we process contact and share data on <strong>contract</strong> or{' '}
      <strong>legitimate interests</strong> (operating the Service); analytics on{' '}
      <strong>consent</strong> where required (you may refuse non-essential cookies via your browser or
      regional consent tools we provide).
    </p>

    <h2>5. Cookies and analytics</h2>
    <p>
      We may set or allow third-party cookies/SDKs for analytics (e.g. Google Analytics 4, Vercel
      Analytics). These help us see page views and events such as &quot;export PDF&quot; or &quot;landing
      CTA&quot; — not the text of your documents unless you separately submit it. You can block cookies in
      your browser; some features may still work without analytics.
    </p>

    <h2>6. Sharing with service providers</h2>
    <p>We use trusted processors, including:</p>
    <ul>
      <li>Hosting (e.g. Vercel) — serves the web application</li>
      <li>Supabase — optional contact messages and cloud share storage</li>
      <li>Google — optional Analytics</li>
    </ul>
    <p>They process data only to provide services to us under their terms and security measures.</p>

    <h2>7. Retention</h2>
    <ul>
      <li>Contact messages: until resolved and for a reasonable period for support history, unless law
        requires longer retention.</li>
      <li>Cloud shares: until deleted by us or you, or after a reasonable inactivity period if we
        implement cleanup.</li>
      <li>Analytics: per provider default retention settings.</li>
    </ul>

    <h2>8. Security</h2>
    <p>
      We use HTTPS, row-level security on database tables where configured, and industry-standard
      practices. No method of transmission over the Internet is 100% secure; use cloud share only for
      non-sensitive content unless you accept the risk.
    </p>

    <h2>9. Your rights</h2>
    <p>
      Depending on your region, you may have rights to access, correct, delete, restrict, or port
      personal data, and to object or withdraw consent. Contact us at{' '}
      <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>. You may lodge a complaint
      with your local supervisory authority.
    </p>

    <h2>10. Children</h2>
    <p>The Service is not directed at children under 16. We do not knowingly collect their data.</p>

    <h2>11. International transfers</h2>
    <p>
      Processors may be located outside your country. We rely on appropriate safeguards where required
      by law.
    </p>

    <h2>12. Changes</h2>
    <p>
      We may update this policy. The &quot;Last updated&quot; date will change. Continued use after
      changes constitutes acceptance where permitted by law.
    </p>

    <h2>13. Contact</h2>
    <p>
      Questions: <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a> or the contact
      form on our homepage.
    </p>
  </LegalLayout>
);

export default PrivacyPolicyPage;
