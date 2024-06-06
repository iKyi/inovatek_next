import CalculatorForm from "@/components/CalculatorPage/CalculatorForm";
import LayoutWrapper from "@/components/reusable/Layout/LayoutWrapper";
import { getStrapiMedia } from "@/lib/media";
import { GlobalContext } from "@/pages/_app";
import PageHeader from "@/components/reusable/Layout/PageHeader";
import MarkdownParser from "@/components/reusable/MarkdownParser";
import { SeoPropsType } from "@/components/reusable/Seo";
import client from "@/lib/apolloClient";
import { centerFlex } from "@/lib/theme/sxUtils";
import { gql } from "@apollo/client";
import { Add, DeleteForever, PieChart } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Card,
  CardMedia,
  CardActionArea,
  Container,
  Grid,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useContext, useMemo, useState, useRef } from "react";
import { fontSize } from "@mui/system";
import getStrapiFullImageData from "@/lib/getStrapiFullImageData";
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";
//import html2pdf from "html2pdf.js";
import { jsPDF, ImageFormat, ImageCompression } from "jspdf";
import html2canvas from "html2canvas";

function stringToRandomDarkHexColor(inputString: string) {
  let hash = 0;

  for (let i = 0; i < inputString.length; i++) {
    hash = (hash << 5) - hash + inputString.charCodeAt(i);
    hash |= 0;
  }

  let color = (hash & 0x00505050).toString(16).toUpperCase();

  return "#" + "00000".substring(0, 6 - color.length) + color;
}

const DarkTextField = styled(TextField)({
  "& label,& label.Mui-focused": {
    color: "#4F4F4F",
    borderBottomColor: "#E9E003",
  },
  "& .MuiInput-underline": {
    borderBottomColor: "#E9E003",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#E9E003",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E9E003",
    },
    "&:hover fieldset": {
      borderColor: "#E9E003",
    },
  },
  "input,textarea": {
    color: "#4F4F4F",
    fontSize: "0.9rem",
    borderColor: "#E9E003",
  },
});

interface ICalculatorPret {
  calculatorPageData: {
    introText?: string;
    seo: SeoPropsType["seo"];
    products: {
      nume: string;
      slug: string;
      order: number;
      pricePerSquareCm: number | null;
      pricePerElectricBox: number | null;
      images?: { data?: Record<any, any>[] };
    }[];
  };
}

export type IProductListingType = {
  id: string;
  type: string;
  name: string;
  squareCm: number;
  localName: string;
  pieces?: number;
  width?: number;
  height?: number;
};

