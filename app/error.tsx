
"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Error() {
	const route = useRouter()
	return (
		<div className="flex flex-col items-center justify-center place-content-center pt-[90px] ">

		<div className="text-center py-8 px-10 max-w-xl  mx-auto rounded shadow-md bg-gray-100">
		  <Image 
			src="/seamey/waring.gif" 
			alt="Error Image" 
			width={50000} 
			height={30000} 
			
			className="w-32 mx-auto"
		  />
		  {/* <h1 className="mt-4 text-4xl font-bold text-s-600">Opps!</h1> */}
		  <p className="mt-2 text-xl text-gray-700">Something went wrong!</p>
		  <p className="mt-2 text-md text-gray-500">Please waiting your page will come soon.</p>
		  <button onClick={()=>route.push("/")}
		   className="mt-6 px-4 py-2 bg-primaryColor mb-5 text-white text-md rounded-lg hover:bg-blue-700">
			Go To Home
		  </button>
		</div>
	  </div>
	);
  };
