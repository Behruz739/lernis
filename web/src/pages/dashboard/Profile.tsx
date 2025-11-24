import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
    experienceService,
    educationService,
    skillService,
    languageService,
    certificatesService,
    type Experience,
    type Education,
    type Skill,
    type Language
} from '../../services/supabaseService';
import {
    Briefcase, GraduationCap, Award, Globe,
    Plus, Trash2, X, Mail, MapPin, Calendar, Building2
} from 'lucide-react';

const Profile: React.FC = () => {
    const { userData } = useAuth();
    const [loading, setLoading] = useState(true);

    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [educations, setEducations] = useState<Education[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [certificatesCount, setCertificatesCount] = useState(0);

    const [showExpModal, setShowExpModal] = useState(false);
    const [showEduModal, setShowEduModal] = useState(false);
    const [showSkillModal, setShowSkillModal] = useState(false);
    const [showLangModal, setShowLangModal] = useState(false);

    const [expForm, setExpForm] = useState<Partial<Experience>>({});
    const [eduForm, setEduForm] = useState<Partial<Education>>({});
    const [skillForm, setSkillForm] = useState<Partial<Skill>>({});
    const [langForm, setLangForm] = useState<Partial<Language>>({});

    useEffect(() => {
        loadAllData();
    }, [userData]);

    const loadAllData = async () => {
        if (!userData?.id) return;

        try {
            setLoading(true);
            const [exps, edus, skls, langs, certs] = await Promise.all([
                experienceService.getAll(userData.id),
                educationService.getAll(userData.id),
                skillService.getAll(userData.id),
                languageService.getAll(userData.id),
                certificatesService.getAll(userData.id)
            ]);

            setExperiences(exps);
            setEducations(edus);
            setSkills(skls);
            setLanguages(langs);
            setCertificatesCount(certs.length);
        } catch (error) {
            console.error('Error loading profile data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddExperience = async () => {
        if (!userData?.id || !expForm.company || !expForm.position || !expForm.startDate) return;

        await experienceService.add({
            userId: userData.id,
            company: expForm.company,
            position: expForm.position,
            location: expForm.location,
            startDate: expForm.startDate,
            endDate: expForm.endDate,
            current: expForm.current || false,
            description: expForm.description
        } as Omit<Experience, 'id' | 'createdAt'>);

        setExpForm({});
        setShowExpModal(false);
        loadAllData();
    };

    const handleAddEducation = async () => {
        if (!userData?.id || !eduForm.institution || !eduForm.degree || !eduForm.startDate) return;

        await educationService.add({
            userId: userData.id,
            institution: eduForm.institution,
            degree: eduForm.degree,
            fieldOfStudy: eduForm.fieldOfStudy,
            startDate: eduForm.startDate,
            endDate: eduForm.endDate
        } as Omit<Education, 'id' | 'createdAt'>);

        setEduForm({});
        setShowEduModal(false);
        loadAllData();
    };

    const handleAddSkill = async () => {
        if (!userData?.id || !skillForm.skillName || !skillForm.level) return;

        await skillService.add({
            userId: userData.id,
            skillName: skillForm.skillName,
            level: skillForm.level
        } as Omit<Skill, 'id' | 'createdAt'>);

        setSkillForm({});
        setShowSkillModal(false);
        loadAllData();
    };

    const handleAddLanguage = async () => {
        if (!userData?.id || !langForm.language || !langForm.proficiency) return;

        await languageService.add({
            userId: userData.id,
            language: langForm.language,
            proficiency: langForm.proficiency
        } as Omit<Language, 'id' | 'createdAt'>);

        setLangForm({});
        setShowLangModal(false);
        loadAllData();
    };

    const handleDeleteExperience = async (id: string) => {
        await experienceService.delete(id);
        loadAllData();
    };

    const handleDeleteEducation = async (id: string) => {
        await educationService.delete(id);
        loadAllData();
    };

    const handleDeleteSkill = async (id: string) => {
        await skillService.delete(id);
        loadAllData();
    };

    const handleDeleteLanguage = async (id: string) => {
        await languageService.delete(id);
        loadAllData();
    };

    const getSkillWidth = (level: string) => {
        const widths = { 'Beginner': '25%', 'Intermediate': '50%', 'Advanced': '75%', 'Expert': '100%' };
        return widths[level as keyof typeof widths] || '50%';
    };

    const getLangWidth = (proficiency: string) => {
        const widths = { 'Basic': '25%', 'Conversational': '50%', 'Fluent': '75%', 'Native': '100%' };
        return widths[proficiency as keyof typeof widths] || '50%';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Hero Profile Header */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 text-white shadow-2xl">
                {/* Animated Background Orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    {/* Avatar */}
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-md border-4 border-white/40 flex items-center justify-center text-6xl font-black shadow-2xl group-hover:scale-110 transition-transform duration-300">
                            {userData?.displayName?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-green-500 border-4 border-white flex items-center justify-center shadow-lg">
                            <Award className="h-5 w-5 text-white" />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
                            {userData?.displayName || 'User'}
                        </h1>
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-4">
                            <div className="flex items-center gap-2 text-white/90">
                                <Mail className="h-4 w-4" />
                                <span className="font-medium">{userData?.email}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                            <div className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full font-bold text-sm">
                                {certificatesCount} Sertifikat
                            </div>
                            <div className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full font-bold text-sm">
                                {experiences.length} Ish Tajribasi
                            </div>
                            <div className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full font-bold text-sm">
                                {skills.length} Ko'nikma
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Experience Timeline */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 p-8 shadow-lg">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                            <Briefcase className="h-7 w-7" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900">Ish Tajribasi</h2>
                            <p className="text-sm text-gray-600">Professional yutuqlaringiz</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowExpModal(true)}
                        className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        <Plus className="h-5 w-5" />
                        Qo'shish
                    </button>
                </div>

                {experiences.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="h-10 w-10 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">Hali ish tajribasi qo'shilmagan</p>
                        <p className="text-sm text-gray-400 mt-1">Birinchi tajribangizni qo'shing</p>
                    </div>
                ) : (
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500"></div>

                        <div className="space-y-8">
                            {experiences.map((exp) => (
                                <div key={exp.id} className="relative pl-16 group">
                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 top-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Building2 className="h-6 w-6" />
                                    </div>

                                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-blue-300">
                                        <button
                                            onClick={() => handleDeleteExperience(exp.id)}
                                            className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>

                                        <h3 className="text-xl font-black text-gray-900 mb-1">{exp.position}</h3>
                                        <p className="text-blue-600 font-bold text-lg mb-2">{exp.company}</p>

                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                                            {exp.location && (
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{exp.location}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    {new Date(exp.startDate).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'short' })} -
                                                    {exp.current ? ' Hozir' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'short' }) : ''}
                                                </span>
                                            </div>
                                        </div>

                                        {exp.description && (
                                            <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Education Timeline */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 p-8 shadow-lg">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
                            <GraduationCap className="h-7 w-7" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900">Ta'lim</h2>
                            <p className="text-sm text-gray-600">Akademik yutuqlaringiz</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowEduModal(true)}
                        className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        <Plus className="h-5 w-5" />
                        Qo'shish
                    </button>
                </div>

                {educations.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                            <GraduationCap className="h-10 w-10 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">Hali ta'lim ma'lumoti qo'shilmagan</p>
                        <p className="text-sm text-gray-400 mt-1">Ta'lim tarixingizni qo'shing</p>
                    </div>
                ) : (
                    <div className="relative">
                        <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>

                        <div className="space-y-8">
                            {educations.map((edu) => (
                                <div key={edu.id} className="relative pl-16 group">
                                    <div className="absolute left-0 top-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <GraduationCap className="h-6 w-6" />
                                    </div>

                                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-purple-300">
                                        <button
                                            onClick={() => handleDeleteEducation(edu.id)}
                                            className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>

                                        <h3 className="text-xl font-black text-gray-900 mb-1">{edu.degree}</h3>
                                        <p className="text-purple-600 font-bold text-lg mb-2">{edu.institution}</p>

                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                            {edu.fieldOfStudy && (
                                                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-semibold">
                                                    {edu.fieldOfStudy}
                                                </span>
                                            )}
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    {new Date(edu.startDate).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'short' })} -
                                                    {edu.endDate ? new Date(edu.endDate).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'short' }) : 'Hozir'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Skills & Languages Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Skills with Progress Bars */}
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 p-8 shadow-lg">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white shadow-lg">
                                <Award className="h-7 w-7" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900">Ko'nikmalar</h2>
                                <p className="text-sm text-gray-600">Professional ko'nikmalaringiz</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowSkillModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <Plus className="h-5 w-5" />
                        </button>
                    </div>

                    {skills.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                                <Award className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-medium">Hali ko'nikma qo'shilmagan</p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {skills.map((skill) => (
                                <div key={skill.id} className="group">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-gray-900">{skill.skillName}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-600 font-semibold">{skill.level}</span>
                                            <button
                                                onClick={() => handleDeleteSkill(skill.id)}
                                                className="p-1 text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000"
                                            style={{ width: getSkillWidth(skill.level) }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Languages with Progress Bars */}
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/40 p-8 shadow-lg">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg">
                                <Globe className="h-7 w-7" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900">Tillar</h2>
                                <p className="text-sm text-gray-600">Til bilimlari</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowLangModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <Plus className="h-5 w-5" />
                        </button>
                    </div>

                    {languages.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                                <Globe className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-medium">Hali til qo'shilmagan</p>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {languages.map((lang) => (
                                <div key={lang.id} className="group">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-gray-900">{lang.language}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-600 font-semibold">{lang.proficiency}</span>
                                            <button
                                                onClick={() => handleDeleteLanguage(lang.id)}
                                                className="p-1 text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000"
                                            style={{ width: getLangWidth(lang.proficiency) }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modals remain the same as before... */}
            {/* Experience Modal */}
            {showExpModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowExpModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-black text-gray-900 mb-4">Ish Tajribasi Qo'shish</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Kompaniya nomi *"
                                value={expForm.company || ''}
                                onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                                type="text"
                                placeholder="Lavozim *"
                                value={expForm.position || ''}
                                onChange={(e) => setExpForm({ ...expForm, position: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                                type="text"
                                placeholder="Joylashuv"
                                value={expForm.location || ''}
                                onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="date"
                                    value={expForm.startDate || ''}
                                    onChange={(e) => setExpForm({ ...expForm, startDate: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <input
                                    type="date"
                                    value={expForm.endDate || ''}
                                    onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })}
                                    disabled={expForm.current}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                />
                            </div>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={expForm.current || false}
                                    onChange={(e) => setExpForm({ ...expForm, current: e.target.checked })}
                                    className="w-4 h-4 text-blue-600 rounded"
                                />
                                <span className="text-sm text-gray-700">Hozir shu yerda ishlayman</span>
                            </label>
                            <textarea
                                placeholder="Tavsif"
                                value={expForm.description || ''}
                                onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                            <div className="flex gap-3">
                                <button
                                    onClick={handleAddExperience}
                                    className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                                >
                                    Saqlash
                                </button>
                                <button
                                    onClick={() => { setExpForm({}); setShowExpModal(false); }}
                                    className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-colors"
                                >
                                    Bekor qilish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Education Modal */}
            {showEduModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowEduModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-black text-gray-900 mb-4">Ta'lim Qo'shish</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Muassasa nomi *"
                                value={eduForm.institution || ''}
                                onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <input
                                type="text"
                                placeholder="Daraja *"
                                value={eduForm.degree || ''}
                                onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <input
                                type="text"
                                placeholder="Mutaxassislik"
                                value={eduForm.fieldOfStudy || ''}
                                onChange={(e) => setEduForm({ ...eduForm, fieldOfStudy: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="date"
                                    value={eduForm.startDate || ''}
                                    onChange={(e) => setEduForm({ ...eduForm, startDate: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <input
                                    type="date"
                                    value={eduForm.endDate || ''}
                                    onChange={(e) => setEduForm({ ...eduForm, endDate: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleAddEducation}
                                    className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
                                >
                                    Saqlash
                                </button>
                                <button
                                    onClick={() => { setEduForm({}); setShowEduModal(false); }}
                                    className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-colors"
                                >
                                    Bekor qilish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Skill Modal */}
            {showSkillModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowSkillModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-black text-gray-900 mb-4">Ko'nikma Qo'shish</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Ko'nikma nomi *"
                                value={skillForm.skillName || ''}
                                onChange={(e) => setSkillForm({ ...skillForm, skillName: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            <select
                                value={skillForm.level || ''}
                                onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value as any })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="">Daraja tanlang *</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Expert">Expert</option>
                            </select>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleAddSkill}
                                    className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
                                >
                                    Saqlash
                                </button>
                                <button
                                    onClick={() => { setSkillForm({}); setShowSkillModal(false); }}
                                    className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-colors"
                                >
                                    Bekor qilish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Language Modal */}
            {showLangModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowLangModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-black text-gray-900 mb-4">Til Qo'shish</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Til nomi *"
                                value={langForm.language || ''}
                                onChange={(e) => setLangForm({ ...langForm, language: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                            <select
                                value={langForm.proficiency || ''}
                                onChange={(e) => setLangForm({ ...langForm, proficiency: e.target.value as any })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                                <option value="">Daraja tanlang *</option>
                                <option value="Basic">Basic</option>
                                <option value="Conversational">Conversational</option>
                                <option value="Fluent">Fluent</option>
                                <option value="Native">Native</option>
                            </select>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleAddLanguage}
                                    className="flex-1 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors"
                                >
                                    Saqlash
                                </button>
                                <button
                                    onClick={() => { setLangForm({}); setShowLangModal(false); }}
                                    className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-colors"
                                >
                                    Bekor qilish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
