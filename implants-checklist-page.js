document.addEventListener('DOMContentLoaded', () => {
    const pageContainer = document.getElementById('implants-checklist-content');
    if (!pageContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const clinicId = urlParams.get('id');
    let clinic = clinics.find(c => c.id === clinicId);

    // --- دالة لرسم وعرض الواجهة ---
    function renderImplantsChecklist() {
        if (!clinic) { pageContainer.innerHTML = '<h1>لم يتم العثور على العيادة</h1>'; return; }
        if (!clinic.implantsChecklist) {
            clinic.implantsChecklist = { implantDoctorsTable: [], notes: '' };
        }
        const data = clinic.implantsChecklist;
        
        document.getElementById('checklist-page-title').innerText = `تقييم زراعة الأسنان: ${clinic.name}`;
        document.getElementById('back-to-details-link').href = `clinic-details.html?id=${clinicId}`;

        const createTableRow = (id, label, value) => `<tr><td>${label}</td><td data-key="${id}"><span>${value || 'N/A'}</span></td></tr>`;
        
        const createDoctorsTableRows = (doctors = [], rowCount) => {
            let rowsHTML = '';
            for (let i = 0; i < rowCount; i++) {
                const doc = doctors[i] || {};
                rowsHTML += `<tr>
                    <td><span>${doc.name || ''}</span></td>
                    <td><span>${doc.specialty || ''}</span></td>
                    <td><span>${doc.implantType || ''}</span></td>
                    <td><span>${doc.license || ''}</span></td>
                </tr>`;
            }
            return rowsHTML;
        };

        pageContainer.innerHTML = `
            <section class="card details-card">
                <h2 class="card-header">معلومات عامة</h2>
                <div class="card-content">
                    <table><tbody>
                        ${createTableRow('doesImplants', 'المركز يقوم بعمل الزراعة', data.doesImplants)}
                        ${createTableRow('hasImplantWasher', 'هل تتوفر غسالة لأدوات الزراعة', data.hasImplantWasher)}
                    </tbody></table>
                </div>
            </section>

            <section class="card details-card">
                <h2 class="card-header">الأطباء الذين يقومون بالزراعة في المركز (5)</h2>
                <div class="card-content">
                    <table id="implant-doctors-table">
                        <thead><tr><th>الاسم</th><th>الاختصاص</th><th>نوع implant</th><th>ترخيص الزراعة</th></tr></thead>
                        <tbody>${createDoctorsTableRows(data.implantDoctorsTable, 5)}</tbody>
                    </table>
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
    
    renderImplantsChecklist();

    pageContainer.addEventListener('click', (event) => {
        if (event.target.id === 'edit-checklist-btn') {
            const yesNoOptions = ['Yes', 'No', 'N/A'];
            
            pageContainer.querySelectorAll('tbody td[data-key]').forEach(cell => {
                const currentValue = cell.querySelector('span').textContent;
                let dropdownHTML = `<select data-key="${cell.dataset.key}" class="table-input">`;
                yesNoOptions.forEach(opt => {
                    dropdownHTML += `<option value="${opt}" ${opt === currentValue ? 'selected' : ''}>${opt}</option>`;
                });
                dropdownHTML += `</select>`;
                cell.innerHTML = dropdownHTML;
            });

            pageContainer.querySelectorAll('#implant-doctors-table td span').forEach(span => {
                span.parentElement.innerHTML = `<input type="text" class="table-input" value="${span.textContent}">`;
            });

            const notesP = pageContainer.querySelector('.notes-content p');
            if (notesP) pageContainer.querySelector('.notes-content').innerHTML = `<textarea class="notes-textarea">${notesP.textContent}</textarea>`;
            
            event.target.style.display = 'none';
            document.getElementById('save-checklist-btn').style.display = 'block';
        }

        if (event.target.id === 'save-checklist-btn') {
            const clinicIndex = clinics.findIndex(c => c.id === clinicId);
            if (clinicIndex === -1) return;
            const dataToUpdate = clinics[clinicIndex].implantsChecklist;
            
            pageContainer.querySelectorAll('select[data-key]').forEach(select => {
                dataToUpdate[select.dataset.key] = select.value;
            });
            
            const newImplantDoctorsTable = [];
            pageContainer.querySelectorAll('#implant-doctors-table tbody tr').forEach(row => {
                const inputs = row.querySelectorAll('input');
                const doctorData = { name: inputs[0].value, specialty: inputs[1].value, implantType: inputs[2].value, license: inputs[3].value };
                if (doctorData.name.trim() !== '') {
                    newImplantDoctorsTable.push(doctorData);
                }
            });
            dataToUpdate.implantDoctorsTable = newImplantDoctorsTable;
            
            const notesTextarea = pageContainer.querySelector('.notes-content textarea');
            if (notesTextarea) dataToUpdate.notes = notesTextarea.value;

            saveData('clinics', clinics);
            alert('تم الحفظ بنجاح!');
            renderImplantsChecklist();
        }
    });
});