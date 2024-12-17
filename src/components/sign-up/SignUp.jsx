import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Controller,  useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


const SignUpchema = yup.object({
  firstName:yup.string().required('First name is required'),
  secondName:yup.string().required('Second name is required'),
  Email:yup.string().required('Email is required'),
  Password:yup.string().required('Password name is required'),

})

const SignUp = () => {
  const [showpassword, setshowpassword] = useState(false);
  const { control, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      firstName: "",
      secondName: "",
      Email: "",
      Password: "",
    },
    resolver: yupResolver(SignUpchema),
  });
console.log(errors, 'errors');

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Box className="container-fluid mt-5">
          <Box className="d-flex justify-content-around align-items-center flex-wrap">
            <Box>
             
            </Box>
              <Box>
              <Box className="text-start">
              <Typography variant="h5" >
                Get Start Shopping
              </Typography>
              <Typography variant="body2" className="mb-4">
                Welcome to FreshCart! Enter your email to get started.
              </Typography>
              </Box>
                <Controller
                
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                    error={errors?.firstName ? true : false}
                      {...field}
                      size="small"
                      className="my-2"
                      fullWidth
                      type="text"
                      placeholder=" First name"
                    />
                  )}
                />
                <Typography className="text-danger text-start">{errors?.firstName?.message}</Typography>
                <Controller
                  name="secondName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                    error={errors?.secondName ? true : false}
                      {...field}
                      size="small"
                      className="my-2"
                      fullWidth
                      type="text"
                      placeholder=" Second name"
                    />
                  )}
                />
                <Typography className="text-danger text-start">{errors?.secondName?.message}</Typography>
                <Controller
                  name="Email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                    error={errors?.Email ? true : false}
                      {...field}
                      size="small"
                      className="my-2"
                      fullWidth
                      type="email"
                      placeholder=" Email"
                    />
                  )}
                />
                <Typography className="text-danger text-start">{errors?.Email?.message}</Typography>
                <Controller
                  name="Password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                    error={errors?.Password ? true : false}
                      {...field}
                      size="small"
                      className="my-2"
                      fullWidth
                      type={showpassword ? "text" : "password"}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment
                              position="start"
                              onClick={() => setshowpassword(!showpassword)}
                            >
                              {showpassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </InputAdornment>
                          ),
                        },
                      }}
                      placeholder=" password"
                    />
                  )}
                />
                <Typography className="text-danger text-start">{errors?.Password?.message}</Typography>

                <Button  type="submit" size="small" fullWidth variant="contained"> Sign Up</Button>
              </Box>
            </Box>
          </Box>
      </form>
    </>
  );
};

export default SignUp;
