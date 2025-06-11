document.addEventListener('DOMContentLoaded', () => {
    const pageContainer = document.getElementById('sterilization-checklist-content');
    if (!pageContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const clinicId = urlParams.get('id');
    let clinic = clinics.find(c => c.id === clinicId);

    // --- دالة لرسم وعرض الواجهة ---
    function renderSterilizationChecklist() {
        if (!clinic) { pageContainer.innerHTML = '<h1>لم يتم العثور على العيادة</h1>'; return; }
        if (!clinic.sterilizationChecklist) {
            clinic.sterilizationChecklist = { notes: '' }; // بيانات افتراضية
        }
        const data = clinic.sterilizationChecklist;
        
        document.getElementById('checklist-page-title').innerText = `تقييم غرفة التعقيم: ${clinic.name}`;
        document.getElementById('back-to-details-link').href = `clinic-details.html?id=${clinicId}`;

        const createTableRow = (id, label, value) => `<tr><td>${label}</td><td data-key="${id}"><span>${value || 'N/A'}</span></td></tr>`;

        pageContainer.innerHTML = `
            <section class="card details-card">
                <h2 class="card-header">Room Configuration</h2>
                <div class="card-content">
                    <table><tbody>${createTableRow('roomConfiguration', 'Room Configuration', data.roomConfiguration)}</tbody></table>
                </div>
            </section>
            <section class="card details-card">
                <h2 class="card-header">Cleaning of Instruments</h2>
                <div class="card-content"><table><tbody>
                    ${createTableRow('manualWash', 'Manual Wash', data.manualWash)}
                    ${createTableRow('ultrasonicMachine', 'Ultrasonic Machine', data.ultrasonicMachine)}
                    ${createTableRow('washerDisinfector', 'Washer Disinfector', data.washerDisinfector)}
                </tbody></table></div>
            </section>
            <section class="card details-card">
                <h2 class="card-header">Drying of Instruments</h2>
                <div class="card-content"><table><tbody>
                    ${createTableRow('lintFreeTowels', 'Lint-free Towels', data.lintFreeTowels)}
                    ${createTableRow('dryer', 'Dryer', data.dryer)}
                </tbody></table></div>
            </section>
            <section class="card details-card">
                <h2 class="card-header">Autoclaves & Tests</h2>
                <div class="card-content"><table><tbody>
                    ${createTableRow('autoclavesNumber', 'Numbers of Autoclaves', data.autoclavesNumber)}
                    ${createTableRow('biologicalTest', 'Biological Test', data.biologicalTest)}
                    ${createTableRow('bdTest', 'B & D Test', data.bdTest)}
                    ${createTableRow('leakTest', 'Leak Test', data.leakTest)}
                    ${createTableRow('maintenanceReport', 'Periodical Maintenance Report', data.maintenanceReport)}
                </tbody></table></div>
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
    
    renderSterilizationChecklist();

    pageContainer.addEventListener('click', (event) => {
        if (event.target.id === 'edit-checklist-btn') {
            const roomOptions = ['1 Room', '2 Rooms', '3 Rooms', 'In the Clinic', 'N/A'];
            const standardOptions = ['Available', 'Not Available', 'N/A'];
            const testOptions = ['Yes', 'No', 'N/A'];

            pageContainer.querySelectorAll('tbody td[data-key]').forEach(cell => {
                const key = cell.dataset.key;
                const currentValue = cell.querySelector('span').textContent;
                
                if (key === 'autoclavesNumber') {
                    cell.innerHTML = `<input type="number" data-key="${key}" class="table-input" value="${currentValue}">`;
                } else {
                    let options;
                    if (key === 'roomConfiguration') {
                        options = roomOptions;
                    } else if (key.includes('Test')) {
                        options = testOptions;
                    } else {
                        options = standardOptions;
                    }
                    
                    let dropdownHTML = `<select data-key="${key}" class="table-input">`;
                    options.forEach(opt => {
                        dropdownHTML += `<option value="${opt}" ${opt === currentValue ? 'selected' : ''}>${opt}</option>`;
                    });
                    dropdownHTML += `</select>`;
                    cell.innerHTML = dropdownHTML;
                }
            });
            
            const notesP = pageContainer.querySelector('.notes-content p');
            if (notesP) pageContainer.querySelector('.notes-content').innerHTML = `<textarea class="notes-textarea">${notesP.textContent}</textarea>`;
            
            event.target.style.display = 'none';
            document.getElementById('save-checklist-btn').style.display = 'block';
        }

        if (event.target.id === 'save-checklist-btn') {
            const clinicIndex = clinics.findIndex(c => c.id === clinicId);
            if(clinicIndex === -1) return;
            const dataToUpdate = clinics[clinicIndex].sterilizationChecklist;
            
            pageContainer.querySelectorAll('[data-key]').forEach(input => {
                dataToUpdate[input.dataset.key] = input.value;
            });
            
            const notesTextarea = pageContainer.querySelector('.notes-content textarea');
            if(notesTextarea) dataToUpdate.notes = notesTextarea.value;

            saveData('clinics', clinics);
            alert('تم الحفظ بنجاح!');
            renderSterilizationChecklist();
        }
    });
});