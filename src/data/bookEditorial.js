const source = (label, url, publisher, kind) => ({ label, url, publisher, kind });

const AUTHOR_BIO = source(
  "Britannica: Fyodor Dostoyevsky",
  "https://www.britannica.com/biography/Fyodor-Dostoyevsky",
  "Britannica",
  "reference",
);
const EARLY_WORKS = source(
  "Britannica: Early works of Fyodor Dostoyevsky",
  "https://www.britannica.com/biography/Fyodor-Dostoyevsky/Early-works",
  "Britannica",
  "reference",
);
const ARREST = source(
  "Britannica: Political activity and arrest of Fyodor Dostoyevsky",
  "https://www.britannica.com/biography/Fyodor-Dostoyevsky/Political-activity-and-arrest",
  "Britannica",
  "reference",
);
const WORKS_1860S = source(
  "Britannica: Crime and Punishment and the works of the 1860s",
  "https://www.britannica.com/biography/Fyodor-Dostoyevsky/Crime-and-Punishment",
  "Britannica",
  "reference",
);
const LATE_DOSTO = source(
  "Britannica: The Brothers Karamazov",
  "https://www.britannica.com/biography/Fyodor-Dostoyevsky/The-Brothers-Karamazov",
  "Britannica",
  "reference",
);
const WRITERS_DIARY = source(
  "Northwestern University Press: A Writer's Diary",
  "https://nupress.northwestern.edu/9780810101509/a-writers-diary-volume-1/",
  "Northwestern University Press",
  "essay",
);
const GIDE = source(
  "Project Gutenberg: André Gide, Dostoevsky",
  "https://www.gutenberg.org/ebooks/76944",
  "Project Gutenberg",
  "essay",
);

const PERIOD_SOURCES = {
  early: EARLY_WORKS,
  arrest: ARREST,
  return: ARREST,
  sixties: WORKS_1860S,
  europe: WORKS_1860S,
  late: WRITERS_DIARY,
  final: LATE_DOSTO,
};

function gutenbergSearch(title) {
  return source(
    `Project Gutenberg: búsqueda de "${title}"`,
    `https://www.gutenberg.org/ebooks/search/?query=${encodeURIComponent(`Dostoevsky ${title}`)}`,
    "Project Gutenberg",
    "primary",
  );
}

function archiveSearch(title) {
  return source(
    `Internet Archive: búsqueda de "${title}"`,
    `https://archive.org/search?query=${encodeURIComponent(`Dostoevsky ${title}`)}`,
    "Internet Archive",
    "primary",
  );
}

function goodreadsSearchUrl(title) {
  return `https://www.goodreads.com/search?q=${encodeURIComponent(`Fyodor Dostoevsky ${title}`)}`;
}

