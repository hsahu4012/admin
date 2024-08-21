import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Settingslist = () => {
  const [setting, setSetting] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}settings/allsettings`
      );
      setSetting(response.data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    console.log(id, "hii");
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this setting?"
      );
      if (confirmed) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}settings/removesetting/${id}`
        );

        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2 className="w-100 d-flex justify-content-center p-3"> Settings List</h2>
      <div className="row">
        <div className="col-md-12">
          <p>
            <Link to="/settingCreate" className="btn btn-warning">
              Add Setting
            </Link>
          </p>
          <table className="table table-striped table-white">
            <thead>
              <tr>
                <th>SrNo</th>
                <th>Setting Id</th>
                <th>Setting Name</th>
                <th>Setting Value</th>
                {/* <th>IsActive</th> */}
                <th>Action</th>
                
              </tr>
            </thead>
            <tbody>
              {setting.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{item.setting_id}</td>
                    <td>{item.setting_name}</td>
                    <td>{item.setting_value}</td>

                    {/* <td>{item.isactive}</td> */}
                    
                    <td className="now">
                      <Link
                        to={`/settingUpdate/${item.setting_id}`}
                        className="btn btn-primary "
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.setting_id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Settingslist;


