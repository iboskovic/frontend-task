import { Form, FormikProvider, useFormik } from "formik";
import Nav from "../components/Nav";
import { IState, setPlayer } from "../players/slices/addPlayerSlice";
import * as Yup from "yup";
import TextField from "../components/form/TextField";
import styled from "styled-components";
import {
  colorBtnPrimary,
  colorError,
  colorPrimary,
  fontBebas,
  fontPoppins,
  white,
} from "./MainScreen";
import { useAppDispatch, useAppSelector } from "../../hooks";
import toastService from "../../../services/toastService";
import { useHistory } from "react-router-dom";
import { ChangeEvent } from "react";

const initialValues: IState = {
  name: "",
  country: "",
  countryFlag: "",
  nickname: "",
  photo: "",
  totalEarnings: 0,
};

const AddPlayer = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.addPlayer);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => handleSubmit(values),
    validateOnBlur: true,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("This field is required"),
      country: Yup.string().required("This field is required"),
      countryFlag: Yup.mixed().required("This field is required"),
      nickname: Yup.string().required("This field is required"),
      photo: Yup.mixed().required("This field is required"),
      totalEarnings: Yup.number()
        .required("This field is required")
        .min(1, "This field is required"),
    }),
  });

  const handleSubmit = (values: IState) => {
    let playerObj = {
      name: values.name,
      country: values.country,
      countryFlag: values.countryFlag,
      nickname: values.nickname,
      photo: values.photo,
      totalEarnings: values.totalEarnings,
    };
    dispatch(setPlayer(playerObj));

    toastService.success("Player created");
    // will console log after the submit
    console.log(playerObj);
    history.push("/");
  };

  return (
    <>
      <Nav />
      <Button onClick={() => history.push("/")}>Back</Button>
      <TitlePrimary>Add new player</TitlePrimary>
      <FlexCenter>
        <FormikProvider value={formik}>
          <Form>
            {/* <div>{JSON.stringify(formik.values)}</div> */}
            <div className="field">
              <Label htmlFor="name" className="field__label">
                Name
              </Label>
              <TextField name="name" id="name" placeholder="Enter your name" />
            </div>
            <div className="field">
              <Label htmlFor="country" className="field__label">
                Country
              </Label>
              <TextField
                name="country"
                id="country"
                placeholder="Enter your country"
              />
            </div>
            <div className="field">
              <Label htmlFor="nickname" className="field__label">
                Nickname
              </Label>
              <TextField
                name="nickname"
                id="nickname"
                placeholder="Enter your nickname"
              />
            </div>
            <div className="field">
              <Label htmlFor="totalEarnings" className="field__label">
                Total Earnings
              </Label>
              <TextField
                type="number"
                value={
                  formik.values.totalEarnings === 0
                    ? ""
                    : formik.values.totalEarnings
                }
                name="totalEarnings"
                id="totalEarnings"
                placeholder="Total earnings"
              />
            </div>
            <Flex>
              <div className="field" style={{ width: "50%" }}>
                <UploadLabel htmlFor="photo" className="field__label">
                  Photo
                </UploadLabel>
                <InputFileLabel
                  htmlFor="photo"
                  className="field__label"
                ></InputFileLabel>
                <>
                  <InputFile
                    type="file"
                    name="photo"
                    id="photo"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      formik.setFieldValue(
                        "photo",
                        e.target.files ? e.target.files[0].name : ""
                      )
                    }
                  />
                  <FieldValidation>
                    {formik.errors.photo ? formik.errors.photo : ""}
                  </FieldValidation>
                </>
              </div>
              <div
                className="field"
                style={{ width: "50%", marginLeft: "40px" }}
              >
                <UploadLabel htmlFor="countryFlag" className="field__label">
                  Country Flag
                </UploadLabel>
                <InputFileLabel
                  htmlFor="countryFlag"
                  className="field__label"
                ></InputFileLabel>
                <>
                  <InputFile
                    type="file"
                    name="countryFlag"
                    id="countryFlag"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      formik.setFieldValue(
                        "countryFlag",
                        e.target.files ? e.target.files[0].name : ""
                      )
                    }
                  />
                  <FieldValidation>
                    {formik.errors.countryFlag ? formik.errors.countryFlag : ""}
                  </FieldValidation>
                </>
              </div>
            </Flex>
            <FlexCenter>
              <ButtonSubmit type="submit">Add player</ButtonSubmit>
            </FlexCenter>
          </Form>
        </FormikProvider>
      </FlexCenter>
    </>
  );
};

const Flex = styled.div`
  display: flex;
`;

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 12px 24px;
  background: transparent;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: ${fontPoppins}
  font-weight: 400;
  &:hover {
      opacity: 0.7
  }
  margin-top: 80px;
  margin-bottom: 80px;
  margin-left: 165px;
  color: #fbd300;
  border: 2px solid #fbd300;
`;

const ButtonSubmit = styled.button`
  padding: 12px 24px;
  background: ${colorBtnPrimary};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: ${fontPoppins}
  font-weight: 400;
  &:hover {
      opacity: 0.7
  }
  margin-bottom: 80px;
  margin-top: 40px;
`;

const TitlePrimary = styled.div`
  font-family: ${fontBebas};
  font-size: 80px;
  font-weight: 400;
  color: ${white};
  text-align: center;
  margin-bottom: 80px;
`;

const Label = styled.label`
  font-size: 24px;
  font-family: ${fontBebas};
  font-weight: 400;
  color: ${white};
`;

const InputFile = styled.input``;

const InputFileLabel = styled.label`
  width: 160px;
  height: 160px;
  background-color: ${colorPrimary};
  border-radius: 1000px;
`;

const UploadLabel = styled.label`
  font-size: 24px;
  font-family: ${fontBebas};
  font-weight: 400;
  color: ${white};
  text-align: center;
`;

const FieldValidation = styled.div`
  position: relative;
  margin-bottom: 8px;
  color: ${colorError};
  margin-top: 4px;
  min-height: 15px;
  font-size: 12px;
  text-align: center;
`;

export default AddPlayer;
