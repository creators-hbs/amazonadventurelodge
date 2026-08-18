export const siteConfig = {
  name: "Amazon Adventure Lodge",
  location: "Lago do Macarico, Amazonas, Brazil",
  logoPath: "/assets/brand/logo_transp_amazon_adv.png",
  whatsappDisplay: "+55 92 8437-8024",
  whatsappNumber: "559284378024",
  email: "info@amazonadventurelodge.com",
  support: "24/7",
  canonicalBase: "https://www.amazonadventurelodge.com",
  // TODO: confirmar municipio/endereco oficial do Amazon Adventure Lodge antes da publicacao definitiva.
};

export const images = {
  hero: {
    src: "/assets/images/generated/hero-amazon-lodge.jpg",
    alt: "Boat crossing calm Amazon water at sunrise surrounded by rainforest.",
  },
  lodge: {
    src: "/assets/images/generated/lodge-exterior.jpg",
    alt: "Wooden Amazon jungle chalets connected by a boardwalk in dense forest.",
  },
  room: {
    src: "/assets/images/generated/private-chalet.jpg",
    alt: "Simple private wooden chalet interior with white bedding and forest view.",
  },
  canoe: {
    src: "/assets/images/generated/canoe-experience.jpg",
    alt: "Travelers and a local guide exploring flooded Amazon forest by canoe.",
  },
  sunset: {
    src: "/assets/images/generated/amazon-sunset.jpg",
    alt: "Golden Amazon sunset over calm water and forest silhouettes.",
  },
  trek: {
    src: "/assets/images/generated/jungle-trek.jpg",
    alt: "Local guide leading travelers on an Amazon rainforest trail.",
  },
  survival: {
    src: "/assets/images/generated/survival-camp.jpg",
    alt: "Guided Amazon survival camp with hammocks and a controlled campfire.",
  },
  fishing: {
    src: "/assets/images/generated/sport-fishing-lodge-release.png",
    alt: "Sport fishing by boat on calm Amazon water with local guide.",
  },
  wildlife: {
    src: "/assets/images/generated/wildlife-dolphin.jpg",
    alt: "Pink river dolphin surfacing at a respectful distance in Amazon water.",
  },
};

export const routes = {
  en: {
    home: "/",
    lodge: "/the-lodge/",
    experiences: "/experiences/",
    gallery: "/gallery/",
    contact: "/contact/",
    companyPolicy: "/company-policy/",
    packages: {
      twoDay: "/experiences/2-day-amazon-adventure-lodge-experience/",
      threeDay: "/experiences/amazon-jungle-tour-3-days-2-nights/",
      fourDay: "/experiences/4-day-lake-macarico-amazon-tour/",
      fiveDay: "/experiences/amazon-jungle-expedition-5-days-from-manaus/",
      survival: "/experiences/amazon-survival-tours/",
      fishing: "/experiences/amazon-sport-fishing-lodge/",
    },
  },
  pt: {
    home: "/pt/",
    lodge: "/pt/o-lodge/",
    experiences: "/pt/experiencias/",
    gallery: "/pt/galeria/",
    contact: "/pt/contato/",
    companyPolicy: "/pt/politica-da-empresa/",
    packages: {
      twoDay: "/pt/experiencias/experiencia-amazon-adventure-lodge-2-dias/",
      threeDay: "/pt/experiencias/amazon-jungle-tour-3-dias-2-noites/",
      fourDay: "/pt/experiencias/lago-macarico-amazon-tour-4-dias/",
      fiveDay: "/pt/experiencias/expedicao-amazonica-5-dias-saindo-de-manaus/",
      survival: "/pt/experiencias/amazon-survival-tours/",
      fishing: "/pt/experiencias/amazon-sport-fishing-lodge/",
    },
  },
};

export const nav = {
  en: [
    ["The Lodge", routes.en.lodge],
    ["Experiences", routes.en.experiences],
    ["Gallery", routes.en.gallery],
    ["Contact", routes.en.contact],
  ],
  pt: [
    ["O Lodge", routes.pt.lodge],
    ["Experiencias", routes.pt.experiences],
    ["Galeria", routes.pt.gallery],
    ["Contato", routes.pt.contact],
  ],
};

