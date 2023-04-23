import LayoutWrapper from "@/components/reusable/Layout/LayoutWrapper";
import PageHeader from "@/components/reusable/Layout/PageHeader";
import MarkdownParser from "@/components/reusable/MarkdownParser";
import { SeoPropsType } from "@/components/reusable/Seo";
import client from "@/lib/apolloClient";
import { centerFlex } from "@/lib/theme/sxUtils";
import { gql } from "@apollo/client";
import { Add, DeleteForever } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { nanoid } from "nanoid";
import { useMemo, useState } from "react";

function stringToRandomDarkHexColor(inputString: string) {
  let hash = 0;

  for (let i = 0; i < inputString.length; i++) {
    hash = (hash << 5) - hash + inputString.charCodeAt(i);
    hash |= 0;
  }

  let color = (hash & 0x00505050).toString(16).toUpperCase();

  return "#" + "00000".substring(0, 6 - color.length) + color;
}

interface ICalculatorPret {
  calculatorPageData: {
    introText?: string;
    seo: SeoPropsType["seo"];
    products: {
      nume: string;
      slug: string;
      pricePerSquareCm: number | null;
      pricePerElectricBox: number | null;
    }[];
  };
}

type IProductListingType = {
  id: string;
  type: string;
  name: string;
  squareCm: number;
  localName: string;
};

const CalculatorPret: React.FC<ICalculatorPret> = ({ calculatorPageData }) => {
  const { seo, products, introText } = calculatorPageData;
  const [selectedProducts, setSelectedProducts] = useState<
    IProductListingType[]
  >([]);

  const addNewProductEntity = (type: string, name: string) => {
    const newItem = {
      id: nanoid(),
      type,
      name,
      squareCm: 10,
      localName: "",
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
  const deleteProductById = (id: string) => {
    setSelectedProducts(selectedProducts.filter((item) => item.id !== id));
  };

  const totalPrice = useMemo(() => {
    let total = 0;
    selectedProducts.forEach((product) => {
      const referenceItem = products.find((item) => item.slug === product.type);
      total += (referenceItem?.pricePerSquareCm ?? 0) * product.squareCm;
      total += referenceItem?.pricePerElectricBox ?? 0;
    });

    return total;
  }, [selectedProducts,products]);

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
          {products.map((item) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={item.slug}>
                <Card
                  elevation={2}
                  sx={{
                    backgroundColor: stringToRandomDarkHexColor(item.slug),
                  }}
                >
                  <CardActionArea
                    onClick={() => addNewProductEntity(item.slug, item.nume)}
                    sx={{
                      p: 3,
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
                      <Typography>
                        Per cm patrat: {item.pricePerSquareCm} €
                      </Typography>
                      <Typography>
                        Per comutator: {item.pricePerElectricBox} €
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        fontSize: 50,
                      }}
                    >
                      <Add fontSize="inherit" />
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Box
          sx={{
            my: 5,
          }}
        >
          {selectedProducts.length > 0 ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 750 }} aria-label="tabel calcule">
                <TableHead>
                  <TableRow>
                    <TableCell>Nume de referinta</TableCell>
                    <TableCell>Marime cm2</TableCell>
                    <TableCell>Tip</TableCell>
                    <TableCell>Pret cm2</TableCell>
                    <TableCell>Pret commutator</TableCell>
                    <TableCell></TableCell>
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
                        <TableCell>
                          <TextField
                            variant="standard"
                            value={item.localName}
                            onChange={(e) => {
                              updateProductLocalName(item.id, e.target.value);
                            }}
                            placeholder="Ex: Geam dormitor stanga ...."
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            variant="standard"
                            type="number"
                            value={item.squareCm}
                            onChange={(e) => {
                              updateProductSquareCm(
                                item.id,
                                Number(e.target.value)
                              );
                            }}
                            placeholder="20"
                          />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{pricePerSquareCm}</TableCell>
                        <TableCell>{pricePerElectricBox}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => deleteProductById(item.id)}
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
                    <TableCell colSpan={6}>
                      <Typography
                        sx={{
                          color: "#fff",
                          fontSize: "200%",
                          textAlign: "right",
                        }}
                      >
                        Total: {totalPrice} €
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
              }}
              component={Card}
              elevation={2}
            >
              <Typography>Adauga produse pentru a calcula</Typography>
            </Box>
          )}
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
          produses {
            data {
              attributes {
                nume
                slug
                pricePerSquareCm
                pricePerElectricBox
              }
            }
          }
        }
      `,
    });
    const Data = {
      ...resp.data.calculatorPage?.data?.attributes,
      products: resp.data.produses?.data.map((product: any) => {
        return product.attributes;
      }),
    };
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
