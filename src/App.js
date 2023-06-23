
import { useEffect, useState } from 'react';
import './App.css';
import ShowData from './Components/ShowData';
import YouTubeForm from './Components/YouTubeForm';
import axios from 'axios';
import { ExportToExcel } from './Components/ExportToExcel';

function App() {
  const [data, setData] = useState([]);
  const getData = async () => {
    await axios
      .get("http://localhost:3000/users")
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <ShowData data={data} getData={getData}/>
      {/* <ExportToExcel apiData={data} fileName={"user_data"} /> */}
     <YouTubeForm getData={getData} />
    </div>
  );
}

export default App;
