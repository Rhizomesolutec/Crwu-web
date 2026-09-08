import type { Artist, Release } from "@/types/content";

/** Canonical seed data — string image paths only (MongoDB-friendly). */
export const SEED_ARTISTS: Artist[] = [
  {
    id: "mhr",
    name: "M.H.R",
    subdomain: "mhr",
    genre: "EDM / HIP HOP",
    description:
      "M.H.R is an emerging independent hip-hop artist known for delivering emotionally driven lyrics, powerful storytelling, and a distinctive musical style. Blending modern rap with authentic expression, M.H.R creates tracks that resonate with listeners through raw emotion, meaningful narratives, and memorable performances, making him a rising talent in the independent music scene.",
    image: "/artists/mhr1.webp",
    fullDescription:
      "M.H.R is an emerging independent hip-hop artist known for delivering emotionally driven lyrics, powerful storytelling, and a distinctive musical style. Blending modern rap with authentic expression, M.H.R creates tracks that resonate with listeners through raw emotion, meaningful narratives, and memorable performances, making him a rising talent in the independent music scene.",
    modalImage: "/artists/mhr2.webp",
    imageFocus: "center 30%",
    socials: {
      instagram: "https://www.instagram.com/mhrofficial__/",
      spotify:
        "https://open.spotify.com/artist/5A5bbXuMkVh28lxVO4y25g?si=k3MxS5KrT86WCln-rbOPKg",
      youtube: "https://youtube.com/@mhrmusic.?si=IMn423aEEOYC8Rs4",
    },
  },
  {
    id: "lil-payyan",
    name: "Lil PAYYAN",
    subdomain: "lilpayyan",
    genre: "NEW WAVE RAP",
    description:
      "Lil PAYYAN is a dynamic hip-hop artist known for blending melodic flows, sharp lyricism, and modern Malayalam rap into a unique sound. His music combines raw storytelling with energetic performances, making him one of the emerging voices in the independent rap scene.",
    image: "/artists/lil-payyan-1.webp",
    fullDescription:
      "Lil PAYYAN is a dynamic hip-hop artist known for blending melodic flows, sharp lyricism, and modern Malayalam rap into a unique sound. His music combines raw storytelling with energetic performances, making him one of the emerging voices in the independent rap scene.",
    modalImage: "/artists/lil-payyan-2.webp",
    imageFocus: "center 28%",
    socials: {
      instagram: "https://www.instagram.com/lil_payyan?igsh=MW9kajd5YmFwMTRjaw==",
      spotify:
        "https://open.spotify.com/artist/0HiSpiBBENQAo0BJX5u4ic?si=PzXTYmKrSlqJkuSQ-BvYbA",
      youtube: "https://www.youtube.com/@lilpayyan3976",
    },
  },
  {
    id: "joker390p",
    name: "JOKER390P",
    subdomain: "joker390p",
    genre: "TRAP / DRILL",
    description:
      "JOKER390P is a versatile hip-hop artist recognized for his powerful delivery, energetic stage presence, and fusion of regional influences with contemporary rap. With multiple successful collaborations and standout releases, he continues to push the boundaries of independent hip-hop through bold sound and authentic expression.",
    image: "/artists/joker390p-1.webp",
    fullDescription:
      "JOKER390P is a versatile hip-hop artist recognized for his powerful delivery, energetic stage presence, and fusion of regional influences with contemporary rap. With multiple successful collaborations and standout releases, he continues to push the boundaries of independent hip-hop through bold sound and authentic expression.",
    modalImage: "/artists/joker390p-2.webp",
    imageFocus: "center 30%",
    socials: {
      instagram: "https://www.instagram.com/fazinrasheed?igsh=MXhydjZ0bHc1NzJ5ag==",
      spotify:
        "https://open.spotify.com/artist/1IVjFQKbSitl1XikHLdxlW?si=bDXNhPT2SC6Difo374v_Xg",
      youtube: "https://www.youtube.com/@joker390p",
    },
  },
  {
    id: "sa",
    name: "SA",
    subdomain: "sa",
    genre: "EXPERIMENTAL / RAP",
    description: "Pushing boundaries and redefining the sonic landscape of the underground.",
    image: "/artists/SA.webp",
    fullDescription:
      "SA is an experimental rap artist known for pushing creative boundaries and reshaping the sound of the underground scene. Blending unconventional production with sharp, introspective lyricism, SA crafts music that feels raw, honest, and fearless. Each release reflects a restless drive to experiment, resulting in a distinctive sonic identity that continues to evolve with every project.",
    modalImage: "/artists/SA.webp",
    imageFocus: "center 32%",
    socials: {
      instagram: "https://www.instagram.com/_________sa_?igsh=MWJrYzlhbW56d3JyYw==",
      spotify:
        "https://open.spotify.com/artist/3eaS0SB97IZ1TVFv4XiTdm?si=2dO23Ku2QRSHURe_XjMj2g",
      youtube: "https://www.youtube.com/@esSAyofficial",
    },
  },
  {
    id: "azwin",
    name: "AZWIN",
    subdomain: "azwin",
    genre: "ALTERNATIVE HIP HOP",
    description:
      "Lyricism that cuts deep. AZWIN tells the stories that others are afraid to touch.",
    image: "/artists/azwin-1.webp",
    fullDescription:
      "AZWIN is an alternative hip-hop artist known for lyricism that cuts deep and stories that others are afraid to tell. With a bold, introspective approach, AZWIN blends sharp wordplay with emotional honesty, crafting tracks that confront real experiences head-on. His unfiltered voice and distinctive style mark him as a compelling presence in the independent hip-hop scene.",
    modalImage: "/artists/azwin-2.webp",
    socials: {
      instagram: "https://www.instagram.com/azwinmusic?igsh=MzF3NG0xMWRpZWN5",
      spotify:
        "https://open.spotify.com/artist/79AwAZkhxUkl7fsIrYcdE8?si=gR_ZCCPiTXOLVzb5hkOGQg",
      youtube:
        "https://open.spotify.com/artist/7qKOPvmYkqaCrl8pddYJnk?si=XrpeIl22ThyhqSeQegZhPQ",
    },
  },
  {
    id: "nazeeb-billu",
    name: "Nazeeb Billu",
    subdomain: "nazeebbillu",
    genre: "STREET RAP",
    description: "Authentic, raw, and unapologetic. Nazeeb Billu is as real as it gets.",
    image: "/artists/nazeem-billu-1.webp",
    fullDescription:
      "Nazeeb Billu is a street rap artist known for delivering authentic, raw, and unapologetic music straight from real-life experience. His gritty flow and direct lyricism capture the energy of the streets, blending honesty with hard-hitting delivery. With every track, Nazeeb Billu stays true to his roots, building a reputation as one of the scene's most genuine voices.",
    modalImage: "/artists/nazeem-billu-2.webp",
    socials: {
      instagram: "https://www.instagram.com/nazeebbillu_?igsh=MWVuNjA0Z2Z5d3F2bw==",
      spotify:
        "https://open.spotify.com/artist/7qKOPvmYkqaCrl8pddYJnk?si=XrpeIl22ThyhqSeQegZhPQ",
      youtube: "https://www.youtube.com/@Nazeebbillu",
    },
  },
  {
    id: "wraith-v",
    name: "Wraith V",
    subdomain: "wraithv",
    genre: "DARK RAP",
    description: "A phantom in the booth. Wraith V haunts every beat with surgical precision.",
    image: "/artists/Wraith V.webp",
    fullDescription:
      "Wraith V is a dark rap artist known for haunting, atmospheric production and razor-sharp delivery. Often described as a phantom in the booth, he approaches every beat with surgical precision, layering brooding tones with intense lyricism. His music carves out a distinct sonic space within the underground, marked by tension, mood, and unrelenting focus.",
    modalImage: "/artists/Wraith V.webp",
    socials: {
      instagram:
        "https://www.instagram.com/wraithv.ofc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      spotify:
        "https://open.spotify.com/artist/4BOMjhDXc0Aet35ZlLZNgZ?si=UFTq_jtrT22iOwKoD9GcLA",
      youtube: "https://www.youtube.com/@WraithV",
    },
  },
  {
    id: "efy-music",
    name: "Efy Music",
    subdomain: "efymusic",
    genre: "UNDERGROUND HIP-HOP",
    description:
      "Efy Music is an underground Hip-Hop artist known for delivering raw lyrics, authentic storytelling, and uncompromising energy.",
    image: "/artists/efy1.webp",
    fullDescription:
      "Efy Music is an underground Hip-Hop artist known for delivering raw lyrics, authentic storytelling, and uncompromising energy. Drawing inspiration from real-life experiences and street culture, Efy Music creates hard-hitting tracks that blend gritty flows with powerful messages. Each release channels genuine emotion and unfiltered perspective, representing the true spirit of independent Hip-Hop and its evolving underground community.",
    modalImage: "/artists/efy2.webp",
    socials: {
      instagram: "https://www.instagram.com/_efy___/?hl=en",
      spotify:
        "https://open.spotify.com/artist/1DDwkZwiamO6HSJdB6DtYY?si=BvaViMDyRZSdz0mhpeZWlQ",
      youtube: "https://www.youtube.com/@efymusicofficial",
    },
  },
  {
    id: "fazil-as",
    name: "Fazil AS",
    subdomain: "fazilas",
    genre: "Experimental / Hip Hop",
    description: "a genre-bending artist blending hip hop, experimental, and Cultural sounds.",
    image: "/artists/fazil as.webp",
    fullDescription:
      "Fazil AS is a genre-bending artist blending hip hop, experimental production, and cultural sounds into a distinctive musical identity. Unafraid to cross stylistic boundaries, he weaves unconventional textures with rhythmic storytelling, creating music that feels both rooted and forward-looking. His experimental approach continues to shape a sound that stands apart from the mainstream.",
    modalImage: "/artists/fazil1.webp",
    socials: {
      instagram: "https://www.instagram.com/fazil_as_music?igsh=ZG1xMnVxMzEyaWc4",
      spotify:
        "https://open.spotify.com/artist/6CwkEW6hoZyH96fUkUg6I6?si=Apq-NATpTq6cbG6OQVDhzQ",
      youtube: "https://youtube.com/@fazilasmusic?si=CPEAZ85Z4M9dkgbT",
    },
  },
  {
    id: "amani-kl10",
    name: "AMANI KL10",
    subdomain: "amanikl10",
    genre: "MUSIC PRODUCER / DJ / ARTIST",
    description:
      "AMANI KL10 is a music producer, DJ, and artist from Malappuram, Kerala, whose sound blends emotion, culture, and experimentation.",
    image: "/artists/AMANI KL10-1.webp",
    fullDescription:
      "AMANI KL10 is a music producer, DJ, and artist from Malappuram, Kerala, whose sound blends emotion, culture, and experimentation. Inspired by artists like Martin Garrix, he began exploring EDM and DJing during school, shaping an independent creative path. Rooted in Kerala's music scene, he has collaborated with artists including SA, JOKER390P, and MC Mushti, building a sound that feels personal and distinctly his own.",
    modalImage: "/artists/AMANI KL10-2.webp",
    socials: {
      instagram: "https://www.instagram.com/amanikl10?igsh=aG12YXl1djM3Y3A4",
      spotify:
        "https://open.spotify.com/artist/0f9QWfK1JSGrmCo2MEXuMr?si=zlcmSyLjRgy0HUa40M6GcQ",
      youtube: "http://www.youtube.com/@AMANIKL10",
    },
  },
  {
    id: "sage-end",
    name: "Sage End",
    subdomain: "sageend",
    genre: "CONSCIOUS RAP",
    description: "Wisdom through rhythm. Sage End is the philosopher of the underground.",
    image: "/artists/Sega End.webp",
    fullDescription:
      "Sage End is a conscious rap artist known as the philosopher of the underground, delivering wisdom through rhythm and thoughtful, layered lyricism. His music explores introspection, purpose, and perspective, balancing sharp wordplay with a calm, grounded delivery. Sage End's reflective style offers listeners more than just sound, inviting them to think as much as they listen.",
    modalImage: "/artists/Sega End.webp",
    socials: {
      instagram: "https://www.instagram.com/thesageend/?utm_source=ig_web_button_share_sheet",
      spotify:
        "https://open.spotify.com/artist/1LcEVfkI3SVWHfrnOUxPyE?si=PlooiP_RQu-UUjtSlONXAg",
      youtube: "https://www.youtube.com/@thesageend",
    },
  },
  {
    id: "dh-stories",
    name: "DH STORIES",
    subdomain: "dhstories",
    genre: "HIP HOP / EDM",
    description:
      "Kerala-based hip hop & EDM artist. DH STORIES creates energetic, story-driven music inspired by culture, politics, and real-life experiences.",
    image: "/artists/DH.webp",
    fullDescription:
      "DH STORIES is a Kerala-based hip hop and EDM artist known for crafting energetic, story-driven music inspired by culture, politics, and real-life experience. Blending hard-hitting beats with narrative-focused lyricism, his tracks capture the pulse of everyday life while pushing genre boundaries. With a distinctive fusion sound, DH STORIES continues to carve out a unique identity in the independent scene.",
    modalImage: "/artists/DH1.webp",
    socials: {
      instagram: "https://www.instagram.com/thedhstories?igsh=cWl0MGdmaWl0MTNo",
      spotify:
        "https://open.spotify.com/artist/5SG8gtaSlus7rlP6BYqSCa?si=JS20ZoniR0mF_KiE9TdI5g",
    },
  },
  {
    id: "mc-mushti",
    name: "MC Mushti",
    subdomain: "mcmushti",
    genre: "HARDCORE HIP HOP",
    description:
      "MC Mushti is a dynamic hip-hop artist, rapper, singer, poet, composer, and lyricist from Kerala, blending raw storytelling with powerful beats and authentic lyricism.",
    image: "/artists/MC MUSTHI one.webp",
    fullDescription:
      "MC Mushti is a dynamic hip-hop artist, rapper, singer, and lyricist from Kerala, blending raw storytelling with powerful beats and authentic delivery. Known for his energetic flow and versatile style, he fuses Malayalam hip-hop with global rap influences, creating music rooted in real-life experience and culture. Through his distinctive voice, MC Mushti continues to connect with audiences across Kerala and beyond.",
    modalImage: "/artists/MC MUSTHI two.webp",
    socials: {
      instagram: "https://www.instagram.com/mcmushti/",
      spotify:
        "https://open.spotify.com/artist/4IeboPJbQPfxDC04f2FmGm?si=yuW6zZ1sRZmFxTXnNBTlNA",
      youtube: "https://www.youtube.com/@mcmushti",
    },
  },
  {
    id: "emziii",
    name: "Emziii",
    subdomain: "emziii",
    genre: "NEW SCHOOL",
    description: "Fresh perspective and unique style. Emziii is breaking the mold.",
    image: "/artist1.webp",
    fullDescription:
      "Emziii is a new-school hip-hop artist bringing a fresh perspective and a distinctly unique style to the genre. Known for breaking the mold with unconventional flows and bold creative choices, Emziii crafts music that feels forward-thinking and unafraid to experiment. His evolving sound continues to carve out a fresh lane within the independent scene.",
    modalImage: "/artist1.webp",
    socials: {
      instagram: "#",
      spotify: "#",
      youtube: "#",
    },
  },
  {
    id: "lil-roony",
    name: "Lil Roony",
    subdomain: "lilroony",
    genre: "VIBE RAP",
    description: "Catchy hooks and effortless cool. Lil Roony is always on another level.",
    image: "/artists/Lil Roony.jpeg",
    fullDescription:
      "Lil Roony is a vibe rap artist known for catchy hooks and an effortlessly cool delivery that sets him apart. His music blends smooth melodies with laid-back confidence, creating tracks that feel both relaxed and magnetic. With a natural sense of rhythm and style, Lil Roony continues to bring a distinct energy to the independent rap scene.",
    modalImage: "/artists/Lil Roony.jpeg",
    socials: {
      instagram:
        "https://www.instagram.com/lilroony?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      spotify:
        "https://open.spotify.com/artist/7MD92P1XCS8QKLty9eheWb?si=Ywm6AaWfQNqJBPuZzz2jmg",
      youtube: "#",
    },
  },
  {
    id: "abu-x-wrong",
    name: "Abu x-wrong",
    subdomain: "abuxwrong",
    genre: "MELODIC RAP",
    description:
      "Abu X-Wrong is a Kerala-based hip-hop artist blending melodic rap with cultural hip-hop elements.",
    image: "/artists/Abu.JPEG.webp",
    fullDescription:
      "Abu X-Wrong is a Kerala-based hip-hop artist blending melodic rap with cultural hip-hop elements. Since 2018, he has been an influential voice in the scene, gaining widespread recognition in 2019 when his track became one of the first Malayalam rap songs to reach millions of views, contributing significantly to the growth of Malayalam rap culture.",
    modalImage: "/artists/Abu1.JPEG.webp",
    socials: {
      instagram: "https://www.instagram.com/abu_x_wrong?igsh=MW83MnpiYmE5bzU0dw==",
      spotify:
        "https://open.spotify.com/artist/5pzpptEtegqrjysHniMto5?si=vIZd8Vo4RCytYDKKXQIj6A",
      youtube: "https://youtube.com/@abuxwrong?si=VEf2eFNuNr1oa0kA",
    },
  },
  {
    id: "haniya-nafisa",
    name: "Haniya Nafisa",
    subdomain: "haniyanafisa",
    genre: "INDEPENDENT / MULTI-GENRE",
    description:
      "Haniya Nafisa is a Kerala-based independent artist known for exploring various music genres with a fresh and modern style.",
    image: "/artists/Haniya.webp",
    fullDescription:
      "Haniya Nafisa is a Kerala-based independent artist known for exploring multiple music genres with a fresh, modern approach. Her versatility allows her to move fluidly between styles, blending emotion and experimentation into music that feels personal and distinctive. With a growing catalog of releases, Haniya Nafisa continues to shape a sound that stands out in the independent scene.",
    modalImage: "/artists/Haniya1.JPEG.webp",
    socials: {
      instagram: "https://www.instagram.com/haniyanafisaa?igsh=azhtbmE1aHNoeDgx",
      spotify:
        "https://open.spotify.com/artist/2qE6XvN9lbEFGFfQOREsr0?si=K9B54F3wRWSqvcLoblw6ag",
      youtube: "https://youtube.com/@haniyanafisa?si=EacWcuYCu22tpu4p",
    },
  },
  {
    id: "parava-98",
    name: "PARAVA 98",
    subdomain: "parava98",
    genre: "HIP HOP / RAP",
    description:
      "Pushing the boundaries of independent rap with raw storytelling, signature flow, and authentic underground style.",
    image: "/artists/Parava 98.webp",
    fullDescription:
      "PARAVA 98 is an independent rap artist known for pushing creative boundaries through raw storytelling and a signature flow. Rooted in authentic underground style, his music captures street-inspired narratives with sharp lyricism and powerful delivery. Through consistent releases and energetic performances, PARAVA 98 continues to connect with audiences and build a distinct identity in the scene.",
    modalImage: "/artists/Parava 98.webp",
    socials: {
      instagram: "https://www.instagram.com/parava.98?utm_source=qr",
      spotify:
        "https://open.spotify.com/artist/1tm6Pu0OuBh3EL762k7AKc?si=nD5SzipsSy-C5qg_6isO5Q",
      youtube: "https://youtube.com/@parava-ov8tz?si=I50v_Mf14iHMfn2Q",
    },
  },
];

