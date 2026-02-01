const HowItWorks = () => {
  const howItWorks = [
    {
      title: "Browse Animals",
      description:
        "View pets available for adoption or those reported lost or found nearby.",
    },
    {
      title: "Report a Found Animal",
      description:
        "Provide details and a photo of the animal to help us locate its owner.",
    },
    {
      title: "Adopt or Reunite",
      description:
        "Contact the RSPCA or the owner directly to adopt or reunite animals safely.",
    },
  ];
  return (
    <div className="space-y-4 mt-8">
      {howItWorks.map((item) => (
        <details
          key={item.title}
          className="group [&amp;_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900">
            <h2 className="text-lg font-medium">{item.title}</h2>

            <svg
              className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </summary>

          <p className="px-4 pt-4 text-gray-900">{item.description}</p>
        </details>
      ))}
    </div>
  );
};

export default HowItWorks;
