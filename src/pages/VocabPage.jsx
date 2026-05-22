import React from 'react';
import { VocabLadder } from '@features/vocab-ladder';
import { LocalStorageAdapter } from '@features/vocab-ladder/storage/adapter';

const adapter = new LocalStorageAdapter('cert-farmer:vocab');

export default function VocabPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-xl mx-auto">
        <VocabLadder adapter={adapter} initialMode="learn" />
      </div>
    </div>
  );
}
