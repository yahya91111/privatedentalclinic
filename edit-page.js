document.addEventListener('DOMContentLoaded', () => {
    const editClinicForm = document.getElementById('edit-clinic-form');
    if(!editClinicForm) return;

    const urlParams = new URLSearchParams(window.location.search);
    const clinicId = urlParams.get('id');
    const clinicToEdit = clinics.find(c => c.id === clinicId);
    
    if(clinicToEdit) {
        document.getElementById('edit-page-title').innerText = `تعديل: ${clinicToEdit.name}`;
        document.getElementById('cancel-edit-link').href = `clinic-details.html?id=${clinicId}`;
        
        const formContainer = document.getElementById('edit-form-container');
        
        // قائمة خيارات التصنيف الجديدة
        const classificationOptions = [
            'عيادة اسنان', 'عيادة اسنان في مستشفى', 'عيادة اسنان في مستوصف', 
            'مركز اسنان تخصصي', 'عيادة اسنان في مركز تخصصي', 'عيادة اسنان متنقلة', 
            'مخبتر اسنان', 'محل تركيبات'
        ];
        
        // بناء الفورم على شكل جدول
        formContainer.innerHTML = `
            <table>
                <tbody>
                    <tr><td>اسم العيادة</td><td><input type="text" id="edit-name" value="${clinicToEdit.name || ''}"></td></tr>
                    <tr><td>العنوان</td><td><input type="text" id="edit-address" value="${clinicToEdit.address || ''}"></td></tr>
                    <tr><td>الهاتف</td><td><input type="tel" id="edit-phone" value="${clinicToEdit.phone || ''}"></td></tr>
                    <tr><td>صاحب الترخيص المؤسسه العلاجيه</td><td><input type="text" id="edit-license" value="${clinicToEdit.licenseHolder || ''}"></td></tr>
                    <tr>
                        <td>التصنيف</td>
                        <td>
                            <select id="edit-classification">
                                ${classificationOptions.map(opt => `<option value="${opt}" ${clinicToEdit.classification === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                            </select>
                        </td>
                    </tr>
                    <tr><td>رقم الزيارة لهذه السنة</td><td><input type="text" id="edit-visit-no" value="${clinicToEdit.visitNumber || ''}"></td></tr>
                    <tr><td>يوم الزيارة</td><td><input type="text" id="edit-visit-day" value="${clinicToEdit.visitDay || ''}"></td></tr>
                    <tr><td>تاريخ الزيارة</td><td><input type="date" id="edit-visit-date" value="${clinicToEdit.visitDate || ''}"></td></tr>
                    <tr><td>المفتش الأول</td><td><input type="text" id="inspector1" value="${clinicToEdit.inspectors?.[0] || ''}"></td></tr>
                    <tr><td>المفتش الثاني</td><td><input type="text" id="inspector2" value="${clinicToEdit.inspectors?.[1] || ''}"></td></tr>
                    <tr><td>المفتش الثالث</td><td><input type="text" id="inspector3" value="${clinicToEdit.inspectors?.[2] || ''}"></td></tr>
                </tbody>
            </table>
        `;

        editClinicForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const clinicIndex = clinics.findIndex(c => c.id === clinicId);
            if(clinicIndex > -1) {
                clinics[clinicIndex].name = document.getElementById('edit-name').value;
                clinics[clinicIndex].address = document.getElementById('edit-address').value;
                clinics[clinicIndex].phone = document.getElementById('edit-phone').value;
                clinics[clinicIndex].licenseHolder = document.getElementById('edit-license').value;
                clinics[clinicIndex].classification = document.getElementById('edit-classification').value;
                clinics[clinicIndex].visitNumber = document.getElementById('edit-visit-no').value;
                clinics[clinicIndex].visitDay = document.getElementById('edit-visit-day').value;
                clinics[clinicIndex].visitDate = document.getElementById('edit-visit-date').value;
                clinics[clinicIndex].inspectors = [
                    document.getElementById('inspector1').value,
                    document.getElementById('inspector2').value,
                    document.getElementById('inspector3').value
                ];
                
                saveData('clinics', clinics);
                alert('تم حفظ التعديلات بنجاح!');
                window.location.href = `clinic-details.html?id=${clinicId}`;
            }
        });
    }
});