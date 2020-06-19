import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams
} from "react-router-dom";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/launch">Launch</Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="launch" element={<Launch />}>
            <Route path="/" element={<LaunchIndex />} />
            <Route path=":slug" element={<LaunchShoe />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

const NotFound = () => {
  return <div className="error">Page not fund</div>;
};

const Home = () => {
  return <h2>Welcome to Home</h2>;
};

const Launch = () => {
  return (
    <div className="container">
      <h2>Launch</h2>

      <Outlet />
    </div>
  );
};

const LaunchIndex = () => {
  console.log(Object.entries(shoes));
  return (
    <ul>
      {Object.entries(shoes).map(([slug, { name, img }]) => (
        <li key={slug}>
          <Link to={`/launch/${slug}`}>
            <h2>{name}</h2>
            <img src={img} alt={name} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

const LaunchShoe = () => {
  const { slug } = useParams();

  const shoe = shoes[slug];

  const { name, img } = shoe;

  if (!shoe) {
    return <h2>Not Found!</h2>;
  }

  return (
    <div>
      <h2>{name}</h2>
      <img src={img} alt={name} />
    </div>
  );
};

const shoes = {
  "air-jordan-3-valor-blue": {
    name: "VALOUR BLUE",
    img:
      "https://secure-images.nike.com/is/image/DotCom/CT8532_104_A_PREM?$SNKRS_COVER_WD$&align=0,1"
  },
  "jordan-mars-270-london": {
    name: "JORDAN MARS 270 LONDON",
    img:
      "https://secure-images.nike.com/is/image/DotCom/CV3042_001_A_PREM?$SNKRS_COVER_WD$&align=0,1"
  },
  "air-jordan-1-zoom-racer-blue": {
    name: "RACER BLUE",
    img:
      "https://secure-images.nike.com/is/image/DotCom/CK6637_104_A_PREM?$SNKRS_COVER_WD$&align=0,1"
  }
};
