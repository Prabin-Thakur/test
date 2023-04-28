import { useEffect } from "react";
import { fakeStoreApi } from "./redux/fakeStoreApiSlice";
import { useAppDispatch } from "./redux/hooks";
import { populateFakeStore } from "./redux/fakeStoreSlice";

function Initialize() {
  const { data, isFetching } = fakeStoreApi.useGetProductsQuery();
  const dispatch = useAppDispatch();
  // const [addProduct] = fakeStoreApi.useAddProductMutation();
  // const [updateProduct] = fakeStoreApi.useUpdateProductMutation();
  // const [deleteProduct] = fakeStoreApi.useDeleteProductMutation();

  useEffect(() => {
    if (data && !isFetching) {
      dispatch(populateFakeStore(data));
    }
  }, [data, dispatch, isFetching]);

  return;
}

export default Initialize;
