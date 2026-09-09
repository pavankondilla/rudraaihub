export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  techStack: string[];
  idealFor: string;
  sampleUseCases: string[];
}

export interface ValueProp {
  id: string;
  title: string;
  desc: string;
  iconName: string;
  metric?: string;
  metricLabel?: string;
}

export interface WorkflowStep {
  id: number;
  name: string;
  description: string;
  status: 'idle' | 'running' | 'completed';
  outputLog?: string;
}

export interface DemoWorkflow {
  id: string;
  title: string;
  category: string;
  description: string;
  steps: WorkflowStep[];
  timeSaved: string;
}

export interface CaseStudy {
  id: string;
  clientName: string;
  industry: string;
  challenge: string;
  solution: string;
  impact: string;
  metrics: { label: string; value: string }[];
}

export interface SolutionEstimatorState {
  industry: string;
  companySize: string;
  primaryGoal: string;
  servicesNeeded: string[];
  timeline: string;
}
