import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { CustomButton, Text } from "..";
import { TransactionProps } from "../../interface";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Select, MenuItem } from "@mui/material";

const AddDataForm = () => {
  const navigate = useNavigate();
  const [xRequestId, setXRequestId] = useState("");
  const handleSubmit = async (formData: TransactionProps) => {
    try {
      const XRequestId = uuidv4();
      setXRequestId(XRequestId);
      const response = await fetch(
        "http://localhost:3000/api/v1/wallet/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-request-id": xRequestId,
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add data");
      }

      navigate("/main-menu");

      console.log("Data added successfully!");
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };
  const initialValues: TransactionProps = {
    transaction_id: 0,
    type: "",
    amount: 0,
  };

  const validationSchema = Yup.object({
    type: Yup.string().required("Type is required"),
    amount: Yup.number()
      .typeError("Amount must be a number")
      .required("Amount is required")
      .positive("Amount must be positive")
      .integer("Amount must be an integer"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Text text="Add Data" variant="h3" />
      <form onSubmit={formik.handleSubmit}>
        <Select
          fullWidth
          label="Type"
          variant="outlined"
          margin="dense"
          {...formik.getFieldProps("type")}
          error={formik.touched.type && Boolean(formik.errors.type)}
        >
          <MenuItem value="credit">Credit</MenuItem>
          <MenuItem value="debit">Debit</MenuItem>
        </Select>
        <TextField
          fullWidth
          label="Amount"
          variant="outlined"
          margin="normal"
          {...formik.getFieldProps("amount")}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={3}
        >
          <CustomButton
            type="submit"
            color="primary"
            variant="contained"
            disabled={!formik.isValid}
          >
            Add Data
          </CustomButton>
        </Box>
      </form>
    </>
  );
};

export default AddDataForm;
