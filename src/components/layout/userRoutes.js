import Landing from '../../pages/landing/Landing'
import Hostels from '../../pages/hostels/Hostels'
import Booking from '../../pages/booking/Booking'
import Signup from '../../pages/signup/Signup'
import Signin from '../../pages/signin/Signin'
import Profile from '../../pages/profile/Profile'
const userRoutes = [
  {
    path: "/",
    element: <Landing />,
    exact: true
  },
  {
    path: "/hostels",
    element: <Hostels />,
    exact: false
  },
  {
    path: "/booking",
    element: <Booking />,
    exact: false
  },
  {
    path: "/sign-up",
    element: <Signup />,
    exact: false
  },
  {
    path: "/sign-in",
    element: <Signin />,
    exact: false
  },
  {
    path: "/profile",
    element: <Profile />,
    exact: false
  },
];

export default userRoutes;
