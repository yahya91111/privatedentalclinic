function getDefaultData() {
    return [
        { 
            id: 'c01', 
            name: 'مستشفى الأمل الدولي', 
            address: 'مدينة الكويت', 
            phone: '22211144', 
            licenseHolder: 'شركة الأمل الطبية', 
            category: 'private_hospital', 
            classification: 'عيادة اسنان في مستشفى',
            visitNumber: '1', 
            visitDay: 'الأحد', 
            visitDate: '2025-06-08',
            inspectors: ['د. علي حسن', 'د. محمد صالح', ''],
            
            staffInfo: {
                doctorsCount: 5, visitingDoctorsCount: 2, nursingStaffCount: 10, techniciansCount: 4, clinicsCount: 8,
                doctorsTable: [
                    { name: 'د. أحمد محمد', specialty: 'تقويم', licenseNumber: 'A4568', issueDate: '2022-01-01', expiryDate: '2026-01-01' },
                    { name: 'د. سارة علي', specialty: 'جراحة فم', licenseNumber: 'B7891', issueDate: '2021-06-15', expiryDate: '2025-06-30' }
                ],
                visitingDoctorsTable: [{ name: 'د. زائر', specialty: 'تجميل', licenseNumber: 'V111', issueDate: '2024-01-01', expiryDate: '2025-01-01' }],
                techniciansTable: [],
                nursingTable: [],
                notes: "الطاقم متعاون والتراخيص سارية."
            },

            dentalChecklist: {
                environment: 'Good', washingFacilities: 'Available', dryingFacilities: 'Available', disinfectantHandRub: 'Not Available',
                sterileGloves: 'Available', nonSterileGloves: 'Available', masks: 'Available', coatOrGown: 'Available', glassesOfFaceShield: 'Not Available',
                hve: 'Available', salivaEjectors: 'Available', disposableCovers: 'Available', cups: 'Available', bib: 'Available',
                disposableMirrors: 'Not Available', disposableImpTrays: 'Available', airWaterNozzles: 'Available',
                expiredMaterials: [{ name: 'مادة حشو', expiryDate: '2024-12-01' }],
                notes: 'يجب توفير واقيات للوجه.'
            },

            sterilizationChecklist: {
                roomConfiguration: '2 Rooms', manualWash: 'Available', ultrasonicMachine: 'Available', washerDisinfector: 'Not Available',
                lintFreeTowels: 'Available', dryer: 'Not Available', autoclavesNumber: '3',
                biologicalTest: 'Yes', bdTest: 'Yes', leakTest: 'No', maintenanceReport: 'Available',
                notes: 'أحد أجهزة الأوتوكلاف يحتاج صيانة قريبة.'
            },
            
            disinfectionChecklist: {
                surfacesDisinfection: 'Available', impressionDisinfection: 'Available', disinfectionContainer: 'Not Available',
                disposableBags: 'Available', nonSharpWaste: 'Available', sharpWaste: 'Available',
                nonHazardousWaste: 'Available', notes: 'يجب توفير حاوية تطهير إضافية.'
            },

            auxiliaryServices: {
                xrayPaFixed: 'Available', xrayPaMobile: 'Not Available', opg: 'Available', 
                cephalometric: 'Available', cbct: 'Not Available', rpdLicense: 'Available',
                xrayEnvHygiene: 'Good', xrayProtectiveBarriers: 'Available', xraySurfacesDisinfection: 'Available',
                xrayGloves: 'Available', xrayTrashBasket: 'Available', xrayLeadApron: 'Available',
                labEnvHygiene: 'Good', labType: 'Main Dental Lab', labDisinfection: 'Available', labImpression: 'Available',
                labAppliances: 'Available', labDisinfectionContainer: 'Available', labDisposableBags: 'Available',
                notes: 'جهاز الأشعة OPG يحتاج معايرة.'
            },

            implantsChecklist: {
                doesImplants: 'Yes', hasImplantWasher: 'Yes',
                implantDoctorsTable: [ { name: 'د. سارة علي', specialty: 'جراحة فم', implantType: 'Straumann', license: 'IMP-01' } ],
                notes: 'قسم الزراعة مجهز بالكامل.'
            },

            treatmentPlanChecklist: {
                medicalHistory: 'وافي', diagnosis: 'وافي', treatment: 'غير وافي',
                monthlyStats: 'Yes', guideSigns: 'Yes', licenseMatch: 'Yes', feesList: 'No',
                receipts: 'Yes', prescriptionCopies: 'Yes', patientRegistry: 'Yes',
                emergencyMedsRegistry: 'Yes', safetyPrecautions: 'Yes',
                wasteContract: 'يوجد',
                notes: 'خطة العلاج للمرضى تحتاج تفاصيل أكثر.'
            },
            
            attachments: [
                { id: 'att01', name: 'ترخيص العيادة 2025.pdf', type: 'pdf' },
                { id: 'att02', name: 'صورة الواجهة الأمامية.jpg', type: 'image' }
            ]
        },
        { 
            id: 'c02', 
            name: 'مستوصف الشفاء الأهلي', 
            address: 'السالمية', phone: '25758595', licenseHolder: 'مجموعة الشفاء', category: 'private_polyclinic', classification: 'عيادة اسنان في مستوصف',
            visitNumber: '2', visitDay: 'الثلاثاء', visitDate: '2025-06-10',
            inspectors: ['د. فاطمة خالد', '', ''],

            staffInfo: {
                doctorsCount: 3, visitingDoctorsCount: 1, nursingStaffCount: 5, techniciansCount: 2, clinicsCount: 6,
                doctorsTable: [ { name: 'د. فاطمة خالد', specialty: 'أطفال', licenseNumber: 'C1122', issueDate: '2023-02-20', expiryDate: '2027-02-20' } ],
                visitingDoctorsTable: [], techniciansTable: [], nursingTable: [],
                notes: "يحتاج لمزيد من الفنيين."
            },

            dentalChecklist: {
                environment: 'Not Good', notes: 'نظافة البيئة العامة تحتاج تحسين.'
            },
            
            sterilizationChecklist: {
                roomConfiguration: '1 Room', notes: 'يجب توفير تقرير صيانة دوري.'
            },

            disinfectionChecklist: {
                surfacesDisinfection: 'Available', notes: 'إجراءات تطهير الطبعات تحتاج إلى مراجعة.'
            },

            auxiliaryServices: {
                labType: 'Contract', notes: 'عقد المختبر الخارجي ساري المفعول.'
            },

            implantsChecklist: {
                doesImplants: 'No', notes: 'المركز لا يقوم بعمليات زراعة الأسنان حالياً.'
            },

            treatmentPlanChecklist: {
                medicalHistory: 'غير وافي', notes: ''
            },
            
            attachments: [
                { id: 'att03', name: 'عقد النفايات.pdf', type: 'pdf' }
            ]
        }
    ];
}

function loadData(key) {
    const dataJSON = localStorage.getItem(key);
    if (!dataJSON) {
        const defaultData = getDefaultData();
        saveData(key, defaultData);
        return defaultData;
    }
    return JSON.parse(dataJSON);
}

function saveData(key, dataToSave) {
    localStorage.setItem(key, JSON.stringify(dataToSave));
}

const clinics = loadData('clinics');