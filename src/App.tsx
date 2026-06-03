import React from "react";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeCreate } from "./employees/EmployeeCreate";
import { EmployeeShow } from "./employees/EmployeeShow";
import { EmployeeEdit } from "./employees/EmployeeEdit";
import { Layout } from "./Layout";

const dataProvider = jsonServerProvider("http://localhost:3002");

const App = () => (
  <Admin dataProvider={dataProvider} layout={Layout}>
    <Resource
      name="employees"
      list={EmployeeList}
      create={EmployeeCreate}
      edit={EmployeeEdit}
      show={EmployeeShow}
      options={{ label: "Employés" }}
    />
  </Admin>
);

export default App;
