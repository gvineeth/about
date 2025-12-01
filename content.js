
  // Dynamic Portfolio Builder - All structure and content rendered from script
(function() {
    'use strict';
    
    const decode = (str) => {
        if (!str) return '';
        try {
            return atob(str);
        } catch(e) {
            return str;
        }
    };
    
    // Inject CSS styles
    const injectStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            body { font-family: 'Inter', sans-serif; background-color: #f9fafb; }
            html { scroll-behavior: smooth; }
            .timeline-dot::before {
                content: ''; position: absolute; left: -12px; top: 8px;
                width: 24px; height: 24px; background-color: #4f46e5;
                border-radius: 9999px; border: 4px solid #f9fafb; z-index: 10;
            }
            ::-webkit-scrollbar { width: 8px; }
            ::-webkit-scrollbar-track { background: #f0f0f0; }
            ::-webkit-scrollbar-thumb { background: #4f46e5; border-radius: 4px; }
            ::-webkit-scrollbar-thumb:hover { background: #3730a3; }
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideInLeft {
                from { opacity: 0; transform: translateX(-30px); }
                to { opacity: 1; transform: translateX(0); }
            }
            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(30px); }
                to { opacity: 1; transform: translateX(0); }
            }
            @keyframes scaleIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            .animate-on-scroll {
                opacity: 0; transform: translateY(30px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            .animate-on-scroll.animated {
                opacity: 1; transform: translateY(0);
            }
            .animate-on-scroll.slide-in-left {
                transform: translateX(-30px) !important;
            }
            .animate-on-scroll.slide-in-left.animated {
                transform: translateX(0) !important;
            }
            .animate-on-scroll.slide-in-right {
                transform: translateX(30px) !important;
            }
            .animate-on-scroll.slide-in-right.animated {
                transform: translateX(0) !important;
            }
            .animate-on-scroll.scale-in {
                transform: scale(0.9) !important;
            }
            .animate-on-scroll.scale-in.animated {
                transform: scale(1) !important;
            }
            .animate-on-scroll.fade-in-up {
                transform: translateY(30px) !important;
            }
            .animate-on-scroll.fade-in-up.animated {
                transform: translateY(0) !important;
            }
            .hero-image {
                animation: fadeIn 1s ease-out 0.2s forwards, float 3s ease-in-out infinite 1.2s;
                opacity: 0;
            }
            .hero-title {
                animation: fadeInUp 1s ease-out 0.4s forwards;
                opacity: 0;
            }
            .hero-subtitle {
                animation: fadeInUp 1s ease-out 0.6s forwards;
                opacity: 0;
            }
            .hero-description {
                animation: fadeInUp 1s ease-out 0.8s forwards;
                opacity: 0;
            }
            .skill-bar { transition: width 1.5s ease-out; }
            .stagger-1 { animation-delay: 0.1s; }
            .stagger-2 { animation-delay: 0.2s; }
            .stagger-3 { animation-delay: 0.3s; }
            .stagger-4 { animation-delay: 0.4s; }
            header {
                transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
            }
            header.scrolled {
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
            .hover-lift {
                transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
            }
            .hover-lift:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.2);
            }
            .project-card {
                transition: all 0.3s ease-out;
            }
            .project-card:hover {
                transform: translateY(-8px) scale(1.02);
            }
            .stat-card {
                transition: all 0.3s ease-out;
            }
            .stat-card:hover {
                transform: translateY(-5px) scale(1.05);
            }
            .timeline-entry {
                opacity: 0; transform: translateX(-20px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            .timeline-entry.animated {
                opacity: 1; transform: translateX(0);
            }
            .skill-tag {
                transition: all 0.2s ease-out;
            }
            .skill-tag:hover {
                transform: scale(1.1) translateY(-2px);
            }
        `;
        document.head.appendChild(style);
    };
    
    // Content data (base64 encoded)
    const contentData = {
        hero: {
            name: decode('VmluZWV0a3VtYXIgR29ya2FudGk='),
            title: decode('U29mdHdhcmUgRGV2ZWxvcGVy'),
            description: decode('RXhwZXJpZW5jZWQgc29mdHdhcmUgZGV2ZWxvcGVyIHByb2ZpY2llbnQgaW4gcHJvYmxlbS1zb2x2aW5nLCBkYXRhIHN0cnVjdHVyZXMgYW5kIGFsZ29yaXRobXMuIERldmVsb3BpbmcgZWZmaWNpZW50IGNvZGUgYW5kIGVuaGFuY2luZyBzb2Z0d2FyZSBwcm9kdWN0aXZpdHkuIFBhc3Npb25hdGUgdG8gZHJpdmUgaW1wYWN0ZnVsIHJlc3VsdHMgaW4gc29mdHdhcmUgZGV2ZWxvcG1lbnQgcHJvamVjdHMu')
        },
        about: {
            greeting: decode('SGVsbG8hIEknbSBWaW5lZXQgR29ya2FudGku'),
            para1: decode('SSBhbSBhbiBleHBlcmllbmNlZCBTb2Z0d2FyZSBEZXZlbG9wZXIgc3BlY2lhbGl6aW5nIGluIGZ1bGwtc3RhY2sgYXBwbGljYXRpb24gZGV2ZWxvcG1lbnQsIHdpdGggYSBmb2N1cyBvbiBKYXZhL1NwcmluZyBCb290IGZvciB0aGUgYmFja2VuZCBhbmQgQW5ndWxhciBmb3IgZHluYW1pYyB1c2VyIGludGVyZmFjZXMuIE15IGNvcmUgZXhwZXJ0aXNlIGxpZXMgaW4gYnVpbGRpbmcgZWZmaWNpZW50LCBzY2FsYWJsZSBzb2Z0d2FyZSBzb2x1dGlvbnMgYnkgYXBwbHlpbmcgc3Ryb25nIHByb2JsZW0tc29sdmluZyBza2lsbHMsIERhdGEgU3RydWN0dXJlcywgYW5kIEFsZ29yaXRobXMu'),
            para2: decode('Q3VycmVudGx5LCBJIGNvbnRyaWJ1dGUgdG8gZW50ZXJwcmlzZSBiYW5raW5nIHNvbHV0aW9ucyBhdCBJbnRlbGxlY3QgRGVzaWduIEFyZW5hLCBkZXZlbG9waW5nIGJhY2sgb2ZmaWNlIHNvZnR3YXJlIGFuZCBrZXkgYmFua2luZyBtb2R1bGVzIGZvciBjbGllbnRzIGxpa2UgSUNJQ0kgYW5kIEhERkMuIEkgYW0gcGFzc2lvbmF0ZSBhYm91dCBkcml2aW5nIHByb2R1Y3Rpdml0eSBhbmQgaW5ub3ZhdGlvbiB0aHJvdWdoIGF1dG9tYXRpb24gYW5kIGNsZWFuIGNvZGUu')
        },
        stats: [
            { icon: 'briefcase', value: '3.5+', label: decode('WWVhcnMgRXhwZXJpZW5jZQ==') },
            { icon: 'award', value: '2', label: decode('QXdhcmRzICYgQ2VydHM=') },
            { icon: 'code', value: '4', label: decode('UHJvamVjdHMgSW5jbHVkZWQ=') },
            { icon: 'monitor', value: '70+', label: decode('U3lzdGVtcyBNb25pdG9yZWQ=') }
        ],
        experience: [
            {
                date: 'Jul 2022 - Present',
                title: decode('UHJvZHVjdCBFbmdpbmVlciB8IENvbnN1bHRhbnQ='),
                company: decode('SW50ZWxsZWN0IERlc2lnbiBBcmVuYQ=='),
                description: decode('RGV2ZWxvcGVkIGNvcmUgYmFua2luZyBtb2R1bGVzIGFuZCB1c2VyIGludGVyZmFjZXMgdXNpbmcgQW5ndWxhciwgQ2xhcml0eSBEZXNpZ24sIEphdmEsIGFuZCBTcHJpbmcgQm9vdCBmb3IgbWFqb3IgYmFua2luZyBjbGllbnRzLg=='),
                tags: ['Angular', 'Clarity Design', 'Java', 'Spring Boot', 'Banking Modules']
            },
            {
                date: 'Nov 2025',
                title: decode('Sm9iIFVwZGF0ZXMgQXV0b21hdGlvbiBTeXN0ZW0='),
                company: decode('UGVyc29uYWwgUHJvamVjdA=='),
                description: decode('QXV0b21hdGVkIGpvYiBtb25pdG9yaW5nIGFuZCBhbGVydCBzeXN0ZW0gY292ZXJpbmcgNDArIGNvbXBhbmllcywgZmlsdGVyaW5nIHJlc3VsdHMgYmFzZWQgb24gY3JpdGVyaWEgKGV4cGVyaWVuY2UsIHJvbGUsIGxvY2F0aW9uKSBmb3IgdGltZWx5IEdtYWlsIG5vdGlmaWNhdGlvbnMu'),
                tags: ['HTML', 'CSS', 'JavaScript', 'Automation', 'Scraping', 'DSA']
            },
            {
                date: 'Feb 2024',
                title: decode('UmVhbC1UaW1lIFN0b2NrIFVwZGF0ZSBTeXN0ZW0='),
                company: decode('UGVyc29uYWwgUHJvamVjdA=='),
                description: decode('RW5naW5lZXJlZCBhIHN5c3RlbSBmb3IgcmVhbC10aW1lIG1vbml0b3Jpbmcgb2Ygc3RvY2sgbWFya2V0IGRhdGEsIHRyaWdnZXJpbmcgR21haWwgYWxlcnRzIHdpdGggYWNjdXJhdGUgbWFya2V0IHVwZGF0ZXMvbmV3cyBmb3IgY3JpdGljYWwgcHJlLXByb2ZpdCBib29raW5nIGluc2lnaHRzLg=='),
                tags: ['Data Analytics', 'DSA', 'Real-Time', 'AI', 'Gmail']
            },
            {
                date: 'Nov 2023',
                title: decode('Q29kZSBHZW5lcmF0b3IgRGVza3RvcCBBcHA='),
                company: decode('SW50ZXJuYWwgVG9vbA=='),
                description: decode('SGlnaC1wZXJmb3JtYW5jZSBzb2Z0d2FyZSBhdXRvbWF0aW5nIGNvZGUgZ2VuZXJhdGlvbiBiYXNlZCBvbiBiYXNpYyBzY3JlZW4gaW5wdXRzLCByZWR1Y2luZyBtYW51YWwgZGV2ZWxvcG1lbnQgdGltZSBmcm9tIHdlZWtzIHRvIGRheXMsIGFjaGlldmluZyA3MCUgZWZmaWNpZW5jeS4='),
                tags: ['Python', 'Automation', 'Excel', 'DSA']
            },
            {
                date: '2018 - 2022',
                title: decode('Qi5UZWNoIChDb21wdXRlciBTY2llbmNlIGFuZCBFbmdpbmVlcmluZyk='),
                company: decode('Q01SQ0VULCBoeWRlcmFiYWQgOC4yJQ=='),
                description: decode('R3JhZHVhdGVkIHdpdGggYSBmb2N1cyBvbiBjb3JlIGNvbXB1dGVyIHNjaWVuY2UgY29uY2VwdHMsIGluY2x1ZGluZyBEYXRhIFN0cnVjdHVyZXMgYW5kIEFsZ29yaXRobXMu'),
                tags: ['DSA', 'Algorithms', 'Engineering']
            }
        ],
        skills: {
            frontend: [
                { name: 'Angular', percent: 85 },
                { name: 'HTML / CSS / JS', percent: 80 },
                { name: 'Bootstrap / Material', percent: 75 },
                { name: 'Clarity Design', percent: 87 },
                { name: 'Linux', percent: 70 }
            ],
            backend: [
                { name: 'Java', percent: 72 },
                { name: 'Python', percent: 80 },
                { name: 'Spring Boot', percent: 68 },
                { name: 'Shell Script', percent: 65 },
                { name: 'Core Concepts (OOPs, OS, DBMS)', percent: 75 }
            ],
            tools: [
                { name: 'MySQL / Oracle / Postgres', percent: 72 },
                { name: 'Firebase', percent: 70 },
                { name: 'Git / Jira / Confluence', percent: 90 },
                { name: 'IntelliJ / VS Code', percent: 85 },
                { name: 'Postman / Android Studio', percent: 75 }
            ],
            soft: ['Problem Solving', 'Data Structures', 'Algorithms', 'Software Productivity', 'Efficient Code Development', 'Driving Impactful Results']
        },
        projects: [
            {
                title: decode('Sm9iIFVwZGF0ZXMgQXV0b21hdGlvbiBTeXN0ZW0='),
                tech: 'HTML, CSS, JavaScript, Gmail, DSA',
                description: decode('U29mdHdhcmUgdG8gbW9uaXRvciA0MCsgcHJvZHVjdC1iYXNlZCBjb21wYW5pZXMgY2FyZWVyIHBhZ2VzLiBGaWx0ZXIgSm9icyBiYXNlZCBvbiBleHBlcmllbmNlLCByb2xlLCBhbmQgbG9jYXRpb24gdG8gcmVjZWl2ZSBvbmx5IGhpZ2hseSBhcHBsaWNhYmxlIGpvYiBhbGVydHMuIHNpZ25pZmljYW50bHkgaW1wcm92aW5nIGpvYiBvcHBvcnR1bml0aWVzIHdpdGggaW1tZWRpYXRlIEdtYWlsIGFsZXJ0Lg==')
            },
            {
                title: decode('Q29kZSBHZW5lcmF0b3IgRGVza3RvcCBBcHA='),
                tech: 'Python, DSA, Excel',
                description: decode('SGlnaC1wZXJmb3JtYW5jZSBzb2Z0d2FyZSB0byBhdXRvbWF0ZSBjb2RlIGdlbmVyYXRpb24gYmFzZWQgb24gYmFzaWMgc2NyZWVuIGlucHV0cy4gUmVkdWNlZCBtYW51YWwgY29kZSBnZW5lcmF0aW9uIHRpbWUgZnJvbSB3ZWVrcyB0byBqdXN0IGZldyBkYXlzLiBSZXN1bHRpbmcgaW4gYSA3MCUgZGV2ZWxvcG1lbnQgdGltZSBlZmZpY2llbmN5Lg==')
            },
            {
                title: decode('UmVhbC1UaW1lIFN0b2NrIFVwZGF0ZSBTeXN0ZW0='),
                tech: 'DSA, Data Analytics, AI',
                description: decode('RW5naW5lZXJlZCBhIHN5c3RlbSBmb3IgcmVhbC10aW1lIG1vbml0b3Jpbmcgb2Ygc3RvY2sgbWFya2V0IGRhdGEuIFRyaWdnZXIgR21haWwgYWxlcnRzIHdpdGggYWNjdXJhdGUgbWFya2V0IHVwZGF0ZXMvbmV3cyB3aXRoaW4gcmVjZW50IDUgbWludXRlcy4gRW5zdXJlZCB0aW1lbHkgY29tbXVuaWNhdGlvbiBvZiBjcml0aWNhbCBpbmZvcm1hdGlvbiB0byB1c2VycyBmb3IgcHJlLXByb2ZpdCBib29raW5nIGluc2lnaHRzLg==')
            },
            {
                title: decode('QmFua2luZyBCYWNrIE9mZmljZSBNb2R1bGVz'),
                tech: 'Java, Spring Boot, Angular, Clarity Design',
                description: decode('RGV2ZWxvcCBiYWNrIG9mZmljZSBzb2Z0d2FyZSBhbmQgdXNlciBpbnRlcmZhY2UgZm9yIGJhbmtzIHN1Y2ggYXMgSUNJQ0ksIEhERkMsIFNCQyBhbmQgQVhJUy4gSW1wbGVtZW50IHZhcmlvdXMgYmFua2luZyBtb2R1bGVzIGluY2x1ZGluZyBBbGVydHMsIFJlcG9ydHMsIENoYXJnZXMsIFZpcnR1YWwgQWNjb3VudHM=')
            }
        ],
        contact: {
            title: decode('TGV0J3MgQ29ubmVjdA=='),
            description: decode('SSdtIGN1cnJlbnRseSBmb2N1c2VkIG9uIGxldmVyYWdpbmcgbXkgc2tpbGxzIGluIEphdmEsIEFuZ3VsYXIsIGFuZCBQeXRob24gdG8gdGFja2xlIG5ldyBjaGFsbGVuZ2VzIGluIGVudGVycHJpc2Ugc29mdHdhcmUgZGV2ZWxvcG1lbnQgYW5kIGF1dG9tYXRpb24uIEZlZWwgZnJlZSB0byByZWFjaCBvdXQgcmVnYXJkaW5nIGNhcmVlciBvcHBvcnR1bml0aWVzLCBpbm5vdmF0aXZlIHByb2plY3QgY29sbGFib3JhdGlvbnMsIG9yIGRpc2N1c3Npb25zIG9uIERTQS9wcm9ibGVtLXNvbHZpbmcu'),
            email: decode('bGpvYmd2aW5lZXRoQGdtYWlsLmNvbQ=='),
            phone: decode('KzkxKSA4OTE5MDk1Mzk1'),
            location: decode('SFlERVJBQkFELCBJTkRJQQ==')
        }
    };
    
    // Build entire HTML structure
    const buildSkeleton = () => {
        const root = document.getElementById('app-root');
        if (!root) return;
        
        root.className = 'min-h-screen bg-gray-50 font-sans flex flex-col text-gray-800';
        root.innerHTML = `
            <div id="mobile-menu" class="fixed inset-0 z-50 transform -translate-x-full transition-transform duration-300 md:hidden bg-white/95 backdrop-blur-md">
                <div class="p-8 h-full flex flex-col overflow-y-auto">
                    <div class="flex justify-between items-center mb-10 pb-4 border-b border-gray-200">
                        <div class="text-2xl font-extrabold text-gray-800">
                            <span class="text-indigo-600">Software </span> Menu
                        </div>
                        <button id="close-menu-button" aria-label="Close Navigation Menu" class="p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition">
                            <i data-lucide="x" class="w-6 h-6"></i>
                        </button>
                    </div>
                    <nav>
                        <ul id="mobile-nav-links" class="space-y-3">
                            <li><a href="#home" class="block text-2xl font-semibold text-gray-800 hover:text-indigo-600 py-3 transition duration-150 border-b border-gray-100"><i data-lucide="user" class="w-6 h-6 inline-block mr-3 text-indigo-600"></i>Profile</a></li>
                            <li><a href="#experience" class="block text-2xl font-semibold text-gray-800 hover:text-indigo-600 py-3 transition duration-150 border-b border-gray-100"><i data-lucide="briefcase" class="w-6 h-6 inline-block mr-3 text-indigo-600"></i>Experience</a></li>
                            <li><a href="#skills" class="block text-2xl font-semibold text-gray-800 hover:text-indigo-600 py-3 transition duration-150 border-b border-gray-100"><i data-lucide="code" class="w-6 h-6 inline-block mr-3 text-indigo-600"></i>Skills</a></li>
                            <li><a href="#projects" class="block text-2xl font-semibold text-gray-800 hover:text-indigo-600 py-3 transition duration-150 border-b border-gray-100"><i data-lucide="layout-list" class="w-6 h-6 inline-block mr-3 text-indigo-600"></i>Projects</a></li>
                            <li><a href="#contact" class="block text-2xl font-semibold text-gray-800 hover:text-indigo-600 py-3 transition duration-150 border-b border-gray-100"><i data-lucide="mail" class="w-6 h-6 inline-block mr-3 text-indigo-600"></i>Contact</a></li>
                        </ul>
                    </nav>
                    <a href="#contact" id="mobile-contact-link" class="mt-8 text-center bg-indigo-600 text-white font-medium px-4 py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg">
                        <i data-lucide="send" class="w-5 h-5 inline-block mr-2"></i> Get In Touch
                    </a>
                </div>
            </div>
            <div id="main-content-wrapper" class="flex-grow min-h-screen transition-all duration-300 flex flex-col">
                <header id="header" class="sticky top-0 z-40 bg-white bg-opacity-95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                        <div class="text-2xl font-extrabold text-gray-800">
                            <span class="text-indigo-600">Portfolio</span>
                        </div>
                        <nav class="hidden md:flex space-x-6">
                            <ul id="main-nav-links" class="flex space-x-6">
                                <li><a href="#home" class="text-gray-600 hover:text-indigo-700 transition font-medium px-3 py-2 rounded-lg">Profile</a></li>
                                <li><a href="#experience" class="text-gray-600 hover:text-indigo-700 transition font-medium px-3 py-2 rounded-lg">Experience</a></li>
                                <li><a href="#skills" class="text-gray-600 hover:text-indigo-700 transition font-medium px-3 py-2 rounded-lg">Skills</a></li>
                                <li><a href="#projects" class="text-gray-600 hover:text-indigo-700 transition font-medium px-3 py-2 rounded-lg">Projects</a></li>
                                <li><a href="#contact" class="text-gray-600 hover:text-indigo-700 transition font-medium px-3 py-2 rounded-lg">Contact</a></li>
                            </ul>
                        </nav>
                        <div class="flex items-center space-x-4 md:hidden">
                            <button id="menu-toggle-button" aria-label="Toggle Navigation Menu" class="p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition">
                                <i data-lucide="menu" class="w-6 h-6"></i>
                            </button>
                        </div>
                    </div>
                </header>
                <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
                    <section id="home" class="py-24 text-center">
                        <div class="relative inline-block mb-6">
                            <img src="https://placehold.co/150x150/4f46e5/ffffff?text=VG" alt="Profile" class="hero-image w-36 h-36 rounded-full border-4 border-indigo-600 mx-auto" onerror="this.onerror=null; this.src='https://placehold.co/150x150/4f46e5/ffffff?text=VG';" />
                            <div class="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full border-4 border-gray-50 shadow-xl scale-in">
                                <i data-lucide="code" class="w-5 h-5 text-white"></i>
                            </div>
                        </div>
                        <h1 class="hero-title text-6xl font-extrabold text-gray-900 mb-2"></h1>
                        <p class="hero-subtitle text-2xl text-indigo-700 font-medium mb-6"></p>
                        <p class="hero-description text-lg text-gray-700 max-w-3xl mx-auto"></p>
                    </section>
                    <section id="about" class="pt-16 pb-12">
                        <h2 class="animate-on-scroll fade-in-up text-4xl font-extrabold text-gray-900 text-center pt-20 pb-10 border-b border-gray-200 mb-12 flex items-center justify-center">
                            <i data-lucide="user" class="w-8 h-8 text-indigo-600 mr-3"></i>
                            About Me
                        </h2>
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                            <div class="animate-on-scroll slide-in-left lg:col-span-2 text-gray-600 space-y-4 text-lg bg-white p-8 rounded-xl border border-gray-200 shadow-md hover-lift">
                                <p class="font-semibold text-gray-800"></p>
                                <p></p>
                                <p></p>
                            </div>
                            <div id="stats-container" class="lg:col-span-1 space-y-4"></div>
                        </div>
                    </section>
                    <section id="experience" class="pt-16 pb-12">
                        <h2 class="animate-on-scroll fade-in-up text-4xl font-extrabold text-gray-900 text-center pt-20 pb-10 border-b border-gray-200 mb-12 flex items-center justify-center">
                            <i data-lucide="briefcase" class="w-8 h-8 text-indigo-600 mr-3"></i>
                            Experience & Education
                        </h2>
                        <div id="timeline-container" class="max-w-4xl mx-auto"></div>
                    </section>
                    <section id="skills" class="pt-16 pb-12">
                        <h2 class="animate-on-scroll fade-in-up text-4xl font-extrabold text-gray-900 text-center pt-20 pb-10 border-b border-gray-200 mb-12 flex items-center justify-center">
                            <i data-lucide="code" class="w-8 h-8 text-indigo-600 mr-3"></i>
                            Skills & Expertise
                        </h2>
                        <div id="expertise-container" class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"></div>
                        <div class="animate-on-scroll fade-in-up bg-white p-6 rounded-xl border border-gray-200 shadow-md hover-lift">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2 flex items-center">
                                <i data-lucide="layers" class="w-5 h-5 mr-2 text-indigo-600"></i> Core Concepts & Strengths
                            </h3>
                            <div id="soft-skills-container" class="flex flex-wrap gap-3"></div>
                        </div>
                    </section>
                    <section id="projects" class="pt-16 pb-12">
                        <h2 class="animate-on-scroll fade-in-up text-4xl font-extrabold text-gray-900 text-center pt-20 pb-10 border-b border-gray-200 mb-12 flex items-center justify-center">
                            <i data-lucide="layout-list" class="w-8 h-8 text-indigo-600 mr-3"></i>
                            Featured Projects
                        </h2>
                        <div id="projects-container" class="grid grid-cols-1 md:grid-cols-2 gap-8"></div>
                    </section>
                    <section id="contact" class="pt-16 pb-24">
                        <h2 class="animate-on-scroll fade-in-up text-4xl font-extrabold text-gray-900 text-center pt-20 pb-10 border-b border-gray-200 mb-12 flex items-center justify-center">
                            <i data-lucide="message-square" class="w-8 h-8 text-indigo-600 mr-3"></i>
                            Get In Touch
                        </h2>
                        <div class="grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
                            <div class="animate-on-scroll scale-in p-6 rounded-xl bg-white border border-gray-200 shadow-md space-y-4 text-gray-600 hover-lift">
                                <p class="text-lg font-semibold text-gray-800"></p>
                                <p class="text-sm"></p>
                                <div class="space-y-3 pt-4">
                                    <div class="flex items-center space-x-3">
                                        <i data-lucide="mail" class="w-5 h-5 text-indigo-600 flex-shrink-0"></i>
                                        <span></span>
                                    </div>
                                    <div class="flex items-center space-x-3">
                                        <i data-lucide="phone" class="w-5 h-5 text-indigo-600 flex-shrink-0"></i>
                                        <span></span>
                                    </div>
                                    <div class="flex items-center space-x-3">
                                        <i data-lucide="map-pin" class="w-5 h-5 text-indigo-600 flex-shrink-0"></i>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <footer class="py-6 border-t border-gray-200 text-center text-sm text-gray-500 mt-auto bg-white">
                    <p>&copy; 2025 Portfolio. All Rights Reserved.</p>
                </footer>
            </div>
        `;
    };
    
    // Build stats cards
    const buildStats = () => {
        const container = document.getElementById('stats-container');
        if (!container) return;
        
        contentData.stats.forEach((stat, index) => {
            const card = document.createElement('div');
            card.className = `animate-on-scroll stat-card stagger-${index + 1} text-center p-3 bg-white rounded-xl shadow-lg border border-gray-200 transition duration-300 hover:border-indigo-600`;
            card.innerHTML = `
                <i data-lucide="${stat.icon}" class="w-5 h-5 mx-auto mb-1 text-indigo-600"></i>
                <p class="text-2xl font-extrabold text-gray-900">${stat.value}</p>
                <p class="text-xs font-medium text-gray-600 mt-1">${stat.label}</p>
            `;
            container.appendChild(card);
        });
    };
    
    // Build experience timeline
    const buildExperience = () => {
        const container = document.getElementById('timeline-container');
        if (!container) return;
        
        contentData.experience.forEach(exp => {
            const entry = document.createElement('div');
            entry.className = 'timeline-entry flex flex-col sm:flex-row';
            const tagsHtml = exp.tags.map(tag => 
                `<span class="text-xs font-medium bg-gray-100 text-indigo-700 px-3 py-1 rounded-full border border-gray-300">${tag}</span>`
            ).join('');
            entry.innerHTML = `
                <div class="w-full sm:w-1/4 pt-2 pr-6 sm:text-right text-sm font-semibold text-gray-600 mb-2 sm:mb-0">${exp.date}</div>
                <div class="w-full sm:w-3/4 border-l border-indigo-600 pl-6 pb-12 relative timeline-dot">
                    <h3 class="text-xl font-bold text-gray-900 mb-1">${exp.title}</h3>
                    <p class="text-sm text-indigo-700 mb-3">${exp.company}</p>
                    <p class="text-gray-700 text-sm leading-relaxed mb-3">${exp.description}</p>
                    <div class="flex flex-wrap gap-2">${tagsHtml}</div>
                </div>
            `;
            container.appendChild(entry);
        });
    };
    
    // Build skills sections
    const buildSkills = () => {
        const container = document.getElementById('expertise-container');
        if (!container) return;
        
        const skillColumns = [
            { title: 'Frontend & Frameworks', skills: contentData.skills.frontend, anim: 'slide-in-left stagger-1' },
            { title: 'Backend & Languages', skills: contentData.skills.backend, anim: 'fade-in-up stagger-2' },
            { title: 'Data & DevOps Tools', skills: contentData.skills.tools, anim: 'slide-in-right stagger-3' }
        ];
        
        skillColumns.forEach(col => {
            const colDiv = document.createElement('div');
            colDiv.className = `animate-on-scroll ${col.anim} bg-white p-6 rounded-xl border border-gray-200 shadow-md hover-lift`;
            colDiv.innerHTML = `
                <h3 class="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">${col.title}</h3>
                ${col.skills.map(skill => `
                    <div class="mb-4">
                        <div class="flex justify-between items-center text-sm mb-1">
                            <span class="text-gray-700">${skill.name}</span>
                            <span class="text-indigo-700">${skill.percent}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2.5">
                            <div class="skill-bar bg-indigo-600 h-2.5 rounded-full" style="width: 0%;" data-width="${skill.percent}%"></div>
                        </div>
                    </div>
                `).join('')}
            `;
            container.appendChild(colDiv);
        });
        
        // Soft skills
        const softContainer = document.getElementById('soft-skills-container');
        if (softContainer) {
            softContainer.innerHTML = contentData.skills.soft.map(skill => 
                `<span class="skill-tag text-sm font-medium bg-indigo-100 text-indigo-800 px-4 py-1.5 rounded-full border border-indigo-300 transition hover:bg-indigo-200">${skill}</span>`
            ).join('');
        }
    };
    
    // Build projects
    const buildProjects = () => {
        const container = document.getElementById('projects-container');
        if (!container) return;
        
        contentData.projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = `animate-on-scroll project-card stagger-${index + 1} p-6 rounded-xl bg-white border border-gray-200 shadow-md transition duration-300 hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-100`;
            card.innerHTML = `
                <h4 class="text-xl font-bold text-gray-900 mb-2">${project.title}</h4>
                <p class="text-sm font-medium text-indigo-700 mb-3">${project.tech}</p>
                <p class="text-gray-700 text-sm">${project.description}</p>
            `;
            container.appendChild(card);
        });
    };
    
    // Populate content
    const populateContent = () => {
        const hero = contentData.hero;
        const about = contentData.about;
        const contact = contentData.contact;
        
        const nameEl = document.querySelector('.hero-title');
        const titleEl = document.querySelector('.hero-subtitle');
        const descEl = document.querySelector('.hero-description');
        if (nameEl) nameEl.textContent = hero.name;
        if (titleEl) titleEl.textContent = hero.title;
        if (descEl) descEl.textContent = hero.description;
        
        const aboutDiv = document.querySelector('#about .lg\\:col-span-2');
        if (aboutDiv) {
            const paragraphs = aboutDiv.querySelectorAll('p');
            if (paragraphs[0]) paragraphs[0].textContent = about.greeting;
            if (paragraphs[1]) paragraphs[1].textContent = about.para1;
            if (paragraphs[2]) paragraphs[2].textContent = about.para2;
        }
        
        const contactDiv = document.querySelector('#contact .animate-on-scroll.scale-in');
        if (contactDiv) {
            const titleEl = contactDiv.querySelector('.text-lg');
            const descEl = contactDiv.querySelector('.text-sm');
            const emailEl = contactDiv.querySelectorAll('.flex.items-center span')[0];
            const phoneEl = contactDiv.querySelectorAll('.flex.items-center span')[1];
            const locationEl = contactDiv.querySelectorAll('.flex.items-center span')[2];
            if (titleEl) titleEl.textContent = contact.title;
            if (descEl) descEl.textContent = contact.description;
            if (emailEl) emailEl.textContent = contact.email;
            if (phoneEl) phoneEl.textContent = contact.phone;
            if (locationEl) locationEl.textContent = contact.location;
        }
    };
    
    // Setup JavaScript functionality
    const setupJS = () => {
        const script = document.createElement('script');
        script.textContent = `
            const renderIcons = () => {
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            };
            const setupMobileMenu = () => {
                const menuToggle = document.getElementById('menu-toggle-button');
                const menuClose = document.getElementById('close-menu-button');
                const mobileMenu = document.getElementById('mobile-menu');
                const mobileNavLinks = document.getElementById('mobile-nav-links');
                const openMenu = () => {
                    mobileMenu.style.height = '100vh';
                    mobileMenu.classList.remove('-translate-x-full');
                    document.body.style.overflow = 'hidden';
                };
                const closeMenu = () => {
                    mobileMenu.classList.add('-translate-x-full');
                    document.body.style.overflow = '';
                };
                if (menuToggle) {
                    menuToggle.addEventListener('click', () => {
                        openMenu();
                        renderIcons();
                    });
                }
                if (menuClose) {
                    menuClose.addEventListener('click', closeMenu);
                }
                if (mobileNavLinks) {
                    mobileNavLinks.addEventListener('click', (e) => {
                        const link = e.target.closest('a');
                        if (link) closeMenu();
                    });
                }
                const mobileContactLink = document.getElementById('mobile-contact-link');
                if (mobileContactLink) {
                    mobileContactLink.addEventListener('click', closeMenu);
                }
            };
            window.setupScrollAnimations = () => {
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                };
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.remove('animated');
                            void entry.target.offsetWidth;
                            entry.target.classList.add('animated');
                            if (entry.target.classList.contains('timeline-entry')) {
                                entry.target.style.transitionDelay = '0.1s';
                            }
                        } else {
                            entry.target.classList.remove('animated');
                        }
                    });
                }, observerOptions);
                const skillsObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateSkillBars();
                        } else {
                            resetSkillBars();
                        }
                    });
                }, observerOptions);
                document.querySelectorAll('.animate-on-scroll, .timeline-entry').forEach(el => {
                    observer.observe(el);
                });
                const skillsSection = document.getElementById('skills');
                if (skillsSection) {
                    skillsObserver.observe(skillsSection);
                }
            };
            const animateSkillBars = () => {
                const skillBars = document.querySelectorAll('.skill-bar');
                skillBars.forEach((bar, index) => {
                    const width = bar.dataset.width;
                    if (width) {
                        bar.style.width = '0%';
                        bar.classList.remove('animated');
                        void bar.offsetWidth;
                        setTimeout(() => {
                            bar.style.width = width;
                            bar.classList.add('animated');
                        }, index * 100);
                    }
                });
            };
            const resetSkillBars = () => {
                const skillBars = document.querySelectorAll('.skill-bar');
                skillBars.forEach(bar => {
                    bar.style.width = '0%';
                    bar.classList.remove('animated');
                });
            };
            const setupHeaderScroll = () => {
                const header = document.getElementById('header');
                window.addEventListener('scroll', () => {
                    const currentScroll = window.pageYOffset;
                    if (currentScroll > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                });
            };
            window.onload = () => {
                setupMobileMenu();
                setupScrollAnimations();
                setupHeaderScroll();
                renderIcons();
            };
        `;
        document.body.appendChild(script);
    };
    
    // Initialize everything
    const init = () => {
        injectStyles();
        buildSkeleton();
        buildStats();
        buildExperience();
        buildSkills();
        buildProjects();
        populateContent();
        setupJS();
        
        setTimeout(() => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            if (window.setupScrollAnimations) {
                window.setupScrollAnimations();
            }
        }, 100);
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    window.portfolioContent = { init, data: contentData };
})();

