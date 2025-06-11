document.addEventListener('DOMContentLoaded', () => {

    const clinicsPageContainer = document.getElementById('clinics-list');
    if (!clinicsPageContainer) return;

    const searchInput = document.getElementById('clinic-search-input');
    
    function renderClinics(clinicsToDisplay) {
        clinicsPageContainer.innerHTML = ''; 

        const categories = [
            { key: 'private_hospital', title: 'المستشفيات الخاصة' },
            { key: 'private_polyclinic', title: 'المستوصفات الخاصة' },
            { key: 'private_clinic', title: 'العيادات الخاصة' }
        ];

        let contentFound = false;
        categories.forEach(category => {
            const clinicsInCategory = clinicsToDisplay.filter(clinic => clinic.category === category.key);
            if (clinicsInCategory.length > 0) {
                contentFound = true;
                
                let clinicsHTML = '';
                const initiallyVisibleClinics = clinicsInCategory.slice(0, 2);
                
                initiallyVisibleClinics.forEach(clinic => {
                    clinicsHTML += `
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

                let categoryHTML = `
                    <section class="category-section" data-category="${category.key}">
                        <h2>${category.title}</h2>
                        <div class="clinics-grid">${clinicsHTML}</div>
                `;

                if (clinicsInCategory.length > 2) {
                    categoryHTML += `
                        <div class="show-all-container">
                            <a href="full-category-list.html?category=${category.key}" class="show-all-btn">عرض الكل (${clinicsInCategory.length})</a>
                        </div>
                    `;
                }

                categoryHTML += `</section>`;
                clinicsPageContainer.innerHTML += categoryHTML;
            }
        });
        
        if (!contentFound && searchInput.value.length > 0) {
            clinicsPageContainer.innerHTML = '<p>لا توجد عيادات تطابق هذا البحث.</p>';
        }
    }

    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredClinics = clinics.filter(clinic => clinic.name.toLowerCase().includes(searchTerm));
        renderClinics(filteredClinics);
    });

    renderClinics(clinics);
});