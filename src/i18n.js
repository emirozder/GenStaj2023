import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            appTitle: 'GenInternship2023',
            patientList: 'Patient List',
            patients: 'Patients',
            homePage: 'Home Page',
            appointment: 'Appointment',
            records: 'Records',
            exit: 'Exit',
            settings: 'Settings',
            services: 'Services',
            other: 'Other',
            
            search: 'Search',
            
            czNo: 'Citizenship No',
            name: 'Name', givenName: 'Given Name', familyName: 'Family Name', patientName: 'Patient Name',
            birthDate: 'Birth Date', birthDateLabel: 'Birth Date (YYYY-MM-DD)',
            gender: 'Gender',
            resourceType: 'Resource Type',
            contact: 'Contact',
            address: 'Address',
            actions: 'Actions',
            totalPatientCount: 'Total Patient Count:',

            deletePatientTitle: 'Delete Patient',
            deletePatientText: 'Are you sure to delete patient record? : ',
            cancel: 'Cancel',
            delete:'Delete',

            addPatient: 'Add Patient',
            add: 'Add',
            country: 'Country',
            state: 'State',
            city: 'City',

            updatePatient: 'Update Patient',
            update: 'Update',

            createAppointment: 'Create Appointment',
            newAppointment: 'New Appointment',
            practitioner: 'Practitioner', practitionerName: 'Practitioner Name',
            department: 'Departmemt',
            appointmentDateTime: 'Appointment Date & Time',
            create: 'Create',
            createDate: 'Create Date',
            status: 'Status',
            totalAppointmentCount: 'Total Appointment Count:',
            selectPatient: 'Select Patient',
            select: 'Select',
        }
    },
    tr: {
        translation: {
            appTitle: 'GenStaj2023',
            patientList: 'Hasta Listesi',
            patients: 'Hastalar',
            homePage: 'Ana Sayfa',
            appointment: 'Randevular',
            records: 'Kayıtlar',
            exit: 'Çıkış',
            settings: 'Ayarlar',
            services: 'Hizmetler',
            other: 'Diğer',
            
            search: 'Ara',
            
            czNo: 'Kimlik Numarası',
            name: 'İsim', givenName: 'İsim', familyName: 'Soyisim', patientName: 'Hasta Adı',
            birthDate: 'Doğum Tarihi', birthDateLabel: 'Doğum Tarihi (YYYY-AA-GG)',
            gender: 'Cinsiyet',
            resourceType: 'Kayıt Tipi',
            contact: 'İletişim',
            address: 'Adres',
            actions: 'İşlemler',
            totalPatientCount: 'Toplam Hasta Sayısı:',

            deletePatientTitle: 'Hasta Sil',
            deletePatientText: 'Hasta kaydını silmek istediğinize emin misiniz? : ',
            cancel: 'İptal',
            delete:'Sil',

            addPatient: 'Hasta Ekle',
            add: 'Ekle',
            country: 'Ülke',
            state: 'Şehir',
            city: 'İlçe',

            updatePatient: 'Hasta Güncelle',
            update: 'Güncelle',

            createAppointment: 'Randevu Oluştur',
            newAppointment: 'Yeni Randevu',
            practitioner: 'Uzman', practitionerName: 'Uzman Adı',
            department: 'Departman',
            appointmentDateTime: 'Randevu Tarihi ve Saati',
            create: 'Oluştur',
            createDate: 'Oluşturulma Tarihi',
            status: 'Durum',
            totalAppointmentCount: 'Toplam Randevu Sayısı:',
            selectPatient: 'Hasta Seç',
            select: 'Seç',
        }
    }
}

i18n
    .use(initReactI18next)
    .init({
        lng: 'en',
        resources
    })

export default i18n