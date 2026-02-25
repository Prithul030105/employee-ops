# 🔄 CHANGES REQUIRED FOR HANSONIAN REPOSITORY

This document outlines the **specific changes** needed in the `mannpandya1702/Hansonian-` GitHub repository to integrate the new premium Family & Patient Portal.

---

## 📋 Summary of Changes

| Area | Action | Priority |
|------|--------|----------|
| `/family-portal/` | **Replace entire folder** | 🔴 Critical |
| `/shared/` | **Add new components & types** | 🔴 Critical |
| `tailwind.config.ts` | **Update with Hansonium colors** | 🟡 High |
| `firestore.rules` | **Add family portal rules** | 🟡 High |
| `.env.example` | **Add new environment variables** | 🟢 Medium |

---

## 1️⃣ Replace `/family-portal/` Directory

### Current Structure (to be replaced):
```
family-portal/
└── (existing files - likely minimal)
```

### New Structure:
```
family-portal/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── (component files)
├── lib/
│   ├── firebase-config.ts
│   └── firebase-hooks.ts
├── styles/
│   └── globals.css
├── types/
│   └── index.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── postcss.config.js
├── .env.example
└── README.md
```

### Action Steps:
```bash
# 1. Backup existing family-portal
mv family-portal family-portal-backup

# 2. Copy new family-portal
cp -r /path/to/new/family-portal ./family-portal

# 3. Install dependencies
cd family-portal && npm install
```

---

## 2️⃣ Update `/shared/` Directory

### Add to `/shared/types/index.ts`:

```typescript
// Add these exports to your existing shared types

// ============================================
// NDIS & PARTICIPANT TYPES
// ============================================

export interface Participant {
  id: string;
  slk_id: string;
  firstName: string;
  lastName: string;
  preferredName?: string;
  dateOfBirth: Date;
  ndisNumber: string;
  profileImage?: string;
  phone?: string;
  email?: string;
  address: Address;
  planStartDate: Date;
  planEndDate: Date;
  planManager?: string;
  budget: NDISBudget;
  careTeam: CareTeamMember[];
  emergencyContacts: EmergencyContact[];
  preferences: ParticipantPreferences;
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

export interface NDISBudget {
  total: number;
  used: number;
  remaining: number;
  coreSupport: BudgetCategory;
  capacityBuilding: BudgetCategory;
  capital: BudgetCategory;
  lastUpdated: Date;
}

export interface BudgetCategory {
  allocated: number;
  used: number;
  remaining: number;
  percentage: number;
}

export interface CareTeamMember {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  profileImage?: string;
  phone?: string;
  email?: string;
  specializations: string[];
  rating: number;
  totalSessions: number;
  isPrimary: boolean;
  status: 'available' | 'on_shift' | 'unavailable';
}

export interface Shift {
  id: string;
  staffId: string;
  staffMember: CareTeamMember;
  participantId: string;
  scheduledStart: Date;
  scheduledEnd: Date;
  actualStart?: Date;
  actualEnd?: Date;
  location: Address;
  gpsCoords?: { lat: number; lng: number };
  status: ShiftStatus;
  serviceType: string;
  serviceCategory: 'core_support' | 'capacity_building' | 'capital';
  notes?: string;
  dexScore?: DEXScore;
  familyRating?: FamilyRating;
  estimatedCost: number;
  actualCost?: number;
}

export type ShiftStatus = 
  | 'scheduled'
  | 'confirmed'
  | 'caregiver_en_route'
  | 'caregiver_arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show';

export interface DEXScore {
  circumstance: number;
  goals: number;
  satisfaction: number;
  overall: number;
  capturedAt: Date;
  notes?: string;
}

export interface FamilyRating {
  id: string;
  shiftId: string;
  rating: number;
  feedback?: string;
  wouldRecommend: boolean;
  categories: {
    punctuality: number;
    professionalism: number;
    care_quality: number;
    communication: number;
  };
  submittedAt: Date;
  escalated: boolean;
  escalationReason?: string;
}

// SLK Generator Function
export function generateSLK(firstName: string, lastName: string, dob: Date): string {
  const cleanName = (name: string): string => 
    name.toUpperCase().replace(/[^A-Z]/g, '');
  
  const first = cleanName(firstName);
  const last = cleanName(lastName);
  
  const firstPart = (first.substring(0, 2) + '22').substring(0, 2);
  
  const getChar = (str: string, pos: number): string => 
    pos < str.length ? str[pos] : '2';
  
  const lastPart = getChar(last, 1) + getChar(last, 2) + getChar(last, 4);
  
  const day = dob.getDate().toString().padStart(2, '0');
  const month = (dob.getMonth() + 1).toString().padStart(2, '0');
  const year = dob.getFullYear().toString();
  
  return `${lastPart}${firstPart}${day}${month}${year}`;
}
```

---

## 3️⃣ Update Root `tailwind.config.ts`

### Add Hansonium theme to existing config:

