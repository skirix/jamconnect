import { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { getFilterOptions } from "@/lib/actions/search";
import MusiciansPageClient from "./musicians-client";

export const metadata: Metadata = {
  title: "Rechercher des musiciens | JamConnect",
  description:
    "Trouve des musiciens près de chez toi par instrument, style musical et niveau.",
};

export default async function MusiciansPage() {
  const { instruments, styles, levels } = await getFilterOptions();

  return (
    <NuqsAdapter>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Trouver des musiciens</h1>
          <p className="text-muted-foreground">
            Filtre par instrument, style musical, niveau ou ville pour trouver tes futurs
            collaborateurs.
          </p>
        </div>

        <MusiciansPageClient
          instruments={instruments}
          styles={styles}
          levels={levels}
        />
      </div>
    </NuqsAdapter>
  );
}
