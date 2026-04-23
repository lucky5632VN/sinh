import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Theory from './pages/Theory';
import VirtualLab from './pages/VirtualLab';
import MembraneLab from './pages/labs/MembraneLab';
import DnaStretchingLab from './pages/labs/DnaStretchingLab';
import EnzymeLab from './pages/labs/EnzymeLab';
import EatingLab from './pages/labs/EatingLab';
import ColorVisionLab from './pages/labs/ColorVisionLab';
import MendelLab from './pages/labs/MendelLab';
import AnatomyLab from './pages/labs/AnatomyLab';
import CranialCTScanLab from './pages/labs/CranialCTScanLab';
import FrogReflexLab from './pages/labs/FrogReflexLab';
import PlantCycleLab from './pages/labs/PlantCycleLab';
import BrainSectionsLab from './pages/labs/BrainSectionsLab';
import BoneScintigraphyLab from './pages/labs/BoneScintigraphyLab';
import ImmuneSystemLab from './pages/labs/ImmuneSystemLab';
import SpinalCordLab from './pages/labs/SpinalCordLab';
import HumanBrainLab from './pages/labs/HumanBrainLab';
import SenseOfTasteLab from './pages/labs/SenseOfTasteLab';

// Force HMR Rebuild
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="theory" element={<Theory />} />
          <Route path="virtual-lab" element={<VirtualLab />} />
          <Route path="virtual-lab/membrane" element={<MembraneLab />} />
          <Route path="virtual-lab/enzyme" element={<EnzymeLab />} />
          <Route path="virtual-lab/dna" element={<DnaStretchingLab />} />
          <Route path="virtual-lab/eating" element={<EatingLab />} />
          <Route path="virtual-lab/vision" element={<ColorVisionLab />} />
          <Route path="virtual-lab/mendel" element={<MendelLab />} />
        </Route>
        <Route path="/virtual-lab/anatomy" element={<AnatomyLab />} />
        <Route path="/virtual-lab/ct-scan" element={<CranialCTScanLab />} />
        <Route path="/virtual-lab/brain-sections" element={<BrainSectionsLab />} />
        <Route path="/virtual-lab/bone-scintigraphy" element={<BoneScintigraphyLab />} />
        <Route path="/virtual-lab/immune-system" element={<ImmuneSystemLab />} />
        <Route path="/virtual-lab/spinal-cord" element={<SpinalCordLab />} />
        <Route path="/virtual-lab/human-brain" element={<HumanBrainLab />} />
        <Route path="/virtual-lab/taste" element={<SenseOfTasteLab />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
