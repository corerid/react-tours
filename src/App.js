import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
const url = "https://course-api.com/react-tours-project";
function App() {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchData = async () => {
    setIsLoading(true);
    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
    if (response) {
      setTours(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  } else {

    if (tours.length === 0) {
      return (
        <main>
          <div className="title">
            <h2>no tours left</h2>
            <button className="btn" onClick={() => fetchData()}>
              refresh
            </button>
          </div>
        </main>
      );
    }

    return (
      <main>
        <Tours tours={tours} removeTours={removeTour} />
      </main>
    );
  }
}

export default App;
