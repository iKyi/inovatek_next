import { IProductListingType } from "@/pages/calculator";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useForm as useFormSpreeForm } from "@formspree/react";
import { useContext, useState } from "react";
import { GlobalContext } from "@/pages/_app";
import { Stack } from "@mui/system";

type FormValues = {
  name: string;
  email: string;
  message: string;
  selectedProducts: string;
};
const schema = yup
  .object({
    name: yup.string().required("Numele este necesar"),
    email: yup.string().required("Emailul este necesar"),
    message: yup.string().required("Mesajul este necesar"),
  })
  .required();

interface ICalculatorForm {
  currentItems: IProductListingType[];
}
const CalculatorForm: React.FC<ICalculatorForm> = ({ currentItems }) => {
  const [show, setShow] = useState<boolean>(false);
  const { messageSentText } = useContext(GlobalContext);

  const {
    handleSubmit: hookFormSubmit,
    control,
    formState: { errors },
    setValue,
    setError,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      message: "",
      name: "",
      selectedProducts: "",
    },
  });

  const [state, handleSubmit] = useFormSpreeForm("mwkjjead");

  const { submitting, succeeded } = state ?? {};

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    data.selectedProducts = currentItems
      .map((item) => {
        return `${item.localName ?? ""}|${item.type}|${item.squareCm}`;
      })
      .join(";");

    handleSubmit(data);
  };

  if (currentItems.length === 0) return null;
  if (currentItems.length > 0 && !show)
    return (
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => setShow(true)}
        >
          Cere oferta pentru {currentItems.length} produse
        </Button>
      </Box>
    );
  return (
    <Box
      sx={{
        my: [3, 3, 5],
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontSize: [22, 22, 26],
          fontWeight: 600,
          mb: [3, 3, 5],
        }}
        component="div"
      >
        Solicitare oferta {currentItems.length} folii
      </Typography>

      {succeeded ? (
        <Alert variant="filled" severity="success" sx={{ color: "#fff" }}>
          {messageSentText}
        </Alert>
      ) : (
        <form onSubmit={hookFormSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name={"name"}
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label={"Nume"}
                  InputProps={{ ...field }}
                  error={errors.name ? true : false}
                  onBlur={field.onBlur}
                  helperText={<>{errors.name ? errors.name.message : ""}</>}
                />
              )}
            />
            <Controller
              name={"email"}
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label={"Email"}
                  type="email"
                  InputProps={{ ...field }}
                  error={errors.email ? true : false}
                  onBlur={field.onBlur}
                  helperText={<>{errors.email ? errors.email.message : ""}</>}
                />
              )}
            />
            <Controller
              name={"message"}
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  multiline
                  label={"Mesaj"}
                  InputProps={{ ...field }}
                  error={errors.message ? true : false}
                  onBlur={field.onBlur}
                  rows={3}
                  helperText={
                    <>{errors.message ? errors.message.message : ""}</>
                  }
                />
              )}
            />
            <Box>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={submitting}
                size="large"
                sx={{
                  width: 180,
                  maxWidth: "100%",
                }}
              >
                Trimite
              </Button>
            </Box>
            <Stack
              spacing={2}
              sx={{
                mt: 2,
                fontSize: [18, 18, 22],
              }}
            >
              <Typography variant="h3" sx={{ fontSize: "inherit" }}>
                Detaliile foliilor selectate vor fi atașate mesajului.
              </Typography>
              <Typography variant="h3" sx={{ fontSize: "inherit" }}>
                Vă rugăm să completați acest formular și un membru al echipei
                Inovatek vă va contacta în scurt timp. Mulțumim.
              </Typography>
            </Stack>
          </Stack>
        </form>
      )}
    </Box>
  );
};

export default CalculatorForm;
