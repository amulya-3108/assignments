import React, { useRef, useState, useEffect } from "react";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { FileUpload } from "primereact/fileupload";
import { styled } from '@mui/system';
import config from "../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./Loader";

function Addassignments() {
  const StyledDateTimePicker = styled(DateTimePicker)(({ theme }) => ({
    border: '2px solid #3b82f6',  // Tailwind blue-500
    borderRadius: '2px',
  '&:hover': {
    borderColor: '#1e40af',  // Tailwind blue-700
  },
  '& .MuiInputBase-root': {
    border: 'none',
  },
  }));
  const [error, setError] = useState({});
  const [files, setFile] = useState(null);
  const [assignmentName, setAssignmentName] = useState('');
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [price, setPrice] = useState('');
  const [industry, setIndustry] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const handleFileSelect = (event) => {
    setFile(event.files[0]); // Assuming you only want to select the first file
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const priceValue = parseFloat(price);
    if (!assignmentName){ newErrors.assignmentName = "Work Name is required"}
    // else if(!/^[a-zA-Z]+$/.test(assignmentName)){
    //   newErrors.assignmentName = "Work Name should only contain alphabets";
    // }
    if (!deadlineDate) newErrors.deadlineDate = "Deadline date is required";
    if (!priceValue) {
      newErrors.price = "price is required";
    } 
    else if (priceValue < 10) {
      newErrors.price = "Price must be at least 10$";
    }
    if (!files) newErrors.files = "File is required";
    if (!industry) newErrors.industry = "Industry is required";
    setError(newErrors);
    const formData = new FormData();
    formData.append('files', files);
    formData.append('assignmentName', assignmentName);
    formData.append('deadlineDate', deadlineDate);
    formData.append('price', price);
    formData.append('industry', industry);
    if (Object.keys(newErrors).length === 0) {
      // Submit form
      console.log('Form submitted:', formData);
    }
    
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(`${config.baseURL}post/assignments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token
        },
      });
      toast.success('File uploaded successfully');
      setAssignmentName('');
      setDeadlineDate(new Date());
      setPrice('');
      setIndustry('');
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.clear();
      }
      setTermsAccepted(false);
    } catch (error) {
      toast.error('Error uploading file');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the loading time as needed

    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <div><Loader/></div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto w-full md:w-1/2 justify-around items-center mt-5 mb-20">
      <h1 className="text-4xl font-semibold text-center my-5">Upload</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full mx-auto justify-around items-center">
        <form className="px-16 pt-4 pb-1 mb-4 justify-center items-center" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2">
              Name
            </label>
            <input
              className="shadow appearance-none border-2 rounded w-full py-2 px-3 h-12 text-gray-700 border-blue-500 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-700"
              value={assignmentName} onChange={(e) => setAssignmentName(e.target.value)}
              type="text"
              placeholder="Name"
            />
            {error.assignmentName && (
              <span className="text-red-500 text-sm mt-2">{error.assignmentName}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2">
              Deadline Date
            </label>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <StyledDateTimePicker label="Select the deadline" value={deadlineDate} onChange={(e) => setDeadlineDate(e.target.value)}/>
              </DemoContainer>
            </LocalizationProvider> */}
            <input type="date" value={deadlineDate} onChange={(e) => setDeadlineDate(e.target.value)} className="shadow appearance-none border-2 rounded w-full py-2 px-3 h-12 text-gray-700 border-blue-500 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-700"/>
            {error.deadlineDate && (
              <span className="text-red-500 text-sm mt-2">{error.deadlineDate}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2">
              Price
            </label>
            <input
              className="shadow appearance-none border-2 rounded w-full py-2 px-3 h-12 text-gray-700 border-blue-500 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-700"
              value={price} onChange={(e) => setPrice(e.target.value)}
              type="text"
              placeholder="Price"
            />
            {error.price && (
              <span className="text-red-500 text-sm mt-2">{error.price}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2">
              Upload Document
            </label>
            <div className="card">
              <FileUpload
                name="files"
                ref={fileInputRef}
                multiple
                accept="image/*"
                maxFileSize={1000000}
                emptyTemplate={
                  <p className="m-3 text-gray-500 text-center py-4 border-dashed border-2 border-blue-500 rounded">
                    Drag and drop files to here to upload.
                  </p>
                }
                chooseOptions={{
                  label: "Choose",
                  icon: "pi pi-fw pi-plus",
                  className:
                    "p-button p-component m-3 w-20 h-8 bg-blue-600 rounded text-white hover:bg-blue-700",
                }}
                uploadOptions={{
                  label: "Upload",
                  icon: "pi pi-upload",
                  className:
                    "p-button p-component m-3 w-20 h-8 bg-green-600 rounded text-white hover:bg-green-700",
                }}
                cancelOptions={{
                  label: "Cancel",
                  icon: "pi pi-times",
                  className:
                    "p-button p-component m-3 w-20 h-8 bg-red-600 rounded text-white hover:bg-red-700",
                }}
                onSelect={handleFileSelect}
              />
              {/* <input 
        type="file" name="files"
        onChange={(e) => setFile(e.target.files[0])}
        className="border-2 border-blue-500 hover:border-blue-700"
      /> */}
              {error.files && (
                <span className="text-red-500 text-sm mt-2">{error.files}</span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2">
              Select an Industry
            </label>
            <div className="card flex justify-content-center">
              <select
                id="exampleSelect"
                className="mt-1 block w-full py-2 px-3 border-2 border-blue-500 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={industry} name="industry"
                onChange={(e) => setIndustry(e.target.value)}>
                <option >Select an industry</option>
                <option >Mobile solution</option>
                <option>Web Development</option>
                <option>Social Media Marketing</option>
                <option>Health Care</option>
              </select>
            </div>
              {error.industry && (
                <span className="text-red-500 text-sm mt-2">{error.industry}</span>
              )}
          </div>
          <div className="mb-4 flex justify-between">
            <label className="block text-gray-700 text-lg mb-2">
              I agree to the <a href="">terms and conditions</a>
            </label>
            <input type="checkbox" className="w-5 mr-80" checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}/>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 flex text-white items-center justify-center w-full font-bold py-2 px-4 text-lg rounded-lg focus:outline-none focus:shadow-outline border-2 border-blue-600 mb-5 hover:bg-white hover:text-black hover:border-2 hover:border-blue-600"
              type="submit">
              Upload
            </button>
          </div>
        </form>
        </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default Addassignments;


// import React, { useRef, useState } from "react";
// import "../index.css";
// import Header from "./Header";
// import Footer from "./Footer";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { FileUpload } from "primereact/fileupload";
// import { styled } from '@mui/system';
// import config from "../config";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { Elements } from "@stripe/react-stripe-js";
// import stripePromise from "../stripe"; 

// function Addassignments() {
//   // const stripePromise = loadStripe('sk_test_51OyfljGQ4hnFke5n7hOj6jngpiK4Vs0SsjYxwwnisDBn0Co8qnBJwx4I2rz90cD4P70H3YN5lGdxwp2LxiXX65lu00vDXvCmam');

//   const [error, setError] = useState({});
//   const [files, setFile] = useState(null);
//   const [assignmentName, setAssignmentName] = useState('');
//   const [deadlineDate, setDeadlineDate] = useState(new Date().toISOString().split('T')[0]);
//   const [price, setPrice] = useState('');
//   const [industry, setIndustry] = useState('');
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const fileInputRef = useRef(null);

//   const handleFileSelect = (event) => {
//     setFile(event.files[0]); // Assuming you only want to select the first file
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const newErrors = {};
//     const priceValue = parseFloat(price);

//     if (!assignmentName) {
//       newErrors.assignmentName = "Work Name is required";
//     } else if (!/^[a-zA-Z\s]+$/.test(assignmentName)) {
//       newErrors.assignmentName = "Work Name should only contain alphabets and spaces";
//     }

//     if (!deadlineDate) {
//       newErrors.deadlineDate = "Deadline date is required";
//     }

//     if (!priceValue) {
//       newErrors.price = "Price is required";
//     } else if (priceValue < 10) {
//       newErrors.price = "Price must be at least $10";
//     }

//     if (!files) {
//       newErrors.files = "File is required";
//     }

//     if (!industry) {
//       newErrors.industry = "Industry is required";
//     }

//     if (!termsAccepted) {
//       newErrors.termsAccepted = "Please accept the terms and conditions";
//     }

//     setError(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       const formData = new FormData();
//       formData.append('files', files);
//       formData.append('assignmentName', assignmentName);
//       formData.append('deadlineDate', deadlineDate);
//       formData.append('price', price);
//       formData.append('industry', industry);

//       try {
//         const stripe = await stripePromise;
//         const { error } = await stripe.redirectToCheckout({
//           lineItems: [{ price: price, quantity: 1 }],
//           mode: 'payment',
//           successUrl: `${window.location.origin}/success`,
//           cancelUrl: `${window.location.origin}/cancel`,
//         });

//         if (error) {
//           toast.error('Failed to redirect to Stripe checkout');
//         }
//         const token = localStorage.getItem("authToken");
//         const response = await axios.post(`${config.baseURL}post/assignments`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             'Authorization': token
//           },
//         });

//         // Redirect to Stripe Checkout
        
//       } catch (error) {
//         toast.error('Error uploading file');
//       }
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div className="container mx-auto w-full md:w-1/2 justify-around items-center mt-5 mb-20">
//         <h1 className="text-4xl font-semibold text-center my-5">Upload Assignment</h1>
//         <div className="flex flex-col md:flex-row">
//           <div className="w-full mx-auto justify-around items-center">
//             <Elements stripe={stripePromise}>
//               <form className="px-16 pt-4 pb-1 mb-4 justify-center items-center" onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-lg font-bold mb-2">
//                     Name
//                   </label>
//                   <input
//                     className="shadow appearance-none border-2 rounded w-full py-2 px-3 h-12 text-gray-700 border-blue-500 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-700"
//                     value={assignmentName} onChange={(e) => setAssignmentName(e.target.value)}
//                     type="text"
//                     placeholder="Name"
//                   />
//                   {error.assignmentName && (
//                     <span className="text-red-500 text-sm mt-2">{error.assignmentName}</span>
//                   )}
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-lg font-bold mb-2">
//                     Deadline Date
//                   </label>
//                   <input type="date" value={deadlineDate} onChange={(e) => setDeadlineDate(e.target.value)} className="shadow appearance-none border-2 rounded w-full py-2 px-3 h-12 text-gray-700 border-blue-500 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-700"/>
//                   {error.deadlineDate && (
//                     <span className="text-red-500 text-sm mt-2">{error.deadlineDate}</span>
//                   )}
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-lg font-bold mb-2">
//                     Price
//                   </label>
//                   <input
//                     className="shadow appearance-none border-2 rounded w-full py-2 px-3 h-12 text-gray-700 border-blue-500 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-700"
//                     value={price} onChange={(e) => setPrice(e.target.value)}
//                     type="text"
//                     placeholder="Price"
//                   />
//                   {error.price && (
//                     <span className="text-red-500 text-sm mt-2">{error.price}</span>
//                   )}
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-lg font-bold mb-2">
//                     Upload Document
//                   </label>
//                   <div className="card">
//                     <FileUpload
//                       name="files"
//                       ref={fileInputRef}
//                       multiple
//                       accept="image/*"
//                       maxFileSize={1000000}
//                       emptyTemplate={
//                         <p className="m-3 text-gray-500 text-center py-4 border-dashed border-2 border-blue-500 rounded">
//                           Drag and drop files to here to upload.
//                         </p>
//                       }
//                       chooseOptions={{
//                         label: "Choose",
//                         icon: "pi pi-fw pi-plus",
//                         className:
//                           "p-button p-component m-3 w-20 h-8 bg-blue-600 rounded text-white hover:bg-blue-700",
//                       }}
//                       uploadOptions={{
//                         label: "Upload",
//                         icon: "pi pi-upload",
//                         className:
//                           "p-button p-component m-3 w-20 h-8 bg-green-600 rounded text-white hover:bg-green-700",
//                       }}
//                       cancelOptions={{
//                         label: "Cancel",
//                         icon: "pi pi-times",
//                         className:
//                           "p-button p-component m-3 w-20 h-8 bg-red-600 rounded text-white hover:bg-red-700",
//                       }}
//                       onSelect={handleFileSelect}
//                     />
//                     {error.files && (
//                       <span className="text-red-500 text-sm mt-2">{error.files}</span>
//                     )}
//                   </div>
//                 </div>
//                 <div className="mb-4 flex justify-between">
//                   <label className="block text-gray-700 text-lg mb-2">
//                     I agree to the <a href="#">terms and conditions</a>
//                   </label>
//                   <input type="checkbox" className="w-5 mr-80" checked={termsAccepted}
//                     onChange={(e) => setTermsAccepted(e.target.checked)}/>
//                   {error.termsAccepted && (
//                     <span className="text-red-500 text-sm mt-2">{error.termsAccepted}</span>
//                   )}
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <button
//                     className="bg-blue-600 flex text-white items-center justify-center w-full font-bold py-2 px-4 text-lg rounded-lg focus:outline-none focus:shadow-outline border-2 border-blue-600 mb-5 hover:bg-white hover:text-black hover:border-2 hover:border-blue-600"
//                     type="submit">
//                     Upload
//                   </button>
//                 </div>
//               </form>
//             </Elements>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//       <Footer />
//     </div>
//   );
// }

// export default Addassignments;