const CalculatorPret: React.FC<ICalculatorPret> = ({ calculatorPageData }) => {
  const { seo, products, introText } = calculatorPageData;
  const [selectedProducts, setSelectedProducts] = useState<
    IProductListingType[]
  >([]);

  const tableRef = useRef(null);
  const { logoLight } = useContext(GlobalContext);
  const logoData = getStrapiFullImageData(logoLight);

  // Group products by pricePerElectricBox
  const pdlcFoilProducts = products.filter(
    (product) => product.pricePerElectricBox === 200
  );
  const transformersProducts = products.filter(
    (product) => product.pricePerElectricBox === 9999
  );
  const servicesProducts = products.filter(
    (product) => product.pricePerElectricBox === 1000
  );

  const productGroups = [
    { name: "Folie PDLC Inovatek Smart Film", products: pdlcFoilProducts },
    {
      name: "Transformatoare, surse de alimentare și accesorii",
      products: transformersProducts,
    },
    {
      name: "Manoperă, servicii de instalare și interținere",
      products: servicesProducts,
    },
  ];

  const addNewProductEntity = (type: string, name: string) => {
    const pdlcFoilCount = selectedProducts.filter(
      (product) =>
        products.find((item) => item.slug === product.type)
          ?.pricePerElectricBox === 200
    ).length;

    const transformersCount = selectedProducts.filter(
      (product) =>
        products.find((item) => item.slug === product.type)
          ?.pricePerElectricBox === 9999
    ).length;

    let localName = "";
    let squareCm = 0;
    let pieces = 0;
    const referenceItem = products.find((item) => item.slug === type);
    if (referenceItem) {
      if (referenceItem.pricePerElectricBox === 200) {
        localName = `Foaie Geam ${pdlcFoilCount + 1}`;
        squareCm = 1;
      } else if (referenceItem.pricePerElectricBox === 9999) {
        localName = `Transformator ${transformersCount + 1}`;
        pieces = 1;
      } else {
        localName = "Serviciu de instalare";
        pieces = totalSquareMeters;
      }
    }

    const newItem = {
      id: nanoid(),
      type,
      name,
      squareCm,
      pieces,
      localName,
      width: referenceItem?.pricePerElectricBox === 200 ? 750 : undefined,
      height: referenceItem?.pricePerElectricBox === 200 ? 1450 : undefined,
    };

    setSelectedProducts([...selectedProducts, newItem]);
  };

  const updateProductLocalName = (id: string, newName: string) => {
    const WorkingItems = [...selectedProducts];
    const workingItem = WorkingItems.find((item) => item.id === id);
    if (workingItem) {
      workingItem.localName = newName;
      setSelectedProducts(WorkingItems);
    }
  };
  const updateProductSquareCm = (id: string, newSquareCm: number) => {
    const WorkingItems = [...selectedProducts];
    const workingItem = WorkingItems.find((item) => item.id === id);
    if (workingItem) {
      workingItem.squareCm = newSquareCm;
      setSelectedProducts(WorkingItems);
    }
  };
  const updateProductPieces = (id: string, newPiece: number) => {
    const WorkingItems = [...selectedProducts];
    const workingItem = WorkingItems.find((item) => item.id === id);
    if (workingItem) {
      workingItem.pieces = newPiece;
      setSelectedProducts(WorkingItems);
    }
  };

  const updateProductWidth = (id: string, newWidth: number) => {
    const WorkingItems = [...selectedProducts];
    const workingItem = WorkingItems.find((item) => item.id === id);
    if (workingItem && workingItem.height) {
      workingItem.width = newWidth;
      workingItem.squareCm = (newWidth * workingItem.height) / 1000000;
      setSelectedProducts(WorkingItems);
    }
  };

  const updateProductHeight = (id: string, newHeight: number) => {
    const WorkingItems = [...selectedProducts];
    const workingItem = WorkingItems.find((item) => item.id === id);
    if (workingItem && workingItem.width) {
      workingItem.height = newHeight;
      workingItem.squareCm = (workingItem.width * newHeight) / 1000000;
      setSelectedProducts(WorkingItems);
    }
  };

  const deleteProductById = (id: string) => {
    setSelectedProducts(selectedProducts.filter((item) => item.id !== id));
  };

  const totalSquareMeters = useMemo(() => {
    return selectedProducts.reduce(
      (total, product) => total + product.squareCm,
      0
    );
  }, [selectedProducts]);

  const totalPrice = useMemo(() => {
    let total = 0;
    selectedProducts.forEach((product) => {
      const referenceItem = products.find((item) => item.slug === product.type);
      // total += (referenceItem?.pricePerSquareCm ?? 0) * product.squareCm;
      // //total += referenceItem?.pricePerElectricBox ?? 0;
      if (referenceItem) {
        if (referenceItem.pricePerElectricBox === 200) {
          total += (referenceItem.pricePerSquareCm ?? 0) * product.squareCm;
        } else if (referenceItem.pricePerElectricBox === 9999) {
          total +=
            (referenceItem.pricePerSquareCm ?? 0) * (product.pieces ?? 0);
        } else if (referenceItem.pricePerElectricBox === 1000) {
          total += (referenceItem.pricePerSquareCm ?? 0) * totalSquareMeters;
        }
      }
    });

    return total;
  }, [selectedProducts, products, totalSquareMeters]);

  return (
    <LayoutWrapper seo={seo ?? {}}>
      <Container>
        <PageHeader title={seo.metaTitle ?? "Calculator"} />
        {introText && (
          <Box
            sx={{
              my: 4,
            }}
          >
            <MarkdownParser>{introText}</MarkdownParser>
          </Box>
        )}
        <Grid container spacing={2}>
          {productGroups.map((group) => (
            <Accordion key={group.name} defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.5rem",
                    color: "#E9E003",
                  }}
                >
                  {group.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  {group.products.map((item) => {
                    const imageUrl = getStrapiMedia(item.images?.data?.[0]);
                    return (
                      <Grid
                        item
                        xs={12}
                        md={group.products.length > 1 ? 6 : 12}
                        lg={group.products.length > 1 ? 4 : 12}
                        key={item.slug}
                      >
                        <Card
                          elevation={2}
                          sx={{
                            backgroundColor: "black",
                          }}
                        >
                          <CardActionArea
                            onClick={() =>
                              addNewProductEntity(item.slug, item.nume)
                            }
                            sx={{
                              p: 1,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                mr: 3,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: 600,
                                }}
                              >
                                {item.nume}
                              </Typography>
                              <Typography sx={{ fontWeight: 300 }}>
                                Preț: €{item.pricePerSquareCm}
                                {item.pricePerElectricBox !== 9999 && (
                                  <>
                                    /m<sup>2</sup>
                                  </>
                                )}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "10px",
                                border: "1px solid #E9E003",
                                borderRadius: "12px",
                                color: "#E9E003",
                                textDecoration: "none",
                                fontWeight: 600,
                                fontSize: "0.9rem",
                                cursor: "pointer",
                              }}
                            >
                              <Add sx={{ marginRight: "5px" }} />
                              Adaugă
                            </Box>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
        <Box
          sx={{
            my: 5,
          }}
        >
          {selectedProducts.length > 0 ? (
            <TableContainer
              component={Paper}
              sx={{ backgroundColor: "#f5f5f5" }}
              id="calculator-table"
              ref={tableRef}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                  backgroundColor: "rgb(74, 74, 74)",
                }}
              >
                <Image
                  src={logoData?.url}
                  height={logoData?.height}
                  width={logoData?.width}
                  alt="inovatek logo"
                  priority
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                  }}
                >
                  <List>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <EmailIcon />
                      </ListItemIcon>
                      <Link href="mailto:hello@inovatek.ro" color="inherit">
                        hello@inovatek.ro
                      </Link>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <WhatsAppIcon />
                      </ListItemIcon>
                      <Link href="https://wa.me/40729055245" color="inherit">
                        +40729055245
                      </Link>
                    </ListItem>
                  </List>
                  <List>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <FacebookIcon />
                      </ListItemIcon>
                      <Link
                        href="https://www.facebook.com/InovatekRo"
                        color="inherit"
                      >
                        InovatekRo
                      </Link>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <InstagramIcon />
                      </ListItemIcon>
                      <Link
                        href="https://www.instagram.com/inovatekro"
                        color="inherit"
                      >
                        @inovatekro
                      </Link>
                    </ListItem>
                  </List>
                </Box>
              </Box>
              <Table sx={{ minWidth: 750 }} aria-label="tabel calcule">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "black" }}>Referință</TableCell>
                    <TableCell sx={{ color: "black", width: "30%" }}>
                      Suprafață totală {totalSquareMeters.toFixed(2)}m
                      <sup>2</sup>
                    </TableCell>
                    <TableCell sx={{ color: "black" }}>Produs</TableCell>
                    <TableCell sx={{ color: "black" }}>
                      Preț unitar/m<sup>2</sup>
                    </TableCell>
                    <TableCell sx={{ color: "black" }}>Preț total</TableCell>
                    <TableCell sx={{ color: "black" }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedProducts.map((item) => {
                    const productReference = products.find(
                      (produict) => produict.slug === item.type
                    );
                    const pricePerSquareCm =
                      productReference?.pricePerSquareCm ?? 0;
                    const pricePerElectricBox =
                      productReference?.pricePerElectricBox ?? 0;
                    return (
                      <TableRow key={item.id}>
                        <TableCell sx={{ color: "black" }}>
                          <DarkTextField
                            variant="standard"
                            value={item.localName}
                            onChange={(e) => {
                              updateProductLocalName(item.id, e.target.value);
                            }}
                            placeholder="Ex: Geam dormitor stanga ...."
                          />
                        </TableCell>
                        <TableCell sx={{ color: "black" }}>
                          {pricePerElectricBox === 200 && (
                            <>
                              <DarkTextField
                                variant="standard"
                                type="number"
                                value={item.width}
                                onChange={(e) => {
                                  updateProductWidth(
                                    item.id,
                                    Number(e.target.value)
                                  );
                                }}
                                label="Lățime (mm)"
                              />
                              <DarkTextField
                                variant="standard"
                                type="number"
                                value={item.height}
                                onChange={(e) => {
                                  updateProductHeight(
                                    item.id,
                                    Number(e.target.value)
                                  );
                                }}
                                label="Înălțime (mm)"
                              />
                            </>
                          )}
                          {pricePerElectricBox === 9999 && (
                            <DarkTextField
                              variant="standard"
                              type="number"
                              value={item.pieces}
                              onChange={(e) => {
                                updateProductPieces(
                                  item.id,
                                  Number(e.target.value)
                                );
                              }}
                              label="Bucați"
                            />
                          )}
                          {pricePerElectricBox === 1000 && (
                            <DarkTextField
                              variant="standard"
                              type="number"
                              value={totalSquareMeters.toFixed(2)}
                              InputProps={{
                                readOnly: true,
                              }}
                              onChange={(e) => {
                                updateProductPieces(
                                  item.id,
                                  Number(e.target.value)
                                );
                              }}
                              label="Suprafață totală m2"
                            />
                          )}
                        </TableCell>
                        <TableCell sx={{ color: "black" }}>
                          {item.name}
                        </TableCell>
                        <TableCell sx={{ color: "black" }}>
                          €{pricePerSquareCm.toFixed(2)}
                        </TableCell>
                        <TableCell sx={{ color: "black" }}>
                          €
                          {pricePerElectricBox === 200 &&
                            (pricePerSquareCm * item.squareCm).toFixed(2)}
                          {pricePerElectricBox === 9999 &&
                            (pricePerSquareCm * (item.pieces ?? 0)).toFixed(2)}
                          {pricePerElectricBox === 1000 &&
                            (pricePerSquareCm * totalSquareMeters).toFixed(2)}
                        </TableCell>
                        <TableCell sx={{ color: "black" }}>
                          <IconButton
                            onClick={() => deleteProductById(item.id)}
                            sx={{ color: "black" }}
                          >
                            <DeleteForever />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography
                        variant="body1"
                        sx={{ color: "black", fontSize: "0.8rem" }}
                      >
                        Această ofertă a fost generată la data de{" "}
                        {new Date().toLocaleString()}, iar prețurile sunt
                        valabile pentru 1 zi.
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "black", fontSize: "0.8rem" }}
                      >
                        La această ofertă se mai adauga un cost suplimentar de
                        7,5€/m2 pentru accesoriile de instalare.
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "black", fontSize: "0.8rem" }}
                      >
                        Aceasta nu este o ofertă finală, ci o estimare a
                        prețului. Pentru o ofertă exactă și detalii
                        suplimentare, vă rugăm să contactați echipa Inovatek la
                        adresa hello@inovatek.ro sau trimiteți-ne detaliile
                        făcând clic pe butonul `Cere ofertă` de mai jos.
                      </Typography>
                    </TableCell>
                    <TableCell colSpan={4}>
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: "200%",
                          textAlign: "right",
                          fontWeight: 600,
                        }}
                      >
                        Total fară TVA: €{totalPrice.toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          ) : (
            <Box
              sx={{
                p: 4,
                ...centerFlex,
                backgroundColor: "white",
                color: "black",
              }}
              component={Card}
              elevation={2}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 300,
                }}
              >
                Incepe prin a adauga produse din lista de mai sus.
              </Typography>
            </Box>
          )}
          <CalculatorForm currentItems={selectedProducts} />
        </Box>
      </Container>
    </LayoutWrapper>
  );
};

