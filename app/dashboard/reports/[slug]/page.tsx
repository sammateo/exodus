import NavigationBar from "@/components/navigation/navigation-bar";
import AnimalDisplay from "@/components/registry/animal-display";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import { validate as validateUUID } from "uuid";
import { getAnimalReportDetailsWithPhotos } from "../action";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  //validate that slug is a uuid
  if (!validateUUID(slug)) {
    redirect("/registry");
  }

  const animal = await getAnimalReportDetailsWithPhotos(slug);
  if (!animal) {
    return <div></div>;
  }
  return (
    <section>
      <AnimalDisplay animal={animal} />
      <Link href={"/dashboard/reports"}>
        <Button className="mx-auto w-fit flex items-center gap-2">
          <FaArrowLeftLong />
          <span>Back to Reports</span>
        </Button>
      </Link>
    </section>
  );
};

export default page;
