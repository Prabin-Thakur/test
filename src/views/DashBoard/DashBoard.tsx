import React, { useState } from "react";
import "./DashBoard.scss";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Product } from "../../redux/fakeStoreApiSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  deleteProduct,
  addNewProduct,
  updateProduct,
} from "../../redux/fakeStoreSlice";
import Modal from "@mui/material/Modal";

const DashBoard: React.FC = () => {
  const fakeStoreData = useAppSelector((state) => state.fakeStore);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedDescription, setSelectedDescription] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpen(false);
    setSelectedName("");
    setSelectedDescription("");
    setSelectedPrice(0);
    setSelectedItem(null);
  };

  const handleAddItem = () => {
    if (!name || !description || !price) {
      alert("fill all items");
      return;
    }
    dispatch(
      addNewProduct({
        id: fakeStoreData[fakeStoreData.length - 1].id + 1,
        title: name,
        price: price,
        description: description,
        category: "men's clothing",
        image:
          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      })
    );
    alert("Added Item");
    setName("");
    setDescription("");
    setPrice(0);
  };

  const handleUpdateItem = async () => {
    if (!selectedName || !selectedDescription || !selectedPrice) {
      alert("fill all items");
      return;
    }
    if (selectedItem) {
      dispatch(
        updateProduct({
          id: selectedItem.id,
          title: selectedName,
          price: selectedPrice,
          description: selectedDescription,
          category: "men's clothing",
          image:
            "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        })
      );
    }
    alert("Item updated");
    handleClose();
  };

  const handleEditItem = (item: Product) => {
    setSelectedItem(item);
    setSelectedName(item.title);
    setSelectedDescription(item.description);
    setSelectedPrice(item.price);
    handleOpen();
  };

  return (
    <Container maxWidth="lg" className="dashboard-container">
      <Box my={3}>
        <Typography variant="h4">Items</Typography>
      </Box>
      <Box my={3}>
        <Typography variant="h5">Add Item</Typography>
        <Box display="flex" className="dashboard-add-items">
          <Box mr={2}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box mr={2}>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
          <Box mr={2}>
            <TextField
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </Box>
          <Box>
            <Button variant="contained" color="primary" onClick={handleAddItem}>
              Add
            </Button>
          </Box>
        </Box>
      </Box>
      <Box my={3}>
        <Typography variant="h5">Items List</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fakeStoreData?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        handleEditItem(item);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        dispatch(deleteProduct(item.id));
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-container"
      >
        <Box my={3} className="modal">
          <Typography variant="h5">Edit Item</Typography>
          <Box display="flex" className="modal-items">
            <Box mr={2}>
              <TextField
                label="Name"
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
              />
            </Box>
            <Box mr={2}>
              <TextField
                label="Description"
                value={selectedDescription}
                onChange={(e) => setSelectedDescription(e.target.value)}
              />
            </Box>
            <Box mr={2}>
              <TextField
                label="Price"
                type="number"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(parseFloat(e.target.value))}
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateItem}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};
export default DashBoard;
