const source = (label, url, publisher, kind) => ({ label, url, publisher, kind });

const BIO = source(
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
const DECEMBRISTS = source(
  "Britannica: Decembrist",
  "https://www.britannica.com/event/Decembrist",
  "Britannica",
  "reference",
);
const REVOLUTIONS_1848 = source(
  "Britannica: Revolutions of 1848",
  "https://www.britannica.com/event/Revolutions-of-1848",
  "Britannica",
  "reference",
);
const CRIMEAN_WAR = source(
  "Britannica: Crimean War",
  "https://www.britannica.com/event/Crimean-War",
  "Britannica",
  "reference",
);
const EMANCIPATION = source(
  "Britannica: Emancipation Manifesto",
  "https://www.britannica.com/event/Emancipation-Manifesto",
  "Britannica",
  "reference",
);
const ALEXANDER_II = source(
  "Britannica: Alexander II",
  "https://www.britannica.com/biography/Alexander-II-tsar-of-Russia",
  "Britannica",
  "reference",
);
const NECHAEV = source(
  "Britannica search: Sergey Nechayev",
  "https://www.britannica.com/search?query=Sergey%20Nechayev",
  "Britannica",
  "reference",
);
const RUSSO_TURKISH = source(
  "Britannica: Russo-Turkish wars",
  "https://www.britannica.com/event/Russo-Turkish-wars",
  "Britannica",
  "reference",
);

function eventSources(event, influence) {
  return { sources: { event, influence } };
}

export const LIFE_EVENTS = [
  {
    id: "life-1821-birth",
    category: "life",
    kind: "point",
    year: 1821,
    label: "Nacimiento en Moscú",
    shortLabel: "Nacimiento",
    detail: "Nace en el seno de una familia de la pequeña nobleza empobrecida.",
    fullDescription:
      "Fiódor Mijáilovich Dostoievski nació en Moscú el 11 de noviembre de 1821 (30 de octubre según el calendario juliano). Creció entre la disciplina del padre, médico del Hospital Mariinski para pobres, y la religiosidad afectiva de la madre. Desde temprano convivió con dos mundos que no dejaría de explorar: la cultura libresca de la nobleza baja y la cercanía física con la pobreza urbana.",
    influenceOnWork:
      "Ese origen doble ayuda a entender por qué sus novelas no miran la miseria desde afuera. En Dostoievski la humillación material casi nunca es un simple decorado social: es una prueba espiritual, psicológica y verbal. La compasión por los pobres, pero también la observación del orgullo y la herida que viven dentro de ellos, arranca de esta experiencia originaria.",
    relatedWorks: ["pobres-gentes", "crimen-y-castigo", "los-hermanos-karamazov"],
    ...eventSources([BIO], [BIO]),
  },
  {
    id: "life-1837-mother-petersburg",
    category: "life",
    kind: "point",
    year: 1837,
    label: "Muere su madre y se traslada a San Petersburgo",
    shortLabel: "Madre / Petersburgo",
    detail: "La pérdida familiar coincide con su entrada en la capital imperial.",
    fullDescription:
      "En 1837 murió María Fiódorovna, la madre de Dostoievski. Ese mismo año Fiódor y su hermano Mijaíl fueron enviados a San Petersburgo para continuar su formación en el ambiente técnico y militar que debía asegurarles una carrera. El traslado lo arranca del espacio doméstico y lo coloca en la ciudad que será el laboratorio moral de casi toda su obra.",
    influenceOnWork:
      "San Petersburgo se convierte en mucho más que un escenario: es una máquina de conciencia. Calles, pensiones, puentes, oficinas y cuartos alquilados moldean la percepción de sus personajes. La ciudad fría, burocrática y alucinada de obras como El doble, Noches blancas o Crimen y castigo nace de este desplazamiento biográfico decisivo.",
    relatedWorks: ["el-doble", "noches-blancas", "crimen-y-castigo"],
    ...eventSources([BIO, EARLY_WORKS], [BIO, EARLY_WORKS]),
  },
  {
    id: "life-1839-father",
    category: "life",
    kind: "point",
    year: 1839,
    label: "Muere su padre",
    shortLabel: "Padre",
    detail: "La figura paterna queda marcada por autoridad, distancia y rumor.",
    fullDescription:
      "En 1839 murió Mijaíl Andréievich, el padre de Dostoievski. La relación había estado signada por la severidad y por un clima de obediencia tensa. Alrededor de su muerte circularon más tarde rumores de asesinato por campesinos, aunque la versión histórica no es concluyente; lo importante es que la imaginación de Dostoievski absorbió ese núcleo de autoridad, culpa y violencia filial.",
    influenceOnWork:
      "La conflictiva figura del padre reaparece una y otra vez en su ficción: padres humillantes, ausentes, ridículos o despóticos ocupan el centro de sus tramas. La constelación culmina en Los hermanos Karamázov, donde el problema del parricidio se vuelve teológico y moral. También ilumina las novelas de herencia, ilegitimidad y dependencia afectiva como El adolescente.",
    relatedWorks: ["netochka-nezvanova", "el-adolescente", "los-hermanos-karamazov"],
    ...eventSources([BIO], [BIO, LATE_DOSTO]),
  },
  {
    id: "life-1846-debut",
    category: "life",
    kind: "point",
    year: 1846,
    label: "Irrumpe con Pobres gentes",
    shortLabel: "Debut literario",
    detail: "Belinski lo consagra momentáneamente como nueva voz rusa.",
    fullDescription:
      "La publicación de Pobres gentes en 1846 le dio a Dostoievski un debut fulgurante. La reacción de Vissarión Belinski y del círculo crítico petersburgués lo instaló de golpe como una promesa mayor de la nueva literatura rusa. Esa entrada espectacular también creó una expectativa asfixiante que explica la violencia con que fueron leídas sus obras inmediatamente posteriores.",
    influenceOnWork:
      "El éxito temprano fijó dos tensiones duraderas: por un lado, la necesidad de ir más allá del mero realismo social; por otro, la experiencia de la consagración seguida de la incomprensión. El doble, La patrona y otros textos de la década del cuarenta muestran a un autor que ya quiere romper el molde del retrato compasivo del pobre para explorar la fractura interior.",
    relatedWorks: ["pobres-gentes", "el-doble", "la-patrona"],
    ...eventSources([BIO, EARLY_WORKS], [EARLY_WORKS]),
  },
  {
    id: "life-1847-petrashevsky",
    category: "life",
    kind: "point",
    year: 1847,
    label: "Se acerca al círculo Petrashevski",
    shortLabel: "Petrashevski",
    detail: "Frecuenta debates intelectuales y socialistas bajo vigilancia imperial.",
    fullDescription:
      "Entre 1847 y 1849 Dostoievski participó en reuniones del círculo de Mijaíl Petrashevski, donde se discutían ideas socialistas utópicas, censura, servidumbre y reformas políticas. El grupo reunía a jóvenes intelectuales en una Rusia dominada por la vigilancia del reinado de Nicolás I. Aunque Dostoievski no fue un revolucionario orgánico, su cercanía a ese ambiente bastó para convertirlo en sospechoso político.",
    influenceOnWork:
      "Esta etapa le dejó una experiencia directa de las promesas y límites del radicalismo intelectual. Más tarde, Dostoievski volvería una y otra vez a la distancia entre idea abstracta y vida concreta. Desde Memorias del subsuelo hasta Los demonios, la ficción dostoievskiana interroga la soberbia de los sistemas que pretenden salvar al hombre sin comprenderlo.",
    relatedWorks: ["memorias-del-subsuelo", "los-demonios", "el-sueno-de-un-hombre-ridiculo"],
    ...eventSources([ARREST], [ARREST, WORKS_1860S]),
  },
  {
    id: "life-1849-arrest",
    category: "life",
    kind: "point",
    year: 1849,
    label: "Arresto y falsa ejecución",
    shortLabel: "Arresto",
    detail: "Cae por el círculo Petrashevski; la condena a muerte se conmuta a último instante.",
    fullDescription:
      "En abril de 1849 Dostoievski fue arrestado por su participación en el círculo Petrashevski. Tras meses de encierro, fue llevado con otros condenados al patíbulo para una ejecución pública simulada; en el último instante se leyó la conmutación de la pena. La escena, cuidadosamente diseñada por el poder imperial, lo enfrentó de manera brutal con la muerte, la espera y la gratuidad terrible del tiempo que queda.",
    influenceOnWork:
      "Pocas experiencias biográficas marcaron tanto su literatura. La intensidad del instante final, la conciencia de haber vuelto de la muerte y la pregunta por lo que un ser humano hace con esa segunda vida atraviesan toda su obra madura. La relación entre culpa, castigo, resurrección moral y tiempo concedido se vuelve central desde Memorias de la casa muerta hasta Crimen y castigo y El idiota.",
    relatedWorks: ["un-pequeno-heroe", "memorias-de-la-casa-muerta", "crimen-y-castigo", "el-idiota"],
    ...eventSources([BIO, ARREST], [ARREST, WORKS_1860S]),
  },
  {
    id: "life-1850-omsk",
    category: "life",
    kind: "range",
    year: 1850,
    endYear: 1854,
    row: 0,
    label: "Presidio en Omsk",
    shortLabel: "Omsk",
    detail: "Cuatro años de trabajos forzados en Siberia.",
    fullDescription:
      "Entre 1850 y 1854 Dostoievski pasó cuatro años en el presidio de Omsk, en condiciones físicas y morales extremas. Compartió barracones con asesinos, ladrones, campesinos y soldados castigados, y vivió bajo un régimen de degradación cotidiana. Allí perdió muchas certezas intelectuales anteriores y ganó, en cambio, una observación despiadada pero compasiva de lo humano.",
    influenceOnWork:
      "Omsk no le dio simplemente materia autobiográfica; transformó su mirada. Después del presidio, Dostoievski escribe con una convicción nueva: nadie se deja reducir a una etiqueta moral o social. La complejidad de culpables, humillados y pecadores redimibles que vemos en Memorias de la casa muerta, Crimen y castigo, El idiota o Karamázov nace directamente de esta experiencia.",
    relatedWorks: ["memorias-de-la-casa-muerta", "el-mujik-marei", "crimen-y-castigo", "los-hermanos-karamazov"],
    ...eventSources([BIO, ARREST], [ARREST, LATE_DOSTO]),
  },
  {
    id: "life-1854-semipalatinsk",
    category: "life",
    kind: "range",
    year: 1854,
    endYear: 1859,
    row: 1,
    label: "Servicio y destierro en Semipalátinsk",
    shortLabel: "Semipalátinsk",
    detail: "Servicio militar, vigilancia y lenta reentrada a la vida civil.",
    fullDescription:
      "Tras salir del presidio, Dostoievski fue destinado como soldado raso y luego suboficial a Semipalátinsk. Continuó vigilado, lejos del centro literario ruso, y vivió una etapa de readaptación lenta, marcada por nuevas amistades, por el matrimonio con María Isáyeva y por el regreso gradual a la escritura. Fue un exilio menos visible que el presidio, pero decisivo para recomponer su voz.",
    influenceOnWork:
      "Semipalátinsk es el puente entre el joven autor petersburgués y el novelista maduro. Allí se preparan el retorno satírico de El sueño del tío y Stepánchikovo, pero también la sensibilidad que más tarde hará posible Humillados y ofendidos o Memorias de la casa muerta. Es una etapa de decantación, donde el escritor aprende a transformar experiencia traumática en forma narrativa.",
    relatedWorks: ["el-sueno-del-tio", "la-aldea-de-stepanchikovo", "humillados-y-ofendidos"],
    ...eventSources([BIO, ARREST], [ARREST]),
  },
  {
    id: "life-1857-maria",
    category: "life",
    kind: "point",
    year: 1857,
    label: "Matrimonio con María Isáyeva",
    shortLabel: "María",
    detail: "Se casa en medio de una vida todavía vigilada y frágil.",
    fullDescription:
      "En 1857 Dostoievski se casó con María Dmítrievna Isáyeva. El vínculo estuvo atravesado por enfermedad, tensiones económicas y desajustes afectivos, pero también por la necesidad de reconstruir una vida civil tras la condena. No fue un matrimonio apacible ni literariamente secundario: introdujo en su mundo una experiencia concreta de cuidado, desencuentro y desgaste.",
    influenceOnWork:
      "La representación dostoievskiana del matrimonio rara vez es un refugio estable. En sus novelas abundan uniones desiguales, relaciones hechas de dependencia, culpa y orgullo. La experiencia con María no explica mecánicamente esas formas, pero sí ayuda a entender por qué el amor en Dostoievski casi siempre aparece mezclado con humillación, compasión y lucha por el dominio.",
    relatedWorks: ["humillados-y-ofendidos", "el-eterno-marido", "una-criatura-docil"],
    ...eventSources([BIO, ARREST], [BIO, WORKS_1860S]),
  },
  {
    id: "life-1859-return",
    category: "life",
    kind: "point",
    year: 1859,
    label: "Regresa a San Petersburgo",
    shortLabel: "Regreso",
    detail: "Vuelve al centro literario ruso tras una década de exclusión.",
    fullDescription:
      "En 1859 Dostoievski obtuvo permiso para salir de Siberia y reinsertarse en la vida intelectual de la Rusia europea. Regresar a San Petersburgo significó retomar el contacto con revistas, debates y lectores, pero ya sin la inocencia del joven debutante. Volvió como un escritor sobreviviente, con otra escala moral y con otra relación con la sociedad rusa.",
    influenceOnWork:
      "El retorno abre la gran segunda etapa de su carrera. A partir de aquí, la energía de observación del reformismo ruso, el periodismo y la polémica ideológica se mezclan con la experiencia del presidio. Ese cruce alimenta Humillados y ofendidos, Memorias de la casa muerta y, más tarde, las grandes novelas de la década del sesenta.",
    relatedWorks: ["el-sueno-del-tio", "humillados-y-ofendidos", "memorias-de-la-casa-muerta"],
    ...eventSources([BIO, ARREST], [BIO, WORKS_1860S]),
  },
  {
    id: "life-1861-time",
    category: "life",
    kind: "point",
    year: 1861,
    label: "Funda la revista Tiempo con su hermano Mijaíl",
    shortLabel: "Tiempo",
    detail: "El periodismo se vuelve parte central de su oficio y su pensamiento.",
    fullDescription:
      "En 1861 Dostoievski y su hermano Mijaíl fundaron la revista Tiempo. La publicación le permitió intervenir de lleno en la vida pública rusa, polemizar con occidentales y radicales, y volver a publicar narrativa larga por entregas. La experiencia periodística reforzó su costumbre de pensar la literatura no como esfera aparte, sino como forma de combate intelectual y moral.",
    influenceOnWork:
      "Desde este momento su ficción respira discusión. Personajes, monólogos y escenas empiezan a llevar dentro los debates del presente ruso: reforma, pueblo, nihilismo, religión, modernización. La tensión entre novela y publicística, entre dramaturgia y polémica, es una de las claves de Humillados y ofendidos, Memorias del subsuelo, Los demonios y Diario de un escritor.",
    relatedWorks: ["humillados-y-ofendidos", "memorias-de-la-casa-muerta", "memorias-del-subsuelo"],
    ...eventSources([WORKS_1860S], [WORKS_1860S, WRITERS_DIARY]),
  },
  {
    id: "life-1864-double-loss",
    category: "life",
    kind: "point",
    year: 1864,
    label: "Mueren María Isáyeva y Mijaíl Dostoievski",
    shortLabel: "Doble duelo",
    detail: "Un año de pérdidas personales y ruina económica.",
    fullDescription:
      "En 1864 murieron la esposa de Dostoievski, María, y su hermano Mijaíl, colaborador íntimo y sostén material de varios proyectos. A las pérdidas afectivas se sumó una fuerte presión económica: deudas, obligaciones editoriales y la sensación de estar escribiendo desde el borde del colapso. El dolor privado coincidió con una exposición pública extrema.",
    influenceOnWork:
      "La tonalidad de Memorias del subsuelo y de las novelas inmediatamente posteriores no puede separarse de este año. La herida, la ironía autodestructiva, la experiencia de soledad radical y la necesidad de escribir contra el derrumbe le dan a Dostoievski una intensidad nueva. Desde entonces sus protagonistas parecen hablar siempre con la muerte o la bancarrota respirándoles en la nuca.",
    relatedWorks: ["memorias-del-subsuelo", "crimen-y-castigo", "el-jugador"],
    ...eventSources([BIO, WORKS_1860S], [WORKS_1860S]),
  },
  {
    id: "life-1867-anna-europe",
    category: "life",
    kind: "point",
    year: 1867,
    label: "Se casa con Anna Snítkina y parte a Europa",
    shortLabel: "Anna / Europa",
    detail: "Comienza la larga etapa europea entre deudas, casinos y escritura.",
    fullDescription:
      "En 1867 Dostoievski se casó con Anna Grigórievna Snítkina, la taquígrafa que había trabajado con él en El jugador. Ese mismo año partieron a Europa y vivieron un período largo entre Dresde, Ginebra, Vevey, Milán, Florencia y otras ciudades, acosados por deudas y por la adicción de Dostoievski a la ruleta. Anna fue decisiva como compañera, administradora y sostén práctico del escritor.",
    influenceOnWork:
      "La etapa europea concentra dos movimientos a la vez: la exposición directa al juego, la deuda y la humillación, y la distancia desde la cual Dostoievski observa Rusia. De allí salen El jugador, El idiota y El eterno marido, pero también la maduración formal que preparará Los demonios. Europa es a la vez experiencia personal y espejo crítico para pensar la identidad rusa.",
    relatedWorks: ["el-jugador", "el-idiota", "el-eterno-marido", "los-demonios"],
    ...eventSources([BIO, WORKS_1860S], [WORKS_1860S]),
  },
  {
    id: "life-1871-return-russia",
    category: "life",
    kind: "point",
    year: 1871,
    label: "Regreso definitivo a Rusia",
    shortLabel: "Vuelta a Rusia",
    detail: "Cierra la etapa europea y entra en la gran madurez tardía.",
    fullDescription:
      "En 1871 Dostoievski regresó definitivamente a Rusia. Volvía con una obra ya mayor a sus espaldas, con fama creciente y con una experiencia europea que había afilado sus intuiciones sobre liberalismo, socialismo, religión y modernidad. El retorno coincide con una nueva etapa de intervención pública y de consolidación de su autoridad intelectual.",
    influenceOnWork:
      "Después de 1871 su escritura se vuelve aún más panorámica. Los demonios, El adolescente y el Diario de un escritor surgen de un autor que ya no sólo narra dramas individuales, sino crisis de generaciones, ideologías y lenguajes nacionales. La gran madurez tardía combina experiencia, polémica y construcción coral.",
    relatedWorks: ["los-demonios", "el-adolescente", "bobok"],
    ...eventSources([BIO, LATE_DOSTO], [LATE_DOSTO, WRITERS_DIARY]),
  },
  {
    id: "life-1873-diary",
    category: "life",
    kind: "point",
    year: 1873,
    label: "Comienza Diario de un escritor",
    shortLabel: "Diario",
    detail: "Une periodismo, confesión, polémica y ficción breve.",
    fullDescription:
      "Desde 1873, y sobre todo en la segunda mitad de la década, Diario de un escritor se convirtió en un espacio singular donde Dostoievski mezcló crónica, ensayo, comentario político, observación social y relato. No era un apéndice menor a las novelas, sino un laboratorio de intervención pública donde ensayaba argumentos, tonos y escenas.",
    influenceOnWork:
      "Muchos de sus mejores relatos tardíos nacen de esta forma híbrida. Bobok, El niño en el árbol de Navidad de Cristo, El mujik Maréi, Una criatura dócil o El sueño de un hombre ridículo muestran a un Dostoievski capaz de condensar en pocas páginas lo que las grandes novelas desarrollan en expansión: confesión, escándalo moral, visión apocalíptica y apuesta redentora.",
    relatedWorks: ["bobok", "el-nino-en-el-arbol-de-navidad", "el-mujik-marei", "una-criatura-docil", "el-sueno-de-un-hombre-ridiculo"],
    ...eventSources([WRITERS_DIARY, LATE_DOSTO], [WRITERS_DIARY]),
  },
  {
    id: "life-1878-alyosha",
    category: "life",
    kind: "point",
    year: 1878,
    label: "Muere su hijo Aliosha",
    shortLabel: "Aliosha",
    detail: "Golpe íntimo decisivo en los últimos años del escritor.",
    fullDescription:
      "En 1878 murió Aliosha, el hijo pequeño de Dostoievski y Anna, a causa de una enfermedad vinculada a episodios convulsivos. La pérdida fue devastadora para la familia. En esos años finales, el dolor personal convivió con la escritura de la novela más amplia y espiritualmente ambiciosa de su carrera.",
    influenceOnWork:
      "Aunque no conviene reducir la ficción a biografía, la intensidad con que Los hermanos Karamázov piensa la inocencia sufriente, la muerte de los niños y la posibilidad de una fraternidad redentora se vuelve más legible a la luz de esta pérdida. El nombre de Aliosha en la novela no es casual: condensa duelo, esperanza y transmisión espiritual.",
    relatedWorks: ["los-hermanos-karamazov", "el-nino-en-el-arbol-de-navidad", "el-sueno-de-un-hombre-ridiculo"],
    ...eventSources([BIO, LATE_DOSTO], [LATE_DOSTO]),
  },
  {
    id: "life-1880-pushkin",
    category: "life",
    kind: "point",
    year: 1880,
    label: "Pronuncia el discurso de Pushkin",
    shortLabel: "Pushkin",
    detail: "Momento máximo de reconocimiento público e intelectual.",
    fullDescription:
      "En junio de 1880 Dostoievski pronunció su célebre discurso sobre Pushkin en Moscú. El acto fue recibido como un momento de consagración nacional: ya no hablaba sólo el novelista, sino una figura pública capaz de formular una visión sobre Rusia, Europa y la vocación espiritual del pueblo ruso. Fue el punto culminante de su prestigio contemporáneo.",
    influenceOnWork:
      "El discurso ayuda a leer la fase final de su obra como una tentativa de síntesis. En lugar de limitarse al conflicto entre ideas rivales, Dostoievski busca una forma de reconciliación espiritual que no anule el drama. Esa ambición de totalidad está muy presente en Los hermanos Karamázov y en los textos tardíos de tono profético.",
    relatedWorks: ["los-hermanos-karamazov", "el-sueno-de-un-hombre-ridiculo"],
    ...eventSources([BIO, WRITERS_DIARY], [WRITERS_DIARY, LATE_DOSTO]),
  },
  {
    id: "life-1881-death",
    category: "life",
    kind: "point",
    year: 1881,
    label: "Muerte en San Petersburgo",
    shortLabel: "Muerte",
    detail: "Muere en enero de 1881, poco después de completar Karamázov.",
    fullDescription:
      "Dostoievski murió en San Petersburgo en enero de 1881. Dejaba atrás una trayectoria atravesada por el presidio, el exilio, las deudas, el periodismo y una de las producciones novelísticas más influyentes del siglo XIX. Su muerte cerró una obra que seguía abierta hacia el futuro: incluso Los hermanos Karamázov estaba pensada como parte de un proyecto mayor.",
    influenceOnWork:
      "La muerte temprana de Dostoievski convierte a Karamázov en culminación y, al mismo tiempo, en obra truncada. Esa sensación de final abierto importa: obliga a leerlo no como sistema cerrado, sino como umbral. La posteridad de Dostoievski nace también de esa incompletud, de la impresión de que su pregunta por libertad, fe y responsabilidad no quedó clausurada.",
    relatedWorks: ["los-hermanos-karamazov"],
    ...eventSources([BIO, LATE_DOSTO], [LATE_DOSTO]),
  },
];

export const CONTEXT_EVENTS = [
  {
    id: "context-1825-decembrists",
    category: "context",
    kind: "point",
    year: 1825,
    label: "Revuelta decembrista",
    shortLabel: "Decembristas",
    detail: "Marca el clima represivo del reinado de Nicolás I.",
    fullDescription:
      "La revuelta decembrista de 1825 fue el intento fallido de parte de la nobleza militar rusa de limitar la autocracia e impulsar reformas políticas. Su fracaso inauguró un largo período de reacción y vigilancia bajo Nicolás I. Ese ambiente de control estatal, censura y sospecha ideológica fue el marco en que creció la generación de Dostoievski.",
    influenceOnWork:
      "El peso de un Estado que vigila, castiga y teatraliza la obediencia está en el fondo de muchas tramas dostoievskianas. Incluso cuando no escribe sobre política de forma directa, sus personajes viven bajo instituciones que deforman la subjetividad. La mezcla de burocracia, miedo y resentimiento de su universo petersburgués depende de ese clima histórico.",
    relatedWorks: ["el-doble", "memorias-del-subsuelo", "los-demonios"],
    ...eventSources([DECEMBRISTS], [DECEMBRISTS, BIO]),
  },
  {
    id: "context-1848-revolutions",
    category: "context",
    kind: "point",
    year: 1848,
    label: "Revoluciones de 1848 y endurecimiento ruso",
    shortLabel: "1848 europeo",
    detail: "La ola revolucionaria europea intensifica la vigilancia interior del imperio.",
    fullDescription:
      "Las revoluciones europeas de 1848 sacudieron el continente con demandas de constitución, representación política y reorganización social. En Rusia, más que una apertura, produjeron un endurecimiento preventivo del control estatal. Las autoridades imperiales intensificaron la vigilancia sobre círculos intelectuales, publicaciones y reuniones consideradas peligrosas.",
    influenceOnWork:
      "Para Dostoievski, 1848 es el telón de fondo inmediato del pasaje del experimento literario al peligro político real. Su arresto no se entiende sin ese contexto. También ayuda a leer cómo, desde temprano, la relación entre sueño emancipador y violencia estatal se inscribe en su obra como un problema irresuelto.",
    relatedWorks: ["noches-blancas", "netochka-nezvanova", "memorias-del-subsuelo"],
    ...eventSources([REVOLUTIONS_1848], [REVOLUTIONS_1848, ARREST]),
  },
  {
    id: "context-1853-crimea",
    category: "context",
    kind: "range",
    year: 1853,
    endYear: 1856,
    row: 0,
    label: "Guerra de Crimea",
    shortLabel: "Crimea",
    detail: "La derrota imperial revela la crisis del orden ruso.",
    fullDescription:
      "La Guerra de Crimea enfrentó al Imperio ruso con una coalición formada por el Imperio otomano, Francia, Gran Bretaña y Cerdeña. La derrota rusa mostró el atraso administrativo, militar y técnico del régimen y aceleró la necesidad de reformas profundas. Fue uno de los grandes golpes al imaginario de estabilidad del viejo orden imperial.",
    influenceOnWork:
      "Aunque Dostoievski no convierte la guerra en tema novelesco directo, sí escribe desde la Rusia que emerge de esa derrota. El sentimiento de crisis nacional, de reformas necesarias pero ambiguas, recorre la década del sesenta y es clave para entender la intensidad con que sus obras discuten modernización, pueblo y decadencia moral.",
    relatedWorks: ["humillados-y-ofendidos", "memorias-de-la-casa-muerta", "una-historia-desagradable"],
    ...eventSources([CRIMEAN_WAR], [CRIMEAN_WAR, WORKS_1860S]),
  },
  {
    id: "context-1861-emancipation",
    category: "context",
    kind: "point",
    year: 1861,
    label: "Emancipación de los siervos",
    shortLabel: "Emancipación",
    detail: "Punto central de las Grandes Reformas de Alejandro II.",
    fullDescription:
      "El Manifiesto de Emancipación de 1861 abolió formalmente la servidumbre en el Imperio ruso. La reforma fue inmensa, pero no resolvió de inmediato las desigualdades ni las frustraciones del mundo rural y urbano. Abrió un nuevo escenario de expectativas, resentimientos y debates sobre quién era realmente “el pueblo” y qué debía hacerse con Rusia.",
    influenceOnWork:
      "Desde este momento, la palabra “pueblo” adquiere una centralidad nueva en Dostoievski. Sus novelas y artículos ya no sólo miran individuos aislados, sino una sociedad que intenta redefinirse tras la reforma. Las preguntas por responsabilidad, justicia, humillación social y redención popular se vuelven más urgentes en Humillados y ofendidos, Memorias del subsuelo, Los demonios y Karamázov.",
    relatedWorks: ["humillados-y-ofendidos", "memorias-del-subsuelo", "los-demonios", "los-hermanos-karamazov"],
    ...eventSources([EMANCIPATION, ALEXANDER_II], [EMANCIPATION, WORKS_1860S]),
  },
  {
    id: "context-1866-karakozov",
    category: "context",
    kind: "point",
    year: 1866,
    label: "Atentado contra Alejandro II y giro represivo",
    shortLabel: "Giro represivo",
    detail: "El atentado de Karakozov endurece el clima político.",
    fullDescription:
      "En 1866 Dmitry Karakozov intentó asesinar al zar Alejandro II. El atentado reforzó el temor del régimen frente a la radicalización política y fue seguido por un endurecimiento del control ideológico y policial. El período de las grandes reformas reveló entonces su reverso: apertura parcial y, al mismo tiempo, creciente ansiedad estatal.",
    influenceOnWork:
      "El clima de sospecha posterior al atentado ayuda a entender por qué Dostoievski radicaliza su diagnóstico de la intelligentsia rusa. La pregunta deja de ser sólo cómo reformar Rusia y pasa a ser qué sucede cuando las ideas revolucionarias se vacían de responsabilidad moral. Esa preocupación desembocará con fuerza en Los demonios.",
    relatedWorks: ["crimen-y-castigo", "el-jugador", "los-demonios"],
    ...eventSources([ALEXANDER_II], [ALEXANDER_II, WORKS_1860S]),
  },
  {
    id: "context-1869-nechaev",
    category: "context",
    kind: "point",
    year: 1869,
    label: "Caso Necháiev y radicalización nihilista",
    shortLabel: "Necháiev",
    detail: "El asesinato dentro de una célula revolucionaria sacude a Rusia.",
    fullDescription:
      "El caso Necháiev, asociado al asesinato de un integrante disidente dentro de una organización clandestina, se volvió emblema de la deriva conspirativa y nihilista de parte del radicalismo ruso. La figura de Serguéi Necháiev condensó para muchos contemporáneos la mezcla de idea absoluta, violencia instrumental y disciplina sectaria.",
    influenceOnWork:
      "Dostoievski encontró en este episodio la matriz histórica inmediata para Los demonios. Pero la novela no es un simple roman à clef: toma el caso para pensar cómo una idea sin responsabilidad moral deshace vínculos, lenguaje y comunidad. El acontecimiento funciona como disparador histórico de una reflexión mucho más amplia sobre el mal político moderno.",
    relatedWorks: ["los-demonios", "el-adolescente"],
    ...eventSources([NECHAEV], [NECHAEV, LATE_DOSTO]),
  },
  {
    id: "context-1877-russo-turkish",
    category: "context",
    kind: "range",
    year: 1877,
    endYear: 1878,
    row: 1,
    label: "Guerra ruso-turca",
    shortLabel: "Ruso-turca",
    detail: "Reaviva debates imperiales, eslavófilos y religiosos.",
    fullDescription:
      "La guerra ruso-turca de 1877-1878 reactivó en Rusia discusiones sobre misión imperial, paneslavismo, ortodoxia y destino histórico. Fue un conflicto seguido con intensidad por la opinión pública y por los escritores. Para Dostoievski, la guerra se inscribía en una visión más amplia sobre Rusia, Europa y el sufrimiento de los pueblos eslavos.",
    influenceOnWork:
      "En la última etapa, la imaginación histórica y religiosa de Dostoievski se vuelve más explícita. Esa mezcla de compasión, nacionalidad y destino espiritual entra en tensión dentro del Diario de un escritor y forma parte del horizonte ideológico desde el que escribe sus relatos tardíos y Karamázov. No determina la ficción, pero sí su atmósfera profética.",
    relatedWorks: ["el-nino-en-el-arbol-de-navidad", "el-sueno-de-un-hombre-ridiculo", "los-hermanos-karamazov"],
    ...eventSources([RUSSO_TURKISH, WRITERS_DIARY], [RUSSO_TURKISH, WRITERS_DIARY]),
  },
  {
    id: "context-1881-alexander",
    category: "context",
    kind: "point",
    year: 1881,
    label: "Asesinato de Alejandro II",
    shortLabel: "Alejandro II",
    detail: "Cierre trágico de la era reformista.",
    fullDescription:
      "El asesinato de Alejandro II en 1881 cerró de manera violenta el ciclo de las grandes reformas. El zar reformador caía víctima del terrorismo revolucionario, revelando hasta qué punto la modernización rusa había generado nuevas fracturas en lugar de resolver las viejas. El acontecimiento condensó el dramatismo del siglo ruso que Dostoievski había narrado.",
    influenceOnWork:
      "Dostoievski murió ese mismo año, de modo que no desarrolló literariamente este hecho. Sin embargo, su obra final parece anticiparlo: la sensación de que Rusia entra en un tiempo de conflicto extremo entre reforma, violencia y vacío espiritual. Leído retrospectivamente, Karamázov aparece como un cierre inquietante para esa era.",
    relatedWorks: ["los-hermanos-karamazov", "los-demonios"],
    ...eventSources([ALEXANDER_II], [ALEXANDER_II, LATE_DOSTO]),
  },
];

export const TIMELINE_EVENT_MAP = Object.fromEntries(
  [...LIFE_EVENTS, ...CONTEXT_EVENTS].map((event) => [event.id, event]),
);
