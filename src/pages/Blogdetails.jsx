import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    Calendar,
    Clock,
    ArrowLeft,
    Tag,
    User,
    Share2,
} from 'lucide-react';
import {
    getPostBySlug,
    getRelatedPosts,
} from '../data/blogPosts';

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}

function ContentBlock({ block }) {
    switch (block.type) {
        case 'h2':
            return (
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-text dark:text-white mt-12 mb-5 scroll-mt-24">
                    {block.text}
                </h2>
            );

        case 'quote':
            return (
                <blockquote className="relative my-10 pl-6 pr-4 py-5 rounded-r-lg bg-brand-secondary/30 dark:bg-gray-800/50 border-l-4 border-brand-accent">
                    <p className="text-lg sm:text-xl italic leading-relaxed text-brand-text dark:text-gray-100">
                        {block.text}
                    </p>
                </blockquote>
            );

        case 'list':
            return (
                <ul className="my-7 space-y-4">
                    {block.items.map((item, i) => (
                        <li
                            key={i}
                            className="flex items-start gap-3 text-lg leading-relaxed text-gray-700 dark:text-gray-300"
                        >
                            <span className="mt-3 w-2 h-2 rounded-full bg-brand-accent shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            );

        case 'p':
        default:
            return (
                <p className="text-lg leading-8 text-gray-700 dark:text-gray-300 mb-6">
                    {block.text}
                </p>
            );
    }
}

function RelatedCard({ post }) {
    return (
        <Link
            to={`/blog/${post.slug}`}
            className="group flex flex-col bg-white dark:bg-brand-darkCard rounded-2xl border border-brand-secondary dark:border-gray-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
            <div className="aspect-[16/10] overflow-hidden bg-brand-secondary/40 dark:bg-gray-800">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
            </div>

            <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-accent">
                    {post.category}
                </span>

                <h3 className="text-base font-bold text-brand-text dark:text-white leading-snug mt-2 group-hover:text-brand-accent transition-colors">
                    {post.title}
                </h3>
            </div>
        </Link>
    );
}

export default function BlogDetails() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = getPostBySlug(slug);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        function onScroll() {
            const doc = document.documentElement;

            const scrollTop =
                doc.scrollTop || document.body.scrollTop;

            const scrollHeight =
                (doc.scrollHeight || document.body.scrollHeight) -
                doc.clientHeight;

            const pct =
                scrollHeight > 0
                    ? (scrollTop / scrollHeight) * 100
                    : 0;

            setProgress(pct);
        }

        window.addEventListener('scroll', onScroll, {
            passive: true,
        });

        return () =>
            window.removeEventListener('scroll', onScroll);
    }, []);

    if (!post) {
        return (
            <>
                <Helmet>
                    <title>Article Not Found | CWC Blog</title>

                    <meta
                        name="robots"
                        content="noindex, nofollow"
                    />
                </Helmet>

                <main className="min-h-screen bg-brand-primary dark:bg-brand-darkBg pt-20 flex items-center">
                    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                        <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent mb-3">
                            404
                        </p>

                        <h1 className="text-3xl font-bold text-brand-text dark:text-white mb-4">
                            We couldn't find that article
                        </h1>

                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            It may have been moved or the link is out of date.
                        </p>

                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-accent text-white font-semibold hover:opacity-90 transition-opacity"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to all articles
                        </Link>
                    </div>
                </main>
            </>
        );
    }

    const relatedPosts = getRelatedPosts(post);

    const metaTitle =
        post.metaTitle?.trim() ||
        `${post.title} | CWC Blog`;

    const metaDescription =
        post.metaDescription?.trim() ||
        post.excerpt ||
        `Read ${post.title} on the CWC Blog.`;

    const primaryKeyword =
        post.primaryKeyword?.trim() ||
        '';

    const secondaryKeywords = Array.isArray(
        post.secondaryKeywords
    )
        ? post.secondaryKeywords.filter(
              (keyword) =>
                  typeof keyword === 'string' &&
                  keyword.trim() !== ''
          )
        : [];

    const allKeywords = [
        primaryKeyword,
        ...secondaryKeywords,
    ].filter(Boolean);

    const canonicalUrl =
        typeof window !== 'undefined'
            ? `${window.location.origin}/blog/${post.slug}`
            : `/blog/${post.slug}`;

    const imageUrl =
        typeof window !== 'undefined' && post.image
            ? new URL(
                  post.image,
                  window.location.origin
              ).href
            : post.image;

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: metaDescription,
        image: imageUrl ? [imageUrl] : undefined,
        datePublished: post.date,
        dateModified: post.updatedAt || post.date,
        author: {
            '@type': 'Person',
            name: post.author || 'CWC',
        },
        publisher: {
            '@type': 'Organization',
            name: 'CWC',
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl,
        },
        keywords:
            allKeywords.length > 0
                ? allKeywords.join(', ')
                : undefined,
    };

    return (
        <>
            <Helmet>
                <title>{metaTitle}</title>

                <meta
                    name="description"
                    content={metaDescription}
                />

                <meta
                    name="robots"
                    content="index, follow"
                />

                <link
                    rel="canonical"
                    href={canonicalUrl}
                />

                <meta
                    property="og:type"
                    content="article"
                />

                <meta
                    property="og:title"
                    content={metaTitle}
                />

                <meta
                    property="og:description"
                    content={metaDescription}
                />

                <meta
                    property="og:url"
                    content={canonicalUrl}
                />

                {imageUrl && (
                    <meta
                        property="og:image"
                        content={imageUrl}
                    />
                )}

                <meta
                    property="og:site_name"
                    content="CWC"
                />

                <meta
                    name="twitter:card"
                    content="summary_large_image"
                />

                <meta
                    name="twitter:title"
                    content={metaTitle}
                />

                <meta
                    name="twitter:description"
                    content={metaDescription}
                />

                {imageUrl && (
                    <meta
                        name="twitter:image"
                        content={imageUrl}
                    />
                )}

                {post.date && (
                    <meta
                        property="article:published_time"
                        content={post.date}
                    />
                )}

                {post.updatedAt && (
                    <meta
                        property="article:modified_time"
                        content={post.updatedAt}
                    />
                )}

                {post.category && (
                    <meta
                        property="article:section"
                        content={post.category}
                    />
                )}

                {allKeywords.map((keyword) => (
                    <meta
                        key={keyword}
                        property="article:tag"
                        content={keyword}
                    />
                ))}

                <script type="application/ld+json">
                    {JSON.stringify(articleSchema)}
                </script>
            </Helmet>

            <main className="min-h-screen bg-brand-primary dark:bg-brand-darkBg pt-20">
                <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
                    <div
                        className="h-full bg-brand-accent transition-[width] duration-150 ease-out"
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                </div>

                <section className="border-b border-brand-secondary dark:border-gray-800 bg-gradient-to-b from-brand-secondary/30 to-transparent dark:from-gray-900/40">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
                        <button
                            type="button"
                            onClick={() => navigate('/blog')}
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-brand-accent transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to all articles
                        </button>

                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-accent mb-4 px-3 py-1 rounded-full bg-brand-accent/10">
                            <Tag className="w-3.5 h-3.5" />
                            {post.category}
                        </span>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text dark:text-white leading-tight tracking-tight mb-6">
                            {post.title}
                        </h1>

                        {post.excerpt && (
                            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-3xl">
                                {post.excerpt}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500 dark:text-gray-500 border-t border-brand-secondary dark:border-gray-800 pt-6">
                            <span className="flex items-center gap-1.5 font-medium text-brand-text dark:text-gray-300">
                                <User className="w-4 h-4" />
                                {post.author}
                            </span>

                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {formatDate(post.date)}
                            </span>

                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                            </span>

                            <button
                                type="button"
                                onClick={() => {
                                    if (
                                        navigator.share
                                    ) {
                                        navigator.share({
                                            title: metaTitle,
                                            text: metaDescription,
                                            url: window.location.href,
                                        });
                                    } else {
                                        navigator.clipboard?.writeText(
                                            window.location.href
                                        );
                                    }
                                }}
                                className="flex items-center gap-1.5 ml-auto hover:text-brand-accent transition-colors"
                            >
                                <Share2 className="w-4 h-4" />
                                Share
                            </button>
                        </div>
                    </div>
                </section>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-px">
                    <div className="aspect-[21/9] rounded-2xl overflow-hidden bg-brand-secondary/40 dark:bg-gray-800 mt-10 shadow-lg">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {post.content.map((block, i) => (
                        <ContentBlock
                            key={i}
                            block={block}
                        />
                    ))}
                </article>

                {relatedPosts.length > 0 && (
                    <section className="border-t border-brand-secondary dark:border-gray-800 bg-brand-secondary/10 dark:bg-gray-900/30">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                            <h2 className="text-2xl font-bold text-brand-text dark:text-white mb-8">
                                More from the blog
                            </h2>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedPosts.map((related) => (
                                    <RelatedCard
                                        key={related.slug}
                                        post={related}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}