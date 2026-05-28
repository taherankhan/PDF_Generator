import { FC } from 'react';
import LegalLayout from './LegalLayout';
import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_DOMAIN,
  LEGAL_OPERATOR,
  LEGAL_PRODUCT_NAME,
  LEGAL_SITE_NAME,
} from './legalMeta';

const TermsPage: FC = () => (
  <LegalLayout title="Terms of Service">
    <p>
      These Terms of Service (&quot;Terms&quot;) govern your access to and use of {LEGAL_SITE_NAME} —{' '}
      {LEGAL_PRODUCT_NAME} — operated by {LEGAL_OPERATOR} at {LEGAL_DOMAIN} (the &quot;Service&quot;).
      By using the Service, you agree to these Terms.
    </p>

    <h2>1. The Service</h2>
    <p>
      The Service provides a browser-based markdown editor, live preview, themed styling, and PDF export.
      Optional features include share links (URL hash and/or cloud storage), realtime updates on shared
      documents, and a contact form. Features may change without notice.
    </p>

    <h2>2. Eligibility</h2>
    <p>
      You must be able to form a binding contract in your jurisdiction. You are responsible for
      compliance with local laws regarding export of content you create.
    </p>

    <h2>3. Your content</h2>
    <ul>
      <li>You retain ownership of markdown and documents you create.</li>
      <li>
        You grant us a limited license to host, process, and transmit content only as needed to
        operate features you use (e.g. storing a cloud share or delivering realtime updates).
      </li>
      <li>
        You must not upload or share unlawful, infringing, harassing, malware-laden, or abusive
        material.
      </li>
      <li>
        You are solely responsible for backups; client-side processing can lose data on refresh unless
        you save or share.
      </li>
    </ul>

    <h2>4. Acceptable use</h2>
    <p>You agree not to:</p>
    <ul>
      <li>Abuse APIs, share endpoints, or the contact form (spam, scraping, denial of service)</li>
      <li>Attempt to bypass security or access others&apos; shares without authorization</li>
      <li>Use the Service to violate intellectual property or privacy rights of others</li>
      <li>Reverse engineer the Service except where law expressly permits</li>
    </ul>

    <h2>5. Third-party services</h2>
    <p>
      The Service may load fonts, analytics, image proxies, or database providers. Your use of those
      services may be subject to their separate terms. We are not responsible for third-party outages
      or policies.
    </p>

    <h2>6. Disclaimer</h2>
    <p>
      THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY
      KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
      NON-INFRINGEMENT. PDF output may differ from preview; we do not guarantee print or legal
      compliance of generated documents.
    </p>

    <h2>7. Limitation of liability</h2>
    <p>
      TO THE MAXIMUM EXTENT PERMITTED BY LAW, {LEGAL_OPERATOR} AND ITS SUPPLIERS SHALL NOT BE LIABLE
      FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR LOSS OF PROFITS,
      DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY FOR ANY CLAIM
      RELATING TO THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) USD $50 OR (B) AMOUNTS YOU PAID US
      IN THE TWELVE MONTHS BEFORE THE CLAIM (TYPICALLY ZERO FOR THE FREE SERVICE).
    </p>

    <h2>8. Indemnity</h2>
    <p>
      You will indemnify and hold harmless {LEGAL_OPERATOR} from claims arising out of your content,
      your misuse of the Service, or your violation of these Terms.
    </p>

    <h2>9. Termination</h2>
    <p>
      We may suspend or terminate access for violation of these Terms or for operational reasons. You
      may stop using the Service at any time.
    </p>

    <h2>10. Governing law</h2>
    <p>
      These Terms are governed by the laws applicable to {LEGAL_OPERATOR}&apos;s principal place of
      business, without regard to conflict-of-law rules, except where mandatory consumer protections
      in your country apply.
    </p>

    <h2>11. Changes</h2>
    <p>
      We may modify these Terms. Material changes will be reflected by updating the date above.
      Continued use after changes constitutes acceptance where permitted.
    </p>

    <h2>12. Contact</h2>
    <p>
      <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a> — or use the contact form on
      the homepage. See also our <a href="/privacy">Privacy Policy</a>.
    </p>
  </LegalLayout>
);

export default TermsPage;
