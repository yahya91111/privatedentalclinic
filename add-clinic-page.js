document.addEventListener('DOMContentLoaded', () => {
    const addClinicForm = document.getElementById('add-clinic-form');
    if (!addClinicForm) return; // الخروج إذا لم نكن في الصفحة الصحيحة

    addClinicForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const newClinic = {
            id: 'c' + Date.now(),
            name: document.getElementById('clinic-name').value,
            address: document.getElementById('clinic-address').value || 'غير محدد',
            phone: document.getElementById('clinic-phone').value || 'غير محدد',
            licenseHolder: document.getElementById('clinic-license').value || 'غير محدد',
            classification: document.getElementById('clinic-classification').value,
            category: document.getElementById('clinic-category').value
        };
        
        if (!newClinic.name.trim()) {
            alert('الرجاء إدخال اسم العيادة.');
            return;
        }

        // 'clinics' و 'saveData' معرفة في ملف data.js
        clinics.push(newClinic);
        saveData('clinics', clinics);
        
        alert('تمت إضافة العيادة بنجاح!');
        window.location.href = 'clinics.html';
    });
});