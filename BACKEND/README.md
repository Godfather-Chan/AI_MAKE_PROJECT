# 미루어보자 (Mirueoboja)

AI 기반 영화·음악 취향 테스트 서비스

## 🎬 Features

- **AI 감정 분석**: 사용자의 영화 취향을 감정 패턴으로 분석
- **영화 추천**: TMDB 기반 맞춤형 영화 추천
- **음악 큐레이션**: Spotify 기반 음악 플레이리스트 추천
- **모바일 최적화**: 375px 기준 반응형 디자인
- **감성적 UI/UX**: 따뜻하고 모던한 디자인

## 🚀 Tech Stack

- **Frontend**: React 19.2, Next.js 16, TypeScript
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios
- **Backend**: FastAPI (Python)
- **UI Components**: shadcn/ui

## 📦 Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create environment file:
\`\`\`bash
cp .env.example .env.local
\`\`\`

3. Update the API URL in `.env.local`:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:8000
\`\`\`

4. Start development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Colors
- **Primary**: `#6C63FF` - Main brand color
- **Secondary**: `#2F2E41` - Dark accent
- **Accent**: `#F6C945` - Warm highlight
- **Background**: `#F5F6FA` - Soft neutral
- **Text**: `#1A1A1A` - Primary text

### Typography
- **Font**: Geist (sans-serif)
- **Border Radius**: 18px+ for soft, modern feel

### Layout
- Mobile-first design (375px base)
- Card-based UI with rounded corners
- Subtle animations (fade, slide)

## 📁 Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Home page
│   ├── quiz/page.tsx         # Quiz page
│   ├── loading/page.tsx      # Loading animation
│   ├── results/
│   │   ├── movies/page.tsx   # Movie recommendations
│   │   ├── music/page.tsx    # Music recommendations
│   │   └── final/page.tsx    # Final summary
│   ├── error/page.tsx        # Error page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── lib/
│   ├── api/
│   │   ├── axios.ts          # Axios config
│   │   ├── questions.ts      # Questions API
│   │   ├── analysis.ts       # Analysis API
│   │   ├── recommend.ts      # Recommendations API
│   │   └── final.ts          # Final results API
│   └── types.ts              # TypeScript types
└── components/
    └── ui/                   # shadcn/ui components
\`\`\`

## 🔌 API Endpoints

### Backend (FastAPI)

- `GET /questions` - Get quiz questions and session ID
- `POST /analysis` - Submit answers for analysis
- `POST /recommend` - Get movie recommendations
- `GET /spotify/recommendations` - Get music recommendations
- `POST /final/recommend` - Get final summary results

## 🎯 User Flow

1. **Home** → User sees service introduction
2. **Quiz** → User answers 8 questions about movie preferences
3. **Loading** → 3-second analysis animation
4. **Movies** → View personalized movie recommendations
5. **Music** → Discover Spotify playlist
6. **Final** → Summary with share/retake options

## 🛠️ Development

### Running the Backend

Make sure the FastAPI backend is running on `http://localhost:8000`:

\`\`\`bash
cd backend
uvicorn main:app --reload
\`\`\`

### Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API base URL (default: `http://localhost:8000`)

## 📱 Mobile Optimization

- Optimized for 375px viewport
- Touch-friendly button sizes (min 44px)
- Swipe-friendly card layouts
- Responsive typography scaling

## 🎨 Animation Details

- **Page transitions**: Fade-in with 500-700ms duration
- **Button interactions**: Scale (1.05) on hover, scale (0.95) on active
- **Loading states**: Gradient spinner with pulse effect
- **Cards**: Staggered entrance animations (150ms delay)

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
