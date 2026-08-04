"use client";

import { useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Music2 } from "lucide-react";
import { ShowMoreArtistsButton } from "./ShowMoreArtistsButton";
import { InstagramIcon, YoutubeIcon } from "@/components/common/Icons";
import { useIsomorphicLayoutEffect } from "@/lib/gsap";
import type { Artist } from "@/types/content";

interface StackedArtistsSectionProps {
  artists: Artist[];
  limit?: number;
  showMoreButton?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function StackedArtistsSection({
  artists,
  limit = 3,
  showMoreButton = true,
}: StackedArtistsSectionProps) {
  const rootRef = useRef<HTMLElement>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );

  const featured = artists.slice(0, limit);

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !rootRef.current || featured.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".editorial-artist-row");
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      rows.forEach((row, index) => {
        const image = row.querySelector<HTMLElement>(".editorial-artist-image");
        const content = row.querySelector<HTMLElement>(".editorial-artist-content");
        const lines = gsap.utils.toArray<HTMLElement>(row.querySelectorAll(".editorial-line"));

        if (!image || !content || lines.length === 0) return;

        // Requested reveal direction: 1st from left, 2nd from right, 3rd from left.
        const direction = index === 1 ? 1 : -1;
        // Keep entry subtle but ensure reverse can move fully out of screen.
        const xDistance = isMobile
          ? Math.min(Math.max(window.innerWidth * 0.88, 260), 420)
          : Math.min(Math.max(window.innerWidth * 0.72, 520), 860);
        const yDistance = isMobile ? 16 : 24;

        gsap.set([image, content, ...lines], {
          willChange: "transform, opacity",
          force3D: true,
        });

        const reveal = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            end: "bottom 38%",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
        });

        reveal
          .fromTo(
            image,
            {
              opacity: 0,
              x: direction * xDistance,
              y: yDistance,
              scale: 0.975,
              filter: "blur(8px)",
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.05,
            },
            0
          )
          .fromTo(
            content,
            {
              opacity: 0,
              x: direction * (xDistance * 0.82),
              y: yDistance,
              scale: 0.985,
              filter: "blur(6px)",
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.96,
            },
            0.08
          )
          .from(
            lines,
            {
              opacity: 0,
              y: 18,
              stagger: 0.08,
              duration: 0.66,
              ease: "power2.out",
            },
            0.2
          );

        gsap.fromTo(
          image,
          { yPercent: isMobile ? 0 : 3 },
          {
            yPercent: isMobile ? 0 : -3.5,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.85,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion, featured.length]);

  return (
    <section
      id="artists"
      ref={rootRef}
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="max-w-6xl mx-auto overflow-visible">
        <div className="max-w-2xl space-y-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#4E2A84]/70 font-medium">
            Featured roster
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#1F1F1F] font-[family-name:var(--font-recoleta)] leading-[1.1]">
            Artists shaping the stage
          </h2>
          <p className="text-base sm:text-lg text-[#6E6485] leading-relaxed max-w-xl">
            A curated selection of CRWU performers available for concerts, festivals, and collaborations.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 overflow-visible">
          {featured.map((artist, index) => {
            const isLeftImage = index === 0 || index === 2;

            return (
              <article
                key={artist.id}
                className="editorial-artist-row relative overflow-visible py-0"
              >
                {/* Image as connected page background (no hard edges) */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className={`editorial-artist-image relative z-0 h-[420px] sm:h-[500px] md:absolute md:inset-y-0 md:h-auto md:min-h-[640px] md:w-[44vw] ${
                    isLeftImage
                      ? "md:left-[calc(50%-50vw)]"
                      : "md:right-[calc(50%-50vw)] md:left-auto"
                  } will-change-transform`}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={
                        artist.id === "lil-payyan"
                          ? artist.image
                          : artist.modalImage || artist.image
                      }
                      alt={artist.name}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 767px) 100vw, 48vw"
                      className="object-cover transition-transform duration-700 ease-out"
                      style={{
                        objectPosition:
                          index === 0 ? "center top" : "center 22%",
                      }}
                    />

                    {/* Soft blend into page (no white wash on image) */}
                    <div
                      className={`absolute inset-y-0 pointer-events-none ${
                        isLeftImage
                          ? "right-0 bg-gradient-to-l from-[#F5F2FB] via-[#F5F2FB]/70 to-transparent"
                          : "left-0 bg-gradient-to-r from-[#F5F2FB] via-[#F5F2FB]/70 to-transparent"
                      } w-16 sm:w-24 md:w-32`}
                    />
                  </div>
                </motion.div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8 lg:gap-10 items-stretch md:min-h-[640px]">
                  {/* Spacer matching image side */}
                  <div
                    className={`hidden md:block md:col-span-5 ${
                      isLeftImage ? "md:order-1" : "md:order-2"
                    }`}
                    aria-hidden
                  />

                  <div
                    className={`editorial-artist-content relative z-20 md:col-span-7 will-change-transform flex flex-col justify-center gap-5 sm:gap-6 py-10 sm:py-14 md:py-24 ${
                      isLeftImage
                        ? "md:order-2 md:pl-10 lg:pl-16 xl:pl-20 md:pr-2"
                        : "md:order-1 md:pr-10 lg:pr-16 xl:pr-20 md:pl-2"
                    }`}
                  >
                    <div
                      className={`w-full max-w-xl space-y-5 sm:space-y-6 rounded-2xl bg-[#F5F2FB]/92 backdrop-blur-sm px-5 py-6 sm:px-7 sm:py-8 ${
                        isLeftImage ? "md:ml-0" : "md:ml-auto"
                      }`}
                    >
                      <p className="editorial-line text-[11px] font-medium uppercase tracking-[0.24em] text-[#4E2A84]/80">
                        {artist.genre}
                      </p>

                      <motion.h3
                        className="artist-name-shine text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight font-[family-name:var(--font-recoleta)]"
                        initial={{ y: 14 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: false, amount: 0.45 }}
                        transition={{ duration: 0.65, ease: EASE }}
                      >
                        {artist.name}
                      </motion.h3>

                      <p className="editorial-line text-sm sm:text-base leading-relaxed text-[#6E6485]">
                        {artist.description}
                      </p>

                      <div className="editorial-line flex flex-wrap items-center gap-2.5 pt-1">
                        {artist.socials.instagram && artist.socials.instagram !== "#" && (
                          <motion.a
                            whileHover={{ scale: 1.08, y: -2 }}
                            transition={{ duration: 0.28, ease: EASE }}
                            href={artist.socials.instagram}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${artist.name} Instagram`}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#4E2A84]/14 bg-white text-[#4E2A84] hover:bg-[#4E2A84] hover:text-white transition-colors"
                          >
                            <InstagramIcon className="w-4 h-4" />
                          </motion.a>
                        )}
                        {artist.socials.spotify && artist.socials.spotify !== "#" && (
                          <motion.a
                            whileHover={{ scale: 1.08, y: -2 }}
                            transition={{ duration: 0.28, ease: EASE }}
                            href={artist.socials.spotify}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${artist.name} Spotify`}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#4E2A84]/14 bg-white text-[#4E2A84] hover:bg-[#4E2A84] hover:text-white transition-colors"
                          >
                            <Music2 className="w-4 h-4" />
                          </motion.a>
                        )}
                        {artist.socials.youtube && artist.socials.youtube !== "#" && (
                          <motion.a
                            whileHover={{ scale: 1.08, y: -2 }}
                            transition={{ duration: 0.28, ease: EASE }}
                            href={artist.socials.youtube}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${artist.name} YouTube`}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#4E2A84]/14 bg-white text-[#4E2A84] hover:bg-[#4E2A84] hover:text-white transition-colors"
                          >
                            <YoutubeIcon className="w-4 h-4" />
                          </motion.a>
                        )}
                      </div>

                      <motion.div
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="editorial-line pt-1"
                      >
                        <Link
                          href={`/artists/${artist.id}`}
                          className="group inline-flex items-center gap-2 rounded-full border border-[#4E2A84]/16 bg-white px-5 py-3 text-sm font-semibold text-[#4E2A84] transition-all duration-400 hover:bg-[#4E2A84] hover:text-white hover:border-[#4E2A84]"
                        >
                          <span>View Profile</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {showMoreButton && (
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-14 sm:mt-16"
        >
          <ShowMoreArtistsButton />
        </motion.div>
      )}
    </section>
  );
}
