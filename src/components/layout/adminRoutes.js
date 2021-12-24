import Rooms from '../../pages/admin/room/Rooms'
import Hostels from '../../pages/admin/hostel/Hostels'
import Bookings from '../../pages/admin/booking/Bookings'
import Students from '../../pages/admin/student/Students'
const adminRoutes = [
  {
    path: "/dashboard",
    element: <div>add</div>,
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
    path: "/complaints",
    element: <div>33333333333</div>,
  },
  {
    path: "/payments",
    element: <div>1111111111111</div>,
  }
];

export default adminRoutes;