const getCalculatorPageData = async () => {
  try {
    const resp = await client.query({
      fetchPolicy: "no-cache",
      query: gql`
        query getCalculatorPageData {
          calculatorPage {
            data {
              attributes {
                introText
                seo {
                  metaTitle
                  metaDescription
                  shareImage {
                    data {
                      attributes {
                        url
                        height
                        width
                      }
                    }
                  }
                }
              }
            }
          }
          produses(pagination: { limit: 100 }) {
            data {
              attributes {
                nume
                slug
                order
                pricePerSquareCm
                pricePerElectricBox
                images {
                  data {
                    attributes {
                      url
                      height
                      width
                    }
                  }
                }
              }
            }
          }
        }
      `,
    });
    const Data = {
      ...resp.data.calculatorPage?.data?.attributes,
      products: resp.data.produses?.data
        .map((product: any) => {
          return product.attributes;
        })
        .sort(
          (a: { order: number }, b: { order: number }) => a.order - b.order
        ),
    };
    console.log(Data);
    return Data;
  } catch (err) {
    console.log(err);
  }
};

export async function getStaticProps(context: any) {
  const calculatorPageData = await getCalculatorPageData();
  return {
    props: {
      calculatorPageData: calculatorPageData ?? null,
    },
    revalidate: 30,
  };
}

export default CalculatorPret;
