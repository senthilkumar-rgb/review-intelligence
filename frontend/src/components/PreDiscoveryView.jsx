import React from 'react';
import AccountSummary from './AccountSummary';
import IntentSignals from './IntentSignals';
import TechnicalReviews from './TechnicalReviews';
import TechnicalPainpoints from './TechnicalPainpoints';
import ICPContacts from './ICPContacts';
import ColdEmailScript from './ColdEmailScript';
import AceDiscovery from './AceDiscovery';
import AnthropicChat from './AnthropicChat';

export default function PreDiscoveryView({ formData }) {
  const [contacts, setContacts] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);

  const context = {
    stage: 'Pre Discovery',
    accountName: formData.accountName,
    companyUrl: formData.companyUrl,
    industry: formData.industry
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-px flex-1 bg-slate-800" />
        <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest px-3">🔍 Pre Discovery Output</span>
        <div className="h-px flex-1 bg-slate-800" />
      </div>

      <AccountSummary formData={formData} />
      <IntentSignals formData={formData} />
      <TechnicalReviews formData={formData} onReviewsLoaded={setReviews} />
      <TechnicalPainpoints formData={formData} reviews={reviews} />
      <ICPContacts formData={formData} onContactsLoaded={setContacts} />
      <ColdEmailScript formData={formData} contacts={contacts} reviews={reviews} />
      <AceDiscovery formData={formData} />
      <AnthropicChat context={context} label="Pre Discovery Assistant" />
    </div>
  );
}
