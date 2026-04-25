import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Theory from './pages/Theory';
import VirtualLab from './pages/VirtualLab';
import AnatomyLab from './pages/labs/AnatomyLab';
import CranialCTScanLab from './pages/labs/CranialCTScanLab';
import BrainSectionsLab from './pages/labs/BrainSectionsLab';
import BoneScintigraphyLab from './pages/labs/BoneScintigraphyLab';
import SpinalCordLab from './pages/labs/SpinalCordLab';
import HumanBrainLab from './pages/labs/HumanBrainLab';
import SenseOfTasteLab from './pages/labs/SenseOfTasteLab';
import UrinarySystemLab from './pages/labs/UrinarySystemLab';
import DigestiveTractLab from './pages/labs/DigestiveTractLab';
import MuscleContractionLab from './pages/labs/MuscleContractionLab';
import MaleReproductiveLab from './pages/labs/MaleReproductiveLab';
import RespiratorySystemLab from './pages/labs/RespiratorySystemLab';
import FemaleReproductiveLab from './pages/labs/FemaleReproductiveLab';
import Chatbot from './components/Chatbot';

// Force HMR Rebuild
function App() {
  return (
    <BrowserRouter>
      <Chatbot />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="theory" element={<Theory />} />
          <Route path="virtual-lab" element={<VirtualLab />} />
        </Route>
        <Route path="/virtual-lab/anatomy" element={<AnatomyLab />} />
        <Route path="/virtual-lab/ct-scan" element={<CranialCTScanLab />} />
        <Route path="/virtual-lab/brain-sections" element={<BrainSectionsLab />} />
        <Route path="/virtual-lab/bone-scintigraphy" element={<BoneScintigraphyLab />} />
        <Route path="/virtual-lab/spinal-cord" element={<SpinalCordLab />} />
        <Route path="/virtual-lab/human-brain" element={<HumanBrainLab />} />
        <Route path="/virtual-lab/taste" element={<SenseOfTasteLab />} />
        <Route path="/virtual-lab/urinary-system" element={<UrinarySystemLab />} />
        <Route path="/virtual-lab/digestive-tract" element={<DigestiveTractLab />} />
        <Route path="/virtual-lab/muscle-contraction" element={<MuscleContractionLab />} />
        <Route path="/virtual-lab/respiratory-system" element={<RespiratorySystemLab />} />
        <Route path="/virtual-lab/male-reproductive" element={<MaleReproductiveLab />} />
        <Route path="/virtual-lab/female-reproductive" element={<FemaleReproductiveLab />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
