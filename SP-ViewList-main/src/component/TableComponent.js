import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const initialItems = [
  {
    id: 1,
    idolId: 12,
    hamletVillage: "Namakal",
    place: "Lake",
    type: "Public",
    date: "2024-08-20",
    status: "INCOMPLETE",
  },
  {
    id: 2,
    idolId: 123,
    hamletVillage: "Erumapatty",
    place: "River",
    type: "Private",
    date: "2024-08-21",
    status: "COMPLETE",
  },
  {
    id: 3,
    idolId: 1234,
    hamletVillage: "Tiruchengode",
    place: "Ashram",
    type: "Organisation",
    date: "2024-08-22",
    status: "INCOMPLETE",
  },
];

const places = [
  {
    name: "Namakal",
    subPlaces: [
      "Namakal",
      "Erumapatty",
      "Mohanur",
      "Sendamangalam",
      "V.V.Nadu",
      "Sengarai",
      "Puduchatram",
      "Nallipalayam",
    ],
  },
  {
    name: "Rasipuram",
    subPlaces: [
      "Rasipuram",
      "Vennandur",
      "Namagiripet",
      "Belukurichi",
      "Ayilpatty",
      "Mangalapuram",
    ],
  },
  {
    name: "Tiruchengode",
    subPlaces: [
      "T.gode Town",
      "T.gode Rural",
      "Mallasamudram",
      "Elachipalayam",
      "Pallipalayam",
      "Molasi",
      "Veppadai",
      "Komarapalayam",
    ],
  },
  {
    name: "Velur",
    subPlaces: ["Velur", "Paramathi", "Jedarapalayam", "V.G.Patty", "Nallur"],
  },
];

function App() {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedSubPlace, setSelectedSubPlace] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all"); 
  const [selectedDate, setSelectedDate] = useState("");

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleTypeFilter = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredData = useMemo(() => {
    const placeData = places.find((place) => place.name === selectedPlace);
    const validLocations = placeData
      ? [selectedPlace, ...placeData.subPlaces]
      : [];

    return initialItems.filter(
      (item) =>
        (validLocations.length === 0 ||
          validLocations.includes(item.hamletVillage)) &&
        (selectedSubPlace === "" || item.hamletVillage === selectedSubPlace) &&
        (statusFilter === "all" || item.status === statusFilter) &&
        (typeFilter === "all" || item.type === typeFilter) && 
        (selectedDate === "" || item.date === selectedDate)
    );
  }, [selectedPlace, selectedSubPlace, statusFilter, typeFilter, selectedDate]);

  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortField, sortOrder]);

  const handlePlaceChange = (event) => {
    setSelectedPlace(event.target.value);
    setSelectedSubPlace(""); 
  };

  const handleSubPlaceChange = (event) => {
    setSelectedSubPlace(event.target.value);
  };

  const selectedPlaceData = places.find(
    (place) => place.name === selectedPlace
  );

  const headerText = selectedPlace ? `${selectedPlace}` : "";

  return (
    <div className='mx-5 my-2 viewDiv'>
      <p className="h1 text-center mb-3">{headerText} Station</p>
      <div className="row mb-5" id="sp-filters">
        <div className="col-sm-3 d-flex flex-column flex-sm-row align-items-center">
          <label htmlFor="placeSelect" className="me-sm-2 mb-2 mb-sm-0">Sub-Division:</label>
          <select
            id="placeSelect"
            className="form-select"
            value={selectedPlace}
            onChange={handlePlaceChange}
          >
            <option value="">Select Sub-Division</option>
            {places.map((place) => (
              <option key={place.name} value={place.name}>
                {place.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-sm-3 d-flex flex-column flex-sm-row align-items-center">
          <label htmlFor="subPlaceSelect" className="me-sm-2 mb-2 mb-sm-0">Police Station:</label>
          <select
            id="subPlaceSelect"
            className="form-select"
            value={selectedSubPlace}
            onChange={handleSubPlaceChange}
          >
            <option value="">Select Police Station</option>
            {selectedPlaceData?.subPlaces.map((subPlace) => (
              <option key={subPlace} value={subPlace}>
                {subPlace}
              </option>
            ))}
          </select>
        </div>

        <div className="col-sm-3 d-flex flex-column flex-sm-row align-items-center">
          <label htmlFor="statusSelect" className="me-sm-2 mb-2 mb-sm-0">Status:</label>
          <select
            id="statusSelect"
            className="form-select"
            value={statusFilter}
            onChange={handleStatusFilter}
          >
            <option value="all">All</option>
            <option value="COMPLETE">Complete</option>
            <option value="INCOMPLETE">Incomplete</option>
          </select>
        </div>

        <div className="col-sm-3 d-flex flex-column flex-sm-row align-items-center">
          <label htmlFor="typeSelect" className="me-sm-2 mb-2 mb-sm-0">Type:</label>
          <select
            id="typeSelect"
            className="form-select"
            value={typeFilter}
            onChange={handleTypeFilter}
          >
            <option value="all">All</option>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
            <option value="Organisation">Organisation</option>
          </select>
        </div>

        <div className="col-sm-3 d-flex flex-column flex-sm-row align-items-center">
          <label htmlFor="dateInput" className="me-sm-2 mb-2 mb-sm-0">Date :</label>
          <input
            id="dateInput"
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      </div>

      <div className="table-responsive-lg">
        <table className="table table-light table-striped table-hover">
          <thead>
            <tr>
              <th
                onClick={() => handleSort("id")}
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid #ddd",
                  padding: "8px",
                }}
              >
                ID
              </th>
              <th
                onClick={() => handleSort("idolId")}
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid #ddd",
                  padding: "8px",
                }}
              >
                Idol ID
              </th>
              <th
                onClick={() => handleSort("hamletVillage")}
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid #ddd",
                  padding: "8px",
                }}
              >
                Location of Installation
              </th>
              <th
                onClick={() => handleSort("place")}
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid #ddd",
                  padding: "8px",
                }}
              >
                Place of Immersion
              </th>
              <th
                onClick={() => handleSort("type")}
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid #ddd",
                  padding: "8px",
                }}
              >
                Type
              </th>
              <th
                onClick={() => handleSort("date")}
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid #ddd",
                  padding: "8px",
                }}
              >
                Date of immersion
              </th>
              <th
                onClick={() => handleSort("status")}
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid #ddd",
                  padding: "8px",
                }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "8px" }}>{item.id}</td>
                <td style={{ padding: "8px" }}>{item.idolId}</td>
                <td style={{ padding: "8px" }}>{item.hamletVillage}</td>
                <td style={{ padding: "8px" }}>{item.place}</td>
                <td style={{ padding: "8px" }}>{item.type}</td>
                <td style={{ padding: "8px" }}>{item.date}</td>
                <td style={{ padding: "8px" }}>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
