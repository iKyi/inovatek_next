interface IHeaderMenuEntry {
  name: string;
  url: string;
}

const headerMenu: IHeaderMenuEntry[] = [
  {
    name: "Prima pagină",
    url: "/",
  },
  {
    name: "Ce sunt foliile inteligente?",
    url: "/companie",
  },
  {
    name: "Unde le pot folosi?",
    url: "/portofoliu",
  },
  {
    name: "Cât costă?",
    url: "/calculator",
  },
  {
    name: "Ce tipuri de folie exista?",
    url: "/produse",
  },
  // {
  //   name: "Servicii",
  //   url: "/servicii",
  // },
  // {
  //   name: "Blog",
  //   url: "/blog",
  // },
];

export default headerMenu;
