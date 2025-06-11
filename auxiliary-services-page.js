document.addEventListener('DOMContentLoaded', () => {
    const pageContainer = document.getElementById('auxiliary-services-content');
    if (!pageContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const clinicId = urlParams.get('id');
    let clinic = clinics.find(c => c.id === clinicId);

    function renderAuxiliaryServices() {
        if (!clinic) { pageContainer.innerHTML = '<h1>لم يتم العثور على العيادة</h1>'; return; }
        if (!clinic.auxiliaryServices) {
            clinic.auxiliaryServices = { notes: '' };
        }
        const data = clinic.auxiliaryServices;
        
        document.getElementById('checklist-page-title').innerText = `الأشعة والمختبر: ${clinic.name}`;
        document.getElementById('back-to-details-link').href = `clinic-details.html?id=${clinicId}`;

        const createTableRow = (id, label, value) => `<tr><td>${label}</td><td data-key="${id}"><span>${value || 'N/A'}</span></td></tr>`;

        pageContainer.innerHTML = `
            <section class="card details-card">
                <h2 class="card-header">X-Ray Room</h2>
                <div class="card-content">
                    <table>
                        <thead><tr><th>X-RAY Types & License</th><th>Status</th></tr></thead>
                        <tbody>
                            ${createTableRow('xrayPaFixed', 'P.A Fixed', data.xrayPaFixed)}
                            ${createTableRow('xrayPaMobile', 'P.A Mobile', data.xrayPaMobile)}
                            ${createTableRow('opg', 'O.P.G', data.opg)}
                            ${createTableRow('cephalometric', 'Cephalometric', data.cephalometric)}
                            ${createTableRow('cbct', 'CBCT', data.cbct)}
                            ${createTableRow('rpdLicense', 'RPD License', data.rpdLicense)}
                        </tbody>
                    </table>
                    <table style="margin-top: 1.5rem;">
                        <thead><tr><th>Environment & Protection</th><th>Status</th></tr></thead>
                        <tbody>
                            ${createTableRow('xrayEnvHygiene', 'Hygiene Inspection', data.xrayEnvHygiene)}
                            ${createTableRow('xrayProtectiveBarriers', 'Protective Barriers', data.xrayProtectiveBarriers)}
                            ${createTableRow('xraySurfacesDisinfection', 'Surfaces Disinfection', data.xraySurfacesDisinfection)}
                            ${createTableRow('xrayGloves', 'Gloves', data.xrayGloves)}
                            ${createTableRow('xrayTrashBasket', 'Trash Basket', data.xrayTrashBasket)}
                            ${createTableRow('xrayLeadApron', 'Lead Apron', data.xrayLeadApron)}
                        </tbody>
                    </table>
                </div>
            </section>
            <section class="card details-card">
                <h2 class="card-header">Dental Lab</h2>
                <div class="card-content">
                    <table>
                         <thead><tr><th>Environment & Type</th><th>Status</th></tr></thead>
                        <tbody>
                            ${createTableRow('labEnvHygiene', 'Hygiene Inspection', data.labEnvHygiene)}
                            ${createTableRow('labType', 'Type', data.labType)}
                        </tbody>
                    </table>
                     <table style="margin-top: 1.5rem;">
                         <thead><tr><th>Disinfection</th><th>Status</th></tr></thead>
                        <tbody>
                            ${createTableRow('labDisinfection', 'Surfaces Disinfection', data.labDisinfection)}
                            ${createTableRow('labImpression', 'Impression', data.labImpression)}
                            ${createTableRow('labAppliances', 'Appliances', data.labAppliances)}
                            ${createTableRow('labDisinfectionContainer', 'Disinfection Container', data.labDisinfectionContainer)}
                            ${createTableRow('labDisposableBags', 'Disposable Bags', data.labDisposableBags)}
                        </tbody>
                    </table>
                </div>
            </section>
            <section class="card details-card"><h2 class="card-header">ملاحظات</h2><div class="notes-content"><p>${data.notes || 'لا توجد ملاحظات.'}</p></div></section>
            <div class="button-group"><button id="edit-checklist-btn" class="action-button edit-button">تعديل</button><button id="save-checklist-btn" class="action-button save-button" style="display: none;">حفظ</button></div>
        `;
    }
    
    renderAuxiliaryServices();

    pageContainer.addEventListener('click', (event) => {
        if (event.target.id === 'edit-checklist-btn') {
            const standardOptions = ['Available', 'Not Available', 'N/A'];
            const hygieneOptions = ['Good', 'Not Good', 'N/A'];
            const labTypeOptions = ['Main Dental Lab', 'Mini Dental Lab', 'Contract', 'In Other Branch', 'N/A'];

            pageContainer.querySelectorAll('tbody td[data-key]').forEach(cell => {
                const key = cell.dataset.key;
                const currentValue = cell.querySelector('span').textContent;
                
                let options;
                if (key === 'labType') options = labTypeOptions;
                else if (key.includes('Hygiene')) options = hygieneOptions;
                else options = standardOptions;
                
                let dropdownHTML = `<select data-key="${key}" class="table-input">`;
                options.forEach(opt => {
                    dropdownHTML += `<option value="${opt}" ${opt === currentValue ? 'selected' : ''}>${opt}</option>`;
                });
                dropdownHTML += `</select>`;
                cell.innerHTML = dropdownHTML;
            });

            const notesP = pageContainer.querySelector('.notes-content p');
            if (notesP) pageContainer.querySelector('.notes-content').innerHTML = `<textarea class="notes-textarea">${notesP.textContent}</textarea>`;
            
            event.target.style.display = 'none';
            document.getElementById('save-checklist-btn').style.display = 'block';
        }

        if (event.target.id === 'save-checklist-btn') {
            const clinicIndex = clinics.findIndex(c => c.id === clinicId);
            if(clinicIndex === -1) return;
            const dataToUpdate = clinics[clinicIndex].auxiliaryServices;
            
            pageContainer.querySelectorAll('select[data-key]').forEach(select => {
                dataToUpdate[select.dataset.key] = select.value;
            });
            
            const notesTextarea = pageContainer.querySelector('.notes-content textarea');
            if(notesTextarea) dataToUpdate.notes = notesTextarea.value;

            saveData('clinics', clinics);
            alert('تم الحفظ بنجاح!');
            renderAuxiliaryServices();
        }
    });
});