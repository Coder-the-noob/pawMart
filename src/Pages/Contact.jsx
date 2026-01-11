import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const TOPICS = [
  {
    key: "Adoption",
    title: "Adoption help",
    desc: "Questions about adopting a pet or meeting the owner.",
    icon: "🐾",
    tips: [
      "Include pet name / listing title",
      "Tell us your preferred location and time",
      "Mention any special requirements",
    ],
    placeholder: "Write your adoption question... (pet name, location, etc.)",
  },
  {
    key: "Orders",
    title: "Orders & payments",
    desc: "Issues with orders, pricing, or checkout.",
    icon: "🧾",
    tips: [
      "Include order id (if any)",
      "Mention payment method",
      "Describe the exact issue",
    ],
    placeholder: "Describe your order issue... (order id, payment, etc.)",
  },
  {
    key: "Listings",
    title: "Listings support",
    desc: "Help with adding, updating, or removing a listing.",
    icon: "📌",
    tips: [
      "Include listing title",
      "Tell us what you tried",
      "Add screenshot info if possible",
    ],
    placeholder:
      "Describe your listing problem... (title, what happened, etc.)",
  },
  {
    key: "Account",
    title: "Account & login",
    desc: "Login issues, profile, password reset.",
    icon: "🔐",
    tips: [
      "Use your account email",
      "Explain the error message",
      "Try password reset first",
    ],
    placeholder: "Describe your account issue... (email, error message, etc.)",
  },
];

const Contact = () => {
  const [topic, setTopic] = useState(TOPICS[0].key);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const selected = useMemo(
    () => TOPICS.find((t) => t.key === topic) || TOPICS[0],
    [topic]
  );

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onBlur = (e) => setTouched((p) => ({ ...p, [e.target.name]: true }));

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Valid email is required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (form.message.trim().length < 12)
      e.message = "Message must be at least 12 characters";
    return e;
  }, [form]);

  const canSubmit = Object.keys(errors).length === 0;

  const resetForm = () => {
    setSubmitted(false);
    setTopic(TOPICS[0].key);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTouched({});
  };

  const submit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });

    if (!canSubmit) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 900));

      setSubmitted(true);
      toast.success("Message sent! We’ll reply soon.");
    } catch {
      toast.error("Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold">Contact PawMart</h1>
        <p className="text-base-content/70 mt-2">
          Need help with adoption, orders, or listings? Choose a topic and send
          us a message.
        </p>
      </div>

      {/* Success screen */}
      {submitted ? (
        <div className="max-w-3xl mx-auto mt-10">
          <div className="card bg-base-100 border border-base-200 rounded-2xl">
            <div className="card-body">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-success/15 flex items-center justify-center text-success text-2xl">
                  ✓
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Message received</h2>
                  <p className="text-base-content/70 mt-2">
                    Thanks! Our team will respond within{" "}
                    <span className="font-medium">24 hours</span> (Sat–Thu).
                  </p>

                  <div className="mt-4 text-sm">
                    <div className="font-semibold">Summary</div>
                    <div className="mt-2 space-y-1 text-base-content/70">
                      <p>
                        <span className="font-medium text-base-content">
                          Topic:
                        </span>{" "}
                        {topic}
                      </p>
                      <p>
                        <span className="font-medium text-base-content">
                          Subject:
                        </span>{" "}
                        {form.subject}
                      </p>
                      <p>
                        <span className="font-medium text-base-content">
                          Email:
                        </span>{" "}
                        {form.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="divider"></div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/" className="btn btn-primary flex-1">
                  Back to Home
                </Link>
                <Link to="/browse" className="btn btn-outline flex-1">
                  Browse Listings
                </Link>
                <button onClick={resetForm} className="btn btn-ghost flex-1">
                  Send Another
                </button>
              </div>

              <p className="text-xs text-base-content/60 text-center mt-2">
                Tip: For adoption meetups, prefer public locations and confirm
                details before meeting.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-6 mt-10">
          {/* Support hub */}
          <aside className="lg:col-span-5">
            <div className="card bg-base-100 border border-base-200 rounded-2xl">
              <div className="card-body">
                <h2 className="text-xl font-semibold">Support topics</h2>
                <p className="text-base-content/70 text-sm">
                  Pick the topic that matches your issue.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3 mt-5">
                  {TOPICS.map((t) => {
                    const active = t.key === topic;
                    return (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setTopic(t.key)}
                        className={`text-left p-4 rounded-2xl border transition ${
                          active
                            ? "border-primary bg-primary/5"
                            : "border-base-200 hover:bg-base-200/60"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{t.icon}</div>
                          <div>
                            <div className="font-semibold">{t.title}</div>
                            <div className="text-sm text-base-content/70">
                              {t.desc}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="divider"></div>

                <div className="text-sm">
                  <div className="font-semibold">Response time</div>
                  <p className="text-base-content/70">
                    Usually within <span className="font-medium">24 hours</span>{" "}
                    (Sat–Thu).
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Form */}
          <main className="lg:col-span-7">
            <div className="card bg-base-100 border border-base-200 rounded-2xl">
              <div className="card-body">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">Send a message</h2>
                    <p className="text-base-content/70 text-sm">
                      Topic: <span className="font-medium">{selected.key}</span>
                    </p>
                  </div>
                  <span className="badge badge-outline">
                    {selected.icon} {selected.key}
                  </span>
                </div>

                {/* Tips */}
                <div className="mt-5 rounded-2xl border border-base-200 bg-base-200/40 p-4">
                  <div className="font-semibold text-sm">Helpful tips</div>
                  <ul className="list-disc pl-5 mt-2 text-sm text-base-content/70 space-y-1">
                    {selected.tips.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>

                <form onSubmit={submit} className="mt-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        <span className="label-text font-medium">Name</span>
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        onBlur={onBlur}
                        className={`input input-bordered w-full ${
                          touched.name && errors.name ? "input-error" : ""
                        }`}
                        placeholder="Your name"
                      />
                      {touched.name && errors.name && (
                        <p className="text-sm text-error mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text font-medium">Email</span>
                      </label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        onBlur={onBlur}
                        className={`input input-bordered w-full ${
                          touched.email && errors.email ? "input-error" : ""
                        }`}
                        placeholder="your@email.com"
                      />
                      {touched.email && errors.email && (
                        <p className="text-sm text-error mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Subject</span>
                    </label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={onChange}
                      onBlur={onBlur}
                      className={`input input-bordered w-full ${
                        touched.subject && errors.subject ? "input-error" : ""
                      }`}
                      placeholder={`About: ${selected.key}`}
                    />
                    {touched.subject && errors.subject && (
                      <p className="text-sm text-error mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Message</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      onBlur={onBlur}
                      className={`textarea textarea-bordered w-full min-h-36 ${
                        touched.message && errors.message
                          ? "textarea-error"
                          : ""
                      }`}
                      placeholder={selected.placeholder}
                    />
                    {touched.message && errors.message && (
                      <p className="text-sm text-error mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading || !canSubmit}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>

                  <p className="text-xs text-base-content/60 text-center">
                    Your info is used only to respond to your request.
                  </p>
                </form>
              </div>
            </div>
          </main>
        </div>
      )}
    </section>
  );
};

export default Contact;