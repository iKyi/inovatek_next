import {
  Box,
  Button,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
const DarkTextField = styled(TextField)({
  "& label,& label.Mui-focused": {
    color: "#4F4F4F",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#4F4F4F",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#4F4F4F",
    },
    "&:hover fieldset": {
      borderColor: "#4F4F4F",
    },
  },
  "input,textarea": {
    color: "#4F4F4F",
  },
});

type FormValues = {
  name: string;
  email: string;
  message: string;
};
const schema = yup
  .object({
    name: yup.string().required("Numele este necesar"),
    email: yup.string().required("Emailul este necesar"),
    message: yup.string().required("Mesajul este necesar"),
  })
  .required();

interface ICereOfertaForm {
  inverted?: boolean;
  hideTitle?: boolean;
}
const CereOfertaForm: React.FC<ICereOfertaForm> = ({
  inverted,
  hideTitle = false,
}) => {
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
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const TextFieldComponent = inverted ? DarkTextField : TextField;

  return (
    <Box
      sx={{
        py: [2, 2, 4],
        px: [3, 3, 6],
        color: inverted ? "#333333" : undefined,
      }}
    >
      <form onSubmit={hookFormSubmit(onSubmit)}>
        {!hideTitle && (
          <Typography
            sx={{
              fontSize: [28, 28, 38],
              fontWeight: 600,
              mb: [3, 3, 5],
            }}
            component="div"
          >
            Solicita o oferta
          </Typography>
        )}

        <Stack spacing={2}>
          <Controller
            name={"name"}
            control={control}
            render={({ field }) => (
              <TextFieldComponent
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
              <TextFieldComponent
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
              <TextFieldComponent
                fullWidth
                multiline
                label={"Mesaj"}
                InputProps={{ ...field }}
                error={errors.message ? true : false}
                onBlur={field.onBlur}
                rows={3}
                helperText={<>{errors.message ? errors.message.message : ""}</>}
              />
            )}
          />
          <Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              // disabled={loading}
              size="large"
              sx={{
                width: 180,
                maxWidth: "100%",
              }}
            >
              Trimite
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default CereOfertaForm;
