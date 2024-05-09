import React from "react";
import Navbar from "../Components/navbar";

import Footer from "../Components/footer";

function AboutUs() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-8"> {/* Center content vertically and horizontally, and add top margin */}
        <div className="w-3/4  px-4 py-8 bg-white shadow-md rounded-md"> {/* Remove max-w-lg to allow the container to expand */}
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <p className="text-lg mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies urna ut ante scelerisque, a commodo nisi ultrices. Fusce nec fringilla nisi. Aliquam erat volutpat. Duis sit amet felis sit amet odio lobortis tempus. Fusce nec turpis eu velit pharetra dapibus. Phasellus aliquet nunc vitae turpis auctor, sit amet tempus orci luctus. Sed vel aliquam enim. Integer eu justo vel velit convallis aliquet. Vestibulum volutpat erat at lacinia mollis. Nam id sollicitudin eros. Ut id sem sit amet ex fringilla aliquet. Nullam a libero eleifend, consequat nisl eu, condimentum tortor.
          </p>
          <p className="text-lg mb-4">
            Vivamus vel risus suscipit, vehicula metus nec, eleifend justo. Sed nec leo quis odio dapibus ultrices. Sed suscipit nisl sit amet nibh congue, id auctor dolor interdum. Donec dictum nulla et odio mattis scelerisque. Phasellus vestibulum risus non tellus posuere, ut tempor urna ullamcorper. Nam at accumsan ex. Mauris eget venenatis ante, vel eleifend nunc.
          </p>
          <p className="text-lg">
            Aliquam erat volutpat. Ut nec lectus sit amet purus malesuada venenatis. Cras lacinia, risus at varius ultrices, risus mauris fermentum urna, vel facilisis libero sem sed libero. Fusce ut nisl sem. Mauris malesuada lorem vel sapien vehicula, nec vestibulum lacus ullamcorper. Nunc et tellus vel eros dapibus sollicitudin. Donec ut est consequat, consequat nunc in, efficitur lacus.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
