export const taskTypeOptions = ['Call', 'Meeting', 'Video Call'];
export const contactPersonOptions = ['Team Member 1', 'Team Member 2', 'Team Member 3', 'Team Member 4', 'Team Member 5'];
export const statusOptions = ['Open', 'Closed'];

export function saveDataToJsonFile(data) {
  try {
    localStorage.setItem('salesData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage', error);
  }
}
