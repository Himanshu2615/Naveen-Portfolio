"use client";
import React from "react";
import ProjectCard from "@/components/sub/ProjectCard";

const Projects = () => {
  const projects = [
    {
      title: "Atmos Horizon",
      description: "Real-time weather updates with stunning visuals.",
      image: "/Atmos Horizon.jpg",
    },
    {
      title: "Journal App",
      description: "Personal journaling made easy and secure.",
      image: "/Journal App.jpg",
    },
    {
      title: "Notes App",
      description: "Offline Note taking App.",
      image: "/Notes App.jpg",
    },
  ];

  return (
    <section className="py-12 px-6 bg-black">
      <h2 className="text-3xl font-bold text-center text-white mb-10">
        My Projects
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 place-items-center">
        {projects.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
