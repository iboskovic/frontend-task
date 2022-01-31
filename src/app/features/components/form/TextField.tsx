import { FieldAttributes, useField } from "formik";
import React from "react";

type TextFieldType = {
  min?: number;
  password?: boolean;
  className?: string;
} & FieldAttributes<{}>;

//const TextField: React.FC<TextFieldType> = ( { type, placeholder, id, disabled, min, onChange, ...props } ) =>
const TextField: React.FC<TextFieldType> = (props: any) => {
  const { password } = props;
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <>
      <div className="pos--rel">
        <input
          type="text"
          {...field}
          {...props}
          className={`${props.className ?? "input input--base input--text"} ${
            errorText ? "input__border--error" : ""
          }`}
        />
      </div>

      <div className="field__validation">{errorText ? errorText : ""}</div>
    </>
  );
};

export default TextField;
