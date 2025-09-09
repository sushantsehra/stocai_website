"use client"

import React from 'react';
import Image from 'next/image';
import youtube from "@/assets/youtube.png";

const VideoPlayer = () => {
  return (
    <div className="w-full mx-auto container md:min-h-screen flex justify-center items-center">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-0">
        {/* Video container with 16:9 aspect ratio */}
        <div className="relative w-full aspect-video bg-gray-200 rounded-xl overflow-hidden">
          <Image 
            src={youtube} 
            alt="Video player interface showing Stocai coaching session demo" 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

// "use client"

// import React, { useState } from 'react';
// import Image from 'next/image';
// import youtube from "@/assets/youtube.png";

// const VideoPlayer = () => {
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handlePlayClick = () => {
//     setIsPlaying(!isPlaying);
//   };

//   return (
//    <div className="w-full mx-auto container md:min-h-screen flex justify-center items-center">
//      <div className="w-full max-w-6xl mx-auto px-4 md:px-0">
//       {/* Video container with 16:9 aspect ratio */}
//       <div className="relative w-full aspect-video bg-gray-200 rounded-xl overflow-hidden">
        
//         {/* Play/Pause Button */}
//         {/* <div className="absolute inset-0 flex items-center justify-center">
//           <button
//             onClick={handlePlayClick}
//             className="w-12 h-12 sm:w-16 sm:h-16 md:w-32 md:h-24 bg-red-500 hover:bg-red-600 rounded-3xl flex items-center justify-center shadow-lg transition-all duration-200"
//           >
//             {!isPlaying ? (
//               // Play Icon
//               <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M8 5v14l11-7z"/>
//               </svg>
//             ) : (
//               // Pause Icon  
//               <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-20 md:h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
//               </svg>
//             )}
//           </button>
//         </div> */}

//         <Image src={youtube} alt="youtube" fill />
        
//       </div>
//     </div>
//     </div>
//   );
// };

// export default VideoPlayer;