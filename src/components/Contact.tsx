import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { siteData } from "../data/siteData";
import { registerClient } from "../utils/clientReviewStore";
import { WaveDivider } from "./ui/WaveDivider";

export const Contact: React.FC = () => {
  const { phone, email, location, phoneUrl, whatsappDefaultMessage } = siteData.contact;

  // Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "Website",
    budget: "Not sure",
    message: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planParam = params.get("plan");
    if (!planParam) return;

    const planUpper = planParam.toUpperCase();
    if (planUpper.includes("STARTER")) {
      setFormData((prev) => ({
        ...prev,
        projectType: prev.projectType || "Website",
        budget: "₹5K–₹15K",
        message: prev.message || "Hi, I am interested in getting started with the Starter plan (₹14,999).",
      }));
    } else if (planUpper.includes("PROFESSIONAL")) {
      setFormData((prev) => ({
        ...prev,
        projectType: prev.projectType || "Web App",
        budget: "₹15K–₹50K",
        message: prev.message || "Hi, I would like to discuss a project under the Professional plan (₹49,000).",
      }));
    } else if (planUpper.includes("CUSTOM")) {
      setFormData((prev) => ({
        ...prev,
        projectType: prev.projectType || "Custom Software",
        budget: "₹50K+",
        message: prev.message || "Hi, I would like to inquire about a Custom solution for our business.",
      }));
    }
  }, []);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState<string>("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "sent" | "key_needed" | "failed">("idle");

  const projectTypes = [
    "Website",
    "Web App",
    "Mobile App",
    "AI Solution",
    "E-Commerce",
    "Custom Software",
    "Other",
  ];

  const budgets = [
    "Under ₹5K",
    "₹5K–₹15K",
    "₹15K–₹50K",
    "₹50K+",
    "Not sure",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // 1. Build formatted WhatsApp inquiry message
    const formattedMessage = [
      `*New Project Inquiry - OneSiteStudios*`,
      ``,
      `*Name:* ${formData.name}`,
      `*Email:* ${formData.email}`,
      `*Phone:* ${formData.phone.trim() || "Not provided"}`,
      `*Company:* ${formData.company.trim() || "Not provided"}`,
      `*Project Type:* ${formData.projectType}`,
      `*Budget:* ${formData.budget}`,
      ``,
      `*Requirement:*`,
      formData.message,
    ].join("\n");

    const targetPhoneUrl = phoneUrl || "919353981311";
    const waUrl = `https://wa.me/${targetPhoneUrl}?text=${encodeURIComponent(formattedMessage)}`;
    setSubmittedWhatsappUrl(waUrl);

    // 2. Save registered client locally for verified testimonial authorization
    registerClient({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      projectType: formData.projectType,
      budget: formData.budget,
    });

    // 3. Send email to contact.onesitestudios@gmail.com via Web3Forms API
    const accessKey = (siteData.contact as { web3formsAccessKey?: string }).web3formsAccessKey || "6ad42536-ba3f-4b69-8031-62337e01bc30";
    if (accessKey && accessKey !== "YOUR_WEB3FORMS_ACCESS_KEY") {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `New Lead: ${formData.projectType} inquiry from ${formData.name}`,
            from_name: "OneSiteStudios Lead Form",
            name: formData.name,
            email: formData.email,
            phone: formData.phone || "Not provided",
            company: formData.company || "Not provided",
            project_type: formData.projectType,
            budget: formData.budget,
            message: formData.message,
          }),
        });

        const result = await response.json();
        if (result.success) {
          setEmailStatus("sent");
        } else {
          console.warn("Web3Forms response:", result);
          setEmailStatus("failed");
        }
      } catch (err) {
        console.error("Web3Forms submission failed:", err);
        setEmailStatus("failed");
      }
    } else {
      // Key not configured yet in siteData.ts
      setEmailStatus("key_needed");
    }

    // 4. Auto-open WhatsApp chat in a new tab
    try {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.warn("Could not auto-open WhatsApp:", err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: "Website",
      budget: "Not sure",
      message: "",
    });
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-white text-slate-950">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#102c70] to-[#1b5ed8] px-6 pb-20 pt-32 text-center text-white md:px-8 md:pb-24 md:pt-40">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px),radial-gradient(circle_at_80%_40%,white_1px,transparent_1px)] [background-size:5rem_5rem]"></div>
        <div className="relative mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-200">[ Contact Us ]</p>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Need assistance? Please fill the form</h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-blue-100 sm:text-base">So, make the decision to move forward. Let&apos;s discuss your project and bring it into focus.</p>
        </div>
      </div>
      <WaveDivider fromColor="#102c70" toColor="#ffffff" />

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-stretch">
          
          {/* Left Column: Direct contact info - 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Get in touch with us
              </h2>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                Have an idea? Let&apos;s build it.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">
                Tell us what you're building and we'll help you turn it into a reliable digital product. Fill out the form or reach us directly.
              </p>

              {/* Direct channels links */}
              <div className="mt-12 flex flex-col gap-6">
                {/* Phone Link */}
                <div className="flex gap-4 items-center">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block">Phone / WhatsApp</span>
                    <a href={`https://wa.me/${phoneUrl}?text=${encodeURIComponent(whatsappDefaultMessage)}`} className="text-sm font-semibold text-slate-900 hover:text-blue-600">
                      {phone}
                    </a>
                  </div>
                </div>

                {/* Email Link */}
                <div className="flex gap-4 items-center">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block">Email Address</span>
                    <a href={`mailto:${email}`} className="text-sm font-semibold text-slate-900 hover:text-blue-600">
                      {email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-4 items-center">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block">Office Location</span>
                    <span className="text-sm font-semibold text-slate-900">
                      {location}
                    </span>
                  </div>
                </div>

                <div className="mt-8 rounded-3xl bg-slate-50 p-7">
                  <h3 className="text-lg font-bold text-slate-950">Why reach out to us?</h3>
                  <ul className="mt-6 space-y-5">
                    {[
                      "Free project consultation",
                      "No obligation quote",
                      "Quick response within 24 hours",
                      "MSME Registered Agency",
                    ].map((benefit) => (
                      <li key={benefit} className="flex items-center gap-3 text-base text-slate-500">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Subtle footer credit */}
            <div className="mt-12 lg:mt-0 border-t border-white/5 pt-6 hidden lg:block">
              <p className="text-xs text-slate-400 font-mono">
                // estimated reply latency: &lt; 2 hours
              </p>
            </div>
          </div>

          {/* Right Column: Lead Form Card - 7 cols */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-10">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-left">
                      {/* Name input */}
                      <div>
                        <label htmlFor="name" className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`mt-2 w-full rounded-lg border bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                            errors.name
                              ? "border-red-500/50 focus:ring-red-400"
                              : "border-white/5 focus:ring-blue-400"
                          }`}
                          placeholder="Anand Verma"
                        />
                        {errors.name && (
                          <span className="text-[10px] text-red-400 mt-1 block">{errors.name}</span>
                        )}
                      </div>

                      {/* Email input */}
                      <div>
                        <label htmlFor="email" className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                          Your Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`mt-2 w-full rounded-lg border bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                            errors.email
                              ? "border-red-500/50 focus:ring-red-400"
                              : "border-white/5 focus:ring-blue-400"
                          }`}
                          placeholder="anand@example.com"
                        />
                        {errors.email && (
                          <span className="text-[10px] text-red-400 mt-1 block">{errors.email}</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-left">
                      {/* Phone input */}
                      <div>
                        <label htmlFor="phone" className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      {/* Company input */}
                      <div>
                        <label htmlFor="company" className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="ApexData"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-left">
                      {/* Project Type selection */}
                      <div>
                        <label htmlFor="projectType" className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                          Project Type
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Budget selection */}
                      <div>
                        <label htmlFor="budget" className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          {budgets.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message input */}
                    <div className="text-left">
                      <label htmlFor="message" className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                        Project details *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className={`mt-2 w-full rounded-lg border bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                          errors.message
                            ? "border-red-500/50 focus:ring-red-400"
                            : "border-white/5 focus:ring-blue-400"
                        }`}
                        placeholder="Tell us what you are building. Include details about specific features, page counts, or deadlines..."
                      ></textarea>
                      {errors.message && (
                        <span className="text-[10px] text-red-400 mt-1 block">{errors.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-blue-600 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:bg-blue-500 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      {isSubmitting ? (
                        <span>Sending to WhatsApp & Email...</span>
                      ) : (
                        <>
                          <span>Send Inquiry (Email & WhatsApp)</span>
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-center text-[11px] text-slate-400">
                      Submissions are sent directly to our email &amp; connected immediately via WhatsApp.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10 text-center"
                  >
                    <CheckCircle2 className="h-16 w-16 text-emerald-500" />
                    <h4 className="mt-5 text-2xl font-bold text-slate-950">Inquiry Sent Successfully!</h4>
                    <p className="mt-3 text-sm text-slate-500 max-w-md">
                      Thank you for contacting OneSiteStudios. We have received your project details and our team will get in touch with you shortly.
                    </p>

                    {/* WhatsApp Direct Action Card */}
                    {submittedWhatsappUrl && (
                      <div className="mt-6 w-full max-w-md rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 text-left shadow-sm">
                        <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-sm">
                          <MessageCircle className="h-5 w-5 text-emerald-600" />
                          <span>Direct WhatsApp Channel</span>
                        </div>
                        <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                          Your requirement is formatted and ready. If WhatsApp didn&apos;t open automatically, click the button below to message us directly.
                        </p>
                        <a
                          href={submittedWhatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-500 hover:scale-[1.01]"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>Chat on WhatsApp ({phone})</span>
                          <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                        </a>
                      </div>
                    )}

                    {/* Email Delivery Status Card */}
                    <div className="mt-4 w-full max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left text-xs">
                      <div className="flex items-center gap-2 text-slate-800 font-semibold">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span>Email Inbox ({email})</span>
                      </div>
                      <p className="mt-1.5 text-slate-600 leading-relaxed">
                        {emailStatus === "sent" ? (
                          <span className="text-emerald-700 font-medium">✓ A copy of this inquiry has been sent to our email inbox.</span>
                        ) : emailStatus === "key_needed" ? (
                          <span>Your inquiry has been sent via WhatsApp. To also receive instant emails in your inbox, enter your free Web3Forms access key in <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[11px] text-slate-800">siteData.ts</code>.</span>
                        ) : (
                          <span>Inquiry logged. You can also reach our team directly at <a href={`mailto:${email}`} className="text-blue-600 underline font-semibold">{email}</a>.</span>
                        )}
                      </p>
                    </div>

                    {/* Verified Client Badge & Review Link */}
                    <div className="mt-4 w-full max-w-md rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-left">
                      <div className="flex items-center gap-2 text-blue-700 font-semibold text-xs">
                        <Sparkles className="h-4 w-4" />
                        <span>Verified Client Access Granted</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                        As a registered client, you are now authorized to submit your feedback in our <strong>What Our Clients Say</strong> section.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById("testimonials");
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth" });
                          } else {
                            window.location.href = "/#testimonials";
                          }
                        }}
                        className="mt-3 inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Go to Client Reviews &rarr;
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setEmailStatus("idle");
                      }}
                      className="mt-6 rounded-full border border-slate-200 bg-slate-50 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-900 hover:bg-slate-100"
                    >
                      Submit Another Project Request
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