export const included = [
  "Transfer in/out from Manaus",
  "Private chalet accommodation",
  "Breakfast, lunch and dinner during the lodge program",
  "English or Spanish speaking guide",
];

export const includedPt = [
  "Traslado ida e volta a partir de Manaus",
  "Acomodacao em chale privativo",
  "Cafe da manha, almoco e jantar durante o programa no lodge",
  "Guia em ingles ou espanhol",
];

export const experiences = [
  {
    key: "twoDay",
    image: images.canoe,
    category: "Short Stay",
    price: "From R$ 2.000 per person",
    pricePt: "A partir de R$ 2.000 por pessoa",
    duration: "2 Days / 1 Night",
    durationPt: "2 dias / 1 noite",
    legacyUrls: [
      "/package/2-day-amazon-adventure-lodge-experience/",
      "/produto/2-day-amazon-adventure-lodge-experience/",
    ],
    en: {
      title: "2-Day Amazon Adventure Lodge Experience",
      shortTitle: "2-Day Lodge Experience",
      summary:
        "A compact Amazon introduction combining the Meeting of the Waters, canoe exploration, sunrise, sunset, guided jungle interpretation and night caiman spotting.",
      highlights: [
        "Meeting of the Waters",
        "Sunset and sunrise outings",
        "Caiman spotting",
        "Guided jungle trail",
        "Opportunity to observe dolphins and birds",
      ],
      itinerary: [
        ["Day 1", "Depart Manaus around 08:00, continue through Ceasa Port, the Meeting of the Waters, land transfer and Lago do Macarico before arriving at the lodge around 11:30. After lunch, explore by canoe with opportunities for birds and dolphins depending on conditions, watch sunset, have dinner and join a night caiman observation outing."],
        ["Day 2", "Leave by canoe around 05:30 for sunrise, return for breakfast, then follow a guided forest trail focused on medicinal plants, survival techniques, trees, insects and wildlife interpretation. After lunch, return toward Manaus around 13:30 with arrival expected late afternoon."],
      ],
      practical: "Designed for travelers with limited time who still want a real lodge-based Amazon experience.",
    },
    pt: {
      title: "Experiencia Amazon Adventure Lodge - 2 Dias",
      shortTitle: "Experiencia 2 Dias",
      summary:
        "Uma introducao compacta a Amazonia com Encontro das Aguas, passeio de canoa, nascer e por do sol, trilha interpretativa e observacao noturna de jacares.",
      highlights: [
        "Encontro das Aguas",
        "Passeios ao nascer e ao por do sol",
        "Observacao de jacares",
        "Trilha guiada na floresta",
        "Oportunidade de observar botos e aves",
      ],
      itinerary: [
        ["Dia 1", "Saida de Manaus por volta das 08:00, passando pelo Porto da Ceasa, Encontro das Aguas, travessia, transporte terrestre e Lago do Macarico ate chegar ao lodge por volta das 11:30. Apos o almoco, exploracao de canoa com oportunidades de observar aves e botos conforme as condicoes, por do sol, jantar e observacao noturna de jacares."],
        ["Dia 2", "Saida de canoa por volta das 05:30 para o nascer do sol, cafe da manha e trilha guiada com plantas medicinais, tecnicas de sobrevivencia, arvores, insetos e interpretacao da fauna. Apos o almoco, retorno para Manaus por volta das 13:30, com chegada prevista no final da tarde."],
      ],
      practical: "Ideal para quem tem pouco tempo e deseja uma experiencia amazonica real com base no lodge.",
    },
  },
  {
    key: "threeDay",
    image: images.lodge,
    category: "Jungle Immersion",
    price: "From R$ 2.523 per person",
    pricePt: "A partir de R$ 2.523 por pessoa",
    duration: "3 Days / 2 Nights",
    durationPt: "3 dias / 2 noites",
    legacyUrls: [
      "/package/amazon-jungle-tour-3-days-2-nights/",
      "/produto/amazon-jungle-tour-3-days-2-nights/",
    ],
    en: {
      title: "Amazon Jungle Tour: 3 Days / 2 Nights",
      shortTitle: "Amazon Jungle Tour",
      summary:
        "A balanced lodge program with canoe exploration, forest interpretation and a respectful riverside family visit to understand local Amazon ways of life.",
      highlights: ["Canoe exploration", "Flooded forest waterways", "Riverside family visit", "Jungle trail", "Sunrise and sunset"],
      itinerary: [
        ["Day 1", "Arrival route from Manaus, lodge lunch, canoe exploration, sunset, dinner and night caiman observation depending on conditions."],
        ["Day 2", "Sunrise outing, guided jungle trail and afternoon canoeing through igapo and flooded forest when water levels allow."],
        ["Day 3", "Breakfast, respectful visit with a riverside family to learn about local life, lunch and return to Manaus."],
      ],
      practical: "A strong first Amazon journey for travelers who want more breathing room than an overnight stay.",
    },
    pt: {
      title: "Amazon Jungle Tour: 3 Dias / 2 Noites",
      shortTitle: "Amazon Jungle Tour",
      summary:
        "Um programa equilibrado no lodge com canoa, interpretacao da floresta e visita respeitosa a uma familia ribeirinha para conhecer modos de vida locais.",
      highlights: ["Passeio de canoa", "Igarapes e igapos", "Visita ribeirinha", "Trilha na floresta", "Nascer e por do sol"],
      itinerary: [
        ["Dia 1", "Rota de chegada a partir de Manaus, almoco no lodge, passeio de canoa, por do sol, jantar e observacao noturna de jacares conforme condicoes."],
        ["Dia 2", "Saida para nascer do sol, trilha guiada e canoagem por igapos e floresta alagada quando o nivel da agua permitir."],
        ["Dia 3", "Cafe da manha, visita respeitosa a uma familia ribeirinha para conhecer o modo de vida local, almoco e retorno a Manaus."],
      ],
      practical: "Uma primeira viagem amazonica completa para quem deseja mais tempo do que uma unica noite.",
    },
  },
  {
    key: "fourDay",
    image: images.sunset,
    category: "Jungle Immersion",
    price: "From R$ 2.997,59 per person",
    pricePt: "A partir de R$ 2.997,59 por pessoa",
    duration: "4 Days / 3 Nights",
    durationPt: "4 dias / 3 noites",
    legacyUrls: [
      "/package/4-day-lake-macarico-amazon-tour/",
      "/produto/4-day-lake-macarico-amazon-tour/",
    ],
    en: {
      title: "4-Day Lake Macarico Amazon Tour",
      shortTitle: "Lake Macarico Amazon Tour",
      summary:
        "A deeper Lake Macarico itinerary adding forest camping, practical survival interpretation and seasonal activities shaped by weather and water levels.",
      highlights: ["Forest camping", "Survival interpretation", "Riverside culture", "Traditional night fishing when conditions allow", "Seasonal Amazon activities"],
      itinerary: [
        ["Days 1-2", "Follow the core lodge, canoe, sunrise, sunset, trail and riverside cultural experiences from the shorter programs."],
        ["Day 3", "Depart for a forest camping experience focused on survival techniques, traditional night fishing when conditions allow and an overnight stay in the forest."],
        ["Day 4", "Seasonal morning activity depending on climate and water conditions, return to the lodge, lunch and transfer back to Manaus."],
      ],
      practical: "Best for travelers seeking a more immersive route without moving into a long expedition pace.",
    },
    pt: {
      title: "Lake Macarico Amazon Tour - 4 Dias",
      shortTitle: "Lake Macarico Amazon Tour",
      summary:
        "Um roteiro mais profundo no Lago do Macarico com camping na floresta, tecnicas praticas de sobrevivencia e atividades conforme clima e nivel das aguas.",
      highlights: ["Camping na floresta", "Interpretacao de sobrevivencia", "Cultura ribeirinha", "Pesca noturna tradicional conforme condicoes", "Atividades sazonais"],
      itinerary: [
        ["Dias 1-2", "Inclui as experiencias centrais de lodge, canoa, nascer e por do sol, trilha e cultura ribeirinha dos programas mais curtos."],
        ["Dia 3", "Saida para camping na floresta com tecnicas de sobrevivencia, possibilidade de pesca noturna tradicional conforme condicoes e pernoite na mata."],
        ["Dia 4", "Atividade matinal sazonal dependendo do clima e da agua, retorno ao lodge, almoco e traslado para Manaus."],
      ],
      practical: "Indicado para viajantes que querem mais imersao sem chegar ao ritmo de uma expedicao longa.",
    },
  },
  {
    key: "fiveDay",
    image: images.trek,
    category: "Jungle Immersion",
    price: "From R$ 3.483,99 per person",
    pricePt: "A partir de R$ 3.483,99 por pessoa",
    duration: "5 Days / 4 Nights",
    durationPt: "5 dias / 4 noites",
    legacyUrls: [
      "/package/amazon-jungle-expedition-5-days-from-manaus/",
      "/produto/amazon-jungle-expedition-5-days-from-manaus/",
    ],
    en: {
      title: "Amazon Jungle Expedition: 5 Days from Manaus",
      shortTitle: "Amazon Jungle Expedition",
      summary:
        "A longer expedition rhythm combining lodge comfort, forest trails, canoe exploration, riverside culture, camping, survival interpretation and night activities.",
      highlights: ["Extended Amazon immersion", "Forest camp overnight", "Canoe and trail routes", "Riverside culture", "Night activities"],
      itinerary: [
        ["Days 1-2", "Begin with lodge arrival, canoe routes, sunrise, sunset, guided trails and night observation."],
        ["Days 3-4", "Continue into riverside culture, forest camping, survival techniques and evening activities with guidance."],
        ["Day 5", "Return from the forest camp to the lodge, lunch and transfer back toward Manaus."],
      ],
      practical: "For travelers who want a fuller expedition arc while still returning to the lodge structure.",
    },
    pt: {
      title: "Expedicao Amazonica: 5 Dias saindo de Manaus",
      shortTitle: "Expedicao Amazonica",
      summary:
        "Um ritmo de expedicao mais longo com conforto do lodge, trilhas, canoas, cultura ribeirinha, camping, sobrevivencia e atividades noturnas.",
      highlights: ["Imersao amazonica prolongada", "Pernoite em acampamento", "Rotas de canoa e trilha", "Cultura ribeirinha", "Atividades noturnas"],
      itinerary: [
        ["Dias 1-2", "Inicio com chegada ao lodge, rotas de canoa, nascer e por do sol, trilhas guiadas e observacao noturna."],
        ["Dias 3-4", "Continuidade com cultura ribeirinha, camping na floresta, tecnicas de sobrevivencia e atividades noturnas guiadas."],
        ["Dia 5", "Retorno do acampamento ao lodge, almoco e traslado de volta para Manaus."],
      ],
      practical: "Para viajantes que desejam uma experiencia mais completa mantendo a estrutura do lodge.",
    },
  },
  {
    key: "survival",
    image: images.survival,
    category: "Survival",
    price: "R$ 3.923,41 per person",
    pricePt: "R$ 3.923,41 por pessoa",
    duration: "Approximately 4 Days / 3 Nights",
    durationPt: "Aproximadamente 4 dias / 3 noites",
    legacyUrls: [
      "/package/amazon-survival-tours/",
      "/produto/amazon-survival-tours/",
    ],
    en: {
      title: "Amazon Survival Tours",
      shortTitle: "Amazon Survival Tours",
      summary:
        "A guided survival-focused program with practical forest knowledge, hammock camping, navigation, botany and responsible wildlife observation.",
      highlights: ["Shelter building", "Finding drinking water", "Natural fire techniques", "Jungle navigation", "Hammocks with mosquito nets"],
      itinerary: [
        ["Orientation", "Begin with safety briefing, equipment organization and guided introduction to the forest environment."],
        ["Forest Skills", "Practice shelter building, water finding, natural fire techniques, navigation, practical botany, medicinal plants, native trees and edible fruits."],
        ["Camp Life", "Traditional fishing, canoe navigation, hammock sleeping with mosquito nets, wildlife observation and night caiman spotting when conditions allow."],
      ],
      practical: "Adventurous and dramatic in tone, but always presented as a guided and responsible program.",
    },
    pt: {
      title: "Amazon Survival Tours",
      shortTitle: "Amazon Survival Tours",
      summary:
        "Programa guiado com foco em sobrevivencia, conhecimento pratico da floresta, redes com mosquiteiro, navegacao, botanica e observacao responsavel da fauna.",
      highlights: ["Construcao de abrigo", "Busca de agua potavel", "Tecnicas naturais de fogo", "Navegacao na selva", "Redes com mosquiteiros"],
      itinerary: [
        ["Orientacao", "Inicio com briefing de seguranca, organizacao de equipamentos e introducao guiada ao ambiente da floresta."],
        ["Habilidades de Floresta", "Pratica de abrigo, agua potavel, fogo natural, navegacao, botanica aplicada, plantas medicinais, arvores nativas e frutos comestiveis."],
        ["Vida no Acampamento", "Pesca tradicional, navegacao de canoa, pernoite em redes com mosquiteiros, observacao de fauna e jacares a noite quando as condicoes permitirem."],
      ],
      practical: "Aventureiro e dramatico, mas sempre apresentado como programa guiado e responsavel.",
    },
  },
  {
    key: "fishing",
    image: images.fishing,
    category: "Sport Fishing",
    price: "From R$ 1.300 per person",
    pricePt: "A partir de R$ 1.300 por pessoa",
    duration: "5 Days / 4 Nights",
    durationPt: "5 dias / 4 noites",
    legacyUrls: [
      "/package/amazon-sport-fishing-lodge/",
      "/produto/amazon-sport-fishing-lodge/",
      "/sport-fishing/",
    ],
    en: {
      title: "Amazon Sport Fishing Lodge",
      shortTitle: "Sport Fishing Lodge",
      summary:
        "Sport fishing based around Lago do Macarico, Juma River and Mamori Channel with local guides, catch-and-release context and no promise of guaranteed species or catch rates.",
      highlights: ["Lago do Macarico", "Juma River", "Mamori Channel", "Peacock Bass / Tucunare-Acu", "Catch-and-release context"],
      itinerary: [
        ["05:30", "Breakfast"],
        ["06:00", "Morning fishing"],
        ["11:00", "Return to lodge"],
        ["12:00", "Lunch"],
        ["14:00", "Afternoon fishing"],
        ["18:00", "Return"],
        ["19:00", "Dinner"],
      ],
      practical: "May include Peacock Bass, Arowanas and Amazon catfish depending on season, route and conditions.",
    },
    pt: {
      title: "Amazon Sport Fishing Lodge",
      shortTitle: "Sport Fishing Lodge",
      summary:
        "Pesca esportiva no Lago do Macarico, Rio Juma e Parana do Mamori com guias locais, contexto de pesque-e-solte e sem promessa de especies ou capturas garantidas.",
      highlights: ["Lago do Macarico", "Rio Juma", "Parana do Mamori", "Tucunare-Acu", "Contexto de pesque-e-solte"],
      itinerary: [
        ["05:30", "Cafe da manha"],
        ["06:00", "Pesca pela manha"],
        ["11:00", "Retorno ao lodge"],
        ["12:00", "Almoco"],
        ["14:00", "Pesca a tarde"],
        ["18:00", "Retorno"],
        ["19:00", "Jantar"],
      ],
      practical: "Pode envolver Tucunare-Acu, aruanas e bagres amazonicos conforme temporada, rota e condicoes.",
    },
  },
];

