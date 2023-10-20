// import { Hero } from "../../components";
import { Box } from "@mui/material";
import TransactionMenu from "../../containers/TransactionsMenu";
import MainLayout from "../../layouts/MainLayout";

const Dashboard = () => {
  return (
    <MainLayout>
      <Box>
        <TransactionMenu />
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
