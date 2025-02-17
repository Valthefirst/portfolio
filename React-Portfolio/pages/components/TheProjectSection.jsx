"use client";
import Image from 'next/image';
const TheProjectSection = () => {
return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="mt-4">
    <h3 className="text-xl font-semibold text-white">Mobile Apps</h3>
    <ul className="list-disc pl-5 text-white">
      <li>Hindi Go App</li>
      <li>Android App</li>
    </ul>
  </div>
  
  <div className="mt-4">
    <h3 className="text-xl font-semibold text-white">Web Apps</h3>
    <ul className="list-disc pl-5 text-white">
    <li>Rabia Patel Art</li>

    <div className="w-32 h-32 relative rounded-lg overflow-hidden">
    <a
                href="https://github.com/dahlica12"></a>
    <Image src="/projectspic/rabiapatelart.png" alt="Cooking 1" layout="fill" objectFit="cover" />
  </div>
      <li>Virtual Art Gallery</li>
      <li>Library Management System</li>
      <li>Portfolio -HTML, CSS</li>
      <div className="w-32 h-32 relative rounded-lg overflow-hidden">
    <Image src="/projectspic/oldportfolio.png" alt="Cooking 1" layout="fill" objectFit="cover" />
  </div>
      <li>The Fresh Tables</li>
      <div className="w-32 h-32 relative rounded-lg overflow-hidden">
    <Image src="/projectspic/thefreshtables.png" alt="Cooking 1" layout="fill" objectFit="cover" />
  </div>
    
    </ul>
  </div>
  
  <div className="mt-4">
    <h3 className="text-xl font-semibold text-white">Game Apps</h3>
    <ul className="list-disc pl-5 text-white">
      <li>Adventurelytical</li>
    </ul>
  </div>
      </section>
)
}
export default TheProjectSection;