export const pillars = {
  en: [
    ["Bilingual Guides", "Guides prepared to assist international visitors."],
    ["Transfer from Manaus", "Structured transfer from Manaus to the lodge."],
    ["Hospitality & Quality", "Comfort and hospitality surrounded by rainforest."],
    ["Preservation", "Responsible tourism and respect for Amazon nature."],
  ],
  pt: [
    ["Guias Bilingues", "Guias preparados para receber visitantes internacionais."],
    ["Traslado desde Manaus", "Transfer estruturado de Manaus ate o lodge."],
    ["Hospitalidade & Qualidade", "Conforto e acolhimento cercados pela floresta."],
    ["Preservacao", "Turismo responsavel e respeito pela natureza amazonica."],
  ],
};

export const activities = {
  en: [
    "Meeting of the Waters",
    "Amazon sunrise",
    "Amazon sunset",
    "canoe exploration",
    "flooded forest",
    "bird watching",
    "opportunity to observe pink and gray dolphins",
    "night caiman spotting when conditions allow",
    "jungle trekking",
    "medicinal plant interpretation",
    "piranha fishing",
    "riverside culture",
    "jungle camping",
    "survival techniques",
    "sport fishing",
  ],
  pt: [
    "Encontro das Aguas",
    "nascer do sol amazonico",
    "por do sol amazonico",
    "exploracao de canoa",
    "floresta alagada",
    "observacao de aves",
    "oportunidade de observar botos rosa e cinza",
    "observacao noturna de jacares conforme condicoes",
    "trilhas na floresta",
    "interpretacao de plantas medicinais",
    "pesca de piranha",
    "cultura ribeirinha",
    "camping na floresta",
    "tecnicas de sobrevivencia",
    "pesca esportiva",
  ],
};

