import './about.css';

export default function AboutUS() {
  const teamMembers = [
    {
      name: "Genta Wibawa Purnomo",
      role: "Programmer",
      image: "../images/Genta.png",
      description: "🌟Just a random guy that interests in the coding world.✨",
    },
    {
      name: "Serenity Devina Suryanto",
      role: "Programmer & Documentation Maker",
      image: "../images/serenity.jpg",
      description: "🌟 A Girl who love fantasy and interest in Korean✨",
    },
    {
      name: "Fellycia Caroline",
      role: "Programmer",
      image: "../images/fellycia.jpg",
      description: "🌟A girl who want to go to China✨",
    },
    {
      name: "Steffanie Angelica",
      role: "Programmer & Documentation Maker",
      image: "../images/steffanie.jpg",
      description: "🌟 A girl who likes sanrio characters. ✨",
    },
  ];

  return (
    <>
    
    <h2 className="text-center mb-4 typewriter">Project Members</h2>
    <div className="about-us-container">
      
      <div className="row">
        {teamMembers.map((member, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card dark-card">
              <img
                src={member.image}
                className="card-img-top"
                alt={member.name}
                style={{ height: "100%", objectFit: "fill" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title text-light">{member.name}</h5>
                <h6 className="card-subtitle mb-2 text-success">{member.role}</h6>
                <hr className="bg-light"></hr>
                <p className="card-text text-light">{member.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    </>
    
  );
}
