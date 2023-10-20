import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { CustomButton, Text } from "..";
import { TransactionProps } from "../../interface";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { Select, MenuItem } from "@mui/material";

const EditDataForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [xRequestId, setXRequestId] = useState("");
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const XRequestId = uuidv4();
        setXRequestId(XRequestId);
        const response = await fetch(
          `http://localhost:3000/api/v1/wallet/transactions/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-request-id": xRequestId,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setInitialData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (formData: TransactionProps) => {
    try {
      const XRequestId = uuidv4();
      setXRequestId(XRequestId);
      const response = await fetch(
        `http://localhost:3000/api/v1/wallet/transactions/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-request-id": XRequestId,
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      navigate("/main-menu");

      console.log("Data updated successfully!");
      console.log({ data: formData });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const initialValues: TransactionProps = initialData || {
    transaction_id: parseInt(`${id}`),
    type: "credit",
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
      <Text text="Edit Data" variant="h3" />
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
            Update Data
          </CustomButton>
        </Box>
      </form>
    </>
  );
};

export default EditDataForm;
