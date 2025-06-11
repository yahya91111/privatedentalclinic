document.addEventListener('DOMContentLoaded', () => {
    const staffInfoContainer = document.getElementById('staff-info-content');
    if (!staffInfoContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const clinicId = urlParams.get('id');
    let clinic = clinics.find(c => c.id === clinicId);

    // دالة لرسم وعرض الواجهة
    function renderStaffInfo() {
        if (!clinic) {
            staffInfoContainer.innerHTML = '<h1>لم يتم العثور على العيادة</h1>';
            return;
        }
        if (!clinic.staffInfo) {
            clinic.staffInfo = { doctorsCount: 0, visitingDoctorsCount: 0, nursingStaffCount: 0, techniciansCount: 0, clinicsCount: 0, doctorsTable: [], visitingDoctorsTable: [], nursingTable: [], techniciansTable: [], notes: "" };
        }
        const staffData = clinic.staffInfo;

        document.getElementById('staff-page-title').innerText = `معلومات طاقم: ${clinic.name}`;
        document.getElementById('back-to-details-link').href = `clinic-details.html?id=${clinicId}`;

        const createTableRows = (dataArray = [], rowCount) => {
            let rowsHTML = '';
            for (let i = 0; i < rowCount; i++) {
                const item = dataArray[i] || {};
                rowsHTML += `<tr>
                    <td><span>${item.name || ''}</span></td>
                    <td><span>${item.specialty || ''}</span></td>
                    <td><span>${item.licenseNumber || ''}</span></td>
                    <td><span>${item.issueDate || ''}</span></td>
                    <td><span>${item.expiryDate || ''}</span></td>
                </tr>`;
            }
            return rowsHTML;
        };

        staffInfoContainer.innerHTML = `
            <section class="card details-card">
                <h2 class="card-header">عدد الطاقم العامل والعيادات</h2>
                <div class="card-content">
                    <table id="summary-table">
                        <thead><tr><th>التصنيف</th><th>العدد</th></tr></thead>
                        <tbody>
                            <tr><td>الأطباء</td><td><span>${staffData.doctorsCount || 0}</span></td></tr>
                            <tr><td>الأطباء الزائرين</td><td><span>${staffData.visitingDoctorsCount || 0}</span></td></tr>
                            <tr><td>الهيئة التمريضية</td><td><span>${staffData.nursingStaffCount || 0}</span></td></tr>
                            <tr><td>الفنيين</td><td><span>${staffData.techniciansCount || 0}</span></td></tr>
                            <tr><td>عدد العيادات</td><td><span>${staffData.clinicsCount || 0}</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </section>
            
            <section class="card details-card"><h2 class="card-header">الأطباء (15)</h2><div class="card-content"><table id="doctors-table"><thead><tr><th>الاسم</th><th>التخصص</th><th>رقم الترخيص</th><th>تاريخ الترخيص</th><th>انتهاء الترخيص</th></tr></thead><tbody>${createTableRows(staffData.doctorsTable, 15)}</tbody></table></div></section>
            <section class="card details-card"><h2 class="card-header">الأطباء الزائرون (5)</h2><div class="card-content"><table id="visiting-doctors-table"><thead><tr><th>الاسم</th><th>التخصص</th><th>رقم الترخيص</th><th>تاريخ الترخيص</th><th>انتهاء الترخيص</th></tr></thead><tbody>${createTableRows(staffData.visitingDoctorsTable, 5)}</tbody></table></div></section>
            <section class="card details-card"><h2 class="card-header">الفنيين (8)</h2><div class="card-content"><table id="technicians-table"><thead><tr><th>الاسم</th><th>التخصص</th><th>رقم الترخيص</th><th>تاريخ الترخيص</th><th>انتهاء الترخيص</th></tr></thead><tbody>${createTableRows(staffData.techniciansTable, 8)}</tbody></table></div></section>
            <section class="card details-card"><h2 class="card-header">الهيئة التمريضية (15)</h2><div class="card-content"><table id="nursing-table"><thead><tr><th>الاسم</th><th>التخصص</th><th>رقم الترخيص</th><th>تاريخ الترخيص</th><th>انتهاء الترخيص</th></tr></thead><tbody>${createTableRows(staffData.nursingTable, 15)}</tbody></table></div></section>

            <section class="card details-card">
                <h2 class="card-header">ملاحظات</h2>
                <div class="notes-content"><p>${staffData.notes || 'لا توجد ملاحظات.'}</p></div>
            </section>

            <div class="button-group">
                <button id="edit-staff-btn" class="action-button edit-button">تعديل</button>
                <button id="save-staff-btn" class="action-button save-button" style="display: none;">حفظ التعديلات</button>
            </div>
        `;
    }
    
    renderStaffInfo();

    staffInfoContainer.addEventListener('click', (event) => {
        if (event.target.id === 'edit-staff-btn') {
            // تفعيل حقول جدول العدد كأرقام
            staffInfoContainer.querySelectorAll('#summary-table td span').forEach(span => {
                const currentValue = span.textContent;
                span.parentElement.innerHTML = `<input type="number" value="${currentValue}" class="table-input">`;
            });

            // تفعيل حقول الجداول الأخرى كنصوص
            staffInfoContainer.querySelectorAll('#doctors-table span, #visiting-doctors-table span, #technicians-table span, #nursing-table span').forEach(span => {
                const currentValue = span.textContent;
                span.parentElement.innerHTML = `<input type="text" value="${currentValue}" class="table-input">`;
            });
            
            const notesP = staffInfoContainer.querySelector('.notes-content p');
            if (notesP) {
                staffInfoContainer.querySelector('.notes-content').innerHTML = `<textarea class="notes-textarea">${notesP.textContent}</textarea>`;
            }
            
            event.target.style.display = 'none';
            document.getElementById('save-staff-btn').style.display = 'block';
        }

        if (event.target.id === 'save-staff-btn') {
            const clinicIndex = clinics.findIndex(c => c.id === clinicId);
            if (clinicIndex === -1) return;

            const staffDataToUpdate = clinics[clinicIndex].staffInfo;

            const summaryInputs = staffInfoContainer.querySelectorAll('#summary-table input');
            staffDataToUpdate.doctorsCount = summaryInputs[0].value;
            staffDataToUpdate.visitingDoctorsCount = summaryInputs[1].value;
            staffDataToUpdate.nursingStaffCount = summaryInputs[2].value;
            staffDataToUpdate.techniciansCount = summaryInputs[3].value;
            staffDataToUpdate.clinicsCount = summaryInputs[4].value;

            const saveTableData = (tableId) => {
                const table = document.getElementById(tableId);
                if(!table) return [];
                const newTableData = [];
                table.querySelectorAll('tbody tr').forEach(row => {
                    const inputs = row.querySelectorAll('input');
                    const rowData = { name: inputs[0].value, specialty: inputs[1].value, licenseNumber: inputs[2].value, issueDate: inputs[3].value, expiryDate: inputs[4].value };
                    if(rowData.name.trim() !== '') { newTableData.push(rowData); }
                });
                return newTableData;
            };

            staffDataToUpdate.doctorsTable = saveTableData('doctors-table');
            staffDataToUpdate.visitingDoctorsTable = saveTableData('visiting-doctors-table');
            staffDataToUpdate.techniciansTable = saveTableData('technicians-table');
            staffDataToUpdate.nursingTable = saveTableData('nursing-table');
            
            const notesTextarea = staffInfoContainer.querySelector('.notes-content textarea');
            if(notesTextarea) staffDataToUpdate.notes = notesTextarea.value;
            
            saveData('clinics', clinics);
            alert('تم حفظ التعديلات بنجاح!');
            clinic = clinics[clinicIndex];
            renderStaffInfo();
        }
    });
});