export interface PipelineStep {
  number: string;
  id: string;
  name: string;
  fullName: string;
  description: string;
  iconType: 'ink' | 'bias' | 'verify' | 'draft' | 'publish';
}

export interface Outlet {
  name: string;
  positionPercent: number;
  category: 'Far Left' | 'Center Left' | 'Center' | 'Center Right' | 'Far Right';
  isGold?: boolean;
  isVerifiedCenter?: boolean;
  bottomOffset?: string;
  description: string;
}

export interface Agent {
  acronym: string;
  fullName: string;
  role: string;
  isDirector?: boolean;
  description: string;
  tags: string[];
  avatarClass: string;
  initials: string;
}
