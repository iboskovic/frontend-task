import { FieldAttributes, useField } from "formik";
import React from "react";
import styled from "styled-components";
import {
  colorError,
  colorPrimary,
  fontPoppins,
  white,
} from "../../pages/MainScreen";

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
      <Wrapper className="pos--rel">
        <Input
          type="text"
          {...field}
          {...props}
          className={`${props.className ?? "input input--base input--text"} ${
            errorText ? "input__border--error" : ""
          }`}
        />
      </Wrapper>

      <FieldValidation>{errorText ? errorText : ""}</FieldValidation>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const FieldValidation = styled.div`
  position: relative;
  margin-bottom: 8px;
  color: ${colorError};
  margin-top: 4px;
  min-height: 15px;
  font-size: 12px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-radius: 10px;
  background-color: ${colorPrimary};
  transition: all 100ms ease-out;
  padding: 10px 12px;
  color: ${white};
  font-family: ${fontPoppins};
  font-size: 16px;
  font-weight: 400;
`;

export default TextField;
