// هذا الملف يحتوي على دوال تقوم بإنشاء كود HTML لكل قسم من أقسام التقييم

// =======================================================
// 1. دالة رسم قسم: معلومات الطاقم
// =======================================================
function renderStaffInfoHTML(clinic) {
    if (!clinic) return '<section class="card details-card"><h2 class="card-header">معلومات الطاقم</h2><p class="card-content-padding">لم يتم العثور على بيانات العيادة.</p></section>';
    if (!clinic.staffInfo) {
        // إذا لم يكن هناك بيانات طاقم، نعرض رسالة بدلاً من جداول فارغة
        return '<section class="card details-card"><h2 class="card-header">معلومات الطاقم</h2><p class="card-content-padding">لا توجد بيانات طاقم مسجلة لهذه العيادة.</p></section>';
    }
    const staffData = clinic.staffInfo;

    const createTableRows = (dataArray = [], rowCount) => {
        let rowsHTML = '';
        for (let i = 0; i < rowCount; i++) {
            const item = dataArray[i] || {};
            rowsHTML += `
                <tr>
                    <td>${item.name || ''}</td>
                    <td>${item.specialty || ''}</td>
                    <td>${item.licenseNumber || ''}</td>
                    <td>${item.issueDate || ''}</td>
                    <td>${item.expiryDate || ''}</td>
                </tr>
            `;
        }
        return rowsHTML;
    };

    return `
        <section class="card details-card">
            <h2 class="card-header">عدد الطاقم العامل والعيادات</h2>
            <div class="card-content">
                <table id="summary-table">
                    <thead><tr><th>التصنيف</th><th>العدد</th></tr></thead>
                    <tbody>
                        <tr><td>الأطباء</td><td>${staffData.doctorsCount || 0}</td></tr>
                        <tr><td>الأطباء الزائرين</td><td>${staffData.visitingDoctorsCount || 0}</td></tr>
                        <tr><td>الهيئة التمريضية</td><td>${staffData.nursingStaffCount || 0}</td></tr>
                        <tr><td>الفنيين</td><td><span>${staffData.techniciansCount || 0}</span></td></tr>
                        <tr><td>عدد العيادات</td><td>${staffData.clinicsCount || 0}</td></tr>
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
    `;
}


// =======================================================
// 2. دالة رسم قسم: تقييم عيادة الأسنان
// =======================================================
function renderDentalChecklistHTML(clinic) {
    if (!clinic || !clinic.dentalChecklist) return '<section class="card details-card"><h2 class="card-header">تقييم العيادة</h2><p class="card-content-padding">لا توجد بيانات لهذا القسم.</p></section>';
    // ... بقية كود الرسم الخاص بتقييم العيادة ...
    return ``;
}

// أضف هنا دوال الرسم لبقية الصفحات في المستقبل...