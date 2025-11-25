import React, { useState } from 'react';
import '../styles/MoodDiary.css';

const MoodDiary = () => {
  const [mood, setMood] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);

  const moods = [
    { emoji: '😊', name: 'Счастливый' },
    { emoji: '😢', name: 'Грустный' },
    { emoji: '😡', name: 'Злой' },
    { emoji: '😴', name: 'Уставший' },
    { emoji: '😃', name: 'Восторг' },
    { emoji: '😌', name: 'Спокойный' },
    { emoji: '🤔', name: 'Задумчивый' },
    { emoji: '😎', name: 'Крутой' }
  ];

  const handleSaveMood = () => {
    if (!mood) {
      alert('Пожалуйста, выберите настроение!');
      return;
    }

    const selectedMood = moods.find(m => m.emoji === mood);
    const newEntry = {
      id: Date.now(),
      date,
      mood: selectedMood.emoji,
      moodName: selectedMood.name,
      notes
    };

    setMoodHistory([newEntry, ...moodHistory]);
    setMood('');
    setNotes('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleDeleteEntry = (id) => {
    setMoodHistory(moodHistory.filter(entry => entry.id !== id));
  };

  return (
    <div className="mood-diary">
      <h1>📔 Мини-дневник настроения</h1>
      
      <div className="mood-selector">
        <h2>Какое у вас настроение сегодня?</h2>
        
        <div className="date-selector">
          <label>Дата:</label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mood-options">
          {moods.map((moodItem) => (
            <button
              key={moodItem.emoji}
              className={`mood-btn ${mood === moodItem.emoji ? 'selected' : ''}`}
              onClick={() => setMood(moodItem.emoji)}
            >
              <span className="emoji">{moodItem.emoji}</span>
              <span className="mood-name">{moodItem.name}</span>
            </button>
          ))}
        </div>

        <div className="notes-section">
          <label>Заметки (необязательно):</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Опишите своё настроение подробнее..."
            rows="3"
          />
        </div>

        <button className="save-btn" onClick={handleSaveMood}>
          💾 Сохранить настроение
        </button>
      </div>

      <div className="mood-history">
        <h2>История настроений</h2>
        {moodHistory.length === 0 ? (
          <p className="no-entries">Записей пока нет</p>
        ) : (
          <div className="history-list">
            {moodHistory.map(entry => (
              <div key={entry.id} className="history-item">
                <div className="entry-header">
                  <span className="entry-date">{entry.date}</span>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteEntry(entry.id)}
                  >
                    ❌
                  </button>
                </div>
                <div className="entry-mood">
                  <span className="emoji">{entry.mood}</span>
                  <span className="mood-name">{entry.moodName}</span>
                </div>
                {entry.notes && (
                  <div className="entry-notes">
                    <strong>Заметки:</strong> {entry.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodDiary;