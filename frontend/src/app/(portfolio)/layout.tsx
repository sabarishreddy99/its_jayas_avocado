import Nav from "@/components/portfolio/Nav";
import Breadcrumbs from "@/components/portfolio/Breadcrumbs";
import Footer from "@/components/portfolio/Footer";
import AvocadoChatButton from "@/components/portfolio/AvocadoChatButton";
import ScrollToTop from "@/components/ui/ScrollToTop";
import SearchModal from "@/components/portfolio/SearchModal";
import IntroScreen from "@/components/portfolio/IntroScreen";
import ScrollAtmosphere from "@/components/ui/ScrollAtmosphere";
import SectionIndicator from "@/components/ui/SectionIndicator";
import PageTransition from "@/components/ui/PageTransition";
import ScrollProgress from "@/components/ui/ScrollProgress";
import JsonLd from "@/components/ui/JsonLd";
import { getSearchIndex } from "@/lib/portfolio/searchIndex";
import { webSiteLd } from "@/lib/portfolio/seo";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={webSiteLd()} />
      <ScrollProgress />
      <IntroScreen />
      <ScrollAtmosphere />
      <SectionIndicator />
      <Nav />
      <SearchModal items={getSearchIndex()} />
      <main className="flex-1">
        <Breadcrumbs />
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <AvocadoChatButton />
      <ScrollToTop />
    </>
  );
}
