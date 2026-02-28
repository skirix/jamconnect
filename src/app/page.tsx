import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Music, Users, MapPin, Guitar, Mic2, Drum } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">JamConnect</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Se connecter</Button>
            </Link>
            <Link href="/register">
              <Button>S&apos;inscrire</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Trouve tes <span className="text-primary">partenaires musicaux</span>
          <br />
          près de chez toi
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Rejoins la communauté de musiciens française. Organise des jam sessions,
          découvre des talents, et partage ta passion.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" className="text-lg px-8">
              Rejoindre la communauté
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="text-lg px-8">
              J&apos;ai déjà un compte
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Trouve des musiciens</h3>
            <p className="text-muted-foreground">
              Filtre par instrument, style musical et niveau pour trouver les musiciens
              qui correspondent à tes critères.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Organise des sessions</h3>
            <p className="text-muted-foreground">
              Crée ou rejoins des jam sessions dans ta ville. Gère les participants
              et trouve des lieux pour jouer.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Guitar className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Marketplace matériel</h3>
            <p className="text-muted-foreground">
              Achète, vends ou loue du matériel musical entre particuliers.
              Guitares, batteries, amplis et plus encore.
            </p>
          </div>
        </div>
      </section>

      {/* Instruments */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Pour tous les musiciens</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full">
              <Guitar className="h-5 w-5" />
              <span>Guitaristes</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full">
              <Drum className="h-5 w-5" />
              <span>Batteurs</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full">
              <Mic2 className="h-5 w-5" />
              <span>Chanteurs</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full">
              <Music className="h-5 w-5" />
              <span>Claviéristes</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full">
              <Guitar className="h-5 w-5" />
              <span> Bassistes</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-primary rounded-3xl p-12 text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à faire de la musique ?
          </h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
            Rejoins des milliers de musiciens en France. Crée ton profil en
            quelques clics et commence à jammer.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Créer mon compte gratuitement
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Music className="h-5 w-5 text-primary" />
              <span className="font-semibold">JamConnect</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 JamConnect. La plateforme des musiciens français.
            </p>
            <div className="flex gap-6">
              <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
                Connexion
              </Link>
              <Link href="/register" className="text-sm text-muted-foreground hover:text-foreground">
                Inscription
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
