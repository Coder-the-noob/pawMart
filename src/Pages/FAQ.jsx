const faqs = [
  {
    q: "How does pet adoption work?",
    a: "Browse pets, contact the owner or shelter, and complete the adoption steps.",
  },
  {
    q: "Can I add my own listings?",
    a: "Yes. After logging in, go to Add Listing from the navbar.",
  },
  {
    q: "Is PawMart secure?",
    a: "Authentication and data are handled securely using Firebase.",
  },
  {
    q: "Can I edit or delete my listings?",
    a: "Yes. Go to My Listings to manage your posted items.",
  },
];

const FAQ = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>

      <div className="mt-8 space-y-4">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="collapse collapse-arrow border border-base-200 rounded-xl"
          >
            <input type="radio" name="faq" />
            <div className="collapse-title font-medium">
              {item.q}
            </div>
            <div className="collapse-content text-base-content/70">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
