// import { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

// const useAuthMiddleware = () => {
//   const history = useHistory();

//   useEffect(() => {
//     const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage

//     if (!token) {
//       // Redirect to login page if token is missing
//       history.push('/login');
//     } else {
//       // Decode token to check expiration (if needed)
//       // Example: const decodedToken = jwt_decode(token);
//       // Check token expiration if required and redirect if expired
//       // const currentTime = Date.now() / 1000; // Convert to seconds
//       // if (decodedToken.exp < currentTime) {
//         history.push('/home');

//       // }
//     }
//   }, [history]);

//   return null; // This hook doesn't render anything, just handles redirects
// };

// export default useAuthMiddleware;
