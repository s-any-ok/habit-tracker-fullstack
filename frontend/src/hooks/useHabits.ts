import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Habit,
  CreateHabitDto,
  UpdateHabitDto,
  CreateHabitEntryDto,
} from '../types';
import { habitsApi } from '../services/api';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHabits = useCallback(async () => {
    try {
      setLoading(true);
      const data = await habitsApi.getAll();
      setHabits(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch habits');
      console.error('Failed to fetch habits:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createHabit = useCallback(
    async (data: CreateHabitDto): Promise<Habit> => {
      try {
        const newHabit = await habitsApi.create(data);
        setHabits(prev => [newHabit, ...prev]);
        return newHabit;
      } catch (err) {
        setError('Failed to create habit');
        throw err;
      }
    },
    []
  );

  const updateHabit = useCallback(
    async (id: string, data: UpdateHabitDto): Promise<Habit> => {
      try {
        const updatedHabit = await habitsApi.update(id, data);
        setHabits(prev =>
          prev.map(habit => (habit.id === id ? updatedHabit : habit))
        );
        return updatedHabit;
      } catch (err) {
        setError('Failed to update habit');
        throw err;
      }
    },
    []
  );

  const deleteHabit = useCallback(async (id: string): Promise<void> => {
    try {
      await habitsApi.delete(id);
      setHabits(prev => prev.filter(habit => habit.id !== id));
    } catch (err) {
      setError('Failed to delete habit');
      throw err;
    }
  }, []);

  const markHabitComplete = useCallback(
    async (habitId: string, date: string, notes?: string) => {
      try {
        const entryData: CreateHabitEntryDto = {
          completedDate: date,
          notes,
        };
        await habitsApi.createEntry(habitId, entryData);

        await fetchHabits();
      } catch (err) {
        setError('Failed to mark habit as complete');
        throw err;
      }
    },
    [fetchHabits]
  );

  const getTodayEntry = useCallback((habit: Habit): boolean => {
    const today = new Date().toISOString().split('T')[0];
    return (
      habit.entries?.some(
        entry => entry.completedDate.split('T')[0] === today
      ) || false
    );
  }, []);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  return {
    habits,
    loading,
    error,
    fetchHabits,
    createHabit,
    updateHabit,
    deleteHabit,
    markHabitComplete,
    getTodayEntry,
  };
};
