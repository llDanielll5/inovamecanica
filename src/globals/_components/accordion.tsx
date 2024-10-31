import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  SxProps,
  Theme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface AccordionComponentProps {
  title: string;
  details: string;
  style?: SxProps<Theme>;
  titleStyle?: SxProps<Theme>;
  detailsStyle?: SxProps<Theme>;
}

const AccordionComponent = (props: AccordionComponentProps) => {
  const { details, title, style, detailsStyle, titleStyle } = props;
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Accordion sx={style} expanded={expanded} onChange={handleChange}>
      <AccordionSummary
        sx={titleStyle}
        expandIcon={
          expanded ? (
            <RemoveIcon sx={{ color: "#006DDB" }} />
          ) : (
            <AddIcon sx={{ color: "#006DDB" }} />
          )
        }
      >
        {title}
      </AccordionSummary>
      <AccordionDetails sx={detailsStyle}>{details}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionComponent;
