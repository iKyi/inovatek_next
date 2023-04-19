interface IHeaderMenuEntry {
  name: string;
  url: string;
}

const headerMenu: IHeaderMenuEntry[] = [
  {
    name: "Acasa",
    url: "/",
  },
  {
    name: "Produse",
    url: "/produse",
  },
  {
    name: "Calculator Pret",
    url: "/calculator",
  },
  {
    name: "Servicii",
    url: "/servicii",
  },
  {
    name: "Portofoliu",
    url: "/portofoliu",
  },
  {
    name: "Companie",
    url: "/companie",
  },
  {
    name: "Blog",
    url: "/blog",
  },
];

export default headerMenu;
