// components/CodeInput.tsx

import React, { useState, useRef } from "react";
import { TextField, Box, makeStyles } from "@mui/material";
import styled from "@emotion/styled";

interface CodeInputProps {
  length?: number; // Quantidade de dígitos
  onComplete: (code: string) => void; // Função callback quando o código estiver completo
}

const CodeInput: React.FC<CodeInputProps> = ({ length = 6, onComplete }) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return; // Ignora qualquer valor não numérico

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    // Move o foco para o próximo campo
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Verifica se o código está completo
    if (newValues.every((val) => val !== "")) {
      onComplete(newValues.join(""));
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <Box display="flex" gap={1} justifyContent="space-between" width={"100%"}>
      {values.map((value, index) => (
        <TextField
          key={index}
          inputRef={(el) => (inputsRef.current[index] = el)}
          value={value}
          onChange={(e) => handleChange(index, e.target.value.slice(-1))}
          onKeyDown={(e: any) => handleKeyDown(e, index)}
          variant="outlined"
          inputProps={{
            maxLength: 1,
            className: "recover-password-input",
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black", // Cor da borda normal
              },
            },
          }}
        />
      ))}
    </Box>
  );
};

export default CodeInput;
