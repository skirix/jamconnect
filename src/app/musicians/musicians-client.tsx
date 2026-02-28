"use client";

import { useEffect, useState, Suspense } from "react";
import { useQueryState, parseAsArrayOf, parseAsString, parseAsInteger } from "nuqs";
import { searchMusicians, SearchMusiciansResult } from "@/lib/actions/search";
import SearchFilters from "@/components/search-filters";
import MusicianCard from "@/components/musician-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, ChevronLeft, ChevronRight, Users } from "lucide-react";

interface MusiciansPageProps {
  instruments: string[];
  styles: string[];
  levels: { value: string; label: string }[];
}

function MusiciansContent({
  instruments,
  styles,
  levels,
}: MusiciansPageProps) {
  const [results, setResults] = useState<SearchMusiciansResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // URL params
  const [selectedInstruments] = useQueryState(
    "instruments",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [selectedStyles] = useQueryState(
    "styles",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [selectedLevel] = useQueryState("level");
  const [city] = useQueryState("city");
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  useEffect(() => {
    const fetchMusicians = async () => {
      setIsLoading(true);
      try {
        const data = await searchMusicians({
          instruments: selectedInstruments,
          styles: selectedStyles,
          level: selectedLevel || undefined,
          city: city || undefined,
          page,
          limit: 20,
        });
        setResults(data);
      } catch (error) {
        console.error("Error fetching musicians:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMusicians();
  }, [selectedInstruments, selectedStyles, selectedLevel, city, page]);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (results && page < results.totalPages) setPage(page + 1);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="w-full"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtres
          {(selectedInstruments.length > 0 ||
            selectedStyles.length > 0 ||
            selectedLevel ||
            city) && (
            <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 text-xs">
              Actifs
            </span>
          )}
        </Button>
        {isMobileFiltersOpen && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <SearchFilters
              instruments={instruments}
              styles={styles}
              levels={levels}
            />
          </div>
        )}
      </div>

      {/* Sidebar Filters - Desktop */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-4">
          <SearchFilters
            instruments={instruments}
            styles={styles}
            levels={levels}
          />
        </div>
      </aside>

      {/* Results */}
      <main className="flex-1">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">
              {isLoading ? (
                <Skeleton className="h-4 w-24 inline-block" />
              ) : (
                <>
                  <strong>{results?.total || 0}</strong> musicien
                  {(results?.total || 0) > 1 ? "s" : ""} trouvé
                  {(results?.total || 0) > 1 ? "s" : ""}
                </>
              )}
            </span>
          </div>
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        ) : results?.musicians.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun musicien trouvé</h3>
            <p className="text-muted-foreground">
              Essaye de modifier tes filtres ou élargis ta recherche.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {results?.musicians.map((musician) => (
              <MusicianCard key={musician.id} musician={musician} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {results && results.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={handlePrevPage}
              disabled={page === 1 || isLoading}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Précédent
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} sur {results.totalPages}
            </span>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={page === results.totalPages || isLoading}
            >
              Suivant
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function MusiciansPageClient(props: MusiciansPageProps) {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Chargement...</div>}>
      <MusiciansContent {...props} />
    </Suspense>
  );
}
