import { useState, useEffect } from "react";
import axios from "axios";
import Constants from "../../utilities/Constants";
import { useTheme } from "@material-ui/core";
import { tokens } from "../../theme";
export default function Brands() {
  const [brands, setBrands] = useState([]);
  const apiGetBrandsEndPoint = Constants.API_URL_GET_ALL_BRANDS;

  useEffect(() => {
    const getBrands = async () => {
      const { data: res } = await axios.get(apiGetBrandsEndPoint);
      setBrands(res);
    };
    getBrands();
  }, [apiGetBrandsEndPoint]);
  //Delete Vehicle from db(by id)

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div className="container ">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row ">
          <div
            className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: colors.primary[500] }}
          >
            <h2>
              <b>Brands Details</b>
            </h2>
          </div>
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred"></div>
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Brand Id</th>
                <th>Brand Name</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand.id}>
                  <td>{brand.id}</td>
                  <td>{brand.name}</td>

                  <td>
                    <button className="btn btn-danger btn-sm"> Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
