import { Form, FormikProvider, useFormik } from "formik";
import Nav from "../components/Nav";
import { IState, setPlayer } from "../players/slices/addPlayerSlice";
import * as Yup from "yup";
import TextField from "../components/form/TextField";
import styled from "styled-components";
import { colorPrimary, white } from "./MainScreen";
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
  console.log(state);

  return (
    <>
      <Nav />
      <div>
        <FormikProvider value={formik}>
          <Form>
            {/* <div>{JSON.stringify(formik.values)}</div> */}
            <div className="field">
              <label htmlFor="name" className="field__label">
                Name
              </label>
              <TextField name="name" id="name" placeholder="Enter your name" />
            </div>
            <div className="field">
              <label htmlFor="country" className="field__label">
                Country
              </label>
              <TextField
                name="country"
                id="country"
                placeholder="Enter your country"
              />
            </div>
            <div className="field">
              <label htmlFor="countryFlag" className="field__label">
                Country Flag
              </label>
              <input
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
            </div>
            <div className="field">
              <label htmlFor="nickname" className="field__label">
                Nickname
              </label>
              <TextField
                name="nickname"
                id="nickname"
                placeholder="Enter your nickname"
              />
            </div>
            <div className="field">
              <label htmlFor="photo" className="field__label">
                Photo
              </label>
              <input
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
            </div>
            <div className="field">
              <label htmlFor="totalEarnings" className="field__label">
                Total Earnings
              </label>
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
            <Button type="submit">Submit</Button>
          </Form>
        </FormikProvider>
      </div>
    </>
  );
};

const Button = styled.button`
  padding: 8px 24px;
  background-color: ${colorPrimary};
  color: ${white};
  font-weight: 700;
  align-self: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default AddPlayer;
