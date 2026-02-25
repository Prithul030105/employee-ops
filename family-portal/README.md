# 🏥 Hansonium Family & Patient Portal

> A premium, NDIS-compliant care management portal styled after the official Hansonium brand.

![Hansonium Portal](https://hansonium.com.au/wp-content/uploads/2022/12/Full-Length-Logo-1024x239.png)

---

## 🎨 Design System

This portal uses the official **Hansonium brand colors** extracted from [hansonium.com.au](https://hansonium.com.au/):

### Color Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Primary (Deep Charcoal)** | `#1a1a2e` | Sidebar, headers, text |
| **Primary Light** | `#252540` | Hover states, gradients |
| **Accent Green** | `#4ade80` | CTAs, highlights, success |
| **Accent Dark** | `#22c55e` | Hover states |
| **Cream** | `#faf9f7` | Background |
| **Sand** | `#e8e4dd` | Borders, dividers |

### Typography

| Font | Usage |
|------|-------|
| **Playfair Display** | Headings, display text |
| **DM Sans** | Body text, UI elements |
| **JetBrains Mono** | Code, numbers |

---

## 📁 Repository Integration Guide

### Changes Required in `mannpandya1702/Hansonian-`

#### 1. Replace the existing `family-portal` folder

```bash
# Navigate to your Hansonian repo
cd Hansonian-

# Remove the existing family-portal (backup first if needed)
mv family-portal family-portal-backup

# Copy the new family-portal
cp -r /path/to/new/family-portal ./family-portal
```

#### 2. Update the Shared Components

Add these to `/shared/components/`:

```
shared/
├── components/
│   ├── ui/
│   │   ├── Avatar.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── ProgressRing.tsx
│   │   ├── StarRating.tsx
│   │   ├── DataCard.tsx
│   │   └── ComplianceBadge.tsx
│   └── index.ts
├── styles/
│   └── hansonium-theme.css
└── types/
    └── index.ts
```

#### 3. Update `tailwind.config.ts` (Root Level)

Merge the Hansonium colors into your existing config:

```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        hansonium: {
          primary: '#1a1a2e',
          'primary-light': '#252540',
          accent: '#4ade80',
          'accent-dark': '#22c55e',
          cream: '#faf9f7',
          sand: '#e8e4dd',
          // ... full color palette
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
}
```

#### 4. Update Firestore Rules

Add these rules to your `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Participants collection
    match /participants/{participantId} {
      // Family members can read their participant's data
      allow read: if request.auth != null && 
        exists(/databases/$(database)/documents/participants/$(participantId)/familyMembers/$(request.auth.uid));
      
      // Only admins can write
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      
      // Nested collections
      match /careTeam/{memberId} {
        allow read: if request.auth != null;
      }
      
      match /timeline/{eventId} {
        allow read: if request.auth != null;
      }
      
      match /documents/{docId} {
        allow read: if request.auth != null;
      }
      
      match /familyMembers/{userId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
    
    // Shifts collection
    match /shifts/{shiftId} {
      allow read: if request.auth != null;
      
      // Family can only submit ratings
      allow update: if request.auth != null && 
        request.resource.data.diff(resource.data).affectedKeys().hasOnly(['familyRating']);
    }
    
    // Staff collection (read-only for family)
    match /staff/{staffId} {
      allow read: if request.auth != null;
    }
  }
}
```

---

## 🚀 Features Implemented

### ✅ US.P1 - Transparency Feed
- Live timeline of caregiver activities
- Photo and arrival status display
- Real-time status updates (en route, arrived, completed)

### ✅ US.P2 - NDIS Budget Monitor
- Progress ring visualization
- Core/Capacity Building/Capital breakdown
- Plan days remaining counter
- Budget utilization warnings

### ✅ US.P3 - Direct Feedback (Rating System)
- 5-star overall rating
- Category-specific ratings (punctuality, professionalism, care quality, communication)
- Automatic escalation for low ratings (≤2 stars)
- Text feedback option

### ➕ Additional Premium Features
- **Care Team Profiles**: View all assigned caregivers with ratings and specializations
- **Document Center**: Access care plans, assessments, invoices
- **Emergency Contacts**: Quick-dial emergency services and support
- **Next Visit Hero**: Prominent display of upcoming visit with caregiver tracking
- **Mobile-Responsive**: Full functionality on all devices

---

## 📱 Component Architecture

```
family-portal/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main dashboard (all components)
│   ├── visits/
│   │   └── page.tsx        # Detailed visits view
│   ├── care-team/
│   │   └── page.tsx        # Care team management
│   ├── budget/
│   │   └── page.tsx        # Full budget breakdown
│   ├── documents/
│   │   └── page.tsx        # Document center
│   └── settings/
│       └── page.tsx        # User preferences
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   ├── dashboard/
│   │   ├── QuickStats.tsx
│   │   ├── NextVisitHero.tsx
│   │   ├── BudgetOverview.tsx
│   │   └── TransparencyFeed.tsx
│   ├── ui/
│   │   ├── Avatar.tsx
│   │   ├── ProgressRing.tsx
│   │   ├── StatusBadge.tsx
│   │   └── StarRating.tsx
│   └── modals/
│       └── RatingModal.tsx
├── lib/
│   ├── firebase-config.ts  # Firebase initialization
│   └── firebase-hooks.ts   # Custom data hooks
├── styles/
│   └── globals.css         # Global styles + Tailwind
├── types/
│   └── index.ts            # TypeScript definitions
└── package.json
```

---

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Development
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
```

---

## 🛠 Installation & Development

```bash
# Install dependencies
cd family-portal
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run with Firebase emulators
firebase emulators:start
npm run dev
```

---

## 📊 Firestore Data Schema

### `participants` Collection

```typescript
{
  id: string,
  slk_id: string,              // Statistical Linkage Key
  firstName: string,
  lastName: string,
  ndisNumber: string,
  planStartDate: Timestamp,
  planEndDate: Timestamp,
  budget: {
    total: number,
    used: number,
    remaining: number,
    coreSupport: { allocated, used, remaining, percentage },
    capacityBuilding: { allocated, used, remaining, percentage },
    capital: { allocated, used, remaining, percentage },
    lastUpdated: Timestamp
  },
  // Subcollections: careTeam, timeline, documents, familyMembers
}
```

### `shifts` Collection

```typescript
{
  id: string,
  staffId: string,
  participantId: string,
  scheduledStart: Timestamp,
  scheduledEnd: Timestamp,
  actualStart?: Timestamp,
  actualEnd?: Timestamp,
  status: 'scheduled' | 'confirmed' | 'caregiver_en_route' | 'in_progress' | 'completed',
  serviceType: string,
  serviceCategory: 'core_support' | 'capacity_building' | 'capital',
  dexScore?: { circumstance, goals, satisfaction },
  familyRating?: { rating, feedback, categories, submittedAt, escalated }
}
```

---

## 🎯 Key Design Decisions

### 1. **Premium Aesthetic**
- Generous white space and subtle shadows
- Smooth animations (fade-in, slide-up, hover effects)
- Glass-morphism effects on key cards
- Gradient accents for visual hierarchy

### 2. **Mobile-First Responsive**
- Collapsible sidebar for mobile
- Touch-friendly tap targets (min 44px)
- Optimized card layouts for small screens
- Progressive disclosure of information

### 3. **Accessibility**
- WCAG 2.1 AA compliant color contrast
- Keyboard navigation support
- Screen reader labels
- Reduced motion option support

### 4. **Performance**
- Lazy loading of heavy components
- Optimized re-renders with React.memo
- Skeleton loading states
- Image optimization

---

## 🔒 Security Considerations

1. **Authentication Required**: All routes require Firebase Auth
2. **Role-Based Access**: Family members only see their participant's data
3. **Data Validation**: Zod schemas for input validation
4. **Rate Limiting**: Rating submissions are rate-limited
5. **Audit Trail**: All changes logged to timeline

---

## 📈 Future Enhancements

- [ ] Push notifications for visit updates
- [ ] In-app messaging with caregivers
- [ ] Video call integration
- [ ] Offline support with service workers
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Calendar sync (Google/Apple)

---

## 📄 License

© 2024 Hansonium. All Rights Reserved.

---

## 🆘 Support

- **Technical Support**: Contact the development team
- **NDIS Enquiries**: 1800 800 110
- **Hansonium Support**: 1300 000 201
