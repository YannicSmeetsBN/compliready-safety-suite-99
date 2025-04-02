
import { 
  employees, 
  employeeCertificates, 
  employeePBMs,
  employeeTrainings,
  employeeElearnings,
  employeeNotes 
} from "@/data";

// Function to add a new certificate to an employee
export const addCertificateToEmployee = (
  employeeId: string,
  certificate: {
    name: string;
    type: string;
    issueDate: string;
    expiryDate: string;
    status: string;
  }
) => {
  if (!employeeId || !employeeCertificates[employeeId]) {
    return false;
  }
  
  // Generate a new unique ID
  const newId = String(Math.max(...Object.values(employeeCertificates).flat().map(cert => parseInt(cert.id))) + 1);
  
  // Create the new certificate
  const newCertificate = {
    id: newId,
    ...certificate
  };
  
  // Add to the employee's certificates
  employeeCertificates[employeeId].push(newCertificate);
  
  return true;
};

// Function to add a new PBM to an employee
export const addPBMToEmployee = (
  employeeId: string,
  pbm: {
    type: string;
    issueDate: string;
    expiryDate: string;
    status: string;
  }
) => {
  if (!employeeId || !employeePBMs[employeeId]) {
    return false;
  }
  
  // Generate a new unique ID
  const newId = String(Math.max(...Object.values(employeePBMs).flat().map(item => parseInt(item.id))) + 1);
  
  // Create the new PBM
  const newPBM = {
    id: newId,
    ...pbm
  };
  
  // Add to the employee's PBMs
  employeePBMs[employeeId].push(newPBM);
  
  return true;
};

// Function to add a new training to an employee
export const addTrainingToEmployee = (
  employeeId: string,
  training: {
    name: string;
    date: string;
    status: string;
  }
) => {
  if (!employeeId || !employeeTrainings[employeeId]) {
    return false;
  }
  
  // Generate a new unique ID
  const newId = String(Math.max(...Object.values(employeeTrainings).flat().map(item => parseInt(item.id))) + 1);
  
  // Create the new training
  const newTraining = {
    id: newId,
    ...training
  };
  
  // Add to the employee's trainings
  employeeTrainings[employeeId].push(newTraining);
  
  return true;
};

// Function to add a new e-learning to an employee
export const addElearningToEmployee = (
  employeeId: string,
  elearning: {
    name: string;
    date: string;
    progress: string;
    status: string;
  }
) => {
  if (!employeeId || !employeeElearnings[employeeId]) {
    return false;
  }
  
  // Generate a new unique ID
  const newId = String(Math.max(...Object.values(employeeElearnings).flat().map(item => parseInt(item.id))) + 1);
  
  // Create the new e-learning
  const newElearning = {
    id: newId,
    ...elearning
  };
  
  // Add to the employee's e-learnings
  employeeElearnings[employeeId].push(newElearning);
  
  return true;
};

// Function to update employee personal info
export const updateEmployeePersonalInfo = (
  employeeId: string,
  updatedInfo: {
    function?: string;
    department?: string;
    birthDate?: string;
    startDate?: string;
    email?: string;
    phone?: string;
    personalInfo?: {
      address?: string;
      postalCode?: string;
      city?: string;
      emergencyContact?: string;
      emergencyPhone?: string;
    };
  }
) => {
  const employee = employees.find(emp => emp.id === employeeId);
  
  if (!employee) {
    return false;
  }
  
  // Update employee information
  Object.assign(employee, updatedInfo);
  
  // Update nested personal info if provided
  if (updatedInfo.personalInfo) {
    employee.personalInfo = {
      ...employee.personalInfo,
      ...updatedInfo.personalInfo
    };
  }
  
  return true;
};
