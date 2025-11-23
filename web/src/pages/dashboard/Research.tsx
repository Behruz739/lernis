import React, { useState, useEffect } from 'react';
import { researchService } from '../../services/firebaseService';
import type { ResearchPaper } from '../../services/firebaseService';
import { Search, Filter, Plus, FileText, Download, Eye, Calendar, User as UserIcon } from 'lucide-react';

const Research: React.FC = () => {
    const [papers, setPapers] = useState<ResearchPaper[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    useEffect(() => {
        loadPapers();
    }, []);

    const loadPapers = async () => {
        try {
            const data = await researchService.getAll();
            setPapers(data);
        } catch (error) {
            console.error('Error loading papers:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPapers = papers.filter(paper => {
        const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            paper.abstract.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = selectedTag ? paper.tags.includes(selectedTag) : true;
        return matchesSearch && matchesTag;
    });

    const allTags = Array.from(new Set(papers.flatMap(p => p.tags)));

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Research Papers</h1>
                    <p className="text-gray-600">Explore and share academic research</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="h-5 w-5" />
                    Submit Paper
                </button>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search papers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                    <Filter className="h-5 w-5 text-gray-500" />
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${!selectedTag ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        All
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${selectedTag === tag ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Papers List */}
            <div className="grid gap-6">
                {filteredPapers.length > 0 ? (
                    filteredPapers.map((paper) => (
                        <div key={paper.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer">
                                            {paper.title}
                                        </h3>
                                        <span className="text-sm text-gray-500 whitespace-nowrap flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {paper.publicationDate}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {paper.abstract}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <UserIcon className="h-4 w-4" />
                                            {paper.authors.join(', ')}
                                        </div>
                                        {paper.journal && (
                                            <div className="flex items-center gap-1">
                                                <FileText className="h-4 w-4" />
                                                {paper.journal}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1">
                                            <Eye className="h-4 w-4" />
                                            {paper.views} views
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {paper.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex md:flex-col gap-2 justify-end">
                                    <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">
                                        <Eye className="h-4 w-4" />
                                        View
                                    </button>
                                    {paper.fileUrl && (
                                        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                                            <Download className="h-4 w-4" />
                                            PDF
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No papers found</h3>
                        <p className="text-gray-500">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Research;
