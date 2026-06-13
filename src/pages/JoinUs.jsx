import React, { useState, useEffect, useMemo } from 'react';
import { Mail, Briefcase, MapPin, Users, Send, Search, X, ChevronRight, ArrowUpRight } from 'lucide-react';
import jobsData from '../data/jobs.json';

export default function JoinUs() {
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        window.scrollTo(0, 0);
    }, []);

    const departments = ['All', ...new Set(jobsData.map(job => job.department))];

    // Logic: Combine Search and Category Filter
    const filteredJobs = useMemo(() => {
        return jobsData.filter(job => {
            const matchesFilter = filter === 'All' || job.department === filter;
            const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.department.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [filter, searchQuery]);

    return (
        <div className="pt-32 pb-20 bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">

                {/* --- MINIMALIST HEADER --- */}
                <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <h4 className="text-brand-accent font-bold uppercase tracking-[0.3em] text-[9px] mb-2">Opportunities</h4>
                    <h1 className="text-4xl md:text-5xl font-black text-brand-text dark:text-white tracking-tighter italic">
                        Work with <span className="text-brand-accent">CWC.</span>
                    </h1>
                </div>

                {/* --- SEARCH & FILTER BAR (COMPACT) --- */}

                <div className="flex flex-col md:flex-row items-center justify-end gap-4 mb-8 bg-white dark:bg-brand-darkCard p-3 rounded-2xl border border-brand-secondary dark:border-gray-800 shadow-sm">

                    {/* Small Search Box */}
                    <div className="relative w-full md:w-72 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
                        <input
                            type="text"
                            placeholder="Search roles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-brand-primary dark:bg-gray-800/50 border border-transparent focus:border-brand-accent/30 rounded-xl py-2 pl-9 pr-8 outline-none dark:text-white text-xs font-bold transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-accent"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>

                </div>

                {/* --- JOBS LIST (RELIABLE LIST VIEW) --- */}
                <div className="space-y-3">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job, i) => (
                            <div
                                key={job.id}
                                className={`group bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-secondary dark:border-gray-800 hover:border-brand-accent hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="hidden sm:flex w-10 h-10 bg-brand-primary dark:bg-gray-800 rounded-xl items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
                                        <Briefcase className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-brand-accent px-2 py-0.5 bg-brand-accent/5 rounded">
                                                {job.department}
                                            </span>
                                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                                                <Users className="w-3 h-3" /> {job.vacancies} Openings
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-black text-brand-text dark:text-white tracking-tight leading-none group-hover:translate-x-1 transition-transform">
                                            {job.title}
                                        </h3>
                                        <p className="text-[10px] font-medium text-gray-400 mt-2 flex items-center gap-1.5 uppercase tracking-tighter">
                                            <MapPin className="w-3 h-3" /> {job.location} • {job.type}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-brand-secondary dark:border-gray-800">
                                    <div className="hidden lg:block text-right">
                                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">Contact HR</p>
                                        <p className="text-[11px] font-bold text-brand-text dark:text-gray-300">{job.email}</p>
                                    </div>
                                    <a
                                        href={`mailto:${job.email}?subject=Application: ${job.title}`}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-brand-text dark:bg-brand-accent text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] shadow-3d hover:-translate-y-1 active:translate-y-0 transition-all"
                                    >
                                        Apply Now <ArrowUpRight className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-center opacity-40 italic text-sm text-gray-500">
                            No matching positions found.
                        </div>
                    )}
                </div>

                {/* --- COMPACT FOOTER CTA --- */}
                <div className={`mt-12 p-6 rounded-3xl bg-brand-primary dark:bg-brand-darkCard border border-brand-secondary dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm">
                            <Mail className="w-4 h-4 text-brand-accent" />
                        </div>
                        <div className="text-center sm:text-left">
                            <h4 className="text-sm font-black text-brand-text dark:text-white leading-none mb-1">Spontaneous Application</h4>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-widest">Send your CV to hr@ecompusell.com</p>
                        </div>
                    </div>
                    <a href="mailto:hr@ecompusell.com" className="text-[9px] font-black text-brand-accent hover:text-brand-text dark:hover:text-white uppercase tracking-[0.2em] transition-colors border-b-2 border-brand-accent pb-1">
                        Let's talk <ChevronRight className="inline w-3 h-3" />
                    </a>
                </div>

            </div>
        </div>
    );
}