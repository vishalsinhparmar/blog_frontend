import mission_image from '../assets/image/mission_image.jpg'
import cofounder from '../assets/image/cofounder.jpg'
import founder from '../assets/image/founder.jpg'
import desigener from '../assets/image/desigener.jpg'

function About() {
  return (
    <>
    <div className="bg-gray-100 min-h-screen">
  <div className="w-full bg-cover bg-center h-80" 
       style={{ backgroundImage: "url('../assets/image/eleonora-gaini-xom4ykz-WIg-unsplash.jpg')" }}>
    <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
      <h1 className="text-white text-4xl md:text-5xl font-bold">
        About Us
      </h1>
    </div>
  </div>

  <div className="container mx-auto px-4 py-10">
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Who We Are
      </h2>
      <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
        We are passionate storytellers committed to inspiring, informing, and delighting our audience with handpicked content.
        Our mission is to create a space where ideas thrive and stories connect.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
        <p className="text-gray-600 leading-relaxed">
          To curate and deliver content that adds value to your life. Whether  thought-provoking insights, trending topics, 
          or creative inspiration, we aim to bring you the best of the web.
        </p>
      </div>
      <div>
        <img
          src= {mission_image}
          alt="Our Mission"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>

    <div className="mt-16">
      <h3 className="text-center text-2xl font-semibold text-gray-800 mb-8">
        Meet Our Team
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="text-center">
          <img
            src={founder}
            alt="Team Member"
            className="w-40 h-40 mx-auto rounded-full shadow-lg mb-4"
          />
          <h4 className="text-lg font-medium text-gray-800">John Doe</h4>
          <p className="text-sm text-gray-600">Founder & CEO</p>
        </div>
        <div className="text-center">
          <img
            src={cofounder}
            alt="Team Member"
            className="w-40 h-40 mx-auto rounded-full shadow-lg mb-4"
          />
          <h4 className="text-lg font-medium text-gray-800">Jane Smith</h4>
          <p className="text-sm text-gray-600">Content Strategist</p>
        </div>
        <div className="text-center">
          <img
            src={desigener}
            alt="Team Member"
            className="w-40 h-40 mx-auto flex justify-center bg-cover rounded-full shadow-lg mb-4"
          />
          <h4 className="text-lg font-medium text-gray-800">Sam Wilson</h4>
          <p className="text-sm text-gray-600">Creative Designer</p>
        </div>
      </div>
    </div>
  </div>
</div>
</>
  )
}
export default About;