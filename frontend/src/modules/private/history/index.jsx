import { useEffect, useState } from "react";
import { PageHeader } from "../../../layout/dashboardLayout/components";
import { useQuery } from "@tanstack/react-query";
import { getHistory } from "../../../api/history";
import illustrationEmpty from "../../../assets/illustration-empty.svg";
import illustrationEmptyDark from "../../../assets/illustration-empty-dark.svg";
import { FormattedDate, FormattedMessage } from "react-intl";
import { Button, Table } from "../../../generalComponents";
import {
  AddMediaImageIcon,
  InfoIcon,
  TrashIcon,
} from "../../../assets/svgAssets";
import {
  DeleteAllHistoryModal,
  DeleteHistoryModal,
  HistoryModal,
} from "../../../modals";

export const History = () => {
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);

  const handleOpenModal = (history) => {
    setSelectedHistory(history);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (history) => {
    setSelectedHistory(history);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    document.title = "History | Radyab-e-Zakhm";
  }, []);
  const { data, isLoading } = useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
  });

  const history = data?.data?.history || [];

  const badgeStyles = {
    "Complex wound": {
      bg: "bg-red-100 dark:bg-red-200/10",
      text: "text-red-800 dark:text-red-400",
    },
    "Immediately treatable": {
      bg: "bg-orange-100 dark:bg-orange-200/10",
      text: "text-orange-800 dark:text-orange-400",
    },
    "Non advanced treatable": {
      bg: "bg-yellow-100 dark:bg-yellow-200/10",
      text: "text-yellow-800 dark:text-yellow-400",
    },
    "Treatable within 4 weeks": {
      bg: "bg-green-100 dark:bg-green-200/10",
      text: "text-green-800 dark:text-green-400",
    },
  };

  const columns = [
    {
      title: <FormattedMessage id="HISTORY.DATE" />,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <span>
          <FormattedDate value={createdAt} />
        </span>
      ),
      width: 100,
    },
    {
      title: <FormattedMessage id="HISTORY.RESULT" />,
      dataIndex: "result",
      key: "result",
      render: (result) => (
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full inline-block whitespace-nowrap
      ${badgeStyles[result]?.bg || "bg-neutral-200 dark:bg-neutral-800"}
      ${badgeStyles[result]?.text || "text-primary-text"}
    `}
        >
          {result}
        </span>
      ),
      width: 150,
    },
    {
      title: <FormattedMessage id="HISTORY.IMAGE" />,
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (imgUrl) => (
        <a href={imgUrl} target="_blank" rel="noopener noreferrer">
          <span className="text-primary-text">
            <AddMediaImageIcon width={24} height={24} />
          </span>
        </a>
      ),
      width: 50,
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
            onClick={() => handleOpenModal(record)}
          >
            <InfoIcon width={20} height={20} />
          </button>
          <button
            type="button"
            className="text-secondary-text p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all"
            onClick={() => handleOpenDeleteModal(record)}
          >
            <TrashIcon width={20} height={20} />
          </button>
        </div>
      ),
      width: 75,
    },
  ];
  return (
    <main className="w-full h-dvh ">
      <PageHeader title={<FormattedMessage id="HISTORY.TITLE" />} />

      <div className="md:p-6 lg:bg-neutral-50/75  lg:dark:bg-neutral-900 lg:rounded-tl-4xl lg:h-[calc(100vh-81px)] overflow-y-auto">
        {isLoading ? (
          <p className="text-secondary-text">Loading...</p>
        ) : history?.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center flex-col gap-4 text-center text-primary-text mt-16">
              <img
                src={illustrationEmpty}
                alt="Empty Illustration"
                className="dark:hidden"
              />
              <img
                src={illustrationEmptyDark}
                alt="Empty Illustration"
                className="hidden dark:block"
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-preset-2">
                  <FormattedMessage id="DASHBOARD.NO_HISTORY" />
                </h3>
                <p className="text-preset-3 text-secondary-text">
                  <FormattedMessage id="DASHBOARD.NO_HISTORY_DESCRIPTION" />
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl w-[calc(100vw-50px)] md:w-full mx-auto flex flex-col gap-4 p-4 lg:p-8 rounded-[32px] bg-neutral-0 dark:bg-neutral-800">
            <div className="flex justify-end">
              <Button
                label={<FormattedMessage id="HISTORY.DELETE_ALL" />}
                variant="destructive"
                preIcon={<TrashIcon />}
                hasPreIcon={true}
                className="text-xs"
                onClick={() => setIsDeleteAllModalOpen(true)}
              />
            </div>
            <Table columns={columns} data={history} />
          </div>
        )}
      </div>

      {isModalOpen && (
        <HistoryModal
          showModal={isModalOpen}
          setShowModal={setIsModalOpen}
          history={selectedHistory}
          isHistory={true}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteHistoryModal
          showModal={isDeleteModalOpen}
          setShowModal={setIsDeleteModalOpen}
          history={selectedHistory}
        />
      )}

      {isDeleteAllModalOpen && (
        <DeleteAllHistoryModal
          showModal={isDeleteAllModalOpen}
          setShowModal={setIsDeleteAllModalOpen}
        />
      )}
    </main>
  );
};
