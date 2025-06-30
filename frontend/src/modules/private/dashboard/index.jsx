import { useEffect } from "react";
import { PageHeader } from "../../../layout/dashboardLayout/components";
import { Button, Table } from "../../../generalComponents";
import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getHistory } from "../../../api/history";
import { badgeStyles } from "../detection";
import { AddMediaImageIcon } from "../../../assets/svgAssets";
import { FormattedDate, FormattedMessage } from "react-intl";
import { doctorsData } from "../doctors";

export const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard | Radyab-e-Zakhm";
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
  });

  const history = data?.data?.history?.slice(0, 6) || [];

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
      width: 150,
    },
    {
      title: <FormattedMessage id="HISTORY.RESULT" />,
      dataIndex: "result",
      key: "result",
      render: (result) => (
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full 
      ${badgeStyles[result]?.bg || "bg-neutral-200 dark:bg-neutral-800"}
      ${badgeStyles[result]?.text || "text-primary-text"}
    `}
        >
          {result}
        </span>
      ),
      width: 200,
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
      width: 100,
    },
  ];

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
    },
    {
      title: <FormattedMessage id="DASHBOARD.SPECIALIZATION" />,
      dataIndex: "specialization",
      key: "specialization",
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
  ];

  const selectedLanguage = localStorage.getItem("language");

  return (
    <main className="w-full min-h-screen">
      <PageHeader title={<FormattedMessage id="DASHBOARD.TITLE" />} />
      <div
        className={`lg:flex-row p-6 flex gap-6 flex-col flex-1 lg:bg-neutral-50/75  lg:dark:bg-neutral-900 ${
          selectedLanguage === "ur" ? "rounded-tr-[40px]" : "rounded-tl-[40px]"
        } h-[calc(100vh-81px-80px)] lg:h-[calc(100vh-81px)] overflow-y-auto`}
      >
        <div className="flex flex-col gap-6 flex-1/2 w-[calc(100vw-50px)] md:w-full">
          {/* Detect Card  */}
          <div className="flex flex-col items-center justify-center text-center gap-6 p-6 lg:px-12 lg:py-10 lg:rounded-[48px] bg-white dark:bg-surface-2 rounded-xl  border border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-col gap-2">
              <h1 className="text-display-xs text-primary-text ">
                <FormattedMessage id="DASHBOARD.START_DETECTING" />
              </h1>
              <p className="text-md font-medium text-secondary-text">
                <FormattedMessage id="DASHBOARD.DETECT_ULCER_DESCRIPTION" />
              </p>
            </div>
            <Link to={"/detect"}>
              <Button label={<FormattedMessage id="BUTTON.DETECT_ULCER" />} />
            </Link>
          </div>

          {/* Doctors Card  */}
          <div className="flex flex-col  justify-center text-center gap-6   lg:rounded-[48px] bg-white dark:bg-surface-2 rounded-xl  border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-4 lg:rounded-t-[48px]  bg-primary-50 dark:bg-primary-900/25 justify-between p-4 md:p-8 pb-6 md:pb-8 border-b border-neutral-200 dark:border-neutral-700">
              <h2 className="text-preset-2 font-medium text-primary-text">
                <FormattedMessage id="DASHBOARD.TOP_DOCTORS" />
              </h2>
              <Link
                to={"/doctors"}
                className="text-preset-3 font-semibold text-green-500 underline"
              >
                <FormattedMessage id="DASHBOARD.SEE_ALL" />
              </Link>
            </div>
            <div className="flex items-center justify-center p-4 pb-8 ">
              <div className="flex items-center w-full flex-col gap-4 text-center text-primary-text ">
                <Table
                  columns={doctorColumns}
                  data={doctorsData.slice(0, 2)}
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 flex-1/2 w-[calc(100vw-50px)] md:w-full">
          {/* History Card  */}

          <div className="flex flex-col w-full justify-center text-center gap-6  overflow-hidden lg:rounded-[48px] bg-white dark:bg-surface-2 rounded-xl  border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-4 bg-primary-50 dark:bg-primary-900/25 justify-between p-4 md:p-8 pb-6 md:pb-8 border-b border-neutral-200 dark:border-neutral-700">
              <h2 className="text-preset-2 font-medium text-primary-text">
                <FormattedMessage id="DASHBOARD.DETECTION_HISTORY" />
              </h2>
              <Link
                to={"/history"}
                className="text-preset-3 font-semibold text-green-500 underline"
              >
                <FormattedMessage id="DASHBOARD.SEE_ALL" />
              </Link>
            </div>
            <div className="p-4 pb-12 w-full">
              {isLoading ? (
                <p className="text-secondary-text">Loading...</p>
              ) : history?.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex items-center flex-col gap-4 text-center text-primary-text">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-medium">
                        <FormattedMessage id="DASHBOARD.NO_HISTORY" />
                      </h3>
                      <p className="text-sm text-secondary-text">
                        <FormattedMessage id="DASHBOARD.NO_HISTORY_DESCRIPTION" />
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <div className="overflow-x-auto w-full">
                    <Table
                      columns={columns}
                      data={history}
                      pagination={false}
                      scroll={{ x: 450 }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
