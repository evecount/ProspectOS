
"use client"

import { useState, useEffect } from 'react';
import { Lead, INITIAL_USER_STATE } from './mock-data';

export function useProspectStore() {
  const [state, setState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('prospect_os_state');
      return saved ? JSON.parse(saved) : INITIAL_USER_STATE;
    }
    return INITIAL_USER_STATE;
  });

  useEffect(() => {
    localStorage.setItem('prospect_os_state', JSON.stringify(state));
  }, [state]);

  const unlockLead = (leadId: string) => {
    if (state.unlockedLeads.includes(leadId)) return true;
    if (state.credits <= 0) return false;

    setState((prev: any) => ({
      ...prev,
      credits: prev.credits - 1,
      unlockedLeads: [...prev.unlockedLeads, leadId]
    }));
    return true;
  };

  const saveToList = (listId: string, leadId: string) => {
    setState((prev: any) => ({
      ...prev,
      savedLists: prev.savedLists.map((list: any) => 
        list.id === listId 
          ? { ...list, leadIds: Array.from(new Set([...list.leadIds, leadId])) }
          : list
      )
    }));
  };

  const addList = (name: string) => {
    const newList = {
      id: `list-${Date.now()}`,
      name,
      leadIds: []
    };
    setState((prev: any) => ({
      ...prev,
      savedLists: [...prev.savedLists, newList]
    }));
  };

  const addCredits = (amount: number) => {
    setState((prev: any) => ({
      ...prev,
      credits: prev.credits + amount
    }));
  };

  return {
    ...state,
    unlockLead,
    saveToList,
    addList,
    addCredits
  };
}
