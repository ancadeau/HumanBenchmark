// pages/profile.tsx
import React from "react";
import SkillChart from "../components/radarChart/skill-chart";

const Profile = () => {
  const datasets = [
    {
      label: "Test - 1",
      data: [85, 80, 85, 90, 90],
    },
    {
      label: "Test - 2",
      data: [90, 85, 80, 95, 85],
    },
  ];

  return (
    <div>
      <h1>Profile</h1>
      <SkillChart datasets={datasets} />
    </div>
  );
};

export default Profile;
