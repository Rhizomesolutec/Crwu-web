import type { StaticImageData } from "next/image";
import mcMusthiOne from "@/image/MC MUSTHI one.webp";
import mcMusthiTwo from "@/image/MC MUSTHI two.webp";
import saImage from "@/image/SA.webp";

export const ARTIST_NAMES = [
    "M.H.R", "SA", "JOKER390P", "Lil PAYYAN", "AZWIN", 
    "Nazeeb Billu", "Wraith V", "Efy Music", "Fazil AS", "AMANI KL10",
    "Sage End", "DH STORIES", "MC Mushti", "Emziii", "Lil Roony",
    "Abu x-wrong", "Haniya Nafisa", "PARAVA 98"
];

export const VIBES = [
    "RAW SOUND", "REAL STORIES", "NO LIMITS", "UNDERGROUND", 
    "UNAPOLOGETIC", "DEVIL INSIDE", "BUILT DIFFERENT", "NO RULES"
];

export interface Artist {
    id: string;
    name: string;
    genre: string;
    description: string;
    fullDescription: string;
    image: string | StaticImageData;
    modalImage: string | StaticImageData;
    socials: {
        instagram?: string;
        spotify?: string;
        youtube?: string;
    };
}

export const ARTISTS: Artist[] = [
    {
        id: "mhr",
        name: "M.H.R",
        genre: "EDM / HIP HOP",
        description: "M.H.R is an emerging artist, EDM and Hip-Hop music producer, lyricist, and vocalist known for blending energetic electronic sounds with modern hip-hop influences.",
        image: "/artists/mhr1.webp",
        fullDescription: "M.H.R is an emerging artist, EDM and Hip-Hop music producer, lyricist, and vocalist known for blending energetic electronic sounds with modern hip-hop influences. With a unique creative style and versatile musical approach, M.H.R creates tracks that combine powerful beats, expressive lyrics, and dynamic vocal performances.",
        modalImage: "/artists/mhr2.webp",
        socials: {
            instagram: "https://www.instagram.com/mhrofficial__/",
            spotify: "https://open.spotify.com/artist/5A5bbXuMkVh28lxVO4y25g?si=k3MxS5KrT86WCln-rbOPKg",
            youtube: "https://youtube.com/@mhrmusic.?si=IMn423aEEOYC8Rs4"
        }
    },
    {
        id: "sa",
        name: "SA",
        genre: "EXPERIMENTAL / RAP",
        description: "Pushing boundaries and redefining the sonic landscape of the underground.",
        image: saImage,
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: saImage,
        socials: {
            instagram: "https://www.instagram.com/_________sa_?igsh=MWJrYzlhbW56d3JyYw==",
            spotify: "https://open.spotify.com/artist/3eaS0SB97IZ1TVFv4XiTdm?si=2dO23Ku2QRSHURe_XjMj2g",
            youtube: "https://www.youtube.com/@esSAyofficial"
        }
    },
    {
        id: "joker390p",
        name: "JOKER390P",
        genre: "TRAP / DRILL",
        description: "Dark melodies and heavy bass. JOKER390P brings the heat every single time.",
        image: "/artists/joker390p-1.webp",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artists/joker390p-2.webp",
        socials: {
            instagram: "https://www.instagram.com/fazinrasheed?igsh=MXhydjZ0bHc1NzJ5ag==",
            spotify: "https://open.spotify.com/artist/1IVjFQKbSitl1XikHLdxlW?si=bDXNhPT2SC6Difo374v_Xg",
            youtube: "https://www.youtube.com/@joker390p"
        }
    },
    {
        id: "lil-payyan",
        name: "Lil PAYYAN",
        genre: "NEW WAVE RAP",
        description: "Young, hungry, and ready to take over. Lil PAYYAN is the next big thing.",
        image: "/artists/lil-payyan-1.webp",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artists/lil-payyan-2.webp",
        socials: {
            instagram: "https://www.instagram.com/lil_payyan?igsh=MW9kajd5YmFwMTRjaw==",
            spotify: "https://open.spotify.com/artist/0HiSpiBBENQAo0BJX5u4ic?si=PzXTYmKrSlqJkuSQ-BvYbA",
            youtube: "https://www.youtube.com/@lilpayyan3976"
        }
    },
    {
        id: "azwin",
        name: "AZWIN",
        genre: "ALTERNATIVE HIP HOP",
        description: "Lyricism that cuts deep. AZWIN tells the stories that others are afraid to touch.",
        image: "/artists/azwin-1.webp",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artists/azwin-2.webp",
        socials: {
            instagram: "https://www.instagram.com/azwinmusic?igsh=MzF3NG0xMWRpZWN5",
            spotify: "https://open.spotify.com/artist/79AwAZkhxUkl7fsIrYcdE8?si=gR_ZCCPiTXOLVzb5hkOGQg",
            youtube: "https://open.spotify.com/artist/7qKOPvmYkqaCrl8pddYJnk?si=XrpeIl22ThyhqSeQegZhPQ"
        }
    },
    {
        id: "nazeeb-billu",
        name: "Nazeeb Billu",
        genre: "STREET RAP",
        description: "Authentic, raw, and unapologetic. Nazeeb Billu is as real as it gets.",
        image: "/artists/nazeem-billu-1.webp",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artists/nazeem-billu-2.webp",
        socials: {
            instagram: "https://www.instagram.com/nazeebbillu_?igsh=MWVuNjA0Z2Z5d3F2bw==",
            spotify: "https://open.spotify.com/artist/7qKOPvmYkqaCrl8pddYJnk?si=XrpeIl22ThyhqSeQegZhPQ",
            youtube: "https://www.youtube.com/@Nazeebbillu"
        }
    },
    {
        id: "wraith-v",
        name: "Wraith V",
        genre: "DARK RAP",
        description: "A phantom in the booth. Wraith V haunts every beat with surgical precision.",
        image: "/artists/Wraith V.webp",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artists/Wraith V.webp",
        socials: {
            instagram: "https://www.instagram.com/wraithv.ofc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
            spotify: "https://open.spotify.com/artist/4BOMjhDXc0Aet35ZlLZNgZ?si=UFTq_jtrT22iOwKoD9GcLA",
            youtube: "https://www.youtube.com/@WraithV"
        }
    },
    {
        id: "efy-music",
        name: "Efy Music",
        genre: "UNDERGROUND HIP-HOP",
        description: "Efy Music is an underground Hip-Hop artist known for delivering raw lyrics, authentic storytelling, and uncompromising energy.",
        image: "/artists/efy1.webp",
        fullDescription: "Efy Music is an underground Hip-Hop artist known for delivering raw lyrics, authentic storytelling, and uncompromising energy. Drawing inspiration from real-life experiences and street culture, Efy Music creates hard-hitting tracks that blend gritty flows with powerful messages, representing the true spirit of independent Hip-Hop.",
        modalImage: "/artists/efy2.webp",
        socials: {
            instagram: "https://www.instagram.com/_efy___/?hl=en",
            spotify: "https://open.spotify.com/artist/1DDwkZwiamO6HSJdB6DtYY?si=BvaViMDyRZSdz0mhpeZWlQ",
            youtube: "https://www.youtube.com/@efymusicofficial"
        }
    },
    {
        id: "fazil-as",
        name: "Fazil AS",
        genre: "Experimental / Hip Hop",
        description: "a genre-bending artist blending hip hop, experimental, and Cultural sounds.",
        image: "/artists/fazil as.webp",
        fullDescription: "a genre-bending artist blending hip hop, experimental, and Cultural sounds.",
        modalImage: "/artists/fazil1.webp",
        socials: {
            instagram: "https://www.instagram.com/fazil_as_music?igsh=ZG1xMnVxMzEyaWc4",
            spotify: "https://open.spotify.com/artist/6CwkEW6hoZyH96fUkUg6I6?si=Apq-NATpTq6cbG6OQVDhzQ",
            youtube: "https://youtube.com/@fazilasmusic?si=CPEAZ85Z4M9dkgbT"
        }
    },
    {
        id: "amani-kl10",
        name: "AMANI KL10",
        genre: "MUSIC PRODUCER / DJ / ARTIST",
        description: "AMANI KL10 is a music producer, DJ, and artist from Malappuram, Kerala, whose sound blends emotion, culture, and experimentation.",
        image: "/artists/AMANI KL10-1.webp",
        fullDescription: "AMANI KL10 is a music producer, DJ, and artist from Malappuram, Kerala, whose sound blends emotion, culture, and experimentation. Inspired by artists like Martin Garrix, Amani began exploring music through EDM and DJing apps during school, gradually shaping his own independent creative path. Rooted deeply in Kerala’s evolving music scene, he has collaborated with artists including SA, JOKER390P, emzii, Sage End, and MC Mushti, steadily building a sound and identity that feel personal, grounded, and distinctly his own.",
        modalImage: "/artists/AMANI KL10-2.webp",
        socials: {
            instagram: "https://www.instagram.com/amanikl10?igsh=aG12YXl1djM3Y3A4",
            spotify: "https://open.spotify.com/artist/0f9QWfK1JSGrmCo2MEXuMr?si=zlcmSyLjRgy0HUa40M6GcQ",
            youtube: "http://www.youtube.com/@AMANIKL10"
        }
    },
    {
        id: "sage-end",
        name: "Sage End",
        genre: "CONSCIOUS RAP",
        description: "Wisdom through rhythm. Sage End is the philosopher of the underground.",
        image: "/artists/Sega End.webp",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artists/Sega End.webp",
        socials: {
            instagram: "https://www.instagram.com/thesageend/?utm_source=ig_web_button_share_sheet",
            spotify: "https://open.spotify.com/artist/1LcEVfkI3SVWHfrnOUxPyE?si=PlooiP_RQu-UUjtSlONXAg",
            youtube: "https://www.youtube.com/@thesageend"
        }
    },
    {
        id: "dh-stories",
        name: "DH STORIES",
        genre: "HIP HOP / EDM",
        description: "Kerala-based hip hop & EDM artist. DH STORIES creates energetic, story-driven music inspired by culture, politics, and real-life experiences.",
        image: "/artists/DH.webp",
        fullDescription: "Kerala-based hip hop & EDM artist. DH STORIES creates energetic, story-driven music inspired by culture, politics, and real-life experiences.",
        modalImage: "/artists/DH1.webp",
        socials: {
            instagram: "https://www.instagram.com/thedhstories?igsh=cWl0MGdmaWl0MTNo",
            spotify: "https://open.spotify.com/artist/5SG8gtaSlus7rlP6BYqSCa?si=JS20ZoniR0mF_KiE9TdI5g",
        }
    },
    {
        id: "mc-mushti",
        name: "MC Mushti",
        genre: "HARDCORE HIP HOP",
        description: "MC Mushti is a dynamic hip-hop artist, rapper, singer, poet, composer, and lyricist from Kerala, blending raw storytelling with powerful beats and authentic lyricism.",
        image: mcMusthiOne,
        fullDescription: "MC Mushti is a dynamic hip-hop artist, rapper, singer, poet, composer, and lyricist from Kerala, blending raw storytelling with powerful beats and authentic lyricism. Known for his energetic flow and versatile musical style, he fuses Malayalam hip-hop with global rap influences, creating music that reflects real-life experiences, culture, and street-inspired narratives. Through his unique voice and compelling performances, MC Mushti continues to push the boundaries of independent hip-hop while connecting with audiences across Kerala and beyond.",
        modalImage: mcMusthiTwo,
        socials: {
            instagram: "https://www.instagram.com/mcmushti/",
            spotify: "https://open.spotify.com/artist/4IeboPJbQPfxDC04f2FmGm?si=yuW6zZ1sRZmFxTXnNBTlNA",
            youtube: "https://www.youtube.com/@mcmushti"
        }
    },
    {
        id: "emziii",
        name: "Emziii",
        genre: "NEW SCHOOL",
        description: "Fresh perspective and unique style. Emziii is breaking the mold.",
        image: "/artist1.webp",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artist1.webp",
        socials: {
            instagram: "#",
            spotify: "#",
            youtube: "#"
        }
    },
    {
        id: "lil-roony",
        name: "Lil Roony",
        genre: "VIBE RAP",
        description: "Catchy hooks and effortless cool. Lil Roony is always on another level.",
        image: "/artists/Lil Roony.jpeg",
        fullDescription: "Dive deeper into the world of this artist. Known for their unique sound, relentless energy, and dedication to the craft, they have been making waves in the underground scene. Their journey is a testament to raw talent and unapologetic authenticity.",
        modalImage: "/artists/Lil Roony.jpeg",
        socials: {
            instagram: "https://www.instagram.com/lilroony?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
            spotify: "https://open.spotify.com/artist/7MD92P1XCS8QKLty9eheWb?si=Ywm6AaWfQNqJBPuZzz2jmg",
            youtube: "#"
        }
    },
    {
        id: "abu-x-wrong",
        name: "Abu x-wrong",
        genre: "MELODIC RAP",
        description: "Abu X-Wrong is a Kerala-based hip-hop artist blending melodic rap with cultural hip-hop elements.",
        image: "/artists/Abu.JPEG.webp",
        fullDescription: "Abu X-Wrong is a Kerala-based hip-hop artist blending melodic rap with cultural hip-hop elements. Since 2018, he has been an influential voice in the scene, gaining widespread recognition in 2019 when his track became one of the first Malayalam rap songs to reach millions of views, contributing significantly to the growth of Malayalam rap culture.",
        modalImage: "/artists/Abu1.JPEG.webp",
        socials: {
            instagram: "https://www.instagram.com/abu_x_wrong?igsh=MW83MnpiYmE5bzU0dw==",
            spotify: "https://open.spotify.com/artist/5pzpptEtegqrjysHniMto5?si=vIZd8Vo4RCytYDKKXQIj6A",
            youtube: "https://youtube.com/@abuxwrong?si=VEf2eFNuNr1oa0kA"
        }
    },
    {
        id: "haniya-nafisa",
        name: "Haniya Nafisa",
        genre: "INDEPENDENT / MULTI-GENRE",
        description: "Haniya Nafisa is a Kerala-based independent artist known for exploring various music genres with a fresh and modern style.",
        image: "/artists/Haniya.webp",
        fullDescription: "Haniya Nafisa is a Kerala-based independent artist known for exploring various music genres with a fresh and modern style.",
        modalImage: "/artists/Haniya1.JPEG.webp",
        socials: {
            instagram: "https://www.instagram.com/haniyanafisaa?igsh=azhtbmE1aHNoeDgx",
            spotify: "https://open.spotify.com/artist/2qE6XvN9lbEFGFfQOREsr0?si=K9B54F3wRWSqvcLoblw6ag",
            youtube: "https://youtube.com/@haniyanafisa?si=EacWcuYCu22tpu4p"
        }
    },
    {
        id: "parava-98",
        name: "PARAVA 98",
        genre: "HIP HOP / RAP",
        description: "Pushing the boundaries of independent rap with raw storytelling, signature flow, and authentic underground style.",
        image: "/artists/Parava 98.webp",
        fullDescription: "Pushing the boundaries of independent rap with raw storytelling, signature flow, and authentic underground style. PARAVA 98 continues to connect with audiences through powerful performances and street-inspired narratives.",
        modalImage: "/artists/Parava 98.webp",
        socials: {
            instagram: "https://www.instagram.com/parava.98?utm_source=qr",
            spotify: "https://open.spotify.com/artist/1tm6Pu0OuBh3EL762k7AKc?si=nD5SzipsSy-C5qg_6isO5Q",
            youtube: "https://youtube.com/@parava-ov8tz?si=I50v_Mf14iHMfn2Q"
        }
    },
];
