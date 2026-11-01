"use client"
import React, { useState } from 'react';
import { socials } from '../data/content';
import StreamText from './StreamText';
import Reveal from './Reveal';

// The block is warm espresso in both themes, so these are fixed colours
// rather than theme tokens.
const CREAM = 'text-[#F7F1E8]';
const MUTED = 'text-[#F7F1E8]/65';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // Clear status when user starts typing again
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Submit to your Brevo API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Success - clear form and show success message
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus({
        type: 'success',
        message: data.message || 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!'
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Sorry, there was an error sending your message. Please try again or contact me directly at justinaominisan@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    'w-full rounded-xl border border-[#F7F1E8]/15 bg-[#F7F1E8]/[0.06] px-4 py-3 text-[#F7F1E8] placeholder-[#F7F1E8]/40 transition-colors duration-300 focus:border-[#E8964A] focus:bg-[#F7F1E8]/10 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50';
  const labelClass = 'font-mono text-meta uppercase text-[#F7F1E8]/55';

  return (
    <section id="contact" className="scroll-mt-24 bg-canvas">
      <div className="shell pb-section">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#211812] px-6 py-14 dark:bg-[#2A1F18] dark:ring-1 dark:ring-[#F7F1E8]/10 sm:rounded-[2.5rem] sm:px-12 sm:py-20 lg:px-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-24 -top-32 h-[28rem] w-[28rem] rounded-full bg-[#DE9652]/35 blur-[100px]" />
            <div className="absolute -bottom-40 right-0 h-[26rem] w-[26rem] rounded-full bg-[#A65216]/40 blur-[110px]" />
          </div>
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[#E8964A]">
              <span>05</span>
              <span aria-hidden="true" className="h-px w-8 bg-[#E8964A]/50" />
              <span className="text-[#F7F1E8]/55">Contact</span>
            </p>
            <Reveal>
            <h2 className={`mt-5 font-display text-display-lg font-bold ${CREAM}`}>
              Let&apos;s build something{' '}
              <em className="font-serif text-[1.12em] font-normal italic tracking-normal text-[#E8964A]">
                <StreamText text="useful." />
              </em>
            </h2>
            </Reveal>
            <p className={`mt-6 max-w-measure text-[0.9375rem] leading-relaxed ${MUTED}`}>
              I am always interested in new opportunities and challenging projects.
              Whether you need a responsive website, a complex web application, or
              just want to discuss your ideas, I would love to hear from you.
            </p>

            <ul className="mt-10 space-y-3 text-[0.9375rem]">
              <li>
                <a
                  href={`mailto:${socials.email}`}
                  className={`${CREAM} underline decoration-[#F7F1E8]/25 underline-offset-4 transition-colors hover:decoration-[#E8964A]`}
                >
                  {socials.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${socials.phone}`}
                  className={`${MUTED} transition-colors hover:text-[#F7F1E8]`}
                >
                  {socials.phone}
                </a>
              </li>
              <li className="flex gap-5 pt-2">
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${CREAM} underline decoration-[#F7F1E8]/25 underline-offset-4 transition-colors hover:decoration-[#E8964A]`}
                >
                  LinkedIn
                </a>
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${CREAM} underline decoration-[#F7F1E8]/25 underline-offset-4 transition-colors hover:decoration-[#E8964A]`}
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <form onSubmit={handleSubmit}>
              {/* Status Message */}
              {submitStatus.type && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`mb-6 rounded-xl border px-4 py-3 text-sm leading-relaxed ${
                    submitStatus.type === 'success'
                      ? 'border-[#E8964A]/40 bg-[#E8964A]/15 text-[#F7F1E8]'
                      : 'border-red-400/40 bg-red-400/15 text-red-200'
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className={`mt-2 ${fieldClass}`}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className={`mt-2 ${fieldClass}`}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about the project&#8230;"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className={`mt-2 resize-none ${fieldClass}`}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E8964A] px-8 py-3.5 text-sm font-semibold text-[#211812] transition-[transform,background-color] duration-300 ease-editorial hover:-translate-y-0.5 hover:bg-[#F0A862] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-10"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending&#8230;
                    </>
                  ) : (
                    <>
                      Send message
                      <span aria-hidden="true">&#8594;</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
