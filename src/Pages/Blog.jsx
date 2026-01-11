import { Link } from "react-router-dom";

const posts = [
  {
    id: 1,
    title: "Winter Care Tips for Pets",
    excerpt: "Keep your pets warm, healthy, and active during cold days.",
  },
  {
    id: 2,
    title: "Healthy Feeding Guide",
    excerpt: "Learn how to choose the right food for your pet.",
  },
  {
    id: 3,
    title: "Grooming Basics at Home",
    excerpt: "Simple grooming routines every pet owner should know.",
  },
];

const Blog = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Care Tips</h1>
      <p className="text-base-content/70 mt-1">
        Helpful articles to keep your pets happy and healthy.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="card border border-base-200 rounded-2xl hover:shadow-md transition"
          >
            <div className="card-body">
              <h3 className="font-semibold text-lg">{post.title}</h3>
              <p className="text-base-content/70">{post.excerpt}</p>
              <Link
                to={`/blog/${post.id}`}
                className="btn btn-outline btn-sm mt-4"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