function dedupeSources(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item || seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

function createBookEditorial({
  title,
  period,
  readingGuide,
  whyItMatters,
  keyQuestions,
  afterReading,
  relatedEventIds,
  writtenContext,
  extraSources = {},
}) {
  const primary = gutenbergSearch(title);
  const archive = archiveSearch(title);
  const periodSource = PERIOD_SOURCES[period] || AUTHOR_BIO;
  const essaySource = period === "late" || period === "final" ? WRITERS_DIARY : GIDE;

  return {
    ...(writtenContext ? { writtenContext } : {}),
    goodreadsUrl: goodreadsSearchUrl(title),
    readingGuide,
    whyItMatters,
    keyQuestions,
    afterReading,
    relatedEventIds,
    sources: {
      summary: dedupeSources([primary, archive, AUTHOR_BIO, ...(extraSources.summary || [])]),
      context: dedupeSources([periodSource, AUTHOR_BIO, ...(extraSources.context || [])]),
      readingGuide: dedupeSources([primary, archive, essaySource, ...(extraSources.readingGuide || [])]),
      characters: dedupeSources([primary, archive, ...(extraSources.characters || [])]),
      afterReading: afterReading
        ? dedupeSources([primary, essaySource, periodSource, ...(extraSources.afterReading || [])])
        : [],
    },
  };
}

export const BOOK_EDITORIAL = {
  "pobres-gentes": createBookEditorial({
    title: "Poor Folk",
    period: "early",
    relatedEventIds: ["life-1821-birth", "life-1846-debut"],
    readingGuide:
      "Conviene leerla menos como una historia sentimental y más como una novela sobre la voz. Las cartas muestran cómo Makar y Várvara intentan conservar dignidad mediante el lenguaje, incluso cuando la pobreza ya les ha reducido el margen material de acción.",
    whyItMatters:
      "Aquí aparece el primer gran descubrimiento de Dostoievski: el pobre no es sólo víctima social, sino también conciencia herida, orgullosa y capaz de autohumillarse. Es el punto de partida de toda su exploración posterior de la compasión y el resentimiento.",
    keyQuestions: [
      "¿Qué revela cada carta sobre la distancia entre lo que los personajes sienten y lo que se permiten decir?",
      "¿Cómo convierte Dostoievski la pobreza en una experiencia de lenguaje y no sólo de carencia económica?",
      "¿Dónde empieza el cuidado amoroso y dónde empieza la humillación mutua?",
    ],
    afterReading:
      "El desenlace importa porque muestra que la ternura, en Dostoievski, no basta para salvar. La novela no fracasa como historia de amor: muestra que el mundo social traduce el afecto en dependencia, renuncia y pérdida de voz.",
  }),
  "el-doble": createBookEditorial({
    title: "The Double",
    period: "early",
    relatedEventIds: ["life-1837-mother-petersburg", "life-1846-debut", "context-1825-decembrists"],
    readingGuide:
      "La mejor entrada es no decidir demasiado pronto si el doble es real o delirante. Hay que leer la novela como una máquina de desdoblamiento entre deseo de reconocimiento, paranoia burocrática y vergüenza social.",
    whyItMatters:
      "Es uno de los grandes laboratorios de la psicología moderna en Dostoievski. Aunque fue incomprendida en su tiempo, anticipa el interés de toda su obra madura por la conciencia rota y por el yo que se combate a sí mismo.",
    keyQuestions: [
      "¿Qué relación hay entre humillación social y fractura psíquica en Goliadkin?",
      "¿Por qué el mundo de oficinas y rangos vuelve verosímil la aparición del doble?",
      "¿El doble cumple deseos secretos del protagonista o los desenmascara?",
    ],
    afterReading:
      "Cuando se termina, el doble puede leerse como una forma extrema de interiorización del juicio ajeno. Más que un monstruo sobrenatural, funciona como la versión socialmente exitosa del yo que Goliadkin no puede ser.",
  }),
  "el-senor-projarchin": createBookEditorial({
    title: "Mr. Prokharchin",
    period: "early",
    relatedEventIds: ["life-1821-birth", "life-1846-debut"],
    readingGuide:
      "Leela como un estudio de la escasez convertida en psicología. El relato no describe sólo a un avaro: muestra cómo el miedo a caer del todo puede volver monstruosa una vida ya reducida.",
    whyItMatters:
      "Este cuento afina el retrato del «hombre pequeño» y ensaya la mezcla de grotesco y compasión que luego será marca dostoievskiana. La miseria aquí ya es moral, teatral y obsesiva.",
    keyQuestions: [
      "¿Qué hace Projarchin con el dinero que acumula en secreto: lo guarda, lo idolatra o se protege del mundo?",
      "¿Cómo mira la comunidad de la pensión al personaje: con burla, miedo o parecido secreto?",
      "¿Por qué la avaricia aparece aquí como síntoma de pánico más que de cálculo racional?",
    ],
    afterReading:
      "El hallazgo final del dinero no “explica” al personaje; lo vuelve más inquietante. Dostoievski sugiere que la pobreza puede deformar no sólo el cuerpo social, sino el vínculo entre necesidad, identidad y realidad.",
  }),
  "novela-en-nueve-cartas": createBookEditorial({
    title: "Novel in Nine Letters",
    period: "early",
    relatedEventIds: ["life-1846-debut", "life-1847-petrashevsky"],
    readingGuide:
      "Vale leerla como una comedia de máscaras verbales. La gracia está en cómo la cortesía epistolar se vuelve instrumento de fraude, demora y maniobra social.",
    whyItMatters:
      "Aunque menor en escala, muestra la temprana habilidad de Dostoievski para hacer chocar voces interesadas dentro de una forma cerrada. Es una pieza útil para ver que su oído cómico precede a su gran solemnidad filosófica.",
    keyQuestions: [
      "¿Cómo usa cada corresponsal el lenguaje de la amabilidad para encubrir agresión o interés?",
      "¿Qué revela el formato epistolar sobre la teatralidad de la vida social?",
      "¿La comicidad depende del engaño o de que ambos personajes sean casi simétricos?",
    ],
    afterReading:
      "El cuento deja una intuición muy dostoievskiana: la palabra social puede estar ya corrompida antes de cualquier acto visible. Aquí el engaño es menos argumento que condición del vínculo.",
  }),
  "la-patrona": createBookEditorial({
    title: "The Landlady",
    period: "early",
    relatedEventIds: ["life-1846-debut", "life-1847-petrashevsky"],
    readingGuide:
      "Entrá por su atmósfera. Esta obra pide una lectura a medio camino entre realismo urbano, sueño febril y novela gótica: lo importante es la sensación de fascinación y dominio más que la trama en sentido convencional.",
    whyItMatters:
      "Es una pieza clave para ver al Dostoievski que todavía busca forma para sus obsesiones maduras. Ya están allí la conciencia sitiada, la relación de poder erótico y la mezcla de deseo, miedo y sometimiento.",
    keyQuestions: [
      "¿Ordýnov ve a Katerina como persona o como enigma que confirma su fantasía?",
      "¿Murín es sólo un tirano doméstico o también una figura de hipnosis espiritual?",
      "¿Qué aporta la atmósfera casi alucinada a temas que luego aparecerán con otra forma?",
    ],
    afterReading:
      "La rareza del texto es parte de su valor: parece una obra “imperfecta” porque está forzando a Dostoievski fuera del realismo lineal. En esa incomodidad ya asoma el dramatismo posesivo de novelas posteriores.",
  }),
  "noches-blancas": createBookEditorial({
    title: "White Nights",
    period: "early",
    relatedEventIds: ["life-1837-mother-petersburg", "life-1847-petrashevsky", "context-1848-revolutions"],
    readingGuide:
      "Conviene leerla como un texto sobre la imaginación amorosa y no sólo como romance melancólico. El Soñador convierte el encuentro en una forma de vida interior, y el verdadero conflicto es entre fantasía, tiempo y realidad.",
    whyItMatters:
      "Es la obra lírica mayor del primer Dostoievski y una síntesis perfecta del Petersburgo sentimental antes del trauma del arresto. También deja ver cuánto le interesa ya la distancia entre vida vivida y vida soñada.",
    keyQuestions: [
      "¿Qué ama realmente el Soñador: a Nástenka, la posibilidad del vínculo o su propia narración de ese vínculo?",
      "¿Cómo usa la ciudad nocturna para suspender el tiempo ordinario?",
      "¿Por qué la derrota final no anula la gratitud del protagonista?",
    ],
    afterReading:
      "La novela corta se vuelve más compleja cuando se la lee como relato de autoestilización. El Soñador pierde a Nástenka, pero gana una versión estética de sí mismo: esa compensación es hermosa y sospechosa a la vez.",
  }),
  "la-mujer-de-otro": createBookEditorial({
    title: "Another Man's Wife and a Husband Under the Bed",
    period: "early",
    relatedEventIds: ["life-1846-debut", "context-1848-revolutions"],
    readingGuide:
      "Leela como una farsa de ritmo físico y verbal. La clave no está en la psicología profunda, sino en la exposición del ridículo masculino, la teatralidad del celo y el placer de la confusión.",
    whyItMatters:
      "Muestra que Dostoievski podía trabajar el vodevil y la exageración sin perder su interés por la humillación. El cuerpo atrapado, escondido o confundido ya es una forma de verdad social.",
    keyQuestions: [
      "¿Cómo transforma el relato los celos en espectáculo?",
      "¿Qué tipo de masculinidad queda ridiculizada en el marido perseguidor?",
      "¿Por qué la comicidad corporal no excluye una crítica al honor y la propiedad?",
    ],
    afterReading:
      "La obra parece ligera, pero deja un motivo central en Dostoievski: el ser humano se delata cuando pierde toda dignidad escénica. Bajo la cama, el orgullo social muestra su verdadera medida.",
  }),
  "un-corazon-debil": createBookEditorial({
    title: "A Weak Heart",
    period: "early",
    relatedEventIds: ["life-1846-debut", "life-1847-petrashevsky"],
    readingGuide:
      "No la leas sólo como historia de enfermedad mental, sino como tragedia de alguien incapaz de soportar la felicidad. La gratitud, el deber y el miedo al fracaso se vuelven aquí fuerzas destructivas.",
    whyItMatters:
      "Es uno de los primeros textos donde Dostoievski muestra que la conciencia puede quebrarse no sólo por culpa, sino también por exceso de sensibilidad. El sufrimiento nace de no sentirse digno del bien recibido.",
    keyQuestions: [
      "¿Qué relación hay entre trabajo, amor y culpa en la caída de Vasia?",
      "¿Por qué la bondad no trae equilibrio, sino más fragilidad?",
      "¿Cómo funciona Arkadi como testigo y límite de la empatía?",
    ],
    afterReading:
      "El cuento deja una intuición brutal: a veces lo insoportable no es el mal, sino la felicidad que exige una respuesta que el sujeto no puede dar. Esa imposibilidad reaparece más tarde en varias conciencias dostoievskianas.",
  }),
  polzunkov: createBookEditorial({
    title: "Polzunkov",
    period: "early",
    relatedEventIds: ["life-1846-debut", "life-1839-father"],
    readingGuide:
      "Conviene atender a la voz del bufón. Polzunkov se humilla hablando, y el relato pide seguir cómo el personaje convierte su propia degradación en forma de presencia.",
    whyItMatters:
      "Es una pieza breve, pero importante para el linaje de personajes bufonescos y degradados que Dostoievski llevará después mucho más lejos. Aquí asoma la mezcla de exhibicionismo, vergüenza y necesidad de amor.",
    keyQuestions: [
      "¿Polzunkov controla su autoexposición o está atrapado en ella?",
      "¿Qué disfruta la audiencia: el relato, el escándalo o la superioridad moral?",
      "¿Qué anticipa este personaje sobre futuros bufones dostoievskianos?",
    ],
    afterReading:
      "La autohumillación en Dostoievski casi nunca es transparente: puede ser petición de amor, revancha o arma. Polzunkov vale como borrador de esa ambivalencia.",
  }),
  "un-ladron-honrado": createBookEditorial({
    title: "An Honest Thief",
    period: "early",
    relatedEventIds: ["life-1821-birth", "life-1846-debut"],
    readingGuide:
      "Leelo desde la compasión narrativa. El centro no es descubrir si Emelián es bueno o malo, sino seguir cómo Astafi aprende a mirar a un hombre caído sin reducirlo a su acto.",
    whyItMatters:
      "Es una miniatura esencial para la futura ética de Dostoievski. Allí donde otros verían un ladrón, él insiste en la dignidad frágil, incluso ridícula, de quien todavía puede avergonzarse y arrepentirse.",
    keyQuestions: [
      "¿Qué sabe Astafi de Emelián que la ley o la moral pública no saben?",
      "¿Cómo narra Dostoievski la degradación sin convertirla en desprecio?",
      "¿Por qué el arrepentimiento final importa más que la restitución material?",
    ],
    afterReading:
      "El título se vuelve menos paradójico al final. La honestidad no está en el acto, sino en la forma dolorosa en que la conciencia reconoce su propia caída.",
  }),
  "el-arbol-de-navidad-y-la-boda": createBookEditorial({
    title: "A Christmas Tree and a Wedding",
    period: "early",
    relatedEventIds: ["life-1846-debut", "context-1848-revolutions"],
    readingGuide:
      "Leela como una sátira comprimida. Todo está calculado para mostrar cómo la respetabilidad social puede ocultar una lógica fría de interés y violencia.",
    whyItMatters:
      "Es una obra mínima y feroz: en pocas páginas Dostoievski revela la unión entre dinero, clase y cosificación de la infancia. La crítica moral es frontal, pero formalmente muy precisa.",
    keyQuestions: [
      "¿Qué ve el narrador en la fiesta que los otros aceptan como normal?",
      "¿Cómo se usa el salto temporal para transformar una escena en acusación histórica?",
      "¿Qué relación hay entre cálculo matrimonial y violencia social?",
    ],
    afterReading:
      "La crueldad del relato está en la naturalidad del cálculo. Dostoievski muestra que hay formas de violencia perfectamente integradas al orden social y celebradas como decoro.",
  }),
  "netochka-nezvanova": createBookEditorial({
    title: "Netochka Nezvanova",
    period: "arrest",
    relatedEventIds: ["life-1849-arrest", "life-1839-father"],
    readingGuide:
      "Conviene leerla aceptando su carácter fragmentario. Más que buscar cierre, hay que seguir la formación de una sensibilidad femenina atravesada por humillación, arte, orfandad y deseo de pertenencia.",
    whyItMatters:
      "Es una de las apuestas narrativas más singulares del primer Dostoievski. Abre un camino que mezcla novela de formación, memoria y melodrama psicológico, y deja ver una amplitud de registro que el arresto interrumpió.",
    keyQuestions: [
      "¿Cómo incide la mirada infantil en la representación de la miseria y del genio frustrado?",
      "¿Qué hace la novela con la idea de familia: refugio, herida o teatro de posesión?",
      "¿Por qué la incompletud cambia la manera en que leemos su desarrollo?",
    ],
    afterReading:
      "La obra inconclusa obliga a leer la promesa perdida como parte del sentido. No es sólo una novela cortada por la historia; es también testimonio de una vida de escritor interrumpida por el Estado.",
  }),
  "un-pequeno-heroe": createBookEditorial({
    title: "A Little Hero",
    period: "arrest",
    relatedEventIds: ["life-1849-arrest", "life-1850-omsk"],
    readingGuide:
      "Leelo como recuerdo de iniciación sentimental escrito bajo presión extrema. La obra trabaja el contraste entre inocencia, exhibición social y descubrimiento del sacrificio.",
    whyItMatters:
      "Es el único texto de ficción que Dostoievski escribió mientras estaba preso. Por eso vale no sólo por su tema, sino como evidencia de una continuidad interior: incluso ante la condena, sigue pensando la conciencia a través del deseo y la memoria.",
    keyQuestions: [
      "¿Qué aprende realmente el niño: amor, orgullo o disciplina del gesto?",
      "¿Cómo se ve el mundo adulto desde la intensidad emocional de la infancia?",
      "¿Por qué el heroísmo aparece ligado a una pequeña renuncia íntima?",
    ],
    afterReading:
      "El relato gana espesor si se recuerda su circunstancia de escritura. La delicadeza del recuerdo no desmiente el presidio cercano: es una forma de conservar vida interior frente al aparato de castigo.",
  }),
  "el-sueno-del-tio": createBookEditorial({
    title: "Uncle's Dream",
    period: "return",
    relatedEventIds: ["life-1854-semipalatinsk", "life-1859-return"],
    readingGuide:
      "La mejor forma de leerla es como comedia social de provincia. Todo gira alrededor del cálculo matrimonial, la charla pública y la necesidad de sostener apariencias absurdas.",
    whyItMatters:
      "Marca el regreso literario de Dostoievski después del exilio, y muestra que ese retorno no fue sólo grave o testimonial: también podía ser satírico y escénico. Es una pieza importante para entender su oído para el ridículo colectivo.",
    keyQuestions: [
      "¿Qué revela la provincia rusa sobre la relación entre prestigio y fantasía social?",
      "¿Cómo se organiza el poder femenino en la figura de María Alexándrovna?",
      "¿Qué hace la comedia con la decrepitud del príncipe y con la ambición de quienes lo rodean?",
    ],
    afterReading:
      "La obra vale como ejercicio de respiración después del trauma siberiano. Dostoievski vuelve a la literatura pública por la vía de la farsa, pero ya con una mirada mucho más dura sobre el deseo de ascenso y la teatralidad social.",
  }),
  "la-aldea-de-stepanchikovo": createBookEditorial({
    title: "The Village of Stepanchikovo",
    period: "return",
    relatedEventIds: ["life-1854-semipalatinsk", "life-1859-return"],
    readingGuide:
      "Entrá por Fomá Fomích. La novela funciona mejor si se la lee como anatomía de un pequeño tirano doméstico y del ecosistema de servidumbre moral que lo sostiene.",
    whyItMatters:
      "Es una comedia extraordinariamente importante para el Dostoievski posterior. En Fomá ya están el manipulador resentido, el moralista teatral y el dominador verbal que luego reaparecerán en registros más oscuros.",
    keyQuestions: [
      "¿Qué obedecen realmente los otros personajes: a Fomá o a su propia necesidad de someterse?",
      "¿Cómo mezcla la novela comicidad y violencia simbólica?",
      "¿Qué relación hay entre bondad, debilidad y complicidad en el coronel Rostánev?",
    ],
    afterReading:
      "Fomá es ridículo, pero no inocuo. La novela muestra que el despotismo puede vestirse de virtud herida y prosperar donde todos prefieren el escándalo doméstico a la verdad del conflicto.",
  }),
  "humillados-y-ofendidos": createBookEditorial({
    title: "Humiliated and Insulted",
    period: "sixties",
    relatedEventIds: ["life-1859-return", "life-1861-time", "context-1861-emancipation"],
    readingGuide:
      "Conviene leerla como novela de redes afectivas rotas. Más que seguir una intriga lineal, importa ver cómo aristocracia, pobreza y dependencia sentimental van encadenando humillaciones sobre distintos cuerpos y voces.",
    whyItMatters:
      "Es el gran regreso de Dostoievski al centro literario ruso. Todavía está cerca del melodrama y del folletín, pero ya trabaja con intensidad la dignidad herida, la infancia sufriente y la crueldad elegante que dominarán su obra madura.",
    keyQuestions: [
      "¿Cómo organiza la novela una jerarquía de humillados sin borrar diferencias entre ellos?",
      "¿Qué representa Nelly dentro del mapa moral del libro?",
      "¿Qué hace Valkovski con el lenguaje del refinamiento y la cortesía?",
    ],
    afterReading:
      "La novela se ilumina si se ve que Nelly no es un mero personaje patético: es el punto donde la sociedad respetable queda moralmente desenmascarada. Allí el sentimentalismo se vuelve acusación.",
  }),
  "memorias-de-la-casa-muerta": createBookEditorial({
    title: "Notes from the House of the Dead",
    period: "sixties",
    relatedEventIds: ["life-1849-arrest", "life-1850-omsk", "life-1861-time"],
    writtenContext:
      "Basada en la experiencia de Dostoievski en el presidio de Omsk, la obra apareció por entregas en Tiempo entre 1860 y 1862. No es un testimonio bruto, sino una elaboración narrativa donde la observación del presidio se transforma en una meditación sobre castigo, dignidad y comunidad forzada. Para muchos lectores, allí empieza el verdadero Dostoievski maduro.",
    readingGuide:
      "Hay que leerla con paciencia de observador. No funciona como novela cerrada de argumento, sino como acumulación de escenas, tipos humanos y descubrimientos morales sobre la vida en el castigo.",
    whyItMatters:
      "Es una obra bisagra porque convierte la experiencia siberiana en forma literaria y cambia para siempre la antropología dostoievskiana. Después de ella, ningún criminal o condenado en su ficción podrá reducirse a una caricatura moral.",
    keyQuestions: [
      "¿Qué aprende el narrador sobre los presos que no sabía antes de entrar al presidio?",
      "¿Cómo trabaja Dostoievski la tensión entre degradación material y irreductibilidad humana?",
      "¿Por qué el libro evita el tono de denuncia simple o de redención sentimental?",
    ],
    afterReading:
      "El mayor logro del texto es mostrar que comprender al condenado no equivale a absolverlo. Dostoievski descubre una humanidad irreductible allí donde el sistema penal sólo quiere ver restos o números.",
    extraSources: {
      context: [ARREST],
      readingGuide: [ARREST],
      afterReading: [ARREST],
    },
  }),
  "una-historia-desagradable": createBookEditorial({
    title: "An Unpleasant Predicament",
    period: "sixties",
    relatedEventIds: ["life-1861-time", "context-1861-emancipation", "context-1853-crimea"],
    readingGuide:
      "Leelo como sátira de la condescendencia liberal. La noche se desordena porque el general quiere “descender” hacia sus subordinados sin renunciar al narcisismo del gesto.",
    whyItMatters:
      "Es una pieza clave para ver cómo Dostoievski discute el reformismo superficial de su tiempo. No ataca la compasión, sino la teatralización moral del superior que quiere ser amado por su propia generosidad.",
    keyQuestions: [
      "¿Qué busca realmente Pralinski en la boda: cercanía humana o autocelebración?",
      "¿Cómo usa Dostoievski la vergüenza corporal para desmontar la ideología?",
      "¿Qué diferencia hay entre reforma, paternalismo y humillación?",
    ],
    afterReading:
      "La catástrofe cómica muestra que el problema no es sólo político, sino tonal: cuando la superioridad moral busca exhibirse, el otro queda convertido en escenario y no en persona.",
  }),
  "memorias-del-subsuelo": createBookEditorial({
    title: "Notes from Underground",
    period: "sixties",
    relatedEventIds: ["life-1847-petrashevsky", "life-1864-double-loss", "context-1861-emancipation"],
    writtenContext:
      "Escrita en 1864, poco después de la muerte de María Isáyeva y Mijaíl Dostoievski, la obra responde también a la cultura del racionalismo utilitario y a las utopías de ingeniería social que circulaban en la Rusia reformista. Dostoievski compone aquí una antiutopía verbal: un monólogo que discute a su tiempo atacando primero al propio hablante.",
    readingGuide:
      "Conviene entrar sin exigir coherencia psicológica estable. El Hombre del Subsuelo piensa contra otros, pero también contra sí mismo; su contradicción no es un fallo, sino el tema mismo del texto.",
    whyItMatters:
      "Es uno de los puntos de inflexión de la literatura moderna. Dostoievski convierte la conciencia resentida en forma filosófica, y desde ahí abre caminos hacia la novela existencial, la crítica de la razón instrumental y el monólogo autodestructivo.",
    keyQuestions: [
      "¿Qué defiende el narrador cuando defiende el derecho a actuar contra su propio interés?",
      "¿Cómo se relacionan la primera parte abstracta y la segunda parte narrativa?",
      "¿La crueldad con Liza es consecuencia de la humillación social o elección moral consciente?",
    ],
    afterReading:
      "La obra no propone una libertad heroica, sino una libertad enferma capaz de preferir el daño a la integración mecánica. Ahí está su violencia: el ser humano no quiere sólo bienestar, quiere también una voluntad que pueda arruinarlo.",
    extraSources: {
      readingGuide: [WORKS_1860S],
      afterReading: [WORKS_1860S],
    },
  }),
  "el-cocodrilo": createBookEditorial({
    title: "The Crocodile",
    period: "sixties",
    relatedEventIds: ["life-1861-time", "context-1866-karakozov"],
    readingGuide:
      "Leelo como una menipea absurda. El disparate de un funcionario tragado por un cocodrilo sirve para exponer la estupidez burocrática, la vanidad progresista y la autonomía grotesca de la charla pública.",
    whyItMatters:
      "Es uno de los ejemplos más claros del Dostoievski satírico y antirrealista. Muestra que su mundo no necesita siempre profundidad solemne: a veces la verdad aparece mejor a través del ridículo y la desproporción.",
    keyQuestions: [
      "¿Qué hace Iván Matvéich dentro del cocodrilo: sobrevivir, filosofar o seguir representando un papel?",
      "¿Por qué nadie parece verdaderamente interesado en rescatarlo?",
      "¿Cómo vuelve la farsa más visible la crítica al lenguaje público?",
    ],
    afterReading:
      "El interior del cocodrilo funciona como caricatura del espacio ideológico ruso: incluso tragado por el absurdo, el personaje sigue produciendo discurso. Dostoievski muestra una modernidad capaz de sobrevivir dentro de su propia farsa.",
  }),
  "crimen-y-castigo": createBookEditorial({
    title: "Crime and Punishment",
    period: "sixties",
    relatedEventIds: ["life-1849-arrest", "life-1864-double-loss", "context-1866-karakozov"],
    writtenContext:
      "Dostoievski escribió la novela entre 1865 y 1866 bajo una presión económica feroz, después del cierre de Época y cargando deudas propias y de su hermano. La publicación por entregas en El Mensajero Ruso lo obligó a sostener tensión narrativa y debate ideológico al mismo tiempo. Esa urgencia material quedó incorporada al pulso mismo de la novela.",
    readingGuide:
      "La entrada más fértil es no leerla como intriga policial, sino como drama de conciencia. El crimen ocurre temprano; lo decisivo es seguir el trabajo interior del pensamiento que intenta justificarse, quebrarse y volver a hablar con otros.",
    whyItMatters:
      "Es la gran novela de la culpa en Dostoievski, pero también una síntesis de sus temas mayores: pobreza urbana, teorías abstractas, compasión, castigo y posibilidad de resurrección moral. Es una puerta de entrada excelente a toda su obra madura.",
    keyQuestions: [
      "¿Qué intenta demostrar Raskólnikov con el asesinato: una teoría, una superioridad o una liberación personal?",
      "¿Cómo funcionan Sonia, Porfirio y Svidrigáilov como tres respuestas distintas a la crisis del protagonista?",
      "¿La novela castiga el crimen o desmonta la lógica que quiso volverlo legítimo?",
    ],
    afterReading:
      "El epílogo no borra la oscuridad anterior: la reubica. La conversión de Raskólnikov no aparece como milagro sentimental, sino como posibilidad apenas naciente, ganada después de que su teoría sobre el “hombre extraordinario” queda moralmente demolida.",
    extraSources: {
      summary: [WORKS_1860S],
      readingGuide: [WORKS_1860S],
      afterReading: [WORKS_1860S],
    },
  }),
  "el-jugador": createBookEditorial({
    title: "The Gambler",
    period: "europe",
    relatedEventIds: ["life-1864-double-loss", "life-1867-anna-europe"],
    writtenContext:
      "Dictada en veintiséis días a Anna Snítkina para cumplir un contrato editorial ruinoso, la novela nace pegada a la urgencia y al peligro material. Dostoievski vuelca además su experiencia directa de la ruleta y de la deuda en los casinos europeos, de modo que el ritmo del libro imita por momentos la lógica compulsiva del juego.",
    readingGuide:
      "Conviene leerla por velocidad y dependencia. Más que una novela “sobre” el juego, es una novela cuya sintaxis emocional reproduce el vértigo de apostar, perder, recuperar y volver a entregarse.",
    whyItMatters:
      "Es la obra donde la adicción se vuelve estructura narrativa. También es crucial para entender la relación entre dinero, deseo y humillación en el Dostoievski europeo.",
    keyQuestions: [
      "¿Qué busca Alexéi en la ruleta: dinero, soberanía o intensificación de la vida?",
      "¿Cómo se espejan el juego y la relación con Polina?",
      "¿Qué hace del casino un microcosmos moral y no sólo un escenario exótico?",
    ],
    afterReading:
      "La novela no termina “explicando” la adicción, pero sí la vuelve legible como hambre de destino inmediato. En Alexéi, jugar es preferible a vivir una vida mediada por cálculo, aunque esa elección lo destruya.",
    extraSources: {
      readingGuide: [WORKS_1860S],
      afterReading: [WORKS_1860S],
    },
  }),
  "el-idiota": createBookEditorial({
    title: "The Idiot",
    period: "europe",
    relatedEventIds: ["life-1849-arrest", "life-1867-anna-europe"],
    writtenContext:
      "Compuesta entre 1867 y 1869 durante la estancia europea con Anna, la novela fue escrita entre mudanzas, deudas y duelos familiares recientes. Dostoievski quería probar algo casi imposible: colocar a un hombre radicalmente bueno en la sociedad moderna y ver qué ocurría. El resultado es una obra inestable a propósito, atravesada por choques de tono, escándalo y visiones del sufrimiento.",
    readingGuide:
      "La mejor entrada es no reducir a Myshkin a un “santo”. Conviene leer la novela como un campo de colisiones: entre inocencia y experiencia, compasión y erotismo, belleza y destrucción.",
    whyItMatters:
      "Es quizá el experimento moral más audaz de Dostoievski. La pregunta por si la bondad puede sobrevivir socialmente organiza toda la novela y la vuelve decisiva para entender su imaginación cristiana sin simplificarla.",
    keyQuestions: [
      "¿Myshkin ilumina a los demás o los desordena aún más por la radicalidad de su presencia?",
      "¿Qué diferencia a Aglaya de Nastasia Filíppovna en relación con el ideal del príncipe?",
      "¿Por qué la compasión puede volverse también forma de daño?",
    ],
    afterReading:
      "La tragedia final muestra que el fracaso de Myshkin no es sólo personal. La novela sugiere que una sociedad organizada por orgullo, deseo posesivo y espectáculo no sabe qué hacer con la inocencia si ésta no viene acompañada de fuerza mundana.",
    extraSources: {
      readingGuide: [WORKS_1860S],
      afterReading: [WORKS_1860S],
    },
  }),
  "el-eterno-marido": createBookEditorial({
    title: "The Eternal Husband",
    period: "europe",
    relatedEventIds: ["life-1857-maria", "life-1867-anna-europe"],
    readingGuide:
      "Entrá por la incomodidad. Es una novela corta de duelos verbales, silencios y humillaciones aplazadas: casi todo lo importante circula como insinuación, sospecha o deuda afectiva.",
    whyItMatters:
      "Es una de las obras más precisas de Dostoievski en escala breve. Condensa adulterio, culpa, dependencia y sadismo sin necesidad de aparato ideológico grande.",
    keyQuestions: [
      "¿Qué quiere Trúsotski de Velchanínov: venganza, reconocimiento o compañía en la desgracia?",
      "¿Cómo trabaja la novela la idea de paternidad incierta?",
      "¿Qué hace del “eterno marido” una categoría moral además de psicológica?",
    ],
    afterReading:
      "La novela vale por la forma en que transforma la humillación conyugal en vínculo. Trúsotski necesita al rival casi tanto como lo odia, y esa dependencia vuelve más inquietante el drama.",
  }),
  "los-demonios": createBookEditorial({
    title: "Demons",
    period: "late",
    relatedEventIds: ["life-1871-return-russia", "context-1866-karakozov", "context-1869-nechaev"],
    writtenContext:
      "Inspirada por el caso Necháiev y escrita entre 1870 y 1872, la novela nace en un momento de radicalización política, regreso a Rusia y maduración ideológica del autor. Dostoievski no se limita a satirizar a una célula revolucionaria: construye un paisaje entero de contagio verbal, vacío moral y ruina comunitaria.",
    readingGuide:
      "Conviene leerla como novela coral de contagios. Más que buscar un protagonista único, sirve seguir cómo las ideas circulan, cómo las palabras se vuelven actos y cómo el caos necesita tanto a los fanáticos como a los vacíos.",
    whyItMatters:
      "Es la gran novela política de Dostoievski y una de las más proféticas de la modernidad europea. Allí la cuestión del mal ya no es sólo individual: aparece encarnada en redes, consignas, sectas, rumores y deseos de destrucción.",
    keyQuestions: [
      "¿Por qué Stavroguin es centro de gravedad aunque actúe menos que otros?",
      "¿Cómo usa la novela la comedia, el grotesco y la histeria colectiva para pensar la política?",
      "¿Qué diferencia hay entre crítica del nihilismo y miedo a la libertad moderna?",
    ],
    afterReading:
      "La novela no explica el fanatismo sólo por doctrina. Sugiere que el desastre político necesita sujetos vacíos, orgullosos o sedientos de pertenencia. Por eso su lectura excede de lejos el caso histórico que la desencadenó.",
    extraSources: {
      readingGuide: [LATE_DOSTO],
      afterReading: [LATE_DOSTO],
    },
  }),
  bobok: createBookEditorial({
    title: "Bobok",
    period: "late",
    relatedEventIds: ["life-1873-diary", "life-1871-return-russia"],
    readingGuide:
      "Leelo como sátira metafísica. La escena fantástica del cementerio importa menos por la alegoría cerrada que por la libertad con la que permite oír voces desvergonzadas después de la muerte.",
    whyItMatters:
      "Es un texto clave para entender la veta menipea y polifónica de Dostoievski. Allí se muestra con nitidez su capacidad para mezclar escándalo, risa, filosofía y descomposición social.",
    keyQuestions: [
      "¿Qué sigue vivo en los muertos: la conciencia, el rango o la vanidad?",
      "¿Por qué el cementerio resulta un espacio tan social como cualquier salón?",
      "¿Qué relación hay entre pudor, confesión y corrupción en el relato?",
    ],
    afterReading:
      "Bobok radicaliza una intuición de toda la obra de Dostoievski: incluso sin cuerpo o sin futuro, las voces persisten defendiendo su personaje social. La muerte no vuelve sinceros a todos; apenas afloja ciertos frenos.",
  }),
  "el-adolescente": createBookEditorial({
    title: "The Adolescent",
    period: "late",
    relatedEventIds: ["life-1839-father", "life-1871-return-russia", "life-1873-diary"],
    readingGuide:
      "La clave es leer a Arkadi como conciencia en formación, no como narrador plenamente confiable. La novela trata menos de una intriga de documentos que del esfuerzo por inventarse una identidad frente a la herencia paterna.",
    whyItMatters:
      "Es una obra crucial para el tema de la filiación en Dostoievski. Funciona como gran ensayo preparatorio de Karamázov, pero con un foco más íntimo en la adolescencia, la ilegitimidad y el deseo de hacerse a uno mismo.",
    keyQuestions: [
      "¿Qué significa para Arkadi querer convertirse en un hombre autosuficiente y poderoso?",
      "¿Cómo se cruzan en Versílov el padre seductor, el intelectual brillante y el hombre moralmente desfondado?",
      "¿Por qué los documentos y secretos importan tanto en una novela sobre identidad?",
    ],
    afterReading:
      "La “idea” de Arkadi no es simplemente económica; es una armadura contra la humillación. La novela muestra que el deseo de autonomía absoluta puede nacer menos de la ambición que del miedo a depender del amor ajeno.",
    extraSources: {
      readingGuide: [LATE_DOSTO],
      afterReading: [LATE_DOSTO],
    },
  }),
  "el-nino-en-el-arbol-de-navidad": createBookEditorial({
    title: "The Heavenly Christmas Tree",
    period: "late",
    relatedEventIds: ["life-1873-diary", "life-1878-alyosha", "context-1877-russo-turkish"],
    readingGuide:
      "Leelo como leyenda navideña y denuncia a la vez. Su fuerza está en no elegir entre compasión social y visión cristiana: ambas capas avanzan juntas.",
    whyItMatters:
      "En muy pocas páginas condensa la capacidad tardía de Dostoievski para pasar del realismo urbano más crudo a una escena de redención mística sin sentir que cambia de registro de manera arbitraria.",
    keyQuestions: [
      "¿Cómo representa la ciudad el abandono sin sentimentalismo decorativo?",
      "¿Qué relación hay entre la visión final y la acusación contra el mundo adulto?",
      "¿Por qué el cuento necesita el punto de vista de un niño?",
    ],
    afterReading:
      "La elevación final no anula la miseria inicial; la vuelve más intolerable. La promesa religiosa del texto convive con un juicio durísimo sobre una sociedad capaz de dejar morir a sus niños a la intemperie.",
  }),
  "el-mujik-marei": createBookEditorial({
    title: "The Peasant Marey",
    period: "late",
    relatedEventIds: ["life-1850-omsk", "life-1873-diary"],
    readingGuide:
      "Leelo como recuerdo que transforma la percepción. El núcleo del relato no es la anécdota infantil en sí, sino lo que esa memoria hace posible dentro del presidio.",
    whyItMatters:
      "Es uno de los textos más reveladores para comprender la idea dostoievskiana del pueblo. No como ideal abstracto, sino como experiencia concreta de humanidad recibida en un gesto mínimo de ternura.",
    keyQuestions: [
      "¿Qué cambia en el narrador cuando recuerda a Maréi?",
      "¿Cómo dialogan infancia, memoria y prisión en la construcción del sentido?",
      "¿Por qué un recuerdo tan pequeño tiene consecuencias espirituales tan grandes?",
    ],
    afterReading:
      "El relato muestra que para Dostoievski la memoria puede ser una forma de conversión de la mirada. Maréi no “resuelve” el presidio, pero le impide al narrador reducir a los presos a pura brutalidad.",
  }),
  "una-criatura-docil": createBookEditorial({
    title: "A Gentle Creature",
    period: "late",
    relatedEventIds: ["life-1857-maria", "life-1873-diary"],
    readingGuide:
      "Entrá por la voz del narrador y desconfiá de ella. El texto funciona como monólogo febril de autojustificación, y la verdad del matrimonio aparece precisamente en las grietas de esa reconstrucción.",
    whyItMatters:
      "Es una de las cumbres de la psicología breve de Dostoievski. Condensa dominación, orgullo, silencio y deseo de absolverse en una forma casi teatral de confesión unilateral.",
    keyQuestions: [
      "¿Qué intenta demostrar el prestamista mientras vela el cadáver de su esposa?",
      "¿Cómo pesa el silencio de la joven dentro de un relato ocupado por una sola voz?",
      "¿Qué relación hay entre posesión amorosa y necesidad de reconocimiento moral?",
    ],
    afterReading:
      "La esposa casi no habla, pero su silencio organiza la condena del narrador. La novela corta muestra que una confesión puede revelar la culpa incluso cuando quiere ocultarla.",
  }),
  "el-sueno-de-un-hombre-ridiculo": createBookEditorial({
    title: "The Dream of a Ridiculous Man",
    period: "late",
    relatedEventIds: ["life-1873-diary", "context-1877-russo-turkish", "life-1880-pushkin"],
    readingGuide:
      "Conviene leerlo como parábola filosófica contada desde la primera persona. El relato gana cuando se acepta su mezcla de nihilismo, visión cósmica y despertar moral como una sola trayectoria interior.",
    whyItMatters:
      "Es uno de los resúmenes más concentrados del pensamiento tardío de Dostoievski. En pocas páginas reaparecen la caída, la libertad, el orgullo y la posibilidad del amor como conocimiento.",
    keyQuestions: [
      "¿Qué relación hay entre el intento de suicidio y la revelación posterior?",
      "¿Por qué el paraíso soñado se corrompe tan rápidamente con la llegada del narrador?",
      "¿La verdad final del texto es doctrinal o experiencial?",
    ],
    afterReading:
      "La fuerza del cuento está en que no ofrece un sistema, sino una conversión. El mal entra en el mundo ideal por orgullo y separación, y la redención sólo puede comenzar cuando el narrador acepta su propia responsabilidad en esa caída.",
  }),
  "los-hermanos-karamazov": createBookEditorial({
    title: "The Brothers Karamazov",
    period: "final",
    relatedEventIds: ["life-1839-father", "life-1878-alyosha", "life-1880-pushkin", "life-1881-death"],
    writtenContext:
      "Publicada entre 1879 y 1880, la novela fue concebida por Dostoievski como parte de un proyecto mayor centrado en la vida posterior de Aliosha. Su escritura coincide con los años de máxima autoridad pública del autor, el duelo por su hijo Aliosha y la consolidación de Diario de un escritor como espacio de síntesis ideológica. El libro llega así como culminación y umbral al mismo tiempo.",
    readingGuide:
      "La mejor forma de leerla es como novela de voces en conflicto, no como tratado con moraleja única. Cada hermano y cada trama lateral encarna una respuesta distinta a la pregunta por libertad, culpa, fe, deseo y responsabilidad compartida.",
    whyItMatters:
      "Es la obra culminante de Dostoievski porque reúne casi todos sus temas mayores sin volverlos esquema. Parricidio, infancia sufriente, santidad, sensualidad, duda intelectual y justicia humana conviven en un formato coral de enorme amplitud.",
    keyQuestions: [
      "¿Qué aporta cada hermano Karamázov al mapa moral de la novela y qué no puede resolver por sí solo?",
      "¿Cómo se relacionan el crimen judicial, la culpa íntima y la responsabilidad espiritual?",
      "¿Por qué los niños y las tramas “menores” son indispensables para entender el libro completo?",
    ],
    afterReading:
      "La novela no se agota en descubrir quién mató a Fiódor Pávlovich. Su centro está en cómo la culpa se distribuye, se niega y se transmite. Por eso el final abre hacia una ética de la responsabilidad compartida más que hacia una clausura detectivesca.",
    extraSources: {
      summary: [LATE_DOSTO],
      readingGuide: [LATE_DOSTO],
      afterReading: [LATE_DOSTO],
    },
  }),
};
