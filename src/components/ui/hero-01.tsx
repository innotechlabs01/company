import HeroSection from "@/components/ui/hero-01-utils/hero";
import type { NavigationSection } from "@/components/ui/hero-01-utils/header";
import Header from "@/components/ui/hero-01-utils/header";
import BrandSlider, {
  BrandList,
} from "@/components/ui/hero-01-utils/brand-slider";
import type { AvatarList } from "@/components/ui/hero-01-utils/hero";

export default function AgencyHeroSection() {
  const avatarList: AvatarList[] = [
    {
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    },
    {
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    },
    {
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    },
    {
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    },
  ];

  const navigationData: NavigationSection[] = [
    {
      title: "Home",
      href: "#",
      isActive: true,
    },
    {
      title: "About us",
      href: "#",
    },
    {
      title: "Services",
      href: "#",
    },
    {
      title: "Team",
      href: "#",
    },
    {
      title: "Pricing",
      href: "#",
    },
    {
      title: "Awards",
      href: "#",
    },
  ];

  const brandList: BrandList[] = [
    {
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=200&h=80&fit=crop",
      lightimg:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=200&h=80&fit=crop",
      name: "Brand 1",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556740734-6b78ea366045?w=200&h=80&fit=crop",
      lightimg:
        "https://images.unsplash.com/photo-1556740734-6b78ea366045?w=200&h=80&fit=crop",
      name: "Brand 2",
    },
    {
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=80&fit=crop",
      lightimg:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=80&fit=crop",
      name: "Brand 3",
    },
    {
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=80&fit=crop",
      lightimg:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=80&fit=crop",
      name: "Brand 4",
    },
    {
      image:
        "https://images.unsplash.com/photo-1541700634582-e38c5430e54c?w=200&h=80&fit=crop",
      lightimg:
        "https://images.unsplash.com/photo-1541700634582-e38c5430e54c?w=200&h=80&fit=crop",
      name: "Brand 5",
    },
  ];

  return (
    <div className="relative">
      <Header navigationData={navigationData} />
      <main>
        <HeroSection avatarList={avatarList} />
        <BrandSlider brandList={brandList} />
      </main>
    </div>
  );
}
