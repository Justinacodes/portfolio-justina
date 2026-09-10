"use client"
import React, { useState } from 'react';
import { socials } from '../data/content';

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
    'w-full rounded-xl border border-line bg-surface px-4 py-3 text-fg placeholder-subtle/70 transition-colors duration-300 focus:border-accent focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <section id="contact" className="scroll-mt-24 border-t border-line bg-canvas">
      <div className="shell py-section">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-display-lg font-bold text-fg">
              Let&apos;s build something useful.
            </h2>
            <p className="mt-6 max-w-measure text-[0.9375rem] leading-relaxed text-subtle">
              I am always interested in new opportunities and challenging projects.
              Whether you need a responsive website, a complex web application, or
              just want to discuss your ideas, I would love to hear from you.
            </p>

            <ul className="mt-10 space-y-3 text-[0.9375rem]">
              <li>
                <a
                  href={`mailto:${socials.email}`}
                  className="text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {socials.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${socials.phone}`}
                  className="text-subtle transition-colors hover:text-fg"
                >
                  {socials.phone}
                </a>
              </li>
              <li className="flex gap-5 pt-2">
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
                >
                  LinkedIn
                </a>
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
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
                      ? 'border-accent/40 bg-accent/10 text-fg'
                      : 'border-red-500/40 bg-red-500/10 text-red-500'
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="meta">
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
                  <label htmlFor="email" className="meta">
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
                  <label htmlFor="message" className="meta">
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
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-fg px-8 py-3.5 text-sm font-medium text-canvas transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-10"
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
    </section>
  );
};

export default Contact;
