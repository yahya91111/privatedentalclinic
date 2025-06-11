document.addEventListener('DOMContentLoaded', () => {
    const fullListContainer = document.getElementById('full-list-container');
    if (!fullListContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const categoryKey = urlParams.get('category');
    const clinicsToShow = clinics.filter(clinic => clinic.category === categoryKey);

    const pageTitle = document.getElementById('full-list-title');
    const categoryMap = {
        private_hospital: 'المستشفيات الخاصة',
        private_polyclinic: 'المستوصفات الخاصة',
        private_clinic: 'العيادات الخاصة'
    };
    if (pageTitle && categoryMap[categoryKey]) {
        pageTitle.innerText = categoryMap[categoryKey];
    }
    
    fullListContainer.innerHTML = '';
    if (clinicsToShow.length > 0) {
        clinicsToShow.forEach(clinic => {
            // === تم تعديل هذا الجزء بالكامل ليتوافق مع التصميم الجديد ===
            fullListContainer.innerHTML += `
                <a href="clinic-details.html?id=${clinic.id}" class="clinic-card-link">
                    <div class="clinic-item-card">
                        <h3 class="clinic-card-title-frame">${clinic.name}</h3>
                        <p class="clinic-card-phone">${clinic.phone || 'لا يوجد هاتف'}</p>
                        <div class="clinic-card-stats">
                            <div class="stat-item">
                                <label>رقم الزيارة</label>
                                <span>${clinic.visitNumber || 'N/A'}</span>
                            </div>
                            <div class="stat-item">
                                <label>التصنيف</label>
                                <span>${clinic.classification || 'غير محدد'}</span>
                            </div>
                        </div>
                    </div>
                </a>
            `;
        });
    } else {
        fullListContainer.innerHTML = "<p>لا توجد عيادات في هذا القسم.</p>";
    }
});