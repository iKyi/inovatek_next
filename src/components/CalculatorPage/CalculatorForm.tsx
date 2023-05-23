import { IProductListingType } from "@/pages/calculator";
import { Box } from "@mui/material";

interface ICalculatorForm {
  currentItems: IProductListingType[];
}
const CalculatorForm: React.FC<ICalculatorForm> = ({ currentItems }) => {
  return <Box></Box>;
};

export default CalculatorForm;
