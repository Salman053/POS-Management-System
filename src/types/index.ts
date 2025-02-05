// Define the type for our context state
export type MainContextType = {
  currentUser: any;
  setCurrentUser: any;
  theme: string;
  toggleTheme: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  userPreferences: Record<string, unknown>;
  setUserPreferences: React.Dispatch<
    React.SetStateAction<Record<string, unknown>>
  >;
};


export type CustomAvatarStackProps = {
  users: {
    id: string;
    src: string;
    name: string;
    status?: "active" | "inactive" | "enrolled";
  }[];
  className?: string;
};

export type UseToggle = [boolean, () => void];



export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
}

export interface Class {
  id: string;
  title: string;
  attachments: Attachment[];
}

export interface Module {
  id: string;
  title: string;
  classes: Class[];
}

export interface CourseModulesForm {
  modules: Module[];
}
export interface Attachment {
  id: string;
  file: File;
}



export type BaseEvent = {
  id: string;
  timestamp: string;
  status: 'APPROVED' | 'SUBMITTED' | 'RESOLVED' | 'PENDING';
  actor: {
    name: string;
    type: 'Student' | 'Company';
    avatar: string;
  };
}

export type ApprovalEvent = BaseEvent & {
  type: 'approval';
  studentId: string;
}

export type JobApplicationEvent = BaseEvent & {
  type: 'job-application';
  studentId: string;
  jobTitle: string;
  company: string;
}

export type ProjectEvent = BaseEvent & {
  type: 'project';
  projectTitle: string;
  companyName: string;
}

export type ReportEvent = BaseEvent & {
  type: 'report';
  studentId: string;
  companyName: string;
  reason: string;
}

export type Event = ApprovalEvent | JobApplicationEvent | ProjectEvent | ReportEvent;


export type DataTableColumnProps = {
  label: string;
  key: string;
  sortable?: boolean;
  sortKey?: string;
  render?: (value: any) => JSX.Element
}