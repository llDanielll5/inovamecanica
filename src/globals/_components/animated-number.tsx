import { useEffect, useState } from "react";
import { Typography, TypographyOwnProps } from "@mui/material";
import { COLORS } from "../utils/colors";
import styled from "@emotion/styled";
import { WIDTH_BREAKPOINTS } from "../utils/constants";

interface AnimatedNumberProps {
  value: number;
  variant: any;
  duration?: number; // duração da animação em milissegundos
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 2000,
  variant,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setDisplayValue(Math.floor(progress * value));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <StyledText variant={variant} color="white">
      +{displayValue}%
    </StyledText>
  );
};

const StyledText = styled(Typography)`
  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    font-size: 18px;
  }
`;

export default AnimatedNumber;
