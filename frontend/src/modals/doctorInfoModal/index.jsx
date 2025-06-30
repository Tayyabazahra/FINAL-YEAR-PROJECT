import { Button, Modal } from "../../generalComponents";

export const DoctorInfoModal = ({ showModal, setShowModal, doctor }) => {
  if (!doctor) return null;

  return (
    <Modal
      isOpen={showModal}
      setIsOpen={setShowModal}
      title="Doctor Information"
      footer={
        <div className="flex justify-end gap-4">
          <Button
            label="Close"
            variant="tertiary"
            onClick={() => setShowModal(false)}
          />
          <Button
            label="Book Consultation"
            onClick={() => window.open(doctor.consulationLink, "_blank")}
          />
        </div>
      }
    >
      <div className="flex flex-col gap-6 mb-12 max-h-[calc(100vh-300px)] overflow-y-auto">
        <div className="flex items-start gap-6">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-32 h-32 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-primary-text mb-2">
              {doctor.name}
            </h2>
            <p className="text-secondary-text mb-1">{doctor.specialization}</p>
            <p className="text-secondary-text mb-1">{doctor.expertise}</p>
            <p className="text-secondary-text">{doctor.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-primary-text mb-2">
              Experience & Achievements
            </h3>
            <p className="text-secondary-text bg-surface-2 p-4 rounded-lg">
              {doctor.bio}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary-text mb-2">
              Qualifications
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-surface-2 rounded-full text-sm text-primary-text">
                {doctor.specialization}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-2 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-secondary-text mb-1">
                Success Rate
              </h4>
              <p className="text-lg font-semibold text-primary-text">
                {doctor.satisfactionRate}
              </p>
            </div>
            <div className="bg-surface-2 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-secondary-text mb-1">
                Patients Treated
              </h4>
              <p className="text-lg font-semibold text-primary-text">
                {doctor.patientsCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
