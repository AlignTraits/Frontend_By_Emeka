import { Outlet, useLocation, Navigate} from 'react-router-dom'
import { useAuth } from '../contexts/useAuth';

export default function Root() {
 const { token, isAuthenticated } = useAuth();

//  const [open, setOpen] = useState(false);
 const location = useLocation();

  if(isAuthenticated && token) {
    return (
      <div className="min-h-screen bg-gray-100">
        <main>
          <Outlet />
        </main>
      </div>
    );
  } else {
    return <Navigate to='/login' state={{ from:location }} replace />
  }

  
} 