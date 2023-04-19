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