export const gallery = [
  { category: "Water", image: images.hero },
  { category: "Lodge", image: images.lodge },
  { category: "Rooms", image: images.room },
  { category: "Water", image: images.canoe },
  { category: "Water", image: images.sunset },
  { category: "Jungle", image: images.trek },
  { category: "Expeditions", image: images.survival },
  { category: "Fishing", image: images.fishing },
  { category: "Wildlife", image: images.wildlife },
];

export const policy = {
  en: [
    ["Reservations", "A reservation made through the site is confirmed after successful payment processing. Changes are subject to availability."],
    ["Payment Methods", "Online reservations may use credit card or debit card. Direct reservations with the team may use a secure credit card payment link or PIX for Brazilian customers. Direct bookings require a 30% deposit for confirmation, with the balance paid at check-in."],
    ["Cancellation", "80% refund when cancelled 6 or more days before check-in; 60% refund between 5 and 3 days before check-in; no refund less than 2 days before check-in."],
    ["No-show", "No refund applies in case of no-show."],
    ["Early departure", "No partial or full refund is provided after services have begun when the guest voluntarily ends the program early."],
    ["Important Information", "Maximum baggage is 15 kg / 33 lbs per guest. Guests should inform dietary restrictions, allergies and special needs before arrival."],
    ["Environmental Protection", "It is prohibited to capture, feed, transport or harm wildlife, and to collect plants, seeds, flowers, wood or natural resources."],
    ["Safety", "Guests are recommended to use the provided life jackets, especially during water activities."],
    ["Values", "The brand declares commitment to human rights, Amazon rainforest protection, the environment, animal welfare and respect for cultures, nationalities, beliefs, races, identities and sexual orientations."],
  ],
  pt: [
    ["Reservas", "A reserva realizada pelo site e confirmada apos o processamento bem-sucedido do pagamento. Alteracoes estao sujeitas a disponibilidade."],
    ["Formas de Pagamento", "Reservas online podem usar cartao de credito ou debito. Reservas diretas com a equipe podem usar link seguro de pagamento por cartao ou PIX para clientes brasileiros. Reservas diretas exigem deposito de 30% para confirmacao, com saldo no check-in."],
    ["Cancelamento", "Reembolso de 80% quando cancelado 6 ou mais dias antes do check-in; 60% entre 5 e 3 dias antes do check-in; sem reembolso a menos de 2 dias do check-in."],
    ["No-show", "Nao ha reembolso em caso de nao comparecimento."],
    ["Saida antecipada", "Nao ha reembolso parcial ou integral apos o inicio dos servicos quando o hospede encerra voluntariamente o programa antes do previsto."],
    ["Informacoes Importantes", "Bagagem maxima de 15 kg / 33 lbs por hospede. Restricoes alimentares, alergias e necessidades especiais devem ser informadas antes da chegada."],
    ["Protecao Ambiental", "E proibido capturar, alimentar, transportar ou ferir animais silvestres, bem como coletar plantas, sementes, flores, madeira ou recursos naturais."],
    ["Seguranca", "Recomenda-se o uso dos coletes disponibilizados, especialmente em atividades aquaticas."],
    ["Valores", "A marca declara compromisso com direitos humanos, protecao da floresta amazonica, meio ambiente, bem-estar animal e respeito a culturas, nacionalidades, crencas, racas, identidades e orientacoes sexuais."],
  ],
};

