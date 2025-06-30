import { useState } from "react";
import { FormattedMessage } from "react-intl";

const faqData = [
  { questionId: "FAQ.Q1", answerId: "FAQ.A1" },
  { questionId: "FAQ.Q2", answerId: "FAQ.A2" },
  { questionId: "FAQ.Q3", answerId: "FAQ.A3" },
  { questionId: "FAQ.Q4", answerId: "FAQ.A4" },
  { questionId: "FAQ.Q5", answerId: "FAQ.A5" },
];

export const FAQs = () => {
  return (
    <section
      id="faqs"
      className="max-w-[1110px] mx-auto px-4 lg:px-0 py-10 md:py-24 flex flex-col gap-16 lg:gap-20"
    >
      <div>
        <div className="px-6 py-2 bg-primary-50 dark:bg-primary-900 text-primary-900 dark:text-primary-50 rounded-full text-sm font-medium uppercase border border-primary-200 dark:border-primary-700 justify-self-center">
          <FormattedMessage id="LANDING.FAQs" />
        </div>
      </div>

      <div>
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            questionId={faq.questionId}
            answerId={faq.answerId}
          />
        ))}
      </div>
    </section>
  );
};

const FAQItem = ({ questionId, answerId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="px-6">
      <button
        className="flex justify-between p-3 border-b border-slate-300 items-center  hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all w-full text-left text-slate-800 font-semibold"
        onClick={toggleOpen}
      >
        <span className="font-semibold text-primary-text">
          <FormattedMessage id={questionId} />
        </span>
        <span className="text-lg text-primary-text">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <p className="mt-2 text-secondary-text p-2 text-sm font-medium leading-relaxed ">
          <FormattedMessage id={answerId} />
        </p>
      )}
    </div>
  );
};
