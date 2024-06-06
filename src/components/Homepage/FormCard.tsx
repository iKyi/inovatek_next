import { useState } from "react";
import { Divider, Slider, Typography } from "@mui/material";

const FormCard: React.FC = () => {
  const [width, setWidth] = useState(700);
  const [height, setHeight] = useState(1450);

  const calculateSquareMeters = () => {
    const squareMeters = (width / 1000) * (height / 1000);
    const pdlcCost = squareMeters * 166;
    let transformerCost;

    if (squareMeters <= 2) {
      transformerCost = { cost: 52, wattage: 30 };
    } else if (squareMeters <= 7) {
      transformerCost = { cost: 65, wattage: 50 };
    } else if (squareMeters <= 14) {
      transformerCost = { cost: 91, wattage: 100 };
    } else {
      transformerCost = { cost: 118, wattage: 200 };
    }

    const installationCost = squareMeters * 31;
    const installationAccessoriesCost = squareMeters * 7.5;
    const totalCost =
      pdlcCost +
      transformerCost.cost +
      installationCost +
      installationAccessoriesCost;

    return {
      squareMeters,
      pdlcCost,
      transformerCost,
      installationCost,
      installationAccessoriesCost,
      totalCost,
    };
  };

  const results = calculateSquareMeters();
  return (
    <div>
      <Typography
        variant="h2"
        sx={{
          fontSize: [24, 24, 40],
          marginBottom: "20px", // Add margin bottom here
        }}
        component="div"
      >
        Calculator Estimativ
      </Typography>
      <Typography id="width-slider" gutterBottom>
        Lățime: {width} mm
      </Typography>
      <Slider
        value={width}
        onChange={(event, newValue) => setWidth(newValue as number)}
        aria-labelledby="width-slider"
        min={0}
        max={5000}
        step={50}
      />
      <Typography id="height-slider" gutterBottom>
        Înălțime: {height} mm
      </Typography>
      <Slider
        value={height}
        onChange={(event, newValue) => setHeight(newValue as number)}
        aria-labelledby="height-slider"
        min={0}
        max={5000}
        step={50}
      />
      <div id="results">
        <Typography gutterBottom>
          Suprafață totală:{" "}
          <strong>
            {results.squareMeters.toFixed(2)} (m<sup>2</sup>)
          </strong>
        </Typography>
        <Typography gutterBottom>
          Cost total folie inteligentă cu transparența 84% tehnologie premium
          HTCN: <strong>€{results.pdlcCost.toFixed(2)}</strong>
        </Typography>

        <Typography gutterBottom>
          Cost transformator alimentare:{" "}
          <strong>
            €{results.transformerCost.cost.toFixed(2)} (
            {results.transformerCost.wattage}W)
          </strong>
        </Typography>
        <Typography gutterBottom>
          Accesorii de instalare:{" "}
          <strong>€{results.installationAccessoriesCost.toFixed(2)}</strong>
        </Typography>
        <Typography gutterBottom>
          Serviciul de instalare:{" "}
          <strong>€{results.installationCost.toFixed(2)}</strong>
        </Typography>
        <Divider />
        <hr />
        <Typography gutterBottom>
          <span style={{ textAlign: "right", fontWeight: "bold" }}>
            Total general: €{results.totalCost.toFixed(2)} fără TVA
          </span>
        </Typography>
        <br />
      </div>
    </div>
  );
};

export default FormCard;
