import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IntroPage from './pages/intro/IntroPage';
import PortalPage from './pages/portal/PortalPage';
import SelectKingdomPage from './pages/kingdom/SelectKingdomPage'; 
import KingdomChatPage from './pages/kingdom/KingdomChatPage'; 
import AnalysisReportPage from './pages/report/AnalysisReportPage'; 
import ProfilePage from './pages/profile/ProfilePage';
import MissionPage from './pages/mission/MissionPage';
import GuardianCodexPage from './pages/guardian-codex/GuardianCodexPage';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. 인트로 */}
        <Route path="/" element={<IntroPage />} />
        
        {/* 2. 감정 입력 포털 */}
        <Route path="/portal" element={<PortalPage />} />
        
        {/* 3. 왕국 선택 */}
        <Route path="/kingdom/select" element={<SelectKingdomPage />} />
        
        {/* 4. 수호자 도감 상세 페이지  */}
        <Route path="/guardian/:guardianId" element={<GuardianCodexPage />} />

        {/* 5. 채팅방 */}
        <Route path="/chat/:kingdomId" element={<KingdomChatPage />} />
        
        {/* 6. 분석 리포트 */}
        <Route path="/report" element={<AnalysisReportPage />} />
        
        {/* 7. 미션 페이지 */}
        <Route path="/mission/:missionType" element={<MissionPage />} />
        
        {/* 8. 프로필 페이지 */}
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;