import { useFormik, FormikConfig, FormikHelpers } from 'formik';
import toast from 'react-hot-toast';

import { Box, Modal, Grid, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import EditIcon from '@mui/icons-material/Edit';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectIsLoading } from '../../redux/contacts/contactsSelectors';
import { updateContact } from '../../redux/contacts/contactsOperations';
import { validationSchemaAddContact, IContactData } from '../../validationSchemas';

interface IEditModalProps {
  isOpen: boolean;
  id: string;
  name: string;
  number: string;
  handleClose: () => void;
}

const styledModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '100%', sm: '400px' },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditModal: React.FC<IEditModalProps> = ({ isOpen, handleClose, id, name, number }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const handleSubmit = (values: IContactData, { resetForm }: FormikHelpers<IContactData>) => {
    if (
      name.trim().toLowerCase() === values.name.trim().toLowerCase() &&
      number === values.number
    ) {
      toast.error('The same values');
      return;
    }

    dispatch(updateContact({ id, name: values.name, number: values.number }))
      .unwrap()
      .then(() => {
        toast.success('Contact edited!');
        handleClose();
      })
      .catch(() => toast.error('Something went wrong...Try reloading the page'));
    resetForm();
  };

  const formikConfig: FormikConfig<IContactData> = {
    initialValues: {
      name,
      number,
    },
    validationSchema: validationSchemaAddContact,
    onSubmit: handleSubmit,
  };

  const formik = useFormik(formikConfig);

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-edit-contact"
        aria-describedby="modal-edit-contact"
      >
        <Box sx={styledModal}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="tel"
                  required
                  fullWidth
                  id="number"
                  label="Number"
                  name="number"
                  value={formik.values.number}
                  onChange={formik.handleChange}
                  error={formik.touched.number && Boolean(formik.errors.number)}
                  helperText={formik.touched.number && formik.errors.number}
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isLoading}
              loadingPosition="end"
              endIcon={<EditIcon />}
            >
              Edit
            </LoadingButton>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditModal;
