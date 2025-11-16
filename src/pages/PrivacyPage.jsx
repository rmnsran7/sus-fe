import React, { useState } from "react";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  const [accepted, setAccepted] = useState(false);
  const [copied, setCopied] = useState(false);

  const policyText = `PRIVACY POLICY
Effective Date: JANUARY 1, 2024

Welcome to LoudSurrey (the "Page"). We are committed to protecting privacy. By interacting with @LoudSurrey or emailing loudsurrey@gmail.com you consent to the practices described below.

1. Introduction
LoudSurrey operates a community platform for local posts, anonymous submissions, promotions, memes, and local news. This Privacy Policy explains what information we collect, how we use it, when we disclose it, and how we protect it.

2. Information We Collect
We collect: personal information you provide voluntarily (name, email, media); submission metadata (timestamps, filenames, file metadata); log data (IP, browser, device, pages, timestamps); cookies and tracking for analytics and UX.

3. Use of Information
We use collected information to provide and personalize services, improve the site, respond to inquiries, send admin communications, secure the platform, and comply with legal obligations.

4. Data Retention
We retain personal information only as long as needed to fulfill the purposes in this policy or as required by law.

5. Security
We use reasonable administrative and technical safeguards. No transmission or storage is 100% secure; absolute security cannot be guaranteed.

6. Third-Party Links
We may link to third-party sites. We are not responsible for their privacy practices. Review third-party policies before sharing personal data.

7. Children's Privacy
Not intended for those under 13. We do not knowingly collect information from children under 13.

8. Disclosure of Personal Information
We do not sell or rent personal information. We may disclose if required by law or to protect rights, property, or safety.

9. Changes to Policy
We may update this policy. The revised Effective Date will be posted. Continued use after changes is acceptance.

10. Contact Us
Questions: loudsurrey@gmail.com`;

  function toggleAccept() {
    setAccepted((s) => !s);
  }

  function copyPolicy() {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(policyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  function printPolicy() {
    window.print();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-md sm:max-w-2xl">
        <motion.header
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">LoudSurrey</h1>
              <p className="text-xs text-gray-400">Privacy Policy — Effective Jan 1, 2024</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={copyPolicy}
                className="px-3 py-2 rounded-lg border border-gray-700 text-xs hover:bg-gray-800"
                aria-label="Copy privacy policy"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={printPolicy}
                className="px-3 py-2 rounded-lg border border-gray-700 text-xs hover:bg-gray-800"
              >
                Print
              </button>
            </div>
          </div>
        </motion.header>

        <main className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-lg p-4 sm:p-6">
          <article className="space-y-4 text-sm text-gray-300">
            <section>
              <h2 className="text-base font-semibold text-white">Welcome</h2>
              <p className="leading-relaxed">
                LoudSurrey operates a community platform for local posts, anonymous submissions,
                promotions, memes, and local news. This policy explains what we collect and how we use it.
              </p>
            </section>

            <Collapsible title="1. Introduction">
              <p>Platform purpose and scope. This policy governs data collected via @LoudSurrey and related contact channels.</p>
            </Collapsible>

            <Collapsible title="2. Information We Collect">
              <p>
                We collect personal info you provide, submission metadata, log data (IP, device, browser),
                and use cookies/tracking for analytics and UX.
              </p>
            </Collapsible>

            <Collapsible title="3. Use of Information">
              <p>Used to provide and personalize services, improve the page, respond to inquiries, administer the platform, and meet legal obligations.</p>
            </Collapsible>

            <Collapsible title="4. Data Retention">
              <p>Retained only as long as necessary for stated purposes or as required by law.</p>
            </Collapsible>

            <Collapsible title="5. Security">
              <p>We use reasonable safeguards but cannot guarantee absolute security for transmissions or storage.</p>
            </Collapsible>

            <Collapsible title="6. Third-Party Links">
              <p>We are not responsible for third-party sites. Review their privacy policies before sharing data.</p>
            </Collapsible>

            <Collapsible title="7. Children's Privacy">
              <p>Not intended for persons under 13. We do not knowingly collect data from children under 13.</p>
            </Collapsible>

            <Collapsible title="8. Disclosure">
              <p>We do not sell personal data. We may disclose when required by law or to protect rights and safety.</p>
            </Collapsible>

            <Collapsible title="9. Changes to Policy">
              <p>We may update this policy. The Effective Date will change. Continued use implies acceptance.</p>
            </Collapsible>

            <Collapsible title="10. Contact">
              <p>
                For privacy questions or requests contact{" "}
                <a href="mailto:loudsurrey@gmail.com" className="text-blue-400 underline">
                  loudsurrey@gmail.com
                </a>
                .
              </p>
            </Collapsible>
          </article>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <input
                id="accept-privacy"
                type="checkbox"
                checked={accepted}
                onChange={toggleAccept}
                className="h-4 w-4 text-blue-400 bg-gray-800 border-gray-700 rounded"
              />
              <label htmlFor="accept-privacy" className="text-xs text-gray-300">
                I have read and agree to the Privacy Policy
              </label>
            </div>

            <div className="flex gap-2">
              <a
                href="mailto:loudsurrey@gmail.com?subject=Privacy%20Inquiry"
                className="px-4 py-2 rounded-lg border border-gray-700 text-xs hover:bg-gray-800"
              >
                Contact
              </a>
              <button
                onClick={() => alert(accepted ? "Acceptance recorded." : "Please check the box to accept.")}
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs disabled:opacity-50"
              >
                Confirm
              </button>
            </div>
          </div>
        </main>

        <footer className="mt-6 text-center text-xs text-gray-500">© LoudSurrey — Effective Jan 1, 2024</footer>
      </div>
    </div>
  );
}

/* Collapsible helper */
function Collapsible({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-800 pb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left py-2 text-gray-200 focus:outline-none"
        aria-expanded={open}
      >
        <span className="font-medium text-sm">{title}</span>
        <span className="text-gray-500">{open ? "−" : "+"}</span>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden text-sm text-gray-400 pl-2"
      >
        <div className="pt-1 pb-2 leading-relaxed">{children}</div>
      </motion.div>
    </div>
  );
}
