import React, { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { CreateHabitDto, Habit } from '../types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateHabitDto) => Promise<void>;
  editingHabit?: Habit | null;
};

const HABIT_COLORS = [
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#06B6D4',
  '#F97316',
  '#EC4899',
];

const AddHabitModal: React.FC<Props> = memo(
  ({ isOpen, onClose, onSubmit, editingHabit }) => {
    const [formData, setFormData] = useState<CreateHabitDto>({
      title: '',
      description: '',
      color: HABIT_COLORS[0],
      frequency: 'daily',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
      if (editingHabit) {
        setFormData({
          title: editingHabit.title,
          description: editingHabit.description || '',
          color: editingHabit.color,
          frequency: editingHabit.frequency,
        });
      } else {
        setFormData({
          title: '',
          description: '',
          color: HABIT_COLORS[0],
          frequency: 'daily',
        });
      }
    }, [editingHabit, isOpen]);

    const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        setIsSubmitting(true);
        try {
          await onSubmit(formData);
          onClose();
        } catch (error) {
          console.error('Failed to save habit:', error);
        } finally {
          setIsSubmitting(false);
        }
      },
      [formData, onSubmit, onClose]
    );

    const handleChange = useCallback(
      (field: keyof CreateHabitDto, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
      },
      []
    );

    const modalTitle = useMemo(
      () => (editingHabit ? 'Edit Habit' : 'New Habit'),
      [editingHabit]
    );

    const submitButtonText = useMemo(() => {
      if (isSubmitting) return 'Saving...';
      return editingHabit ? 'Save' : 'Create';
    }, [isSubmitting, editingHabit]);

    const frequencyOptions = useMemo(
      () => [
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
      ],
      []
    );

    if (!isOpen) return null;

    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
        <div className='bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto'>
          <div className='p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-semibold text-gray-900'>
                {modalTitle}
              </h2>
              <button
                onClick={onClose}
                className='text-gray-400 hover:text-gray-600 transition-colors'
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Habit Name *
                </label>
                <input
                  type='text'
                  id='title'
                  value={formData.title}
                  onChange={e => handleChange('title', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500'
                  placeholder='e.g. Read for 30 minutes'
                  required
                />
              </div>

              <div>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Description (optional)
                </label>
                <textarea
                  id='description'
                  value={formData.description}
                  onChange={e => handleChange('description', e.target.value)}
                  rows={3}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500'
                  placeholder='Detailed habit description...'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Frequency
                </label>
                <div className='space-y-2'>
                  {frequencyOptions.map(option => (
                    <label key={option.value} className='flex items-center'>
                      <input
                        type='radio'
                        name='frequency'
                        value={option.value}
                        checked={formData.frequency === option.value}
                        onChange={e =>
                          handleChange('frequency', e.target.value)
                        }
                        className='h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300'
                      />
                      <span className='ml-2 text-sm text-gray-700'>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Color
                </label>
                <div className='flex flex-wrap gap-2'>
                  {HABIT_COLORS.map(color => (
                    <button
                      key={color}
                      type='button'
                      onClick={() => handleChange('color', color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        formData.color === color
                          ? 'border-gray-400'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className='flex space-x-3 pt-4'>
                <button
                  type='button'
                  onClick={onClose}
                  className='flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={isSubmitting || !formData.title.trim()}
                  className='flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {submitButtonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
);

AddHabitModal.displayName = 'AddHabitModal';

export default AddHabitModal;
