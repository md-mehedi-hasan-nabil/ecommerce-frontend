import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import Loader from "../../components/Loader/Loader";
import { useGetOrdersQuery } from "../../features/order/orderApi";
import { Accordion } from "flowbite-react";

export default function Order() {
  const { user } = useFirebaseAuth();
  const {
    isSuccess: isSuccessFetchOrders,
    data: orders,
    isLoading: isLoadingFetchOrders, 
  } = useGetOrdersQuery(user?.email ? user.email : undefined);

  if (isLoadingFetchOrders) {
    return <Loader />;
  }

  document.title = "Order Page";

  return (
    <div className="mt-5">
      <Accordion>
        {isSuccessFetchOrders && orders.length > 0 ? (
          orders.map((order) => (
            <Accordion.Panel key={order?._id}>
              <Accordion.Title>
                <p>
                  Your Order ID: {order?._id} ({order?.cart?.length} items)
                </p>
              </Accordion.Title>
              <Accordion.Content>
                <div className="grid grid-cols-12 gap-6">
                  {order?.cart?.length > 0 &&
                    order?.cart?.map((item) => (
                      <div
                        key={item?._id}
                        className="col-span-6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                      >
                        <>
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {item?.product?.title}
                          </h5>
                        </>
                        <img
                          draggable={false}
                          className="w-1/5 my-3"
                          src={item?.product?.thumbnail}
                          alt={item?.product?.title}
                        />
                        <p className="mb-3 font-normal text-gray-700">
                          {item.email}
                        </p>
                        <p className="mb-3 font-medium text-gray-700">
                          Total product: {item?.quantity}
                        </p>
                        <p className="mb-3 font-medium text-gray-700">
                          Total price: ৳ {item?.price}
                        </p>
                      </div>
                    ))}
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          ))
        ) : (
          <h2>No order</h2>
        )}
      </Accordion>
    </div>
  );
}
