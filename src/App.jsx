import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${search}`
        );
        setBooks([...response.data.items]);
      } catch (error) {
        console.log(error);
      }
      if (search === "") {
        setBooks([]);
      }
    };

    getBooks();
  }, [search]);

  console.log(books);
  return (
    <div className="App">
      <DebounceInput
        type="text"
        debounceTimeout={200}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <ul>
        {books.map(({ volumeInfo: { title } }, index) => {
          return <li key={index}>{title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
