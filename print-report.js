document.addEventListener('DOMContentLoaded', () => {
    const reportContainer = document.getElementById('report-content');
    if (!reportContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const clinicId = urlParams.get('id');
    const clinic = clinics.find(c => c.id === clinicId);

    if (clinic) {
        document.getElementById('report-main-title').innerText = `تقرير تفتيش: ${clinic.name}`;

        // استدعاء دالة رسم معلومات الطاقم ووضعها في المكان المخصص
        const staffContainer = document.getElementById('print-staff-info');
        if (staffContainer) {
            staffContainer.innerHTML = renderStaffInfoHTML(clinic);
        }
        
        // تم تعليق هذا مؤقتاً للتركيز على معلومات الطاقم فقط
        // const dentalChecklistContainer = document.getElementById('print-dental-checklist');
        // if (dentalChecklistContainer) {
        //     dentalChecklistContainer.innerHTML = renderDentalChecklistHTML(clinic);
        // }

        setTimeout(() => window.print(), 500);

    } else {
        reportContainer.innerHTML = '<h1>لم يتم العثور على العيادة</h1>';
    }
});