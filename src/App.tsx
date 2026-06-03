import React from "react";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeCreate } from "./employees/EmployeeCreate";
import { EmployeeShow } from "./employees/EmployeeShow";
import { EmployeeEdit } from "./employees/EmployeeEdit";
import { InternList } from "./interns/InternList";
import { InternCreate } from "./interns/InternCreate";
import { InternShow } from "./interns/InternShow";
import { InternEdit } from "./interns/InternEdit";
import { Dashboard } from "./Dashboard";

const dataProvider = jsonServerProvider("http://localhost:3002");

const App = () => (
  <Admin dataProvider={dataProvider} dashboard={Dashboard}>
    {" "}
    <Resource
      name="employees"
      list={EmployeeList}
      create={EmployeeCreate}
      edit={EmployeeEdit}
      show={EmployeeShow}
      options={{ label: "Employés" }}
    />
    <Resource
      name="interns"
      list={InternList}
      create={InternCreate}
      edit={InternEdit}
      show={InternShow}
      options={{ label: "Stagiaires" }}
    />
  </Admin>
);

export default App;
