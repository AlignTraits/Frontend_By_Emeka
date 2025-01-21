import { Outlet, useLocation, Navigate} from 'react-router-dom'
import { useAuth } from '../contexts/useAuth';

export default function Root() {
 const { token, isAuthenticated } = useAuth();

//  const [open, setOpen] = useState(false);
 const location = useLocation();

//  console.log("Token:", token, "Is Authenticated:", isAuthenticated);

  if(!isAuthenticated && !token) {
return (
  <div className="min-h-screen bg-gray-100">
    <main>
      <Outlet />
    </main>
  </div>
);
  } else {
    return <Navigate to='/dashboard' state={{ from:location }} replace />
  }

  
} 