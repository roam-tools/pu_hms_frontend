import Rooms from '../../pages/admin/room/Rooms'
import Hostels from '../../pages/admin/hostel/Hostels'
import Bookings from '../../pages/admin/booking/Bookings'
import Students from '../../pages/admin/student/Students'
import Admins from '../../pages/admin/admins/Admins'
import Porters from '../../pages/admin/porters/Porters'
const adminRoutes = [
  {
    path: "/",
    element: <div>Dashboard coming soon</div>,
  },
  {
    path: "/hostels",
    element: <Hostels />,
  },
  {
    path: "/rooms",
    element: <Rooms />,
  },
  {
    path: "/bookings",
    element: <Bookings />,
  },
  {
    path: "/students",
    element: <Students />,
  },
  {
    path: "/admins",
    element: <Admins />,
  },
  {
    path: "/porters",
    element: <Porters />,
  },
  {
    path: "/complaints",
    element: <div>33333333333</div>,
  },
  {
    path: "/payments",
    element: <div>1111111111111</div>,
  }
];

export default adminRoutes;
