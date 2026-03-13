export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">JamConnect</h1>
      <p className="text-lg text-muted-foreground">
        Plateforme communautaire française de mise en relation entre musiciens
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="/search"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
        >
          Trouver des musiciens
        </a>
        <a
          href="/jams"
          className="px-4 py-2 border border-border rounded-md hover:bg-muted"
        >
          Voir les jams
        </a>
      </div>
    </main>
  );
}
