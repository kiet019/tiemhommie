import React from "react";
import { OrderAndOrderItem } from "../../../package/model/order";
import { TabPanel } from "@mui/lab";
import OrderTable from "./OrderTable";

const OrderTabItem = ({
  value,
  order,
}: {
  value: string;
  order: OrderAndOrderItem[] | null | undefined;
}) => {
  const filterOrder = order?.filter(
    (orderAndOrderItem) =>
      orderAndOrderItem.orderStatus.statusId === Number.parseInt(value)
  );
  return (
    <TabPanel
      value={value}
      sx={{
        padding: "3rem 0rem",
      }}
    >
      <OrderTable order={filterOrder?.reverse()} />
    </TabPanel>
  );
};

export default OrderTabItem;