```typescript
// Add to your existing tailwind.config.ts in the root

const config: Config = {
  content: [
    // ... existing content paths
    './family-portal/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Existing colors...
        
        // ADD: Hansonium Brand Colors
        hansonium: {
          // Primary - Deep charcoal/navy
          primary: '#1a1a2e',
          'primary-light': '#252540',
          'primary-dark': '#0f0f1a',
          
          // Accent Green - Signature Hansonium green
          accent: '#4ade80',
          'accent-light': '#86efac',
          'accent-dark': '#22c55e',
          'accent-muted': '#166534',
          
          // Warm neutrals
          cream: '#faf9f7',
          'cream-dark': '#f5f3ef',
          sand: '#e8e4dd',
          
          // Text colors
          'text-primary': '#1a1a2e',
          'text-secondary': '#6b7280',
          'text-muted': '#9ca3af',
          'text-inverse': '#ffffff',
          
          // Status colors (NDIS Compliance)
          success: '#22c55e',
          warning: '#f59e0b',
          danger: '#ef4444',
          info: '#3b82f6',
          
          // Budget categories
          'core-support': '#8b5cf6',
          'capacity-building': '#06b6d4',
          'capital': '#f97316',
        },
      },
      fontFamily: {
        // ADD: Hansonium fonts
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        // ADD: Premium shadows
        'premium': '0 4px 20px -2px rgba(26, 26, 46, 0.1), 0 2px 8px -2px rgba(26, 26, 46, 0.06)',
        'premium-lg': '0 10px 40px -4px rgba(26, 26, 46, 0.12), 0 4px 16px -4px rgba(26, 26, 46, 0.08)',
      },
      animation: {
        // ADD: Premium animations
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
    },
  },
}
```

---

## 4️⃣ Update `firestore.rules`

### Add these rules to your existing `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ============================================
    // FAMILY PORTAL RULES
    // ============================================
    
    // Helper function to check if user is family member
    function isFamilyMember(participantId) {
      return exists(/databases/$(database)/documents/participants/$(participantId)/familyMembers/$(request.auth.uid));
    }
    
    // Helper function to check if user is admin
    function isAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Participants collection
    match /participants/{participantId} {
      // Family members can read their participant's data
      allow read: if request.auth != null && 
        (isFamilyMember(participantId) || isAdmin());
      
      // Only admins can write
      allow write: if request.auth != null && isAdmin();
      
      // Care Team subcollection
      match /careTeam/{memberId} {
        allow read: if request.auth != null && 
          (isFamilyMember(participantId) || isAdmin());
        allow write: if request.auth != null && isAdmin();
      }
      
      // Timeline/Activity Feed subcollection
      match /timeline/{eventId} {
        allow read: if request.auth != null && 
          (isFamilyMember(participantId) || isAdmin());
        allow write: if request.auth != null && isAdmin();
      }
      
      // Documents subcollection
      match /documents/{docId} {
        allow read: if request.auth != null && 
          (isFamilyMember(participantId) || isAdmin());
        allow write: if request.auth != null && isAdmin();
      }
      
      // Family Members subcollection
      match /familyMembers/{userId} {
        allow read: if request.auth != null && 
          (request.auth.uid == userId || isAdmin());
        allow write: if request.auth != null && isAdmin();
      }
    }
    
    // Shifts collection - Enhanced rules
    match /shifts/{shiftId} {
      // Read access for family members of the participant
      allow read: if request.auth != null && (
        isFamilyMember(resource.data.participantId) || 
        isAdmin() ||
        resource.data.staffId == request.auth.uid
      );
      
      // Family can only submit ratings
      allow update: if request.auth != null && 
        isFamilyMember(resource.data.participantId) &&
        request.resource.data.diff(resource.data).affectedKeys().hasOnly(['familyRating']);
      
      // Full write access for admins
      allow write: if request.auth != null && isAdmin();
      
      // Real-time tracking subcollection
      match /tracking/{trackingId} {
        allow read: if request.auth != null && 
          isFamilyMember(get(/databases/$(database)/documents/shifts/$(shiftId)).data.participantId);
      }
    }
    
    // Staff collection (read-only for family)
    match /staff/{staffId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && isAdmin();
    }
    
    // Notifications collection
    match /users/{userId}/notifications/{notificationId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 5️⃣ Update Root `.env.example`

### Add these variables:

```env
# ============================================
# FAMILY PORTAL SPECIFIC
# ============================================

# Google Maps API (for caregiver tracking)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key

# Feature Flags
NEXT_PUBLIC_ENABLE_LOCATION_TRACKING=true
NEXT_PUBLIC_ENABLE_PUSH_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# Sentry (Error Tracking)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

---

## 6️⃣ Update Root `package.json`

### Add Google Fonts to your web fonts (if using):

```json
{
  "scripts": {
    // Add family-portal specific scripts
    "dev:family": "cd family-portal && npm run dev",
    "build:family": "cd family-portal && npm run build",
    "lint:family": "cd family-portal && npm run lint"
  }
}
```

---

## ✅ Verification Checklist

After making all changes, verify:

- [ ] `npm install` runs successfully in `/family-portal/`
- [ ] `npm run dev` starts the development server
- [ ] All Hansonium colors render correctly (#1a1a2e, #4ade80)
- [ ] Fonts load correctly (Playfair Display, DM Sans)
- [ ] Firebase connection works
- [ ] Firestore rules deploy without errors
- [ ] Mobile responsive layout works
- [ ] All animations are smooth

---

## 🚨 Common Issues & Solutions

### Issue: Fonts not loading
**Solution:** Ensure Google Fonts are imported in `layout.tsx` or add to `_document.tsx`

### Issue: Colors not matching
**Solution:** Clear Tailwind cache: `rm -rf .next && npm run dev`

### Issue: Firebase permission denied
**Solution:** Deploy updated Firestore rules: `firebase deploy --only firestore:rules`

### Issue: TypeScript errors
**Solution:** Run `npm run type-check` and fix any type mismatches

---

## 📞 Support

If you encounter any issues during integration:

1. Check the `/family-portal/README.md` for detailed documentation
2. Review the error logs in browser console
3. Verify environment variables are set correctly
4. Contact the development team
