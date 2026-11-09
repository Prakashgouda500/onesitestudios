import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Lock,
  MessageSquarePlus,
  Quote,
  ShieldCheck,
  Star,
  UserCheck,
  X,
} from "lucide-react";
import type { ClientReview, RegisteredClient } from "../utils/clientReviewStore";
import {
  findClientByEmail,
  getClientReviews,
  getCurrentClient,
  submitClientReview,
} from "../utils/clientReviewStore";

export const Testimonials: React.FC = () => {
  // Combine any static siteData testimonials (empty by default) with verified registered client reviews
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<RegisteredClient | null>(null);

  // Modal flow state
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [activeStep, setActiveStep] = useState<"verify" | "form" | "success">("verify");

  // Form state
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [quote, setQuote] = useState("");
  const [formError, setFormError] = useState("");

  const loadReviewsAndClient = () => {
    const storedReviews = getClientReviews();
    setReviews(storedReviews);

    const client = getCurrentClient();
    setCurrentClient(client);
    if (client) {
      setName(client.name);
      setCompany(client.company || "");
      setActiveStep("form");
    } else {
      setActiveStep("verify");
    }
  };

  useEffect(() => {
    loadReviewsAndClient();

    const handleReviewAdded = () => {
      setReviews(getClientReviews());
    };

    const handleClientRegistered = () => {
      const client = getCurrentClient();
      setCurrentClient(client);
      if (client) {
        setName(client.name);
        setCompany(client.company || "");
        setActiveStep("form");
      }
    };

    window.addEventListener("onesite_review_added", handleReviewAdded);
    window.addEventListener("onesite_client_registered", handleClientRegistered);
    window.addEventListener("storage", loadReviewsAndClient);

    return () => {
      window.removeEventListener("onesite_review_added", handleReviewAdded);
      window.removeEventListener("onesite_client_registered", handleClientRegistered);
      window.removeEventListener("storage", loadReviewsAndClient);
    };
  }, []);

  const openReviewModal = () => {
    const client = getCurrentClient();
    setCurrentClient(client);
    setVerifyError("");
    setFormError("");

    if (client) {
      setName(client.name);
      setCompany(client.company || "");
      setActiveStep("form");
    } else {
      setActiveStep("verify");
    }
    setIsModalOpen(true);
  };

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyError("");

    if (!verifyEmail.trim()) {
      setVerifyError("Please enter your registered email address.");
      return;
    }

    const matched = findClientByEmail(verifyEmail);
    if (!matched) {
      setVerifyError(
        "No registered project was found for this email. Only clients who register to get a project done from us are allowed to give a review."
      );
      return;
    }

    setCurrentClient(matched);
    setName(matched.name);
    setCompany(matched.company || "");
    setActiveStep("form");
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!quote.trim()) {
      setFormError("Please share your feedback or project experience.");
      return;
    }

    if (!currentClient) {
      setFormError("Authentication missing. Please verify your registered email first.");
      setActiveStep("verify");
      return;
    }

    const result = submitClientReview({
      email: currentClient.email,
      name: name || currentClient.name,
      role: role.trim() || "Client",
      company: company.trim() || currentClient.company || "Project Client",
      quote: quote.trim(),
      rating,
    });

    if (!result.success) {
      setFormError(result.error || "Failed to submit review.");
      return;
    }

    setActiveStep("success");
    setReviews(getClientReviews());

    // Auto-close modal after brief delay
    setTimeout(() => {
      setIsModalOpen(false);
      setQuote("");
      setRole("");
      setActiveStep("form");
    }, 2000);
  };

  const handleRegisterProjectRedirect = () => {
    setIsModalOpen(false);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact";
    }
  };

  // Calculate average rating
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  return (
    <section id="testimonials" className="relative w-full overflow-hidden border-t border-slate-200 bg-slate-50 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-8 lg:grid-cols-[0.85fr_1.45fr] lg:gap-16">
        
        {/* Left Stats & Policy Card */}
        <div className="text-left">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
            [ Client Feedback ]
          </p>
          <h2 className="mt-5 max-w-md text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            What Our <span className="text-blue-600">Clients</span> Say
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500">
            Real feedback from verified clients who trust OneSiteStudios to build and scale their digital products.
          </p>

          {/* Rating Summary Box */}
          <div className="mt-10 rounded-2xl bg-gradient-to-br from-[#091540] via-[#0f2e7b] to-[#1456d8] p-8 text-white shadow-xl shadow-blue-900/15">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, index) => {
                const filled = reviews.length > 0 && index < Math.round(Number(avgRating));
                return (
                  <Star
                    key={index}
                    className={`h-5 w-5 ${
                      filled ? "fill-amber-400 text-amber-400" : "fill-white/10 text-white/30"
                    }`}
                  />
                );
              })}
            </div>

            <p className="mt-6 text-5xl font-extrabold tracking-tight">
              {reviews.length > 0 ? avgRating : "—"}
            </p>

            <p className="mt-2 text-sm text-blue-100 font-medium">
              {reviews.length > 0
                ? `Based on ${reviews.length} verified client review${reviews.length > 1 ? "s" : ""}`
                : "No client reviews given yet (0 reviews)"}
            </p>

            {/* Verified Gated Badge Notice */}
            <div className="mt-6 rounded-xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-200">
                <Lock className="h-3.5 w-3.5" />
                <span>Verified Client Reviews Only</span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-blue-100/80">
                Only clients who register to get a project done from us are permitted to leave reviews.
              </p>
            </div>

            {/* Write a Review Button */}
            <button
              type="button"
              onClick={openReviewModal}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-900 shadow-md transition-all hover:bg-blue-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <MessageSquarePlus className="h-4 w-4 text-blue-600" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Right Section: Reviews List or Gated Empty State */}
        <div>
          {reviews.length === 0 ? (
            /* Empty State Container */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center sm:p-12 shadow-sm"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner">
                <ShieldCheck className="h-8 w-8 text-blue-600" />
              </div>

              <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                <Lock className="h-3 w-3 text-slate-500" />
                Protected Review Wall
              </span>

              <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                No Reviews Given Yet
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-500">
                This section is kept empty as no reviews have been submitted yet. To guarantee 100% authenticity and prevent fake feedback, our review system is strictly restricted:{" "}
                <span className="font-semibold text-slate-700">
                  only clients who register to get a project done from us are authorized to give reviews.
                </span>
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={openReviewModal}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <MessageSquarePlus className="h-4 w-4" />
                  <span>Leave a Review (Registered Clients)</span>
                </button>

                <button
                  type="button"
                  onClick={handleRegisterProjectRedirect}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-800 transition-all hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  <span>Register a Project First</span>
                  <ArrowRight className="h-4 w-4 text-slate-500" />
                </button>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-6 text-xs text-slate-400">
                Have you already submitted a project request? Click <strong>Leave a Review</strong> and verify your email.
              </div>
            </motion.div>
          ) : (
            /* Active Reviews List */
            <div className="space-y-6">
              {reviews.map((testimonial, index) => (
                <motion.article
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                  className="relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9 text-left"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className={`h-4 w-4 ${
                            starIndex < testimonial.rating ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-300"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Verified Client Badge */}
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-0.5 text-[11px] font-semibold text-emerald-700">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      Verified Client {testimonial.projectType ? `• ${testimonial.projectType}` : ""}
                    </span>
                  </div>

                  <Quote className="absolute right-7 top-7 h-10 w-10 text-blue-100/60 pointer-events-none" />

                  <blockquote className="relative mt-5 max-w-3xl text-lg italic leading-relaxed text-slate-800 sm:text-xl">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <div className="mt-7 flex items-center gap-3 border-t border-slate-200 pt-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                      {testimonial.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <cite className="not-italic">
                      <span className="block text-sm font-bold text-slate-900">{testimonial.name}</span>
                      <span className="block text-xs text-slate-500">
                        {testimonial.role}, {testimonial.company}
                      </span>
                    </cite>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Submission & Verification Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl text-left"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Step 1: Verification if not recognized */}
              {activeStep === "verify" && (
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Lock className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-950">
                    Registered Client Verification
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                    Only clients who have registered a project with OneSiteStudios can write a review. Please enter the email address you used when registering your project.
                  </p>

                  <form onSubmit={handleVerifyEmail} className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="verifyEmail" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Registered Project Email
                      </label>
                      <input
                        type="email"
                        id="verifyEmail"
                        value={verifyEmail}
                        onChange={(e) => setVerifyEmail(e.target.value)}
                        placeholder="e.g. client@company.com"
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {verifyError && (
                      <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700">
                        <div className="flex gap-2">
                          <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                          <span>{verifyError}</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRegisterProjectRedirect}
                          className="mt-2.5 block text-xs font-bold text-red-800 underline hover:text-red-900"
                        >
                          Register a project now to become eligible &rarr;
                        </button>
                      </div>
                    )}

                    <div className="flex flex-col gap-2 pt-2">
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500"
                      >
                        <UserCheck className="h-4 w-4" />
                        <span>Verify & Continue</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleRegisterProjectRedirect}
                        className="w-full text-center py-2 text-xs font-semibold text-slate-500 hover:text-blue-600"
                      >
                        Don't have a registered project yet? Register here
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 2: The Verified Review Form */}
              {activeStep === "form" && currentClient && (
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Verified Registered Client
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveStep("verify")}
                      className="text-[11px] text-slate-400 hover:text-blue-600 underline"
                    >
                      Change email
                    </button>
                  </div>

                  <h3 className="mt-3 text-xl font-bold text-slate-950">
                    Leave Client Review
                  </h3>
                  <p className="text-xs text-slate-500">
                    Posting as <strong>{currentClient.name}</strong> ({currentClient.email})
                    {currentClient.projectType ? ` • Project: ${currentClient.projectType}` : ""}
                  </p>

                  <form onSubmit={handleSubmitReview} className="mt-5 space-y-4">
                    {/* Interactive Star Rating */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                        Your Rating
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((starIndex) => {
                            const isFilled = starIndex <= (hoverRating || rating);
                            return (
                              <button
                                key={starIndex}
                                type="button"
                                onClick={() => setRating(starIndex)}
                                onMouseEnter={() => setHoverRating(starIndex)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="p-1 text-slate-300 hover:scale-110 transition-transform focus:outline-none"
                              >
                                <Star
                                  className={`h-6 w-6 ${
                                    isFilled ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-300"
                                  }`}
                                />
                              </button>
                            );
                          })}
                        </div>
                        <span className="text-xs font-semibold text-slate-700">
                          {hoverRating || rating} / 5 Stars
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="reviewName" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="reviewName"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label htmlFor="reviewRole" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Role & Company
                        </label>
                        <input
                          type="text"
                          id="reviewRole"
                          value={role ? `${role}${company ? `, ${company}` : ""}` : company}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val.includes(",")) {
                              const [r, ...c] = val.split(",");
                              setRole(r.trim());
                              setCompany(c.join(",").trim());
                            } else {
                              setRole(val);
                            }
                          }}
                          className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g. Founder, TechCorp"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="reviewQuote" className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Review / Experience *
                      </label>
                      <textarea
                        id="reviewQuote"
                        rows={4}
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        placeholder="Tell others about your experience working with OneSiteStudios on your project..."
                        className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {formError && (
                      <p className="text-xs text-red-600">{formError}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-blue-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/25 transition-all hover:bg-blue-500"
                    >
                      Publish Verified Review
                    </button>
                  </form>
                </div>
              )}

              {/* Step 3: Success Confirmation */}
              {activeStep === "success" && (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-950">
                    Review Published!
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 max-w-sm mx-auto">
                    Thank you for your feedback! Your verified testimonial is now displayed under <strong>What Our Clients Say</strong>.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
