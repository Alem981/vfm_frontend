import { useState, useEffect } from "react";
import axios from "axios";
import Constants from "../../utilities/Constants";
import { useTheme } from "@material-ui/core";
import { tokens } from "../../theme";
export default function Models() {
  const [models, setModels] = useState([]);
  const apiGetModelsEndPoint = Constants.API_URL_GET_ALL_MODELS;

  useEffect(() => {
    const getModels = async () => {
      const { data: res } = await axios.get(apiGetModelsEndPoint);
      setModels(res);
    };
    getModels();
  }, [apiGetModelsEndPoint]);
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
              <b>Models Details</b>
            </h2>
          </div>
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred"></div>
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Model Id</th>
                <th>Model Name</th>
              </tr>
            </thead>
            <tbody>
           

              {models.map((model) => (
                <tr key={model.id}>
                  <td>{model.id}</td>
                  <td>{model.name}</td>

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
