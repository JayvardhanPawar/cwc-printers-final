import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
    Search,
    Calendar,
    Clock,
    ArrowRight,
    Tag,
} from "lucide-react";
import { POSTS } from "../data/blogPosts";

const CATEGORIES = [
    "All",
    ...Array.from(new Set(POSTS.map((p) => p.category))),
];

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

function PostCard({ post }) {
    return (
        <Link
            to={`/blog/${post.slug}`}
            className="group flex flex-col bg-white dark:bg-brand-darkCard rounded-xl border border-brand-secondary dark:border-gray-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
            <div className="aspect-[16/10] overflow-hidden bg-brand-secondary/40 dark:bg-gray-800">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
            </div>

            <div className="flex flex-col flex-1 p-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-accent mb-3">
                    <Tag className="w-3.5 h-3.5" />
                    {post.category}
                </span>

                <h3 className="text-lg font-bold text-brand-text dark:text-white leading-snug mb-2 group-hover:text-brand-accent transition-colors">
                    {post.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">
                    {post.excerpt}
                </p>

                <div className="flex items-center gap-4 mt-5 pt-5 border-t border-brand-secondary dark:border-gray-800 text-xs text-gray-500 dark:text-gray-500">
                    <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.date)}
                    </span>

                    <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default function Blog() {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const featuredPost = POSTS.find((p) => p.featured);

    const filteredPosts = useMemo(() => {
        return POSTS.filter((post) => {
            if (post.featured) return false;

            const matchesCategory =
                activeCategory === "All" ||
                post.category === activeCategory;

            const matchesQuery =
                query.trim() === "" ||
                post.title
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                post.excerpt
                    .toLowerCase()
                    .includes(query.toLowerCase());

            return matchesCategory && matchesQuery;
        });
    }, [query, activeCategory]);

    const canonicalUrl =
        typeof window !== "undefined"
            ? `${window.location.origin}/blog`
            : "/blog";

    return (
        <>
            <Helmet>
                <title>Printer Guides & Buying Tips | CWC Blog</title>

                <meta
                    name="description"
                    content="Practical printer guides, comparisons, and how-tos — laser vs inkjet, buying advice, setup, and troubleshooting."
                />

                <meta
                    name="keywords"
                    content="printer guides, laser vs inkjet printers, printer buying guide, connect printer to laptop"
                />

                <meta name="robots" content="index, follow" />

                <link rel="canonical" href={canonicalUrl} />

                <meta
                    property="og:title"
                    content="Printer Guides & Buying Tips | CWC Blog"
                />

                <meta
                    property="og:description"
                    content="Practical printer guides, comparisons, and how-tos — laser vs inkjet, buying advice, setup, and troubleshooting."
                />

                <meta property="og:url" content={canonicalUrl} />

                <meta property="og:type" content="website" />

                <meta property="og:site_name" content="CWC" />

                <meta name="twitter:card" content="summary_large_image" />

                <meta
                    name="twitter:title"
                    content="Printer Guides & Buying Tips | CWC Blog"
                />

                <meta
                    name="twitter:description"
                    content="Practical printer guides, comparisons, and how-tos — laser vs inkjet, buying advice, setup, and troubleshooting."
                />
            </Helmet>

            <main className="min-h-screen bg-brand-primary dark:bg-brand-darkBg pt-20">
                {/* Header */}
                <section className="border-b border-brand-secondary dark:border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        {/* <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent mb-3">
                            CWC Blog
                        </p> */}

                        <h1 className="text-4xl sm:text-5xl font-bold text-brand-text dark:text-white max-w-2xl">
                            Blogs
                        </h1>

                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                            Explore the World of Printing
                        </p>
                    </div>
                </section>

                {/* Search + Filters */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-10">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search articles"
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-brand-secondary dark:border-gray-700 bg-white dark:bg-brand-darkCard text-brand-text dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent/40 transition-all"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    onClick={() =>
                                        setActiveCategory(category)
                                    }
                                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${activeCategory === category
                                            ? "bg-brand-accent text-white border-brand-accent"
                                            : "bg-transparent text-brand-text dark:text-gray-300 border-brand-secondary dark:border-gray-700 hover:border-brand-accent hover:text-brand-accent"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Featured post */}
                    {activeCategory === "All" &&
                        query.trim() === "" &&
                        featuredPost && (
                            <Link
                                to={`/blog/${featuredPost.slug}`}
                                className="group grid md:grid-cols-2 gap-0 bg-white dark:bg-brand-darkCard rounded-2xl border border-brand-secondary dark:border-gray-800 overflow-hidden mb-12 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="aspect-[16/10] md:aspect-auto overflow-hidden bg-brand-secondary/40 dark:bg-gray-800">
                                    <img
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                <div className="flex flex-col justify-center p-8 md:p-10">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-accent mb-4 w-fit">
                                        <Tag className="w-3.5 h-3.5" />
                                        Featured &middot;{" "}
                                        {featuredPost.category}
                                    </span>

                                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-text dark:text-white leading-snug mb-3 group-hover:text-brand-accent transition-colors">
                                        {featuredPost.title}
                                    </h2>

                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                        {featuredPost.excerpt}
                                    </p>

                                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500 mb-6">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {formatDate(featuredPost.date)}
                                        </span>

                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            {featuredPost.readTime}
                                        </span>
                                    </div>

                                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent">
                                        Read article
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        )}

                    {/* Post grid */}
                    {filteredPosts.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.map((post) => (
                                <PostCard
                                    key={post.slug}
                                    post={post}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-lg font-semibold text-brand-text dark:text-white mb-1">
                                No articles found
                            </p>

                            <p className="text-gray-500 dark:text-gray-500">
                                Try a different search term or category.
                            </p>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}