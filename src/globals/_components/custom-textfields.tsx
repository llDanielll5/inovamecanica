import { forwardRef } from "react";
import { IMaskInput as IMask } from "react-imask";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const TextPhoneCustom = forwardRef<HTMLInputElement, CustomProps>(
  function TextPhoneCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMask
        {...other}
        mask={"(00) 00000-0000"}
        definitions={{
          "#": /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
      />
    );
  }
);

export const TextCepCustom = forwardRef<HTMLInputElement, CustomProps>(
  function TextCepCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMask
        {...other}
        mask={"00000-000"}
        definitions={{
          "#": /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
      />
    );
  }
);

export const TextCPFCustom = forwardRef<HTMLInputElement, CustomProps>(
  function TextCPFCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMask
        {...other}
        mask={"000.000.000-00"}
        definitions={{
          "#": /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
      />
    );
  }
);

export const TextHourCustom = forwardRef<HTMLInputElement, CustomProps>(
  function TextHourCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMask
        {...other}
        mask={"00:00"}
        definitions={{
          "#": /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
      />
    );
  }
);
