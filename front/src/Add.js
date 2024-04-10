export default function Add() {
  return (
    <>
      <input
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="text"
        name="Country"
        placeholder="Country"
        required
      ></input>
      <input
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="text"
        name="ISO"
        placeholder="ISO Code"
        required
      ></input>
      <input
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="text"
        name="Year"
        placeholder="Year"
        required
      ></input>
      <input
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="text"
        name="Coal"
        placeholder="Coal"
      ></input>
      <input
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="text"
        name="Oil"
        placeholder="Oil"
      ></input>
      <input
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="text"
        name="Gas"
        placeholder="Gas"
      ></input>
      <input
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="text"
        name="Cement"
        placeholder="Cement"
      ></input>
      <input
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="text"
        name="Flaring"
        placeholder="Flaring"
      ></input>
      <input
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="text"
        name="Other"
        placeholder="Other"
      ></input>
      <input
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="text"
        name="Capita"
        placeholder="Per Capita"
      ></input>
      <button
        onClick={post}
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Submit
      </button>
    </>
  );
  function post() {
    fetch("http://localhost/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Country: document.getElementsByName("Country")[0].value,
        ISO: document.getElementsByName("ISO")[0].value,
        Year: parseInt(document.getElementsByName("Year")[0].value),
        Coal: parseInt(document.getElementsByName("Coal")[0].value),
        Oil: parseInt(document.getElementsByName("Oil")[0].value),
        Gas: parseInt(document.getElementsByName("Gas")[0].value),
        Cement: parseInt(document.getElementsByName("Cement")[0].value),
        Flaring: parseInt(document.getElementsByName("Flaring")[0].value),
        Other: parseInt(document.getElementsByName("Other")[0].value),
        Capita: parseInt(document.getElementsByName("Capita")[0].value),
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          alert("Data added successfully");
        }
      })
      .then((data) => console.log(data));
  }
}
