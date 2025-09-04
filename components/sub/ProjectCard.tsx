"use client";
import React from "react";
import { CometCard } from "@/components/ui/comet-card";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
}

const ProjectCard = ({ title, description, image }: ProjectCardProps) => {
  return (
    <CometCard className="w-80">
      <div className="flex flex-col items-stretch rounded-[16px] bg-[#1F2121] p-4">
        <div className="relative aspect-[3/4] w-full">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full rounded-[16px] object-cover"
          />
        </div>
        <div className="mt-3 flex flex-col text-white">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-300 mt-1">{description}</p>
        </div>
      </div>
    </CometCard>
  );
};

export default ProjectCard;
