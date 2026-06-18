// Track counts for dynamic form fields
let experienceCount = 0;
let educationCount = 0;

// Add experience form
function addExperience() {
    const container = document.getElementById('experienceContainer');
    const id = experienceCount++;
    const html = `
        <div class="form-group experience-item" id="experience-${id}">
            <h4 style="margin-bottom: 10px; color: #667eea;">Experience ${id + 1}</h4>
            <div style="margin-bottom: 10px;">
                <label>Job Title:</label>
                <input type="text" class="exp-title" placeholder="Software Engineer">
            </div>
            <div style="margin-bottom: 10px;">
                <label>Company:</label>
                <input type="text" class="exp-company" placeholder="Company Name">
            </div>
            <div style="margin-bottom: 10px;">
                <label>Duration:</label>
                <input type="text" class="exp-duration" placeholder="Jan 2020 - Present">
            </div>
            <div style="margin-bottom: 10px;">
                <label>Description:</label>
                <textarea class="exp-description" rows="2" placeholder="Describe your responsibilities and achievements..."></textarea>
            </div>
            <button type="button" onclick="removeElement('experience-${id}')" style="background: #e74c3c; margin-top: 5px;">Remove</button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

// Add education form
function addEducation() {
    const container = document.getElementById('educationContainer');
    const id = educationCount++;
    const html = `
        <div class="form-group education-item" id="education-${id}">
            <h4 style="margin-bottom: 10px; color: #667eea;">Education ${id + 1}</h4>
            <div style="margin-bottom: 10px;">
                <label>Degree:</label>
                <input type="text" class="edu-degree" placeholder="Bachelor of Science">
            </div>
            <div style="margin-bottom: 10px;">
                <label>Field of Study:</label>
                <input type="text" class="edu-field" placeholder="Computer Science">
            </div>
            <div style="margin-bottom: 10px;">
                <label>Institution:</label>
                <input type="text" class="edu-institution" placeholder="University Name">
            </div>
            <div style="margin-bottom: 10px;">
                <label>Graduation Year:</label>
                <input type="text" class="edu-year" placeholder="2023">
            </div>
            <button type="button" onclick="removeElement('education-${id}')" style="background: #e74c3c; margin-top: 5px;">Remove</button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

// Remove form element
function removeElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

// Generate resume preview
function generateResume() {
    const preview = document.getElementById('resumePreview');
    
    // Get personal info
    const fullName = document.getElementById('fullName').value || 'Your Name';
    const email = document.getElementById('email').value || 'your.email@example.com';
    const phone = document.getElementById('phone').value || '(123) 456-7890';
    const location = document.getElementById('location').value || 'City, State';
    const summary = document.getElementById('summary').value;
    
    // Build resume HTML
    let resumeHTML = `
        <div class="resume-header">
            <h1>${escapeHtml(fullName)}</h1>
            <div class="contact-info">
                ${email ? `${escapeHtml(email)} | ` : ''}
                ${phone ? `${escapeHtml(phone)} | ` : ''}
                ${location ? escapeHtml(location) : ''}
            </div>
        </div>
    `;
    
    // Add summary
    if (summary) {
        resumeHTML += `
            <h2>Professional Summary</h2>
            <p>${escapeHtml(summary)}</p>
        `;
    }
    
    // Add experience
    const experienceItems = document.querySelectorAll('.experience-item');
    if (experienceItems.length > 0) {
        resumeHTML += '<h2>Work Experience</h2>';
        experienceItems.forEach(item => {
            const title = item.querySelector('.exp-title').value;
            const company = item.querySelector('.exp-company').value;
            const duration = item.querySelector('.exp-duration').value;
            const description = item.querySelector('.exp-description').value;
            
            if (title || company) {
                resumeHTML += `
                    <h3>${escapeHtml(title)} ${company ? `at ${escapeHtml(company)}` : ''}</h3>
                    ${duration ? `<p><strong>${escapeHtml(duration)}</strong></p>` : ''}
                    ${description ? `<p>${escapeHtml(description)}</p>` : ''}
                `;
            }
        });
    }
    
    // Add education
    const educationItems = document.querySelectorAll('.education-item');
    if (educationItems.length > 0) {
        resumeHTML += '<h2>Education</h2>';
        educationItems.forEach(item => {
            const degree = item.querySelector('.edu-degree').value;
            const field = item.querySelector('.edu-field').value;
            const institution = item.querySelector('.edu-institution').value;
            const year = item.querySelector('.edu-year').value;
            
            if (degree || institution) {
                resumeHTML += `
                    <h3>${escapeHtml(degree)} ${field ? `in ${escapeHtml(field)}` : ''}</h3>
                    <p>${institution ? `${escapeHtml(institution)}` : ''}${year ? ` (${escapeHtml(year)})` : ''}</p>
                `;
            }
        });
    }
    
    // Add skills
    const skills = document.getElementById('skills').value;
    if (skills) {
        resumeHTML += '<h2>Skills</h2>';
        const skillList = skills.split(',').map(s => s.trim()).filter(s => s);
        resumeHTML += '<p>' + escapeHtml(skillList.join(' • ')) + '</p>';
    }
    
    preview.innerHTML = resumeHTML;
    console.log('Resume generated successfully');
}

// Download resume as PDF (requires a library like html2pdf)
function downloadResume() {
    // Generate resume first to ensure it's up to date
    generateResume();
    
    const element = document.getElementById('resumePreview');
    const fullName = document.getElementById('fullName').value || 'Resume';
    const filename = `${fullName.replace(/\s+/g, '_')}_Resume.html`;
    
    // Create a new window with the resume for printing
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Resume</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(`
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { text-align: center; margin-bottom: 5px; }
        .contact-info { text-align: center; font-size: 0.9em; margin-bottom: 20px; }
        h2 { color: #333; margin-top: 15px; border-bottom: 1px solid #999; }
        h3 { margin: 10px 0 5px 0; }
        p { margin: 5px 0; }
    `);
    printWindow.document.write('</style></head><body>');
    printWindow.document.write(element.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

// Utility function to escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Initialize with one empty experience and education field
window.addEventListener('DOMContentLoaded', () => {
    addExperience();
    addEducation();
});