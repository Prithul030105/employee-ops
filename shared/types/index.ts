export interface Participant {
  id: string;
  slk_id: string;
  name_hash: string;
  dob: string; // ISO 8601 Format: YYYY-MM-DD
  ndis_number: string;
  budget_total: number;
  budget_remaining: number;
}

export interface Shift {
  id: string;
  staff_id: string;
  participant_id: string;
  start_time: string; 
  end_time: string;   
  gps_coords: {
    latitude: number;
    longitude: number;
  };
  dex_score: number; 
}

/**
 * Generates the 14-character SLK-581 Key (including Sex digit).
 */
export function generateSLK(firstName: string, lastName: string, dob: Date, sex: '1' | '2' | '9' = '1'): string {
  const pad = (s: string) => s.replace(/[^a-zA-Z]/g, '').padEnd(5, '2').toUpperCase();
  const f = pad(firstName);
  const l = pad(lastName);

  // DSS Rules: Surname 2,3,5 + Given 2,3
  const namePart = `${l[1]}${l[2]}${l[4]}${f[1]}${f[2]}`;
  
  const day = dob.getDate().toString().padStart(2, '0');
  const month = (dob.getMonth() + 1).toString().padStart(2, '0');
  const year = dob.getFullYear();
  
  return `${namePart}${day}${month}${year}${sex}`;
}