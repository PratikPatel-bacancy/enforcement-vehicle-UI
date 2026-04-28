import { useState } from 'react';
import { CameraFeed } from '../CameraFeed';
import { PlateCapture } from '../PlateCapture';
import { StatsStrip } from '../StatsStrip';
import { RecentReadsTable } from '../RecentReadsTable';
import { CameraSidebar } from '../CameraSidebar';

export function LiveMonitor() {
  const [selectedCamera, setSelectedCamera] = useState('CAM-01');

  return (
    <div className="flex h-full">
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <CameraFeed cameraId={selectedCamera} />
        <PlateCapture cameraId={selectedCamera} />
        <StatsStrip />
        <RecentReadsTable />
      </div>
      <CameraSidebar selectedCamera={selectedCamera} onCameraSelect={setSelectedCamera} />
    </div>
  );
}
