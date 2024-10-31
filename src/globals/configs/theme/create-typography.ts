export const createTypography = () => {
  return {
    fontFamily: "Open Sans, sans-serif",
    body1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 200,
      lineHeight: 1.57,
    },
    button: {
      fontFamily: "Yantramanav, sans-serif",
      textTransform: "uppercase",
      fontWeight: 400,
      fontSize: "16px",
      letterSpacing: "1px",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 500,
      lineHeight: 1.66,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.57,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57,
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      letterSpacing: "0.5px",
      lineHeight: 2.5,
      textTransform: "uppercase",
    },
    h1: {
      fontFamily: "Yantramanav, sans-serif",
      fontWeight: 900,
      fontSize: "3.5rem",
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: "Yantramanav, sans-serif",
      fontWeight: 900,
      fontSize: "3rem",
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: "Yantramanav, sans-serif",
      fontWeight: 900,
      fontSize: "2.25rem",
      lineHeight: 1.2,
    },
    h4: {
      fontFamily: "Yantramanav, sans-serif",
      fontWeight: 900,
      fontSize: "2rem",
      lineHeight: 1.2,
    },
    h5: {
      fontFamily: "Yantramanav, sans-serif",
      fontWeight: 900,
      fontSize: "1.5rem",
      lineHeight: 1.2,
    },
    h6: {
      fontFamily: "Yantramanav, sans-serif",
      fontWeight: 900,
      fontSize: "1.125rem",
      lineHeight: 1.2,
    },
  };
};

declare module "@mui/material/styles" {
  interface TypographyVariants {
    // especial1: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    // especial1?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    // especial1: true;
  }
}
