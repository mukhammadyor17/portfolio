export interface Skill {
  name: string;
  percent: number;
  learning?: boolean;
}

export const skills: Skill[] = [
  { name: "Vue", percent: 90 },
  { name: "TypeScript", percent: 85 },
  { name: "Angular", percent: 70 },
  { name: "React", percent: 70 },
  { name: "React Native", percent: 70 },
  { name: "Node / NestJS", percent: 35, learning: true },
];

export const learningSkill = skills.find((s) => s.learning)!;
