import NavigationBar from "@/components/navigation/navigation-bar";
import ReportAnimalForm from "@/components/report/report-animal-form";

const page = () => {
  return (
    <div>
      <NavigationBar />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <ReportAnimalForm />
      </div>
    </div>
  );
};

export default page;
