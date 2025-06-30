import { useEffect, useState } from "react";
import { PageHeader } from "../../../layout/dashboardLayout/components";
import { Table, Modal, Button } from "../../../generalComponents";
import { InfoIcon } from "../../../assets/svgAssets";
import { DoctorInfoModal } from "../../../modals";
import DrIftikhar from "../../../assets/images/doctors/dr.iftikhar.webp";
import DrMehak from "../../../assets/images/doctors/dr.mehak.webp";
import DrMunir from "../../../assets/images/doctors/dr.munir.png";
import { FormattedMessage } from "react-intl";

export const doctorsData = [
  {
    id: 1,
    name: "Dr. Syed Iftikhar Ul Hameed",
    image: DrIftikhar,
    specialization: "Diabetologist",
    experience: "19",
    patientsCount: "478",
    satisfactionRate: "100%",
    consulationLink:
      "https://oladoc.com/pakistan/karachi/dr/diabetologist/syed-iftikhar-ul-hameed/2019307",
    bio: "Dr. Syed Iftikhar Ul Hameed is an expert Diabetologist with 19 years of experience. You can book an in-person appointment or an online video consultation with Dr. Syed Iftikhar Ul Hameed through oladoc.com or by calling at 02138140600.",
  },
  {
    name: "Dr. Mehak Hanif",
    image: DrMehak,
    specialization: "Diabetologist",
    experience: "7",
    patientsCount: "750",
    satisfactionRate: "100%",
    consulationLink:
      "https://oladoc.com/pakistan/video-consultation/dr/internal-medicine-specialist/mehak-hanif-endocrinologist/2689222",
    bio: "Dr. Mehak Hanif is a Internal Medicine Specialist with 7 years of experience currently available at Online Video Consultation, Video Consultation. You can book an in-person appointment or an online video consultation with Dr. Mehak Hanif through oladoc.com or by calling at 04238900939.",
  },
  {
    name: "Dr. Munir Ahmed Channa",
    image: DrMunir,
    specialization: "Diabetologist",
    experience: "12",
    patientsCount: "125",
    satisfactionRate: "4.2",
    consulationLink:
      "https://merisehat.pk/doctor/karachi/diabetologist/dr-munir-ahmed-channa/77465",
    bio: "Dr. Munir Ahmed Channa is an esteemed Diabetologist, Endocrinologist, and General Physician with extensive expertise in managing a wide range of medical conditions. He holds a Bachelor of Medicine and Bachelor of Surgery (MBBS) degree, along with a Fellowship of the College of Physicians and Surgeons (FCPS), establishing a strong foundation in internal medicine. His specialized MS in Diabetes and Endocrine further enhances his ability to treat complex endocrine disorders and diabetes-related complications.",
  },
];

export const Doctors = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = "Doctors | Radyab-e-Zakhm";
  }, []);

  const selectedLanguage = localStorage.getItem("language");

  const handleDoctorSelection = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const doctorColumns = [
    {
      title: <FormattedMessage id="DASHBOARD.DOCTOR" />,
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.image}
            alt={`${text}'s photo`}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-medium text-primary-text">{text}</div>
            <div className="text-xs text-secondary-text">{record.email}</div>
          </div>
        </div>
      ),
      width: 250,
    },
    {
      title: <FormattedMessage id="DASHBOARD.SPECIALIZATION" />,
      dataIndex: "specialization",
      key: "specialization",
      width: 150,
    },
    {
      title: <FormattedMessage id="DASHBOARD.PATIENTS_TREATED" />,
      dataIndex: "patientsCount",
      key: "patientsCount",
      render: (text) => (
        <span className="font-medium text-primary-text">{text}</span>
      ),
      width: 150,
    },
    {
      title: <FormattedMessage id="DASHBOARD.ACTIONS" />,
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="text-secondary-text p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all"
            onClick={() => handleDoctorSelection(record)}
          >
            <InfoIcon width={20} height={20} />
          </button>
        </div>
      ),
      width: 75,
    },
  ];

  return (
    <main className="w-full min-h-dvh bg-surface-2">
      <PageHeader title={<FormattedMessage id="DOCTORS.TITLE" />} />
      <div
        className={`lg:flex-row p-6 flex gap-6 flex-col flex-1 lg:bg-neutral-50/75 lg:dark:bg-neutral-900 ${
          selectedLanguage === "ur" ? "rounded-tr-[40px]" : "rounded-tl-[40px]"
        } h-[calc(100vh-81px-80px)] lg:h-[calc(100vh-81px)] overflow-y-auto`}
      >
        {/* Mobile View */}
        <div className=" flex flex-col gap-6 flex-1/2">
          <div className="max-w-4xl w-[calc(100vw-50px)] md:w-full mx-auto flex flex-col gap-4 p-4 lg:p-8 rounded-[32px] bg-neutral-0 dark:bg-neutral-800">
            <Table columns={doctorColumns} data={doctorsData} />
          </div>
        </div>
      </div>

      {showModal && (
        <DoctorInfoModal
          showModal={showModal}
          setShowModal={setShowModal}
          doctor={selectedDoctor}
        />
      )}
    </main>
  );
};
