document.addEventListener('DOMContentLoaded', () => {
    const pageContainer = document.getElementById('attachments-content');
    if (!pageContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const clinicId = urlParams.get('id');
    let clinic = clinics.find(c => c.id === clinicId);

    function renderAttachments() {
        if (!clinic) { pageContainer.innerHTML = '<h1>لم يتم العثور على العيادة</h1>'; return; }
        if (!clinic.attachments) {
            clinic.attachments = [];
        }
        
        document.getElementById('checklist-page-title').innerText = `مرفقات: ${clinic.name}`;
        document.getElementById('back-to-details-link').href = `clinic-details.html?id=${clinicId}`;

        const attachmentsGrid = document.getElementById('attachments-grid');
        attachmentsGrid.innerHTML = ''; // تفريغ الشبكة قبل العرض

        if (clinic.attachments.length === 0) {
            attachmentsGrid.innerHTML = '<p>لا توجد مرفقات حالياً.</p>';
        } else {
            clinic.attachments.forEach(file => {
                const isImage = file.name.match(/\.(jpeg|jpg|gif|png)$/) != null;
                const iconHTML = isImage 
                    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" /></svg>`
                    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0018.75 9h-7.5A2.25 2.25 0 019 6.75V1.5H5.625zm5.063 5.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" clip-rule="evenodd" /></svg>`;
                
                attachmentsGrid.innerHTML += `
                    <div class="attachment-item">
                        <div class="attachment-icon">${iconHTML}</div>
                        <span>${file.name}</span>
                    </div>
                `;
            });
        }
    }

    renderAttachments();

    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-upload');

    uploadForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const newAttachment = {
                id: 'att' + Date.now(),
                name: file.name,
                type: file.type.startsWith('image/') ? 'image' : 'file'
            };

            clinic.attachments.push(newAttachment);
            saveData('clinics', clinics);

            alert(`تمت إضافة المرفق: ${file.name}`);
            renderAttachments(); // إعادة عرض القائمة لتشمل الملف الجديد
            uploadForm.reset(); // تفريغ حقل الإدخال
        } else {
            alert('الرجاء اختيار ملف أولاً.');
        }
    });
});