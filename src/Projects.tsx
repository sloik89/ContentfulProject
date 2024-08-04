import { useFetchProject } from "./fetchProjects";
const Projects = () => {
  const { projects, loading } = useFetchProject();

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="card-container container">
      {projects.map((item) => {
        return (
          <div className="card" key={item.title}>
            <h3>{item.title}</h3>
            <img src={item.imgUrl} alt="" />
            <a target="blank" href={item.imgUrl}>
              See more
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
