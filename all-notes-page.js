document.addEventListener('DOMContentLoaded', () => {
    const pageContainer = document.getElementById('all-notes-content');
    if (!pageContainer) return; // تأكد من أننا في الصفحة الصحيحة

    const urlParams = new URLSearchParams(window.location.search);
    const clinicId = urlParams.get('id');
    const clinic = clinics.find(c => c.id === clinicId);

    if (clinic) {
        document.getElementById('checklist-page-title').innerText = `الملاحظات المجمعة لـ: ${clinic.name}`;
        document.getElementById('back-to-details-link').href = `clinic-details.html?id=${clinicId}`;

        // قائمة بكل أقسام التقييم التي تحتوي على ملاحظات
        const sectionsWithNotes = [
            { title: 'ملاحظات معلومات الطاقم', notes: clinic.staffInfo?.notes },
            { title: 'ملاحظات تقييم العيادة', notes: clinic.dentalChecklist?.notes },
            { title: 'ملاحظات غرفة التعقيم', notes: clinic.sterilizationChecklist?.notes },
            { title: 'ملاحظات التطهير والنفايات', notes: clinic.disinfectionChecklist?.notes },
            { title: 'ملاحظات الأشعة والمختبر', notes: clinic.auxiliaryServices?.notes },
            { title: 'ملاحظات زراعة الأسنان', notes: clinic.implantsChecklist?.notes },
            { title: 'ملاحظات خطة العلاج', notes: clinic.treatmentPlanChecklist?.notes }
        ];

        pageContainer.innerHTML = ''; // تفريغ الحاوية

        sectionsWithNotes.forEach(section => {
            const noteText = section.notes || 'لا توجد ملاحظات مسجلة لهذا القسم.';
            const cardHTML = `
                <section class="card details-card">
                    <h2 class="card-header">${section.title}</h2>
                    <div class="notes-content">
                        <p>${noteText}</p>
                    </div>
                </section>
            `;
            pageContainer.innerHTML += cardHTML;
        });

    } else {
        pageContainer.innerHTML = '<h1>لم يتم العثور على العيادة</h1>';
    }
});