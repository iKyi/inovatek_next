interface IHeaderMenuEntry {
  name: string;
  url: string;
}

const headerMenu: IHeaderMenuEntry[] = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Despre folia inteligentă",
    url: "/companie",
  },
  {
    name: "Produse",
    url: "/produse",
  },
  {
    name: "Aplicații",
    url: "/portofoliu",
  },
  {
    name: "Calculator preț",
    url: "/calculator",
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
