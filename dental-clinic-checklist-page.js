document.addEventListener('DOMContentLoaded', () => {
    const pageContainer = document.getElementById('dental-checklist-content');
    if (!pageContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const clinicId = urlParams.get('id');
    let clinic = clinics.find(c => c.id === clinicId);

    function render() {
        if(clinic) {
            pageContainer.innerHTML = renderDentalChecklistHTML(clinic);
        } else {
            pageContainer.innerHTML = '<h1>لم يتم العثور على العيادة</h1>';
        }
    }
    

    // --- دالة لرسم وعرض الواجهة ---
    function renderChecklist() {
        if (!clinic) { pageContainer.innerHTML = '<h1>لم يتم العثور على العيادة</h1>'; return; }
        if (!clinic.dentalChecklist) {
            clinic.dentalChecklist = { 
                expiredMaterials: [], 
                notes: '',
                // إضافة قيم افتراضية لكل البنود لتجنب الأخطاء
                environment: 'N/A', washingFacilities: 'N/A', dryingFacilities: 'N/A', disinfectantHandRub: 'N/A',
                sterileGloves: 'N/A', nonSterileGloves: 'N/A', masks: 'N/A', coatOrGown: 'N/A', glassesOfFaceShield: 'N/A',
                hve: 'N/A', salivaEjectors: 'N/A', disposableCovers: 'N/A', cups: 'N/A', bib: 'N/A',
                disposableMirrors: 'N/A', disposableImpTrays: 'N/A', airWaterNozzles: 'N/A'
            };
        }
        const data = clinic.dentalChecklist;
        
        document.getElementById('checklist-page-title').innerText = `تقييم عيادة: ${clinic.name}`;
        document.getElementById('back-to-details-link').href = `clinic-details.html?id=${clinicId}`;

        const createTableRow = (id, label, value) => `<tr><td>${label}</td><td data-key="${id}"><span>${value || 'N/A'}</span></td></tr>`;
        
        const createExpiredTableRows = (materials = [], rowCount) => {
            let rowsHTML = '';
            for (let i = 0; i < rowCount; i++) {
                const item = materials[i] || {};
                rowsHTML += `<tr><td><span>${item.name || ''}</span></td><td><span>${item.expiryDate || ''}</span></td></tr>`;
            }
            return rowsHTML;
        };

        pageContainer.innerHTML = `
            <section class="card details-card"><h2 class="card-header">Environment</h2><div class="card-content"><table><tbody id="environment-section">${createTableRow('environment', 'General Environment', data.environment)}</tbody></table></div></section>
            <section class="card details-card"><h2 class="card-header">Hand Washing</h2><div class="card-content"><table><tbody id="handwashing-section">
                ${createTableRow('washingFacilities', 'Washing Facilities', data.washingFacilities)}
                ${createTableRow('dryingFacilities', 'Drying Facilities', data.dryingFacilities)}
                ${createTableRow('disinfectantHandRub', 'Disinfectant Hand Rub', data.disinfectantHandRub)}
            </tbody></table></div></section>
            <section class="card details-card"><h2 class="card-header">Protective Barriers</h2><div class="card-content"><table><tbody id="barriers-section">
                ${createTableRow('sterileGloves', 'Sterile Gloves', data.sterileGloves)}
                ${createTableRow('nonSterileGloves', 'Non-sterile Gloves', data.nonSterileGloves)}
                ${createTableRow('masks', 'Masks', data.masks)}
                ${createTableRow('coatOrGown', 'Coat or Gown', data.coatOrGown)}
                ${createTableRow('glassesOfFaceShield', 'Glasses or Face Shield', data.glassesOfFaceShield)}
            </tbody></table></div></section>
            <section class="card details-card">
                <h2 class="card-header">Use of Disposable</h2>
                <div class="card-content">
                    <table id="disposable-table"><tbody>
                        ${createTableRow('hve', 'H.V.E', data.hve)}
                        ${createTableRow('salivaEjectors', 'Saliva Ejectors', data.salivaEjectors)}
                        ${createTableRow('disposableCovers', 'Disposable Covers', data.disposableCovers)}
                        ${createTableRow('cups', 'Cups', data.cups)}
                        ${createTableRow('bib', 'Bib', data.bib)}
                        ${createTableRow('disposableMirrors', 'Disposable Mirrors', data.disposableMirrors)}
                        ${createTableRow('disposableImpTrays', 'Disposable Imp. Trays', data.disposableImpTrays)}
                        ${createTableRow('airWaterNozzles', 'Air-water Nozzles', data.airWaterNozzles)}
                    </tbody></table>
                </div>
            </section>
            <section class="card details-card"><h2 class="card-header">Expired Material</h2><div class="card-content"><table id="expired-materials-table"><thead><tr><th>Name</th><th>Expired Date</th></tr></thead><tbody>${createExpiredTableRows(data.expiredMaterials, 7)}</tbody></table></div></section>
            <section class="card details-card"><h2 class="card-header">ملاحظات (Notes)</h2><div class="notes-content"><p>${data.notes || 'لا توجد ملاحظات.'}</p></div></section>
            <div class="button-group"><button id="edit-checklist-btn" class="action-button edit-button">تعديل</button><button id="save-checklist-btn" class="action-button save-button" style="display: none;">حفظ</button></div>
        `;
    }
    
    renderChecklist();

    pageContainer.addEventListener('click', (event) => {
        if (event.target.id === 'edit-checklist-btn') {
            const envOptions = ['Good', 'Not Good', 'N/A'];
            const standardOptions = ['Available', 'Not Available', 'N/A'];
            
            pageContainer.querySelectorAll('tbody td[data-key]').forEach(cell => {
                const key = cell.dataset.key;
                const currentValue = cell.querySelector('span').textContent;
                const options = (key === 'environment') ? envOptions : standardOptions;
                let dropdownHTML = `<select data-key="${key}" class="table-input">`;
                options.forEach(opt => {
                    dropdownHTML += `<option value="${opt}" ${opt === currentValue ? 'selected' : ''}>${opt}</option>`;
                });
                dropdownHTML += `</select>`;
                cell.innerHTML = dropdownHTML;
            });
            
            pageContainer.querySelectorAll('#expired-materials-table td span').forEach(span => {
                span.parentElement.innerHTML = `<input type="text" class="table-input" value="${span.textContent}">`;
            });
            const notesP = pageContainer.querySelector('.notes-content p');
            if (notesP) pageContainer.querySelector('.notes-content').innerHTML = `<textarea class="notes-textarea">${notesP.textContent}</textarea>`;
            
            event.target.style.display = 'none';
            document.getElementById('save-checklist-btn').style.display = 'block';
        }

        if (event.target.id === 'save-checklist-btn')
          
 {
            const clinicIndex = clinics.findIndex(c => c.id === clinicId);
            if(clinicIndex === -1) return;
            const dataToUpdate = clinics[clinicIndex].dentalChecklist;
            
            pageContainer.querySelectorAll('select[data-key]').forEach(select => {
                dataToUpdate[select.dataset.key] = select.value;
            });
            
            const expiredMaterialsTable = [];
            pageContainer.querySelectorAll('#expired-materials-table tbody tr').forEach(row => {
                const inputs = row.querySelectorAll('input');
                if (inputs.length > 1) {
                    const material = { name: inputs[0].value, expiryDate: inputs[1].value };
                    if (material.name.trim() !== '') expiredMaterialsTable.push(material);
                }
            });
            dataToUpdate.expiredMaterials = expiredMaterialsTable;
            
            const notesTextarea = pageContainer.querySelector('.notes-content textarea');
            if(notesTextarea) dataToUpdate.notes = notesTextarea.value;

            saveData('clinics', clinics);
            alert('تم حفظ التعديلات بنجاح!');
            renderChecklist();
        }
    });
});