import { useState, useMemo } from "react";
import "./Home.scss";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { Product } from "../../redux/fakeStoreApiSlice";
import { Grid, Card, CardHeader, CardMedia, CardContent } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";

const Home: React.FC = () => {
  const fakeStoreData = useAppSelector((state) => state.fakeStore);
  const [page, setPage] = useState<number>(1);

  const itemsPerPage = 3;

  const currentItems: Product[] | [] = useMemo(() => {
    // Calculate the index of the first and last items on the current page
    const lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    // Slice the items array to get the items for the current page
    return fakeStoreData?.slice(firstIndex, lastIndex);
  }, [fakeStoreData, page]);

  return (
    <div className="home-container">
      <div className="home-card-container">
        <h1>Products</h1>
        <div className="home-card-items">
          {currentItems?.length === 0 ? (
            <div className="progress">
              <CircularProgress />
            </div>
          ) : (
            <Grid container spacing={4}>
              {currentItems?.map((product) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={product.id}
                  className="card-container"
                >
                  <Card className="card">
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.title}
                      className="card-image"
                    />
                    <CardHeader title={product.title} className="card-title" />

                    <CardContent>
                      <p className="card-description">{product.description}</p>
                      <p className="card-price">${product.price}</p>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </div>

      <div className="pagination">
        <Pagination
          shape="rounded"
          variant="outlined"
          sx={{
            "& .MuiPaginationItem-root": {
              fontSize: "1.1rem",
            },
          }}
          count={
            fakeStoreData && Math.ceil(fakeStoreData?.length / itemsPerPage)
          }
          onChange={(event, page) => {
            setPage(page);
          }}
          page={page}
        />
      </div>
    </div>
  );
};

export default Home;
