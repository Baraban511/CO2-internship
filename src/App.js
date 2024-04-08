import data from "./data.json";
import React, { useState } from "react";

export default function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(data); // Initialisez les résultats avec toutes les données
  const maxYear = Math.max(...results.map(item => item.Year));

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    searchFunction(event.target.value);
  };
  function searchFunction(search) {
    const searchResults = data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
    setResults(searchResults); // Mettez à jour les résultats avec les résultats de la recherche
    return results.forEach((element) => {});
  }
  return (
    <>
      <input
        type="text"
        name="search"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
      ></input>
      <table>
        <thead>
          <tr>
            <th scope="col">Country</th>
            <th scope="col">ISO code</th>
            <th scope="col">Year</th>
            <th scope="col">Total</th>
            <th scope="col">Coil</th>
            <th scope="col">Oil</th>
            <th scope="col">Gas</th>
            <th scope="col">Cement</th>
            <th scope="col">Flaring</th>
            <th scope="col">Other</th>
            <th scope="col">Per Capita</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item, index) =>
            item.Total ? (
              item.Year === maxYear ? (
              <tr key={index}>
                <th scope="row">{item.Country}</th>
                <td className={item.Year ? "" : "red" || ""}>{item.Year}</td>
                <td className={item.ISO ? "" : "red" || ""}>{item.ISO}</td>
                <td className={item.Total ? "" : "red" || ""}>{item.Total}</td>
                <td className={item.Coal ? "" : "red" || ""}>{item.Coal}</td>
                <td className={item.Oil ? "" : "red" || ""}>{item.Oil}</td>
                <td className={item.Gas ? "" : "red" || ""}>{item.Gas}</td>
                <td className={item.Cement ? "" : "red" || ""}>
                  {item.Cement}
                </td>
                <td className={item.Flaring ? "" : "red" || ""}>
                  {item.Flaring}
                </td>
                <td className={item.Other ? "" : "red" || ""}>{item.Other}</td>
                <td className={item.Capita ? "" : "red" || ""}>
                  {item.Capita}
                </td>
              </tr>
              ) : null
            ) : null
          )}
        </tbody>
      </table>
    </>
  );
}