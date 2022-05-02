import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  addData,
  deleteData,
  checkedTodoSuccess,
  clearData,
  editData,
} from '../../redux/Actions/actionsInput';

const Yup = require('yup');

export default function DataTable() {
  const dispatch = useDispatch();
  const { rows } = useSelector((state) => ({ rows: state.rows }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const response = await axios.get('/products');
      console.log(response);
      const { products } = response.data.data;
      dispatch(clearData());
      products.forEach((elem) => {
        const productList = {
          name: elem.name,
          mpns: elem.mpns,
          category: elem.category,
          manufacturer: elem.category,
          available: elem.available,
          type: elem.type,
          owner: elem.owner,
          id: elem._id,
        };
        dispatch(addData(productList));
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 130,
      editable: true,
    },
    {
      field: 'mpns',
      headerName: 'MPNs',
      width: 130,
      editable: true,
      deletable: true,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 130,
      editable: true,
    },
    {
      field: 'manufacturer',
      headerName: 'Manufacturer',
      width: 130,
      editable: true,
    },
    {
      field: 'available',
      headerName: 'Avialable',
      type: 'number',
      width: 90,
      editable: true,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 130,
      editable: true,
    },
  ];

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [mpns, setMpns] = useState('');
  const [category, setCategory] = useState('');
  const [ids, setIds] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [available, setAvailable] = useState('');
  const [type, setType] = useState('');
  const checkedTodo = async (ids) => {
    setIds(ids);
    dispatch(checkedTodoSuccess(ids));
  };
  const submitValue = async () => {
    const inputList = {
      name,
      mpns,
      category,
      manufacturer,
      available,
      type,
      checked: false,
    };

    const yupObject = Yup.object().shape({
      name: Yup.string().required('required'),
      mpns: Yup.string().required('required'),
      category: Yup.string().required('required'),
      manufacturer: Yup.string().required('required'),
      available: Yup.number().required('required'),
      type: Yup.string().required('required'),
    });
    try {
      await yupObject.validate(inputList);
      const response = await axios('/products/add-products', {
        method: 'post',
        data: {
          name: inputList.name,
          mpns: inputList.mpns,
          category: inputList.category,
          manufacturer: inputList.manufacturer,
          available: inputList.available,
          type: inputList.type,
        },
      });
      console.log(response);
      const { _id } = response.data.data.newProduct;
      inputList.id = _id;
      toast.success('Item Added !', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setOpen(false);
      setName('');
      setMpns('');
      setCategory('');
      setManufacturer('');
      setAvailable('');
      setType('');
      dispatch(addData(inputList));
    } catch (error) {
      toast.error(' Please Fill out All Required Fields!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const saveCell = async (valueRow) => {
    try {
      await axios(`/products/${valueRow.id}/update-products`, {
        method: 'patch',
        data: {
          [valueRow.field]: valueRow.value,
        },
      });
      dispatch(editData(valueRow));
    } catch (error) {
      console.log(error, 'saveCell error');
    }
  };
  const deleteRow = async () => {
    try {
      await axios.delete(`/products/delete-products`, ids);
      dispatch(deleteData());
    } catch (err) {
      console.error(err);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        height: 1000,
        width: '100%',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        checkboxSelection
        onSelectionModelChange={checkedTodo}
        onCellEditCommit={saveCell}
        disableSelectionOnClick
      />
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Create
        </Button>
        <Button onClick={deleteRow}>Delete</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="name"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="mpns"
              label="mpns"
              type="text"
              fullWidth
              variant="standard"
              value={mpns}
              required
              onChange={(e) => setMpns(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="category"
              label="category"
              type="text"
              fullWidth
              variant="standard"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="manufacturer"
              label="manufacturer"
              type="text"
              fullWidth
              variant="standard"
              value={manufacturer}
              required
              onChange={(e) => setManufacturer(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="available"
              label="available"
              type="number"
              fullWidth
              variant="standard"
              value={available}
              required
              onChange={(e) => setAvailable(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="type"
              label="type"
              type="text"
              fullWidth
              variant="standard"
              value={type}
              required
              onChange={(e) => setType(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={submitValue}>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
