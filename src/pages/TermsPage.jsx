import React, { useState } from "react";
import { motion } from "framer-motion";

export default function LoudSurreyTerms() {
  const [accepted, setAccepted] = useState(false);
  const [copied, setCopied] = useState(false);

  const termsText = `TERMS AND CONDITIONS\nEffective Date: JANUARY 1, 2024...`; // shortened for brevity

  function toggleAccept() {
    setAccepted(!accepted);
  }

  function copyTerms() {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(termsText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function printTerms() {
    window.print();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-md sm:max-w-2xl">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-white">LoudSurrey</h1>
              <p className="text-xs sm:text-sm text-gray-400">Terms &amp; Conditions — Effective Jan 1, 2024</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={copyTerms}
                className="px-3 py-2 rounded-lg border border-gray-700 text-xs sm:text-sm hover:bg-gray-800"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={printTerms}
                className="px-3 py-2 rounded-lg border border-gray-700 text-xs sm:text-sm hover:bg-gray-800"
              >
                Print
              </button>
            </div>
          </div>
        </motion.header>

        <main className="bg-gray-850 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-lg p-4 sm:p-6">
          <article className="space-y-4">
            <section>
              <h2 className="text-lg font-semibold mb-1">Welcome</h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Welcome to <strong>LoudSurrey</strong>. By using our Instagram page <strong>@LoudSurrey</strong>, you agree to these Terms and Conditions.
              </p>
            </section>

            <Collapsible title="1. User Agreement">
              <p>By engaging with LoudSurrey, you acknowledge full responsibility for any submitted content and agree that posts and submissions may be logged for administrative purposes.</p>
            </Collapsible>

            <Collapsible title="2. Promotional Content">
              <p>Promotional posts require payment. Unpaid or unauthorized promotions may be removed.</p>
            </Collapsible>

            <Collapsible title="3. Content Ownership">
              <p>All submitted content becomes property of LoudSurrey and may be used or distributed for community and promotional purposes.</p>
            </Collapsible>

            <Collapsible title="4. Anonymity">
              <p>We preserve anonymity where possible but may disclose information when required by law or to protect safety.</p>
            </Collapsible>

            <Collapsible title="5. Intellectual Property">
              <p>All LoudSurrey materials are protected by copyright. Reuse requires written permission.</p>
            </Collapsible>

            <Collapsible title="6. Privacy">
              <p>Contact <a href="mailto:loudsurrey@gmail.com" className="text-blue-400 underline">loudsurrey@gmail.com</a> for privacy matters.</p>
            </Collapsible>

            <Collapsible title="7. Limitation of Liability">
              <p>LoudSurrey is not liable for any damages resulting from use of its content.</p>
            </Collapsible>

            <Collapsible title="8. Modifications to Terms">
              <p>We may modify these terms at any time. Continued use implies acceptance.</p>
            </Collapsible>

            <Collapsible title="9. Governing Law">
              <p>These Terms are governed by Canadian law.</p>
            </Collapsible>

            <Collapsible title="10. Contact Us">
              <p>For inquiries: <a href="mailto:loudsurrey@gmail.com" className="text-blue-400 underline">loudsurrey@gmail.com</a></p>
            </Collapsible>
          </article>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <input
                id="accept"
                type="checkbox"
                checked={accepted}
                onChange={toggleAccept}
                className="h-4 w-4 text-blue-400 bg-gray-800 border-gray-700 rounded"
              />
              <label htmlFor="accept" className="text-xs sm:text-sm text-gray-300">
                I have read and agree to the Terms and Conditions
              </label>
            </div>

            <div className="flex gap-2">
              <a
                href="mailto:loudsurrey@gmail.com?subject=Terms%20Inquiry"
                className="px-4 py-2 rounded-lg border border-gray-700 text-xs sm:text-sm hover:bg-gray-800"
              >
                Contact
              </a>
              <button
                onClick={() => alert(accepted ? "Thank you. Acceptance recorded." : "Please check the box to accept.")}
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm disabled:opacity-50"
              >
                Confirm
              </button>
            </div>
          </div>
        </main>

        <footer className="mt-6 text-center text-xs sm:text-sm text-gray-500">© LoudSurrey — Effective Jan 1, 2024</footer>
      </div>
    </div>
  );
}

function Collapsible({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-800 pb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left py-2 text-gray-200 focus:outline-none"
      >
        <span className="font-medium text-sm sm:text-base">{title}</span>
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
