import './App.css';
import store from "./redux/store";
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import LoginScreen from "./screens/login";
import ProfileScreen from "./screens/profile";
import RegisterScreen from "./screens/register";
import {Provider} from "react-redux";
import OtherProfile from "./screens/other-profile";
import ThemoviedbSearchScreen from "./igdb/themoviedb-search";
import ThemoviedbMovieDetails from "./igdb/themoviedb-movie-details";
import TMDBMainScreen from "./igdb/themoviedb-main";
import withBanner from "./screens/navbar";

function App() {
    const ProfileWithNav = withBanner(ProfileScreen, "profile")
    const SearchWithNav = withBanner(ThemoviedbSearchScreen, "search")
    const HomeWithNav = withBanner(TMDBMainScreen, "home")
    const LoginWithNav = withBanner(LoginScreen, "login")
    const RegisterWithNav = withBanner(RegisterScreen, "signup")
    const OtherProfileWithNav = withBanner(OtherProfile, "None")
    const ThemoviedbMovieDetailsWithNav = withBanner(ThemoviedbMovieDetails, "None")

  return (
      <Provider store={store}>
          <BrowserRouter>
            <div className="container">
              <Routes>
                  <Route path="/" element={<HomeWithNav />} />
                  <Route path="/home" element={<HomeWithNav />} />
                  <Route path="/login" element={<LoginWithNav />} />
                  <Route path="/profile" element={<ProfileWithNav/>}/>
                  <Route path="/register" element={<RegisterWithNav />} />
                  <Route path="/profile/:id" element={<OtherProfileWithNav />} />

                  <Route path="/themoviedb/search" element={<SearchWithNav />} />
                  <Route path="/themoviedb/search/:searchTerm" element={<SearchWithNav />} />
                  <Route path="/details/:id" element={<ThemoviedbMovieDetailsWithNav />}
                  />
              </Routes>
            </div>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
