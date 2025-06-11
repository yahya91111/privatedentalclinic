document.addEventListener('DOMContentLoaded', () => {
    const pageContainer = document.getElementById('disinfection-checklist-content');
    if (!pageContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const clinicId = urlParams.get('id');
    let clinic = clinics.find(c => c.id === clinicId);

    function renderDisinfectionChecklist() {
        if (!clinic) { pageContainer.innerHTML = '<h1>لم يتم العثور على العيادة</h1>'; return; }
        if (!clinic.disinfectionChecklist) {
            clinic.disinfectionChecklist = { notes: '' }; 
        }
        const data = clinic.disinfectionChecklist;
        
        document.getElementById('checklist-page-title').innerText = `تقييم التطهير والنفايات: ${clinic.name}`;
        document.getElementById('back-to-details-link').href = `clinic-details.html?id=${clinicId}`;

        const createTableRow = (id, label, value) => `<tr><td>${label}</td><td data-key="${id}"><span>${value || 'N/A'}</span></td></tr>`;

        pageContainer.innerHTML = `
            <section class="card details-card">
                <h2 class="card-header">Disinfection</h2>
                <div class="card-content">
                    <table><tbody>
                        ${createTableRow('surfacesDisinfection', 'Surfaces Disinfection', data.surfacesDisinfection)}
                        ${createTableRow('impressionDisinfection', 'Impression Disinfection', data.impressionDisinfection)}
                        ${createTableRow('disinfectionContainer', 'Disinfection Container', data.disinfectionContainer)}
                        ${createTableRow('disposableBags', 'Disposable Bags', data.disposableBags)}
                    </tbody></table>
                </div>
            </section>
            <section class="card details-card">
                <h2 class="card-header">Waste Disposal</h2>
                <div class="card-content">
                    <table><tbody>
                        ${createTableRow('nonSharpWaste', 'Infectious Waste (Non-sharp)', data.nonSharpWaste)}
                        ${createTableRow('sharpWaste', 'Infectious Waste (Sharp)', data.sharpWaste)}
                        ${createTableRow('nonHazardousWaste', 'Non-infectious / Non-hazardous Waste', data.nonHazardousWaste)}
                    </tbody></table>
                </div>
            </section>
            <section class="card details-card">
                <h2 class="card-header">ملاحظات</h2>
                <div class="notes-content"><p>${data.notes || 'لا توجد ملاحظات.'}</p></div>
            </section>
            <div class="button-group">
                <button id="edit-checklist-btn" class="action-button edit-button">تعديل</button>
                <button id="save-checklist-btn" class="action-button save-button" style="display: none;">حفظ</button>
            </div>
        `;
    }
    
    renderDisinfectionChecklist();

    pageContainer.addEventListener('click', (event) => {
        if (event.target.id === 'edit-checklist-btn') {
            const standardOptions = ['Available', 'Not Available', 'N/A'];
            pageContainer.querySelectorAll('tbody td[data-key]').forEach(cell => {
                const currentValue = cell.querySelector('span').textContent;
                let dropdownHTML = `<select data-key="${cell.dataset.key}" class="table-input">`;
                standardOptions.forEach(opt => {
                    dropdownHTML += `<option value="${opt}" ${opt === currentValue ? 'selected' : ''}>${opt}</option>`;
                });
                dropdownHTML += `</select>`;
                cell.innerHTML = dropdownHTML;
            });
            const notesP = pageContainer.querySelector('.notes-content p');
            if (notesP) {
                pageContainer.querySelector('.notes-content').innerHTML = `<textarea class="notes-textarea">${notesP.textContent}</textarea>`;
            }
            event.target.style.display = 'none';
            document.getElementById('save-checklist-btn').style.display = 'block';
        }

        if (event.target.id === 'save-checklist-btn') {
            const clinicIndex = clinics.findIndex(c => c.id === clinicId);
            if(clinicIndex === -1) return;
            const dataToUpdate = clinics[clinicIndex].disinfectionChecklist;
            
            pageContainer.querySelectorAll('select[data-key]').forEach(select => {
                dataToUpdate[select.dataset.key] = select.value;
            });
            
            const notesTextarea = pageContainer.querySelector('.notes-content textarea');
            if(notesTextarea) dataToUpdate.notes = notesTextarea.value;

            saveData('clinics', clinics);
            alert('تم الحفظ!');
            renderDisinfectionChecklist();
        }
    });
});