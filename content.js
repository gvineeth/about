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
            location: decode('SFlERVJBQkFELCBJTkRJQQ=='),
            linkedin: decode('aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL3ZpbmVldGt1bWFyLWdvcmthbnRpLTAxMWIxNTIwMy8='),
            payment: {
                title: decode('U3VwcG9ydCAmIEhlbHA='),
                description: decode('SWYgeW91IGZpbmQgbXkgd29yayBoZWxwZnVsIGFuZCB3b3VsZCBsaWtlIHRvIHN1cHBvcnQgbWUsIHlvdSBjYW4gY29udHJpYnV0ZSB1c2luZyB0aGUgZm9sbG93aW5nIHBheW1lbnQgb3B0aW9uczo='),
                upi: decode('ZW5naW5lZXJndmluZWV0aEBva2ljaWNp'),
                bankAccount: {
                    name: decode('R09SS0FOVEkgVklORUVUIEtVTUFS'),
                    number: decode('NjY4NzAwMzgzNQ=='),
                    ifsc: decode('SURJQjAwMEIxNjk='),
                    bankName: decode('SW5kaWFuIEJhbms=')
                },
                qrCode: decode('aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL3RodW1ibmFpbD9pZD0xQ0hpdWEzWExvZUdVZVBRay10ZDRscG94WEwzZDMtNXYmc3o9dzEwMDA=')
            }
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
                            <li><a href="#payment" class="block text-2xl font-semibold text-gray-800 hover:text-indigo-600 py-3 transition duration-150 border-b border-gray-100"><i data-lucide="heart-handshake" class="w-6 h-6 inline-block mr-3 text-indigo-600"></i>Support</a></li>
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
                            <span class="text-indigo-600">Vineet kumar</span>
                        </div>
                        <nav class="hidden md:flex space-x-6">
                            <ul id="main-nav-links" class="flex space-x-6">
                                <li><a href="#home" class="text-gray-600 hover:text-indigo-700 transition font-medium px-3 py-2 rounded-lg">Profile</a></li>
                                <li><a href="#experience" class="text-gray-600 hover:text-indigo-700 transition font-medium px-3 py-2 rounded-lg">Experience</a></li>
                                <li><a href="#skills" class="text-gray-600 hover:text-indigo-700 transition font-medium px-3 py-2 rounded-lg">Skills</a></li>
                                <li><a href="#projects" class="text-gray-600 hover:text-indigo-700 transition font-medium px-3 py-2 rounded-lg">Projects</a></li>
                                <li><a href="#contact" class="text-gray-600 hover:text-indigo-700 transition font-medium px-3 py-2 rounded-lg">Contact</a></li>
                                <li><a href="#payment" class="text-gray-600 hover:text-indigo-700 transition font-medium px-3 py-2 rounded-lg">Support</a></li>
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
                                    <div class="flex items-center space-x-3">
                                        <i data-lucide="linkedin" class="w-5 h-5 text-indigo-600 flex-shrink-0"></i>
                                        <a href="" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:text-indigo-800 hover:underline transition"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="payment" class="pt-16 pb-24">
                        <h2 class="animate-on-scroll fade-in-up text-4xl font-extrabold text-gray-900 text-center pt-20 pb-10 border-b border-gray-200 mb-12 flex items-center justify-center">
                            <i data-lucide="heart-handshake" class="w-8 h-8 text-indigo-600 mr-3"></i>
                            <span id="payment-title"></span>
                        </h2>
                        <div class="max-w-5xl mx-auto">
                            <p id="payment-description" class="text-center text-gray-600 mb-12 animate-on-scroll fade-in-up max-w-2xl mx-auto"></p>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="animate-on-scroll slide-in-left bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-100 shadow-md flex flex-col">
                                    <h4 class="text-lg font-bold text-gray-900 mb-6 flex items-center justify-center">
                                        <div class="p-2 bg-indigo-100 rounded-lg mr-3">
                                            <i data-lucide="wallet" class="w-5 h-5 text-indigo-600"></i>
                                        </div>
                                        UPI Payment
                                    </h4>
                                    <div class="flex-grow flex flex-col items-center justify-center mb-6">
                                        <div class="mb-6">
                                            <div class="flex justify-center mb-3">
                                                <div class="bg-white p-4 rounded-xl border-2 border-indigo-200 shadow-sm">
                                                    <img id="qr-code-image" src="" alt="Payment QR Code" class="w-56 h-56 rounded-lg object-contain" onerror="this.onerror=null; this.src=''; this.style.display='none'; document.getElementById('qr-placeholder').style.display='block';">
                                                    <p id="qr-placeholder" class="text-gray-400 text-sm text-center py-8" style="display: none;">QR Code image will appear here<br><span class="text-xs text-gray-500">Make sure the Google Drive file is set to &quot;Anyone with the link can view&quot;</span></p>
                                                </div>
                                            </div>
                                            <p class="text-sm text-gray-500 text-center">Scan to pay via UPI</p>
                                        </div>
                                        <div class="border-t border-indigo-200 pt-6 w-full max-w-md">
                                            <div class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm text-center">
                                                <p class="text-xs text-gray-500 uppercase tracking-wide mb-2">UPI ID</p>
                                                <p id="upi-id" class="text-lg font-bold text-gray-900 font-mono break-all"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <button id="copy-upi" class="w-full bg-indigo-600 text-white px-4 py-3 rounded-xl hover:bg-indigo-700 transition shadow-md hover:shadow-lg flex items-center justify-center space-x-2 font-medium mt-auto">
                                        <i data-lucide="copy" class="w-4 h-4"></i>
                                        <span>Copy UPI ID</span>
                                    </button>
                                </div>
                                
                                <div class="animate-on-scroll slide-in-right bg-white p-6 rounded-xl border border-gray-200 shadow-md flex flex-col">
                                    <h4 class="text-lg font-bold text-gray-900 mb-6 flex items-center">
                                        <div class="p-2 bg-indigo-100 rounded-lg mr-3">
                                            <i data-lucide="building-2" class="w-5 h-5 text-indigo-600"></i>
                                        </div>
                                        Bank Transfer
                                    </h4>
                                    <div class="space-y-3 flex-grow mb-6">
                                        <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                            <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Account Holder</p>
                                            <p id="bank-name" class="text-base font-semibold text-gray-900"></p>
                                        </div>
                                        <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                            <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Account Number</p>
                                            <p id="bank-account" class="text-base font-semibold text-gray-900 font-mono"></p>
                                        </div>
                                        <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                            <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">IFSC Code</p>
                                            <p id="bank-ifsc" class="text-base font-semibold text-gray-900 font-mono"></p>
                                        </div>
                                        <div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                            <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Bank Name</p>
                                            <p id="bank-bankname" class="text-base font-semibold text-gray-900"></p>
                                        </div>
                                    </div>
                                    <button id="copy-bank" class="w-full bg-indigo-600 text-white px-4 py-3 rounded-xl hover:bg-indigo-700 transition shadow-md hover:shadow-lg flex items-center justify-center space-x-2 font-medium mt-auto">
                                        <i data-lucide="copy" class="w-4 h-4"></i>
                                        <span>Copy Bank Details</span>
                                    </button>
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
            const linkedinEl = contactDiv.querySelector('.flex.items-center a');
            if (titleEl) titleEl.textContent = contact.title;
            if (descEl) descEl.textContent = contact.description;
            if (emailEl) emailEl.textContent = contact.email;
            if (phoneEl) phoneEl.textContent = contact.phone;
            if (locationEl) locationEl.textContent = contact.location;
            if (linkedinEl) {
                linkedinEl.href = contact.linkedin;
                linkedinEl.textContent = 'LinkedIn Profile';
            }
        }
        
        // Populate payment details
        const payment = contentData.contact.payment;
        const paymentTitleEl = document.getElementById('payment-title');
        const paymentDescEl = document.getElementById('payment-description');
        const upiIdEl = document.getElementById('upi-id');
        const bankNameEl = document.getElementById('bank-name');
        const bankAccountEl = document.getElementById('bank-account');
        const bankIfscEl = document.getElementById('bank-ifsc');
        const bankBankNameEl = document.getElementById('bank-bankname');
        const qrCodeEl = document.getElementById('qr-code-image');
        
        if (paymentTitleEl) paymentTitleEl.textContent = payment.title;
        if (paymentDescEl) paymentDescEl.textContent = payment.description;
        if (upiIdEl) upiIdEl.textContent = payment.upi || 'Not provided';
        if (bankNameEl) bankNameEl.textContent = payment.bankAccount.name || 'Not provided';
        if (bankAccountEl) bankAccountEl.textContent = payment.bankAccount.number || 'Not provided';
        if (bankIfscEl) bankIfscEl.textContent = payment.bankAccount.ifsc || 'Not provided';
        if (bankBankNameEl) bankBankNameEl.textContent = payment.bankAccount.bankName || 'Not provided';
        if (qrCodeEl && payment.qrCode) {
            const fileId = '1CHiua3XLoeGUePQk-td4lpoxXL3d3-5v';
            // Try multiple Google Drive URL formats as fallbacks
            const qrUrls = [
                `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
                `https://drive.google.com/uc?export=view&id=${fileId}`,
                `https://docs.google.com/uc?export=download&id=${fileId}`,
                payment.qrCode // Original URL as last fallback
            ];
            
            let currentUrlIndex = 0;
            const tryNextUrl = () => {
                if (currentUrlIndex < qrUrls.length) {
                    qrCodeEl.src = qrUrls[currentUrlIndex];
                    currentUrlIndex++;
                } else {
                    // All URLs failed, show placeholder
                    qrCodeEl.style.display = 'none';
                    const placeholder = document.getElementById('qr-placeholder');
                    if (placeholder) {
                        placeholder.style.display = 'block';
                    }
                }
            };
            
            qrCodeEl.onerror = () => {
                tryNextUrl();
            };
            
            qrCodeEl.onload = () => {
                // Image loaded successfully, hide placeholder
                const placeholder = document.getElementById('qr-placeholder');
                if (placeholder) {
                    placeholder.style.display = 'none';
                }
            };
            
            // Start with first URL
            tryNextUrl();
        }
        
        // Setup copy functionality
        const copyUpiBtn = document.getElementById('copy-upi');
        const copyBankBtn = document.getElementById('copy-bank');
        
        if (copyUpiBtn && payment.upi) {
            copyUpiBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(payment.upi).then(() => {
                    const originalText = copyUpiBtn.innerHTML;
                    copyUpiBtn.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i><span>Copied!</span>';
                    setTimeout(() => {
                        copyUpiBtn.innerHTML = originalText;
                        if (typeof lucide !== 'undefined') lucide.createIcons();
                    }, 2000);
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                });
            });
        }
        
        if (copyBankBtn) {
            copyBankBtn.addEventListener('click', () => {
                const bankDetails = `Account Holder: ${payment.bankAccount.name}\nAccount Number: ${payment.bankAccount.number}\nIFSC: ${payment.bankAccount.ifsc}\nBank: ${payment.bankAccount.bankName}`;
                navigator.clipboard.writeText(bankDetails).then(() => {
                    const originalText = copyBankBtn.innerHTML;
                    copyBankBtn.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i><span>Copied!</span>';
                    setTimeout(() => {
                        copyBankBtn.innerHTML = originalText;
                        if (typeof lucide !== 'undefined') lucide.createIcons();
                    }, 2000);
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                });
            });
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
