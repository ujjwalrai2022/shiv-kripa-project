import React from "react";
import { Card } from "antd";

function About() {
  return (
    <div className="bg-amber-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          About Us
        </h1>

        {/* Story */}
        <Card className="rounded-xl  mb-6">
          <p className="text-gray-600 leading-7">
            Shiv Kripa Photo Framing is dedicated to turning your memories into
            timeless frames. We specialize in high-quality photo frames,
            posters, and custom designs that bring life to your walls.
          </p>

          <p className="text-gray-600 mt-4 leading-7">
            Whether it's your family moments, artwork, or aesthetic posters — we
            ensure every piece is crafted with precision and care.
          </p>
        </Card>

        {/* Why Choose Us */}
        <Card className="rounded-xl  mb-6">
          <h2 className="text-xl font-semibold mb-3">Why Choose Us?</h2>

          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>High-quality premium frames</li>
            <li>Affordable pricing</li>
            <li>Custom design support</li>
            <li>Fast and reliable service</li>
          </ul>
        </Card>

        {/* Vision */}
        <Card className="rounded-xl">
          <h2 className="text-xl font-semibold mb-3">Our Vision</h2>

          <p className="text-gray-600 leading-7">
            To make every home more beautiful by preserving memories in the most
            elegant way possible.
          </p>
        </Card>
      </div>
    </div>
  );
}

export default About;
