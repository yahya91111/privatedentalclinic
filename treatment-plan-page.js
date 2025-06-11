document.addEventListener('DOMContentLoaded', () => {
    const pageContainer = document.getElementById('treatment-plan-content');
    if (!pageContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const clinicId = urlParams.get('id');
    let clinic = clinics.find(c => c.id === clinicId);

    function renderTreatmentPlan() {
        if (!clinic) { pageContainer.innerHTML = '<h1>لم يتم العثور على العيادة</h1>'; return; }
        if (!clinic.treatmentPlanChecklist) {
            clinic.treatmentPlanChecklist = { notes: '' };
        }
        const data = clinic.treatmentPlanChecklist;
        
        document.getElementById('checklist-page-title').innerText = `خطة العلاج والملفات: ${clinic.name}`;
        document.getElementById('back-to-details-link').href = `clinic-details.html?id=${clinicId}`;

        const createTableRow = (id, label, value) => `<tr><td>${label}</td><td data-key="${id}"><span>${value || 'N/A'}</span></td></tr>`;

        pageContainer.innerHTML = `
            <section class="card details-card">
                <h2 class="card-header">الملفات والبطاقات الاصليه</h2>
                <div class="card-content"><table><tbody>
                    ${createTableRow('medicalHistory', 'التاريخ المرضي', data.medicalHistory)}
                    ${createTableRow('diagnosis', 'التشخيص المرضي', data.diagnosis)}
                    ${createTableRow('treatment', 'العلاج', data.treatment)}
                </tbody></table></div>
            </section>
            <section class="card details-card">
                <h2 class="card-header">بنود أخرى</h2>
                <div class="card-content"><table><tbody>
                    ${createTableRow('monthlyStats', 'ارسال الاحصائيات الشهريه', data.monthlyStats)}
                    ${createTableRow('guideSigns', 'اللافتات الاستدلاليه', data.guideSigns)}
                    ${createTableRow('licenseMatch', 'مطابقة الترخيص', data.licenseMatch)}
                    ${createTableRow('feesList', 'قائمة الاجور', data.feesList)}
                    ${createTableRow('receipts', 'ايصالات الاجور', data.receipts)}
                    ${createTableRow('prescriptionCopies', 'نسخ الوصفات الطبيه', data.prescriptionCopies)}
                    ${createTableRow('patientRegistry', 'سجل المراجعين للعياده', data.patientRegistry)}
                    ${createTableRow('emergencyMedsRegistry', 'سجل الادويه المسعفه', data.emergencyMedsRegistry)}
                    ${createTableRow('safetyPrecautions', 'احتياطات الامن والسلامه', data.safetyPrecautions)}
                </tbody></table></div>
            </section>
            <section class="card details-card">
                <h2 class="card-header">النفايات</h2>
                <div class="card-content"><table><tbody>
                    ${createTableRow('wasteContract', 'عقد النفايات', data.wasteContract)}
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
    
    renderTreatmentPlan();

    pageContainer.addEventListener('click', (event) => {
        if (event.target.id === 'edit-checklist-btn') {
            const historyOptions = ['وافي', 'غير وافي', 'N/A'];
            const yesNoOptions = ['نعم', 'لا', 'N/A'];
            const contractOptions = ['يوجد', 'لا يوجد', 'N/A'];

            pageContainer.querySelectorAll('tbody td[data-key]').forEach(cell => {
                const key = cell.dataset.key;
                const currentValue = cell.querySelector('span').textContent;
                let options;
                if (key === 'wasteContract') {
                    options = contractOptions;
                } else if (['medicalHistory', 'diagnosis', 'treatment'].includes(key)) {
                    options = historyOptions;
                } else {
                    options = yesNoOptions;
                }
                
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
            const dataToUpdate = clinics[clinicIndex].treatmentPlanChecklist;
            
            pageContainer.querySelectorAll('select[data-key]').forEach(select => {
                dataToUpdate[select.dataset.key] = select.value;
            });
            
            const notesTextarea = pageContainer.querySelector('.notes-content textarea');
            if(notesTextarea) dataToUpdate.notes = notesTextarea.value;

            saveData('clinics', clinics);
            alert('تم الحفظ!');
            renderTreatmentPlan();
        }
    });
});