export const SEED_RELEASES: Release[] = [
  {
    id: "vaakkath",
    title: "VAAKKATH",
    artist: "Haniya Nafisa",
    type: "ALBUM",
    tracks: 7,
    date: "JUNE 26, 2026",
    duration: "24:18",
    cover: "/release/vaakkath_cover.webp",
    accent: "#F5C518",
    tag: "OUT NOW",
    description:
      "VAAKKATH is the debut studio album by Haniya Nafisa featuring a dark cinematic atmosphere, emotional storytelling, and immersive sound design.",
    link: "https://open.spotify.com/album/0z6HvSQ7XHrpcpZugjIugW?si=TVBjoLACRDOBnC-r8Dodlw",
    loading: "lazy",
  },
  {
    id: "hola",
    title: "HOLA",
    artist: "M.H.R, Emziii, Efy Music",
    type: "SINGLE",
    tracks: 1,
    date: "MAY 28, 2026",
    duration: "03:55",
    cover: "/release/hola_latest_release.webp",
    accent: "#FFB300",
    tag: "OUT NOW",
    description:
      "A vibrant Malayalam hip-hop collaboration blending street energy, catchy hooks, and contemporary production.",
    link: "https://open.spotify.com/track/4IjK4QLfJThr9s1nhLcmwM",
    loading: "lazy",
  },
  {
    id: "zill",
    title: "ZILL",
    artist: "M.H.R, Shafi Kollam, JOKER390P",
    type: "SINGLE",
    tracks: 1,
    date: "FEB 11, 2026",
    duration: "04:07",
    cover: "/release/zill_latest_release.webp",
    accent: "#FF4D4D",
    tag: "OUT NOW",
    description:
      "Melodies collide with Malabari swagger as M.H.R, Shafi Kollam, and JOKER390P craft a cross-genre anthem.",
    link: "https://open.spotify.com/track/12wlJpuAbgMv0OaYmY3r5x",
    loading: "lazy",
  },
  {
    id: "evdunna-varunne",
    title: "EVDUNNA VARUNNE?",
    artist: "Efy Music, Simmo",
    type: "SINGLE",
    tracks: 1,
    date: "MAY 2026",
    duration: "03:25",
    cover: "/release/evdunna_latest_release.webp",
    accent: "#FF6A00",
    tag: "OUT NOW",
    description: "Straight from the streets with zero filters.",
    link: "https://open.spotify.com/track/7qsiKqtZQNpQ5sPwINtZva",
    loading: "lazy",
  },
  {
    id: "venomous-pill",
    title: "VENOMOUS PILL",
    artist: "Nazeeb Billu, Emziii, Amani Kl10",
    type: "SINGLE",
    tracks: 1,
    date: "JUL 2026",
    duration: "02:43",
    cover: "/release/pills_latest_release.webp",
    accent: "#8A2BE2",
    tag: "OUT NOW",
    description: "Dark thoughts wrapped in razor-sharp verses.",
    link: "https://open.spotify.com/track/2zpb2Sh2IdzRu7y6FmJdAf",
    loading: "lazy",
  },
  {
    id: "baby-call-me-gangster",
    title: "BABY CALL ME GANGSTER",
    artist: "MC Mushti, AMANI KL10",
    type: "SINGLE",
    tracks: 1,
    date: "JAN 09, 2026",
    duration: "03:00",
    cover: "/release/baby_call_me_gangster.webp",
    accent: "#780606",
    tag: "OUT NOW",
    description: "A dynamic collaboration blending raw storytelling with powerful beats.",
    link: "https://open.spotify.com/track/4R3wna0tMjccTpSY68aQ5g?si=0468730bb90e43f5",
    loading: "lazy",
  },
  {
    id: "noor-noor",
    title: "NOOR NOOR",
    artist: "Nazeeb Billu, JK Factor",
    type: "SINGLE",
    tracks: 1,
    date: "JUNE 19, 2026",
    duration: "03:35",
    cover: "/release/noor-noor.webp",
    accent: "#D4AF37",
    tag: "OUT NOW",
    description:
      "A cinematic single from Nazeeb Billu and JK Factor with moody, high-energy production.",
    link: "https://open.spotify.com/album/1qSiU5OsR8VQonZLBixHSn",
  },
  {
    id: "chaathan-party",
    title: "CHAATHAN PARTY",
    artist: "M.H.R, JOKER390P",
    type: "SINGLE",
    tracks: 1,
    date: "JUL 03, 2026",
    duration: "04:08",
    cover: "/release/Chaathan Party.webp",
    accent: "#A30000",
    tag: "OUT NOW",
    description:
      "A powerful hip-hop collaboration by M.H.R and JOKER390P, delivering intense lyrics, heavy bass, and raw street energy.",
    link: "https://open.spotify.com/album/7iX3yJ52EXjlH7g6CUlios?si=IIALyC4UTHWqPF-e4YmGsQ",
    loading: "lazy",
  },
  {
    id: "one-eleven",
    title: "1:11",
    artist: "JOKER390P, M.H.R",
    type: "SINGLE",
    tracks: 1,
    date: "JUNE 22, 2026",
    duration: "02:21",
    cover: "/release/One Eleven.webp",
    accent: "#344CB7",
    tag: "OUT NOW",
    description:
      "A hard-hitting hip-hop track by JOKER390P and M.H.R, showcasing smooth flows, sharp bars, and a hypnotic beat.",
    link: "https://open.spotify.com/album/4gxwF36HPEOlQO4D10f4gp?si=tt1ngtsDQ1eftpYcps_AFQ",
    loading: "lazy",
  },
  {
    id: "concrete-killers",
    title: "CONCRETE KILLERS",
    artist: "MC Mushti, JORJ.",
    type: "SINGLE",
    tracks: 1,
    date: "JUNE 26, 2026",
    duration: "03:07",
    cover: "/release/CONCRETE KILLERS.webp",
    accent: "#ED0818",
    tag: "OUT NOW",
    description:
      "A hard-hitting hip-hop single by MC Mushti and JORJ., delivering intense flow and concrete street energy.",
    link: "https://open.spotify.com/track/0oQv7dJ8TrCn1Ea9I5gNuy?si=7d2d044f658849f4",
    loading: "lazy",
  },
  {
    id: "hubb",
    title: "HUBB",
    artist: "Lil Roony, VXAL",
    type: "SINGLE",
    tracks: 1,
    date: "JUL 06, 2026",
    duration: "02:18",
    cover: "/release/HUBB.webp",
    accent: "#A04878",
    tag: "OUT NOW",
    description:
      "A hard-hitting collaboration blending raw energy, sharp flows, and intense production.",
    link: "https://open.spotify.com/track/7amVQ8KypdMvh2aslWxKNK?si=d1ef882151a141d4",
    loading: "lazy",
  },
  {
    id: "paapachillu",
    title: "PAAPACHILLU",
    artist: "Pedappiller, PARAVA 98",
    type: "SINGLE",
    tracks: 1,
    date: "MAY 26, 2026",
    duration: "02:30",
    cover: "/release/Paapachillu.webp",
    accent: "#E32D26",
    tag: "OUT NOW",
    description:
      "A gritty and energetic street anthem showcasing raw flows and signature production.",
    link: "https://open.spotify.com/track/1i1i7jtPB7cXa7Pnx4aMXE?si=4eb1747eeba14994",
    loading: "lazy",
  },
];
