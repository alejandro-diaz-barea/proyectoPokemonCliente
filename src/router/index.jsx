import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layouts/LayoutPublic";
import LayoutPrivate from "../layouts/LayoutPrivate";
import Home from "../pages/Home";
import CreateAcount from "../pages/CreateAcount";
import Login from "../pages/Login";
import PokemonDetails from "../pages/PokemonDetails";
import NotFound from "../pages/NotFound";
import Favoritos from "../pages/Favoritos";
import Contacto from "../pages/Contacto";
import Perfil from "../pages/Perfil"



export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/crear-cuenta",
        children: [
          {
            index: true,
            element: <CreateAcount />,
          },
        ],
      },
      {
        path: "/contacto",
        children: [
          {
            index: true,
            element: <Contacto />,
          },
        ],
      },
      {
        path: "/iniciar-sesion",
        children: [
          {
            index: true,
            element: <Login />,
          },
        ],
      },
    ],
  },
  {
    path: "/detalles-pokemon/:name",
    element: <LayoutPrivate />,
    children: [
      {
        index: true,
        element: <PokemonDetails />,
      },
    ],
  },
  {
    path: "/favoritos",
    element: <LayoutPrivate />,
    children: [
      {
        index: true,
        element: <Favoritos />,
      },
    ],
  },{
    path: "/perfil",
    element: <LayoutPrivate />,
    children: [
      {
        index: true,
        element: <Perfil/>,
      },
    ],
  }
]);
