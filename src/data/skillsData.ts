export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'mobile';
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 90, category: 'frontend' },
  { name: 'Next.js', level: 88, category: 'frontend' },
  { name: 'Tailwind CSS', level: 92, category: 'frontend' },
  { name: 'Vue.js', level: 80, category: 'frontend' },
  { name: 'Svelte', level: 75, category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Express', level: 82, category: 'backend' },
  { name: 'PostgreSQL', level: 78, category: 'backend' },
  { name: 'MongoDB', level: 75, category: 'backend' },
  { name: 'Redis', level: 70, category: 'backend' },
  { name: 'GraphQL', level: 80, category: 'backend' },
  
  // Tools & DevOps
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'Docker', level: 80, category: 'tools' },
  { name: 'AWS', level: 75, category: 'tools' },
  { name: 'Figma', level: 85, category: 'tools' },
  { name: 'Jest', level: 82, category: 'tools' },
  { name: 'Webpack', level: 78, category: 'tools' },
  
  // Mobile
  { name: 'React Native', level: 80, category: 'mobile' },
  { name: 'Flutter', level: 70, category: 'mobile' },
  { name: 'iOS Development', level: 65, category: 'mobile' },
];

export const skillCategories = {
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  tools: 'Tools & DevOps',
  mobile: 'Mobile Development'
};