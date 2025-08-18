import React, { useState, useCallback, useMemo } from 'react';
import { useHabits } from '../hooks/useHabits';
import Header from '../components/Header';
import StatsCards from '../components/StatsCards';
import HabitsSection from '../components/HabitsSection';
import AddHabitModal from '../components/AddHabitModal';
import SettingsModal from '../components/SettingsModal';
import { Habit, CreateHabitDto, UpdateHabitDto } from '../types';

const DashboardPage: React.FC = () => {
  const {
    habits,
    loading,
    error,
    createHabit,
    updateHabit,
    deleteHabit,
    markHabitComplete,
    getTodayEntry,
  } = useHabits();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  const handleCreateHabit = useCallback(
    async (data: CreateHabitDto) => {
      await createHabit(data);
    },
    [createHabit]
  );

  const handleUpdateHabit = useCallback(
    async (data: CreateHabitDto) => {
      if (!editingHabit) return;
      const updateData: UpdateHabitDto = data;
      await updateHabit(editingHabit.id, updateData);
      setEditingHabit(null);
    },
    [editingHabit, updateHabit]
  );

  const handleEditHabit = useCallback((habit: Habit) => {
    setEditingHabit(habit);
    setIsAddModalOpen(true);
  }, []);

  const handleDeleteHabit = useCallback(
    async (habitId: string) => {
      if (window.confirm('Are you sure you want to delete this habit?')) {
        await deleteHabit(habitId);
      }
    },
    [deleteHabit]
  );

  const handleCloseModal = useCallback(() => {
    setIsAddModalOpen(false);
    setEditingHabit(null);
  }, []);

  const handleOpenAddModal = useCallback(() => {
    setIsAddModalOpen(true);
  }, []);

  const handleOpenSettings = useCallback(() => {
    setIsSettingsModalOpen(true);
  }, []);

  const handleCloseSettings = useCallback(() => {
    setIsSettingsModalOpen(false);
  }, []);

  const { completedToday, totalHabits, progressPercentage } = useMemo(() => {
    const completed = habits.filter(habit => getTodayEntry(habit)).length;
    const total = habits.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      completedToday: completed,
      totalHabits: total,
      progressPercentage: percentage,
    };
  }, [habits, getTodayEntry]);

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <Header onOpenSettings={handleOpenSettings} />

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <StatsCards
          completedToday={completedToday}
          totalHabits={totalHabits}
          progressPercentage={progressPercentage}
        />

        <HabitsSection
          habits={habits}
          error={error}
          getTodayEntry={getTodayEntry}
          onComplete={markHabitComplete}
          onEdit={handleEditHabit}
          onDelete={handleDeleteHabit}
          onCreateHabit={handleOpenAddModal}
        />
      </main>

      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingHabit ? handleUpdateHabit : handleCreateHabit}
        editingHabit={editingHabit}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={handleCloseSettings}
      />
    </div>
  );
};

export default DashboardPage;
