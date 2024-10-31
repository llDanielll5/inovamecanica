import { Box, styled, Typography } from "@mui/material";
import { COLORS } from "../utils/colors";

export const ColoredLine = styled(Box)`
  background: linear-gradient(
    to right,
    #ffff4a 0,
    #fcd000 4%,
    #ffc112 8% 11%,
    #ff8a00 16%,
    #ff5f5f,
    #ff253a 28%,
    #ff37a8 37%,
    #c739ff 49%,
    #a400e1 56%,
    #2eceff 72%,
    #0086ff 80%,
    #72f772 94%,
    #00d604
  );
  height: 5px;
  width: 100%;
`;

export const GoldenLine = styled(Box)`
  background: linear-gradient(
    90deg,
    #deb25f 10%,
    ${COLORS.GOLD} 20.85%,
    goldenrod 50%,
    #deb25f 82.56%
  );
  height: 5px;
  width: 100%;
  background-size: 500% auto;
  animation: 1.5s ease-in-out infinite alternate brilho;
`;

export const StyledRainbowText = styled(Typography)`
  background: linear-gradient(
    to right,
    #ffff4a 0,
    #fcd000 4%,
    #ffc112 8% 11%,
    #ff8a00 16%,
    #ff5f5f,
    #ff253a 28%,
    #ff37a8 37%,
    #c739ff 49%,
    #a400e1 56%,
    #2eceff 72%,
    #0086ff 80%,
    #72f772 94%,
    #00d604
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const GreyLine = styled(Box)`
  background-color: ${({ theme }) => theme.palette.grey[300]};
  height: 5px;
  width: 100%;
`;

export const SeeAllText = styled("a")`
  margin-left: 20px;
  flex-shrink: 0;
  font-weight: var(--text-font-bolder-weight);
  color: var(--accent-color);
  cursor: pointer;

  svg {
    display: none;
  }

  @media screen and (min-width: 641px) {
    transform: translate(26px);
    transition: transform 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);

    svg {
      position: relative;
      display: inline-block;
      height: 14px;
      width: 14px;
      vertical-align: -2px;
      margin-left: 8px;
      right: -5px;
      opacity: 0;
      transition: all 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
  @media (-moz-touch-enabled: 0), (hover: hover) {
    :hover {
      transform: translate(0);
      svg {
        opacity: 1;
        right: 0;
      }
    }
  }
`;
