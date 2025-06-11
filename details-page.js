/* =================================================================== */
/* شق: تفعيل صفحة تفاصيل العيادة (clinic-details.html) */
/* =================================================================== */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. اختيار العناصر والتأكد من أننا في الصفحة الصحيحة ---
    const detailsContainer = document.getElementById('main-details-content');
    const pageTitleElement = document.getElementById('details-page-title');
    if (!detailsContainer || !pageTitleElement) return;

    // --- 2. جلب البيانات من الرابط وإيجاد العيادة ---
    const urlParams = new URLSearchParams(window.location.search);
    const clinicId = urlParams.get('id');
    const clinic = clinics.find(c => c.id === clinicId);

    // --- 3. بناء وعرض محتوى الصفحة ---
    if (clinic) {
        pageTitleElement.innerText = clinic.name;

        const subsections = [
            { title: "معلومات الطاقم", href: `staff-information.html?id=${clinicId}` },
            { title: "تقييم العيادة", href: `dental-clinic-checklist.html?id=${clinicId}` },
            { title: "غرفة التعقيم", href: `sterilization-checklist.html?id=${clinicId}` },
            { title: "التطهير والنفايات", href: `disinfection-checklist.html?id=${clinicId}` },
            { title: "الأشعة والمختبر", href: `auxiliary-services.html?id=${clinicId}` },
            { title: "زراعة الأسنان", href: `implants-checklist.html?id=${clinicId}` },
            { title: "خطة العلاج", href: `treatment-plan-checklist.html?id=${clinicId}` },
            { title: "الملاحظات المجمعة", href: `all-notes.html?id=${clinicId}` },
            { title: "المرفقات", href: `attachments.html?id=${clinicId}` }
        ];
        let subsectionHTML = '';
        subsections.forEach(sec => {
            subsectionHTML += `<a href="${sec.href}" class="subsection-button"><span>${sec.title}</span></a>`;
        });
        
        
        detailsContainer.innerHTML = `
            <section class="card details-card">
                <div class="card-header">
                    <h2>معلومات العيادة</h2>
                    <a href="edit-clinic.html?id=${clinicId}" class="card-header-action">تعديل</a>
                </div>
                <div class="card-content-padding">
                    <div class="details-info-strip">
                        <div class="info-box"><label>اسم العيادة</label><span>${clinic.name || ''}</span></div>
                        <div class="info-box"><label>العنوان</label><span>${clinic.address || ''}</span></div>
                        <div class="info-box"><label>الهاتف</label><span>${clinic.phone || ''}</span></div>
                        <div class="info-box"><label>التصنيف</label><span>${clinic.classification || ''}</span></div>
                        <div class="info-box"><label>صاحب الرخصة</label><span>${clinic.licenseHolder || ''}</span></div>
                        <div class="info-box"><label>تاريخ الزيارة</label><span>${clinic.visitDate || 'N/A'}</span></div>
                    </div>
                </div>
            </section>
            
            <section class="card details-card">
                <h2 class="card-header">أقسام التقييم</h2>
                <div class="subsection-grid">${subsectionHTML}</div>
            </section>
            
            <div class="danger-zone">
                 <button id="delete-clinic-button" class="action-button delete-button">مسح العيادة</button>
            </div>
              <div class="page-actions-container">
                 <button id="print-button" class="action-button print-button">طباعة</button>
                 </div>
        `;
       
        
        // --- 4. ربط الأحداث للأزرار (Print & Delete) ---
        const printButton = document.getElementById('print-button');
        if(printButton) {
            printButton.addEventListener('click', () => {
                // الانتقال إلى صفحة الطباعة مع إرسال ID العيادة
                window.location.href = `print-report.html?id=${clinicId}`;
            });
        }
        
        
        const deleteButton = document.getElementById('delete-clinic-button');
        if (deleteButton) {
            deleteButton.addEventListener('click', () => {
                if (confirm(`هل أنت متأكد من حذف عيادة "${clinic.name}"؟`)) {
                    const updatedClinics = clinics.filter(c => c.id !== clinicId);
                    saveData('clinics', updatedClinics);
                    alert('تم الحذف بنجاح.');
                    window.location.href = 'clinics.html';
                }
            });
        }

    } else {
        pageTitleElement.innerText = 'خطأ';
        detailsContainer.innerHTML = '<h1>لم يتم العثور على العيادة.</h1>';
    }
});