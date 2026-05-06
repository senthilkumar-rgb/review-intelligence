import React from 'react';
import AccountSummary from './AccountSummary';
import AttioUseCase from './AttioUseCase';
import OnePager from './OnePager';
import AceDemo from './AceDemo';
import AnthropicChat from './AnthropicChat';

export default function PostDiscoveryView({ formData }) {
  const [bant, setBant] = React.useState(null);

  const context = {
    stage: 'Post Discovery',
    accountName: formData.accountName,
    companyUrl: formData.companyUrl,
    industry: formData.industry,
    sdrName: formData.sdrName,
    aeName: formData.aeName,
    presalesName: formData.presalesName,
    meetingDate: formData.meetingDate
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-px flex-1 bg-slate-800" />
        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest px-3">🚀 Post Discovery Output</span>
        <div className="h-px flex-1 bg-slate-800" />
      </div>

      <AccountSummary formData={formData} postDiscovery />
      <AttioUseCase formData={formData} />
      <OnePager formData={formData} onBANTLoaded={setBant} />
      <AceDemo formData={formData} bant={bant} />
      <AnthropicChat context={context} label="Post Discovery Assistant" />
    </div>
  );
}
