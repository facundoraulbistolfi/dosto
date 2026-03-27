import { NOVELS as BASE_NOVELS, THEMES } from "./data.js";

const EXTRA_WORKS = [
  {
    id: "el-senor-projarchin",
    title: "El señor Projarchin",
    titleOrig: "Господин Прохарчин",
    year: 1846,
    pages: 70,
    chapters: 8,
    themes: [
      "sociedad",
      "psicologia",
      "soledad"
    ],
    desc: "La vida miserable de un pequeño empleado culmina en una revelación grotesca sobre la mezquindad, el miedo y la pobreza.",
    cover: "stairs",
    location: "San Petersburgo, Rusia",
    writtenContext: "Relato del primer período petersburgués de Dostoievski, concentrado en la pobreza, la paranoia y la degradación burocrática."
  },
  {
    id: "la-patrona",
    title: "La patrona",
    titleOrig: "Хозяйка",
    year: 1847,
    pages: 140,
    chapters: 10,
    themes: [
      "amor",
      "psicologia",
      "fe"
    ],
    desc: "Un joven intelectual cae bajo el hechizo de una mujer casada y de la figura oscura que la domina.",
    cover: "broken",
    location: "San Petersburgo, Rusia",
    writtenContext: "Novela corta temprana en la que Dostoievski mezcla romanticismo oscuro, obsesión erótica y sometimiento espiritual."
  },
  {
    id: "polzunkov",
    title: "Polzunkov",
    titleOrig: "Ползунков",
    year: 1847,
    pages: 45,
    chapters: 5,
    themes: [
      "sociedad",
      "psicologia"
    ],
    desc: "Sátira sobre un empleado humillado que intenta ascender en un mundo burocrático regido por la vanidad y la adulación.",
    cover: "letter",
    location: "San Petersburgo, Rusia",
    writtenContext: "Pieza breve cercana al primer Dostoievski gogoliano, volcada a la sátira de la oficina imperial."
  },
  {
    id: "la-novela-en-nueve-cartas",
    title: "La novela en nueve cartas",
    titleOrig: "Роман в девяти письмах",
    year: 1847,
    pages: 35,
    chapters: 9,
    themes: [
      "sociedad",
      "amor"
    ],
    desc: "Comedia epistolar de malentendidos, intrigas domésticas y pequeñas mezquindades.",
    cover: "letter",
    location: "Rusia",
    writtenContext: "Breve experimento epistolar en clave satírica y paródica."
  },
  {
    id: "un-corazon-debil",
    title: "Un corazón débil",
    titleOrig: "Слабое сердце",
    year: 1848,
    pages: 65,
    chapters: 7,
    themes: [
      "amor",
      "psicologia",
      "soledad"
    ],
    desc: "La felicidad amorosa resulta insoportable para un joven cuya fragilidad interior lo empuja a la ruptura.",
    cover: "broken",
    location: "San Petersburgo, Rusia",
    writtenContext: "Relato sobre sensibilidad extrema, ansiedad y derrumbe psíquico."
  },
  {
    id: "el-ladron-honrado",
    title: "El ladrón honrado",
    titleOrig: "Честный вор",
    year: 1848,
    pages: 40,
    chapters: 4,
    themes: [
      "sociedad",
      "redencion",
      "soledad"
    ],
    desc: "Un narrador recuerda a un ladrón miserable cuya degradación moral convive con un resto conmovedor de humanidad.",
    cover: "ring",
    location: "San Petersburgo, Rusia",
    writtenContext: "Cuento breve donde Dostoievski perfila ya su compasión por los humillados."
  },
  {
    id: "el-arbol-de-navidad-y-una-boda",
    title: "El árbol de Navidad y una boda",
    titleOrig: "Ёлка и свадьба",
    year: 1848,
    pages: 20,
    chapters: 3,
    themes: [
      "sociedad",
      "amor"
    ],
    desc: "Cuento satírico sobre el cálculo social y matrimonial observado en una fiesta infantil.",
    cover: "halo",
    location: "San Petersburgo, Rusia",
    writtenContext: "Pieza brevísima que combina ironía social y crítica al matrimonio por conveniencia."
  },
  {
    id: "un-pequeno-heroe",
    title: "Un pequeño héroe",
    titleOrig: "Маленький герой",
    year: 1849,
    pages: 85,
    chapters: 11,
    themes: [
      "amor",
      "identidad"
    ],
    desc: "Un niño vive un despertar sentimental y moral en medio de una atmósfera aristocrática y ambigua.",
    cover: "halo",
    location: "Casa de campo aristocrática, Rusia",
    writtenContext: "Escrito durante el encarcelamiento de Dostoievski antes del exilio siberiano."
  },
  {
    id: "el-sueno-del-tio",
    title: "El sueño del tío",
    titleOrig: "Дядюшкин сон",
    year: 1859,
    pages: 160,
    chapters: 14,
    themes: [
      "sociedad",
      "amor"
    ],
    desc: "Farsa de provincia sobre ambición matrimonial, manipulación y ridículo social.",
    cover: "mirror",
    location: "Mordásov, ciudad provincial ficticia",
    writtenContext: "Novela corta del regreso de Siberia, dominada por la caricatura social y la intriga doméstica."
  },
  {
    id: "la-aldea-de-stepanchikovo",
    title: "La aldea de Stepánchikovo y sus habitantes",
    titleOrig: "Село Степанчиково и его обитатели",
    year: 1859,
    pages: 340,
    chapters: 30,
    themes: [
      "sociedad",
      "familia",
      "psicologia"
    ],
    desc: "Comedia feroz sobre una familia sometida al tiránico e histriónico Fomá Fomich.",
    cover: "mirror",
    location: "Stepánchikovo, finca rural rusa",
    writtenContext: "Obra posterior al exilio que combina farsa, violencia moral y sátira doméstica."
  },
  {
    id: "memorias-de-la-casa-muerta",
    title: "Memorias de la casa muerta",
    titleOrig: "Записки из Мёртвого дома",
    year: 1861,
    pages: 420,
    chapters: 26,
    themes: [
      "sociedad",
      "redencion",
      "fe"
    ],
    desc: "Recreación literaria de la experiencia carcelaria en Siberia, entre presidio, humillación y revelación espiritual.",
    cover: "stairs",
    location: "Presidio de Omsk, Siberia",
    writtenContext: "Basada en los años de prisión de Dostoievski, es esencial para comprender su giro moral y religioso."
  },
  {
    id: "una-historia-desagradable",
    title: "Una historia desagradable",
    titleOrig: "Скверный анекдот",
    year: 1862,
    pages: 55,
    chapters: 6,
    themes: [
      "sociedad",
      "psicologia"
    ],
    desc: "Un alto funcionario liberal decide mezclarse con el pueblo y provoca un desastre grotesco y humillante.",
    cover: "double",
    location: "San Petersburgo, Rusia",
    writtenContext: "Sátira corrosiva sobre la filantropía autocomplaciente y la distancia entre ideas y realidad."
  },
  {
    id: "el-cocodrilo",
    title: "El cocodrilo",
    titleOrig: "Крокодил",
    year: 1865,
    pages: 45,
    chapters: 4,
    themes: [
      "sociedad",
      "politica",
      "psicologia"
    ],
    desc: "Sátira absurda en la que un funcionario es tragado por un cocodrilo y convierte su desgracia en teoría social.",
    cover: "flame",
    location: "Pasaje comercial de San Petersburgo",
    writtenContext: "Relato grotesco que ridiculiza la modernización hueca, la burocracia y ciertas modas intelectuales."
  },
  {
    id: "bobok",
    title: "Bobok",
    titleOrig: "Бобок",
    year: 1873,
    pages: 25,
    chapters: 3,
    themes: [
      "sociedad",
      "psicologia",
      "existencialismo"
    ],
    desc: "En un cementerio, un escritor escucha cómo los muertos siguen hablando y revelan su corrupción final.",
    cover: "flame",
    location: "Cementerio de San Petersburgo",
    writtenContext: "Cuento grotesco de Diario de un escritor, emblemático del humor negro metafísico del último Dostoievski."
  },
  {
    id: "la-mansa",
    title: "La mansa",
    titleOrig: "Кроткая",
    year: 1876,
    pages: 55,
    chapters: 5,
    themes: [
      "amor",
      "psicologia",
      "soledad"
    ],
    desc: "Monólogo de un prestamista que vela el cuerpo de su esposa suicida e intenta reconstruir, demasiado tarde, la lógica de su crueldad.",
    cover: "ring",
    location: "San Petersburgo, Rusia",
    writtenContext: "Una de las prosas más concentradas de Dostoievski, construida como confesión retrospectiva."
  },
  {
    id: "el-sueno-de-un-hombre-ridiculo",
    title: "El sueño de un hombre ridículo",
    titleOrig: "Сон смешного человека",
    year: 1877,
    pages: 35,
    chapters: 4,
    themes: [
      "redencion",
      "fe",
      "existencialismo"
    ],
    desc: "Un hombre decidido al suicidio sueña con otro mundo posible y despierta convertido por una verdad espiritual.",
    cover: "moon",
    location: "San Petersburgo y mundo soñado",
    writtenContext: "Relato filosófico tardío donde Dostoievski condensa caída, culpa y redención."
  }
];

export { THEMES };
export const NOVELS = [...BASE_NOVELS, ...EXTRA_WORKS];
