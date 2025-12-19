// Dynamic Resume Builder - All structure and content rendered from script
(function() {
    'use strict';
    
    // Inject CSS styles
    const injectStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
            
            :root {
                --a4-width: 210mm;
            }

            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                background-color: #f3f4f6;
                color: #1f2937;
                line-height: 1.5; 
                margin: 0;
                padding: 0;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }

            .resume-container {
                width: var(--a4-width);
                margin: 0 auto;
                background: white;
                padding: 7mm 12mm; 
                box-sizing: border-box;
                position: relative;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                text-rendering: optimizeLegibility;
            }

            .resume-container p,
            .resume-container span,
            .resume-container li,
            .resume-container div {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }

            .section-title-line {
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                font-size: 0.85rem;
                margin-bottom: 8px;
                margin-top: 12px;
                color: #1f2937;
                border-top: 1px solid black;
                padding-top: 10px;
                display: block;
            }

            .skill-item {
                margin-bottom: 3px;
                display: block;
                font-size: 9pt;
                line-height: 1.4;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }

            .skill-item-justify {
                text-align: left;
                line-height: 1.5;
            }

            .experience-list li {
                text-align: left;
                line-height: 1.4;
                margin-bottom: 2px;
                font-size: 9pt;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }

            .font-9pt {
                font-size: 9pt;
            }

            .font-8pt5 {
                font-size: 8.5pt;
            }

            .floating-btn-container {
                position: fixed;
                bottom: 30px;
                right: 30px;
                z-index: 1000;
            }

            #download-btn {
                background-color: #2563eb;
                color: white;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                border: none;
                cursor: pointer;
            }

            #download-btn:hover {
                transform: scale(1.1) rotate(5deg);
                background-color: #1d4ed8;
                box-shadow: 0 6px 20px rgba(37, 99, 235, 0.6);
            }

            .btn-tooltip {
                position: absolute;
                right: 75px;
                top: 50%;
                transform: translateY(-50%);
                background: #1f2937;
                color: white;
                padding: 6px 12px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 600;
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s;
            }

            .floating-btn-container:hover .btn-tooltip {
                opacity: 1;
            }

            @media screen {
                .resume-container {
                    margin-top: 1.5rem;
                    margin-bottom: 1.5rem;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
            }

            @media print {
                body { background: white; }
                .resume-container { 
                    box-shadow: none; 
                    margin: 0; 
                    width: 100%;
                }
                .no-print { display: none !important; }
            }

            a { text-decoration: none; color: inherit; }
            .link-text {
                color: #2563eb;
                text-decoration: underline;
            }
            .link-text:hover { 
                color: #1d4ed8; 
                text-decoration: underline; 
            }
        `;
        document.head.appendChild(style);
    };
    
    // Resume content data
    const resumeData = {
        header: {
            name: 'VINEETKUMAR GORKANTI',
            title: 'Software Developer | Full Stack Developer | Front End Developer | UI/UX Designer | Back End Developer',
            links: {
                portfolio: 'https://sites.google.com/view/gvineethsites/home',
                linkedin: 'https://www.linkedin.com/in/vineetkumar-gorkanti-011b15203/',
                leetcode: 'https://leetcode.com/u/vineethgorkanti/',
                hackerrank: 'https://www.hackerrank.com/profile/engineergvineeth',
                github: 'https://github.com/gvineeth?tab=repositories'
            },
            contact: {
                phone: '(+91) 8919095395',
                email: 'ljobgvineeth@gmail.com',
                location: 'Hyderabad, INDIA',
                experience: '3.5+ Years'
            }
        },
        skills: [
            { label: "Qualifications:", text: "Bachelor's Degree in Software Engineering with <strong>3.5+</strong> years of applied hands-on professional experience." },
            { label: "Programming Languages:", text: "Java, Python, HTML, CSS, JavaScript, SQL, Shell Script, Apps Script." },
            { label: "Frameworks:", text: "React, Angular, Spring Boot, Clarity Design, Bootstrap, Material UI." },
            { label: "Tools:", text: "Cursor, VS Code, IntelliJ, Android Studio, Postman, Jira, Confluence, GitHub, GitLab." },
            { label: "Databases:", text: "MySQL, Oracle, PostgreSQL, Firebase." },
            { label: "Methodologies:", text: "Software Development Life Cycle (SDLC) disciplined approach to code, test, and deploy." },
            { label: "DevOps:", text: "CI/CD, Docker, Kubernetes, Jenkins, AWS, Azure, Google Cloud, SonarQube." },
            { label: "Core Concepts:", text: "Data Structures and Algorithms (DSA), Analysis of Algorithms, Object-Oriented Programming (OOPs), Operating System (OS), Database Management System (DBMS), Design Patterns and AI.", justify: true },
            { label: "Core Strengths:", text: "Problem Solving, Strong communication and analytical skills, self-starter with new ideas and concepts." }
        ],
        experience: [
            {
                title: 'Product Engineer | Consultant | Intellect Design Arena',
                period: 'July 2022 - Present',
                items: [
                    'Developed and maintained critical systems in a front and back office environment within financial services.',
                    'Delivering high-performance software for global banks including <strong>ICICI, HSBC, RBC, SBC, AXIS, and Barclays</strong>.',
                    'Contribute to the architecture and design of new and current real-time systems to ensure scalability.',
                    'Develop secure, high-quality production code while leading code reviews and debugging efforts.',
                    'Utilize an advanced understanding of Agile methodologies, CI/CD pipelines, and Security to identify and automate remediation of recurring issues, significantly improving operational stability.',
                    'Drive complex tasks to completion with full ownership of projects and manage stakeholder expectations.'
                ]
            },
            {
                title: 'Job Updates | HTML, CSS, JavaScript, Gmail, DSA',
                period: 'November 2024',
                items: [
                    'Software to monitor <strong>40+</strong> product-based companies pages.',
                    'Filter Jobs based on experience, role, and location to receive only highly applicable job alerts.',
                    'Significantly improving job opportunities with <strong>immediate Gmail alert</strong>.'
                ]
            },
            {
                title: 'Code Generator Desktop App | Python, DSA, Excel',
                period: 'November 2023',
                items: [
                    'High-performance software to <strong>automate code generation</strong> based on basic screen inputs.',
                    'Reduced manual code generation time from weeks to just few days.',
                    'Resulting in a <strong>70%</strong> development time efficiency.'
                ]
            },
            {
                title: 'Real-Time Stock Update | DSA, Data Analytics, AI',
                period: 'February 2024',
                items: [
                    'Engineered a system for <strong>real-time monitoring of stock market data</strong>.',
                    'Implemented functionality to trigger <strong>Gmail alerts</strong> providing accurate market updates and news within recent 5 minutes.',
                    'Ensured <strong>timely communication of critical information</strong> to users, facilitating pre-profit booking insights.'
                ]
            }
        ],
        education: [
            {
                degree: 'Bachelor of Technology (B.Tech), Computer Science and Engineering',
                institution: 'CMR College of Engineering and Technology, Hyderabad',
                gpa: 'GPA: 8.2/10',
                period: '2018 - 2022'
            },
            {
                degree: 'High School Diploma (XII)',
                institution: 'TSW Residential JC, Hyderabad',
                gpa: 'GPA: 9.4/10',
                period: '2016 - 2018'
            }
        ],
        awards: [
            {
                title: 'Praggnanandhaa Award for Best Debutant',
                organization: 'Intellect Design Arena Ltd.',
                year: '2023'
            },
            {
                title: 'HackerRank Silver Badge',
                organization: 'Python (3 Star)',
                year: '2022'
            }
        ]
    };
    
    // Build resume HTML structure
    const buildResume = () => {
        const root = document.getElementById('resume-root');
        if (!root) return;
        
        const header = resumeData.header;
        const skills = resumeData.skills;
        const experience = resumeData.experience;
        const education = resumeData.education;
        const awards = resumeData.awards;
        
        root.innerHTML = `
            <div id="resume-content" class="resume-container">
                <!-- Header -->
                <header class="text-center pb-2 mb-1">
                    <h1 class="text-2xl font-extrabold text-gray-900 mb-0.5">${header.name}</h1>
                    <div class="text-[9px] font-bold text-gray-800 mb-1">
                        ${header.title}
                    </div>
                    <div class="text-[8px]">
                        <a href="${header.links.portfolio}" target="_blank" rel="noopener noreferrer" class="link-text">Portfolio</a> | 
                        <a href="${header.links.linkedin}" target="_blank" rel="noopener noreferrer" class="link-text">LinkedIn</a> | 
                        <a href="${header.links.leetcode}" target="_blank" rel="noopener noreferrer" class="link-text">Leetcode</a> | 
                        <a href="${header.links.hackerrank}" target="_blank" rel="noopener noreferrer" class="link-text">HackerRank</a> | 
                        <a href="${header.links.github}" target="_blank" rel="noopener noreferrer" class="link-text">Github</a> | 
                        Phone: ${header.contact.phone} | Email: ${header.contact.email} | Location: ${header.contact.location} | Experience: ${header.contact.experience}
                    </div>
                </header>

                <!-- Skills -->
                <section>
                    <h2 class="section-title-line">Skills</h2>
                    <div class="space-y-0.5 text-gray-800">
                        ${skills.map(skill => `
                            <div class="skill-item ${skill.justify ? 'skill-item-justify' : ''}">
                                <strong>${skill.label}</strong> ${skill.text}
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- Work Experience -->
                <section>
                    <h2 class="section-title-line">Work Experience</h2>
                    ${experience.map(exp => `
                        <div class="mb-2.5">
                            <div class="flex justify-between items-baseline mb-0.5">
                                <h3 class="font-bold text-gray-900 uppercase font-9pt">${exp.title}</h3>
                                <span class="font-semibold text-gray-500 font-8pt5">${exp.period}</span>
                            </div>
                            <ul class="experience-list list-disc list-outside ml-5 text-gray-700">
                                ${exp.items.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </section>

                <!-- Education -->
                <section>
                    <h2 class="section-title-line">Education</h2>
                    <div class="space-y-1.5 font-9pt">
                        ${education.map(edu => `
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <div class="font-bold text-gray-800 uppercase mb-0">${edu.degree}</div>
                                    <div class="text-gray-600">- ${edu.institution} | ${edu.gpa}</div>
                                </div>
                                <span class="font-semibold text-gray-500 ml-4 whitespace-nowrap">${edu.period}</span>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- Awards & Achievements -->
                <section>
                    <h2 class="section-title-line">Awards & Achievements</h2>
                    <ul class="list-disc list-outside ml-5 space-y-0.5 text-gray-700 font-9pt">
                        ${awards.map(award => `
                            <li>
                                <div class="flex justify-between">
                                    <span><strong>${award.title}</strong> - ${award.organization}</span>
                                    <span class="font-semibold text-gray-500">${award.year}</span>
                                </div>
                            </li>
                        `).join('')}
                    </ul>
                </section>
            </div>

            <!-- Floating Action Button -->
            <div class="floating-btn-container no-print">
                <span class="btn-tooltip">Download PDF</span>
                <button id="download-btn" aria-label="Download Resume PDF">
                    <i class="fas fa-file-pdf text-2xl"></i>
                </button>
            </div>
        `;
    };
    
    // Setup PDF download functionality
    const setupPDFDownload = () => {
        const downloadBtn = document.getElementById('download-btn');
        if (!downloadBtn) return;
        
        downloadBtn.addEventListener('click', function (event) {
            const element = document.getElementById('resume-content');
            if (!element) return;
            
            const options = {
                margin: 0,
                filename: 'Vineetkumar_Gorkanti_Resume.pdf',
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { scale: 3, useCORS: true, scrollY: 0, letterRendering: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            const btn = event.target.closest('button');
            const originalIcon = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin text-2xl"></i>';
            
            html2pdf().set(options).from(element).save().then(() => {
                btn.innerHTML = '<i class="fas fa-check text-2xl"></i>';
                setTimeout(() => {
                    btn.innerHTML = originalIcon;
                }, 2000);
            }).catch(() => {
                btn.innerHTML = originalIcon;
            });
        });
    };
    
    // Initialize everything
    const init = () => {
        injectStyles();
        buildResume();
        
        // Wait for DOM to be ready before setting up PDF download
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupPDFDownload);
        } else {
            setTimeout(setupPDFDownload, 100);
        }
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    window.resumeContent = { init, data: resumeData };
})();

