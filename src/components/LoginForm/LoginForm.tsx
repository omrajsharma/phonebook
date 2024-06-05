import { useFormik, FormikConfig, FormikHelpers } from 'formik';
import toast from 'react-hot-toast';
import { Avatar, TextField, Grid, Box, Typography, Container } from '@mui/material/';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';

import { useAppDispatch, useAuth } from '../../hooks';
import { logIn } from '../../redux/auth/authOperations';
import { validationSchemaLogIn, IUserDataForLogIn } from '../../validationSchemas';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { authIsLoading } = useAuth();

  const handleSubmit = (
    values: IUserDataForLogIn,
    { resetForm }: FormikHelpers<IUserDataForLogIn>
  ) => {
    dispatch(logIn({ email: values.email, password: values.password }))
      .unwrap()
      .then(() => toast.success('You are successfully logged in'))
      .catch(() =>
        toast.error('Something went wrong...Try reloading the page and enter valid email, password')
      );

    resetForm();
  };

  const formikConfig: FormikConfig<IUserDataForLogIn> = {
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchemaLogIn,
    onSubmit: handleSubmit,
  };

  const formik = useFormik(formikConfig);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" mb={2}>
          Log in
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                type="email"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={authIsLoading}
          >
            Log in
          </LoadingButton>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
