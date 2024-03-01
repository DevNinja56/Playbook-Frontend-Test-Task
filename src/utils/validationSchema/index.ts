import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const SignInSchema = yupResolver(
  Yup.object().shape({
    email: Yup.string().required("Field is Required *").email(),
  })
);

export const SignUpSchema = yupResolver(
  Yup.object().shape({
    firstName: Yup.string().required("Field is Required *"),
    lastName: Yup.string().required("Field is Required *"),
    email: Yup.string().required("Field is Required *").email(),
  })
);
