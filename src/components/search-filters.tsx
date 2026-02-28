"use client";

import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Filter, RotateCcw } from "lucide-react";

interface SearchFiltersProps {
  instruments: string[];
  styles: string[];
  levels: { value: string; label: string }[];
}

export default function SearchFilters({
  instruments,
  styles,
  levels,
}: SearchFiltersProps) {
  const [selectedInstruments, setSelectedInstruments] = useQueryState(
    "instruments",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [selectedStyles, setSelectedStyles] = useQueryState(
    "styles",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [selectedLevel, setSelectedLevel] = useQueryState("level");
  const [city, setCity] = useQueryState("city");

  const hasActiveFilters =
    selectedInstruments.length > 0 ||
    selectedStyles.length > 0 ||
    selectedLevel ||
    city;

  const toggleInstrument = (instrument: string) => {
    if (selectedInstruments.includes(instrument)) {
      setSelectedInstruments(
        selectedInstruments.filter((i) => i !== instrument)
      );
    } else {
      setSelectedInstruments([...selectedInstruments, instrument]);
    }
  };

  const toggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const clearFilters = () => {
    setSelectedInstruments([]);
    setSelectedStyles([]);
    setSelectedLevel(null);
    setCity(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <h3 className="font-semibold">Filtres</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 px-2"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Réinitialiser
          </Button>
        )}
      </div>

      {/* City Filter */}
      <div className="space-y-2">
        <Label htmlFor="city">Ville</Label>
        <Input
          id="city"
          placeholder="Ex: Paris, Lyon..."
          value={city || ""}
          onChange={(e) => setCity(e.target.value || null)}
        />
      </div>

      {/* Level Filter */}
      <div className="space-y-2">
        <Label>Niveau</Label>
        <div className="flex flex-wrap gap-2">
          {levels.map((level) => (
            <button
              key={level.value}
              onClick={() =>
                setSelectedLevel(
                  selectedLevel === level.value ? null : level.value
                )
              }
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedLevel === level.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Instruments Filter */}
      <div className="space-y-2">
        <Label>Instruments</Label>
        <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
          {instruments.map((instrument) => (
            <button
              key={instrument}
              onClick={() => toggleInstrument(instrument)}
              className={`px-2 py-1 rounded-md text-xs transition-colors ${
                selectedInstruments.includes(instrument)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {instrument}
            </button>
          ))}
        </div>
        {selectedInstruments.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {selectedInstruments.map((inst) => (
              <Badge
                key={inst}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => toggleInstrument(inst)}
              >
                {inst}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Styles Filter */}
      <div className="space-y-2">
        <Label>Styles musicaux</Label>
        <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => toggleStyle(style)}
              className={`px-2 py-1 rounded-md text-xs transition-colors ${
                selectedStyles.includes(style)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
        {selectedStyles.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {selectedStyles.map((style) => (
              <Badge
                key={style}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => toggleStyle(style)}
              >
                {style}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