export const imagePrompts = [
  ["hero-amazon-lodge.jpg", "Cinematic wide-angle documentary photograph of a remote Amazon rainforest lodge experience at Lago do Macarico, Brazilian Amazon, calm dark water in foreground, dense tropical rainforest, small traditional boat moving through the water at golden sunrise, atmospheric mist, subtle warm light, authentic wilderness, sophisticated travel editorial photography, realistic vegetation, natural colors, high detail, no text, no logos, no fantasy architecture, no exaggerated luxury, 16:9."],
  ["lodge-exterior.jpg", "Traditional Amazon wooden jungle lodge with elevated wooden chalets and boardwalk surrounded by dense rainforest, rustic Amazon riverside architecture, warm natural timber, simple comfortable design, early morning golden light filtering through tropical trees, authentic Brazilian Amazon atmosphere, premium documentary travel photography, realistic, no branding, no text."],
  ["private-chalet.jpg", "Simple comfortable private wooden jungle chalet interior in the Brazilian Amazon, warm natural timber walls, clean white bedding, neutral linen textiles, subtle handcrafted local materials, cozy but not luxurious, realistic hospitality photography, soft window light, impeccable but authentic room, no text, no logo."],
  ["canoe-experience.jpg", "Small group of adult travelers with local guide exploring narrow Amazon flooded forest waterways by motorized canoe, dense vegetation reflected in dark water, respectful wildlife tourism, life jackets, documentary photography, realistic Brazilian Amazon, natural light, no text."],
  ["amazon-sunset.jpg", "Wide cinematic Amazon sunset over Lago do Macarico, golden orange light reflecting over calm water, silhouettes of dense rainforest at the horizon, small canoe in distance, serene premium travel editorial photography, realistic."],
  ["jungle-trek.jpg", "Experienced Amazon local guide leading a small international group along an authentic rainforest trail, dense vegetation, enormous trees, humid tropical atmosphere, respectful documentary tourism, practical outdoor clothes, premium travel photography, natural lighting."],
  ["survival-camp.jpg", "Authentic guided Amazon jungle survival camp at dusk, hammocks with mosquito nets safely installed between trees, small controlled campfire, experienced guide preparing camp, dense rainforest surrounding the scene, documentary adventure photography, responsible atmosphere, realistic."],
  ["sport-fishing-lodge-release.png", "Adult angler sport fishing for Peacock Bass in a pristine Amazon lake, experienced local guide in boat, life jackets, catch-and-release context, dense rainforest around calm water, energetic but realistic outdoor editorial photography, no trophy exaggeration, no text, no logos."],
  ["wildlife-dolphin.jpg", "Pink river dolphin surfacing at a natural distance in calm dark water, dense rainforest in the background, photographed from a respectful low boat viewpoint without tourists touching or feeding the animal, realistic documentary nature travel photography."],
];
