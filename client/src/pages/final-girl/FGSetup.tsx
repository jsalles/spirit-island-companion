/**
 * Final Girl Setup — Horror-themed setup wizard
 * Film selection, manual/random game config, setup checklist
 */
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFinalGirl } from '@/contexts/FinalGirlContext';
import {
  FEATURE_FILMS, SERIES_LABELS, FINAL_GIRLS, DIFFICULTY_COLORS,
  randomizeGame, getFilmById, getFinalGirlsByFilm,
  type Series, type FeatureFilm, type Killer, type FinalGirlCharacter
} from '@/lib/finalGirlData';
import { ArrowLeft, ArrowRight, Check, Shuffle, Skull, Film, MapPin, User, Sparkles, Crosshair, Dices } from 'lucide-react';
import { toast } from 'sonner';

const STEPS = ['Feature Films', 'Choose Game', 'Setup Checklist'];

export default function FGSetup() {
  const { state, dispatch, updateSession } = useFinalGirl();
  const [step, setStep] = useState(0);

  const session = state.currentSession;
  if (!session) return null;

  const handleBack = () => {
    if (step === 0) {
      dispatch({ type: 'CLEAR_SESSION' });
    } else {
      setStep(s => s - 1);
    }
  };

  const handleNext = () => {
    if (step === 0 && state.ownedFilms.length === 0) {
      toast.error('Select at least one Feature Film to continue');
      return;
    }
    if (step === 1 && (!session.killer || !session.location || !session.finalGirl)) {
      toast.error('Select a Killer, Location, and Final Girl to continue');
      return;
    }
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    }
  };

  const handleCompleteSetup = () => {
    dispatch({ type: 'COMPLETE_SETUP' });
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#0a0505' }}>
      {/* Film grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-50" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
      }} />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b backdrop-blur-xl" style={{ backgroundColor: 'rgba(10, 5, 5, 0.9)', borderColor: 'rgba(220, 38, 38, 0.15)' }}>
        <div className="container py-4">
          <div className="flex items-center justify-between mb-3">
            <button onClick={handleBack} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <ArrowLeft className="w-4 h-4" />
              {step === 0 ? 'Cancel' : 'Back'}
            </button>
            <h1 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Game Setup
            </h1>
            <div className="w-16" />
          </div>
          {/* Progress */}
          <div className="flex gap-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex-1">
                <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: '#dc2626' }}
                    initial={{ width: '0%' }}
                    animate={{ width: i <= step ? '100%' : '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <p className="text-xs mt-1 text-center" style={{ color: i <= step ? '#dc2626' : 'rgba(255,255,255,0.3)' }}>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Step Content */}
      <main className="container py-8 pb-32">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="films" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <FilmSelectionStep />
            </motion.div>
          )}
          {step === 1 && (
            <motion.div key="choose" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <ChooseGameStep onComplete={() => setStep(2)} />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="checklist" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <ChecklistStep />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-xl" style={{ backgroundColor: 'rgba(10, 5, 5, 0.95)', borderColor: 'rgba(220, 38, 38, 0.15)' }}>
        <div className="container py-4 flex justify-between items-center">
          <button onClick={handleBack} className="px-4 py-2 rounded-lg text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {step === 0 ? 'Cancel' : 'Back'}
          </button>
          {step < 2 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all hover:brightness-110"
              style={{ backgroundColor: '#dc2626' }}
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleCompleteSetup}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all hover:brightness-110"
              style={{ backgroundColor: '#dc2626' }}
            >
              <Skull className="w-4 h-4" /> Begin the Horror
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Film Selection Step ────────────────────────────────────────────────────

function FilmSelectionStep() {
  const { state, dispatch } = useFinalGirl();
  const ownedFilms = state.ownedFilms;

  const toggleFilm = (filmId: string) => {
    const updated = ownedFilms.includes(filmId)
      ? ownedFilms.filter(id => id !== filmId)
      : [...ownedFilms, filmId];
    dispatch({ type: 'SET_OWNED_FILMS', films: updated });
  };

  const toggleSeries = (series: Series) => {
    const seriesFilms = FEATURE_FILMS.filter(f => f.series === series).map(f => f.id);
    const allSelected = seriesFilms.every(id => ownedFilms.includes(id));
    const updated = allSelected
      ? ownedFilms.filter(id => !seriesFilms.includes(id))
      : Array.from(new Set([...ownedFilms, ...seriesFilms]));
    dispatch({ type: 'SET_OWNED_FILMS', films: updated });
  };

  const seriesGroups = useMemo(() => {
    const groups: Record<Series, FeatureFilm[]> = { series1: [], series2: [], series3: [], series4: [], special: [] };
    FEATURE_FILMS.forEach(f => groups[f.series].push(f));
    return groups;
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Select Your Feature Films
        </h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Source Serif 4', serif" }}>
          Choose the Feature Films you own. You can then pick or randomize from your collection.
        </p>
      </div>

      <div className="space-y-8">
        {(Object.entries(seriesGroups) as [Series, FeatureFilm[]][]).map(([series, films]) => (
          <div key={series}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold" style={{ color: '#dc2626', fontFamily: "'Playfair Display', serif" }}>
                {SERIES_LABELS[series]}
              </h3>
              <button
                onClick={() => toggleSeries(series)}
                className="text-xs px-3 py-1 rounded-full border transition-all"
                style={{
                  borderColor: 'rgba(220, 38, 38, 0.3)',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                {films.every(f => ownedFilms.includes(f.id)) ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {films.map(film => {
                const selected = ownedFilms.includes(film.id);
                return (
                  <motion.button
                    key={film.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggleFilm(film.id)}
                    className="relative text-left p-4 rounded-xl border transition-all duration-200"
                    style={{
                      backgroundColor: selected ? 'rgba(220, 38, 38, 0.1)' : 'rgba(255,255,255,0.02)',
                      borderColor: selected ? 'rgba(220, 38, 38, 0.5)' : 'rgba(255,255,255,0.08)',
                    }}
                  >
                    {selected && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#dc2626' }}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <h4 className="text-sm font-semibold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {film.name}
                    </h4>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      <span style={{ color: DIFFICULTY_COLORS[film.killer.difficulty] }}>{film.killer.name}</span>
                      {' • '}{film.location.name}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl border" style={{ backgroundColor: 'rgba(220, 38, 38, 0.05)', borderColor: 'rgba(220, 38, 38, 0.2)' }}>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
          <strong style={{ color: '#dc2626' }}>{ownedFilms.length}</strong> Feature Films selected
        </p>
      </div>
    </div>
  );
}

// ─── Choose Game Step (Manual + Random) ─────────────────────────────────────

function ChooseGameStep({ onComplete }: { onComplete: () => void }) {
  const { state, updateSession } = useFinalGirl();
  const session = state.currentSession;
  const [difficulty, setDifficulty] = useState<string>(session?.difficulty || 'normal');
  const [mode, setMode] = useState<'manual' | 'random'>('manual');

  // Derive available options from owned films
  const ownedFilmData = useMemo(() => {
    return FEATURE_FILMS.filter(f => state.ownedFilms.includes(f.id));
  }, [state.ownedFilms]);

  const availableKillers = useMemo(() => {
    return ownedFilmData.map(f => ({ ...f.killer, filmName: f.name }));
  }, [ownedFilmData]);

  const availableLocations = useMemo(() => {
    return ownedFilmData.map(f => ({ ...f.location, filmName: f.name }));
  }, [ownedFilmData]);

  const availableFinalGirls = useMemo(() => {
    return ownedFilmData.flatMap(f => getFinalGirlsByFilm(f.id));
  }, [ownedFilmData]);

  // Track individual selections
  const [selectedKiller, setSelectedKiller] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedFinalGirl, setSelectedFinalGirl] = useState<string | null>(null);

  const handleManualConfirm = () => {
    if (!selectedKiller || !selectedLocation || !selectedFinalGirl) {
      toast.error('Please select a Killer, Location, and Final Girl');
      return;
    }
    const killer = availableKillers.find(k => k.id === selectedKiller);
    const location = availableLocations.find(l => l.id === selectedLocation);
    const finalGirl = availableFinalGirls.find(fg => fg.id === selectedFinalGirl);
    if (!killer || !location || !finalGirl) return;

    updateSession({
      killer: killer.name + ' — ' + killer.title,
      location: location.name,
      finalGirl: finalGirl.name,
      difficulty,
    });
    onComplete();
  };

  const handleRandomize = () => {
    const result = randomizeGame(state.ownedFilms);
    if (!result) {
      toast.error('No Feature Films selected!');
      return;
    }
    updateSession({
      killer: result.killer.name + ' — ' + result.killer.title,
      location: result.location.name,
      finalGirl: result.finalGirl.name,
      difficulty,
    });
    toast.success('Randomized! Review your setup below.');
  };

  const handleRandomizeAndGo = () => {
    const result = randomizeGame(state.ownedFilms);
    if (!result) {
      toast.error('No Feature Films selected!');
      return;
    }
    updateSession({
      killer: result.killer.name + ' — ' + result.killer.title,
      location: result.location.name,
      finalGirl: result.finalGirl.name,
      difficulty,
    });
    onComplete();
  };

  const handleRandomizeOne = (type: 'killer' | 'location' | 'finalGirl') => {
    if (type === 'killer') {
      const k = availableKillers[Math.floor(Math.random() * availableKillers.length)];
      setSelectedKiller(k.id);
      toast.success(`Randomized: ${k.name}`);
    } else if (type === 'location') {
      const l = availableLocations[Math.floor(Math.random() * availableLocations.length)];
      setSelectedLocation(l.id);
      toast.success(`Randomized: ${l.name}`);
    } else {
      const fg = availableFinalGirls[Math.floor(Math.random() * availableFinalGirls.length)];
      setSelectedFinalGirl(fg.id);
      toast.success(`Randomized: ${fg.name}`);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Choose Your Game
        </h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Source Serif 4', serif" }}>
          Pick your Killer, Location, and Final Girl manually — or let fate decide with the randomizer.
          Mix and match any combination from your owned Feature Films!
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6 p-1 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
        <button
          onClick={() => setMode('manual')}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{
            backgroundColor: mode === 'manual' ? 'rgba(220, 38, 38, 0.15)' : 'transparent',
            color: mode === 'manual' ? '#dc2626' : 'rgba(255,255,255,0.5)',
            border: mode === 'manual' ? '1px solid rgba(220, 38, 38, 0.3)' : '1px solid transparent',
          }}
        >
          <Crosshair className="w-4 h-4" /> Manual Pick
        </button>
        <button
          onClick={() => setMode('random')}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{
            backgroundColor: mode === 'random' ? 'rgba(220, 38, 38, 0.15)' : 'transparent',
            color: mode === 'random' ? '#dc2626' : 'rgba(255,255,255,0.5)',
            border: mode === 'random' ? '1px solid rgba(220, 38, 38, 0.3)' : '1px solid transparent',
          }}
        >
          <Dices className="w-4 h-4" /> Randomize
        </button>
      </div>

      {/* Difficulty */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3" style={{ color: 'rgba(255,255,255,0.8)' }}>Difficulty Mode</h3>
        <div className="flex gap-3">
          {[
            { id: 'normal', label: 'Normal', color: '#4CAF50' },
            { id: 'extreme', label: 'Extreme Horror', color: '#dc2626' },
          ].map(d => (
            <button
              key={d.id}
              onClick={() => setDifficulty(d.id)}
              className="px-4 py-2 rounded-lg border text-sm font-medium transition-all"
              style={{
                backgroundColor: difficulty === d.id ? d.color + '20' : 'transparent',
                borderColor: difficulty === d.id ? d.color : 'rgba(255,255,255,0.1)',
                color: difficulty === d.id ? d.color : 'rgba(255,255,255,0.5)',
              }}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'manual' ? (
          <motion.div key="manual" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            <ManualSelectionPanel
              availableKillers={availableKillers}
              availableLocations={availableLocations}
              availableFinalGirls={availableFinalGirls}
              selectedKiller={selectedKiller}
              selectedLocation={selectedLocation}
              selectedFinalGirl={selectedFinalGirl}
              onSelectKiller={setSelectedKiller}
              onSelectLocation={setSelectedLocation}
              onSelectFinalGirl={setSelectedFinalGirl}
              onRandomizeOne={handleRandomizeOne}
              onConfirm={handleManualConfirm}
            />
          </motion.div>
        ) : (
          <motion.div key="random" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            <RandomPanel
              session={session}
              onRandomize={handleRandomize}
              onRandomizeAndGo={handleRandomizeAndGo}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Manual Selection Panel ─────────────────────────────────────────────────

interface ManualSelectionPanelProps {
  availableKillers: (Killer & { filmName: string })[];
  availableLocations: ({ id: string; name: string; description: string; searchSpaces: number; exitSpaces: number; specialRules: string; filmName: string })[];
  availableFinalGirls: FinalGirlCharacter[];
  selectedKiller: string | null;
  selectedLocation: string | null;
  selectedFinalGirl: string | null;
  onSelectKiller: (id: string) => void;
  onSelectLocation: (id: string) => void;
  onSelectFinalGirl: (id: string) => void;
  onRandomizeOne: (type: 'killer' | 'location' | 'finalGirl') => void;
  onConfirm: () => void;
}

function ManualSelectionPanel({
  availableKillers, availableLocations, availableFinalGirls,
  selectedKiller, selectedLocation, selectedFinalGirl,
  onSelectKiller, onSelectLocation, onSelectFinalGirl,
  onRandomizeOne, onConfirm,
}: ManualSelectionPanelProps) {
  const [expandedSection, setExpandedSection] = useState<'killer' | 'location' | 'finalGirl' | null>('killer');

  const killerObj = availableKillers.find(k => k.id === selectedKiller);
  const locationObj = availableLocations.find(l => l.id === selectedLocation);
  const fgObj = availableFinalGirls.find(fg => fg.id === selectedFinalGirl);

  return (
    <div className="space-y-4">
      {/* Killer Selection */}
      <SelectionSection
        title="Killer"
        icon={<Skull className="w-4 h-4" />}
        color="#dc2626"
        expanded={expandedSection === 'killer'}
        onToggle={() => setExpandedSection(expandedSection === 'killer' ? null : 'killer')}
        selectedLabel={killerObj ? `${killerObj.name} — ${killerObj.title}` : undefined}
        onRandomize={() => onRandomizeOne('killer')}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {availableKillers.map(killer => (
            <motion.button
              key={killer.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onSelectKiller(killer.id);
                setExpandedSection('location');
              }}
              className="text-left p-3 rounded-lg border transition-all"
              style={{
                backgroundColor: selectedKiller === killer.id ? 'rgba(220, 38, 38, 0.15)' : 'rgba(255,255,255,0.02)',
                borderColor: selectedKiller === killer.id ? '#dc2626' : 'rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-white">{killer.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: DIFFICULTY_COLORS[killer.difficulty] + '30', color: DIFFICULTY_COLORS[killer.difficulty] }}>
                  {killer.difficulty}
                </span>
              </div>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{killer.title}</p>
              <p className="text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>from {killer.filmName}</p>
            </motion.button>
          ))}
        </div>
      </SelectionSection>

      {/* Location Selection */}
      <SelectionSection
        title="Location"
        icon={<MapPin className="w-4 h-4" />}
        color="#f97316"
        expanded={expandedSection === 'location'}
        onToggle={() => setExpandedSection(expandedSection === 'location' ? null : 'location')}
        selectedLabel={locationObj?.name}
        onRandomize={() => onRandomizeOne('location')}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {availableLocations.map(location => (
            <motion.button
              key={location.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onSelectLocation(location.id);
                setExpandedSection('finalGirl');
              }}
              className="text-left p-3 rounded-lg border transition-all"
              style={{
                backgroundColor: selectedLocation === location.id ? 'rgba(249, 115, 22, 0.15)' : 'rgba(255,255,255,0.02)',
                borderColor: selectedLocation === location.id ? '#f97316' : 'rgba(255,255,255,0.08)',
              }}
            >
              <span className="text-sm font-semibold text-white">{location.name}</span>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{location.description.slice(0, 60)}...</p>
              <p className="text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>from {location.filmName}</p>
            </motion.button>
          ))}
        </div>
      </SelectionSection>

      {/* Final Girl Selection */}
      <SelectionSection
        title="Final Girl"
        icon={<User className="w-4 h-4" />}
        color="#a855f7"
        expanded={expandedSection === 'finalGirl'}
        onToggle={() => setExpandedSection(expandedSection === 'finalGirl' ? null : 'finalGirl')}
        selectedLabel={fgObj?.name}
        onRandomize={() => onRandomizeOne('finalGirl')}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {availableFinalGirls.map(fg => {
            const film = FEATURE_FILMS.find(f => f.id === fg.fromFilm);
            return (
              <motion.button
                key={fg.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  onSelectFinalGirl(fg.id);
                  setExpandedSection(null);
                }}
                className="text-left p-3 rounded-lg border transition-all"
                style={{
                  backgroundColor: selectedFinalGirl === fg.id ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255,255,255,0.02)',
                  borderColor: selectedFinalGirl === fg.id ? '#a855f7' : 'rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-white">{fg.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' }}>
                    ❤️ {fg.health}
                  </span>
                </div>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{fg.specialAbility}</p>
                <p className="text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>from {film?.name || fg.fromFilm}</p>
              </motion.button>
            );
          })}
        </div>
      </SelectionSection>

      {/* Confirm Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onConfirm}
        disabled={!selectedKiller || !selectedLocation || !selectedFinalGirl}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-lg font-semibold text-white transition-all mt-6"
        style={{
          backgroundColor: (selectedKiller && selectedLocation && selectedFinalGirl) ? '#dc2626' : 'rgba(220, 38, 38, 0.3)',
          opacity: (selectedKiller && selectedLocation && selectedFinalGirl) ? 1 : 0.6,
          cursor: (selectedKiller && selectedLocation && selectedFinalGirl) ? 'pointer' : 'not-allowed',
        }}
      >
        <Sparkles className="w-5 h-5" />
        Confirm Selection & Setup
      </motion.button>

      {/* Selection Summary */}
      {(selectedKiller || selectedLocation || selectedFinalGirl) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-xl border space-y-2"
          style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <h4 className="text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>Current Selection</h4>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Killer</p>
              <p className="text-xs font-semibold" style={{ color: selectedKiller ? '#dc2626' : 'rgba(255,255,255,0.3)' }}>
                {killerObj?.name || '—'}
              </p>
            </div>
            <div>
              <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Location</p>
              <p className="text-xs font-semibold" style={{ color: selectedLocation ? '#f97316' : 'rgba(255,255,255,0.3)' }}>
                {locationObj?.name || '—'}
              </p>
            </div>
            <div>
              <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Final Girl</p>
              <p className="text-xs font-semibold" style={{ color: selectedFinalGirl ? '#a855f7' : 'rgba(255,255,255,0.3)' }}>
                {fgObj?.name || '—'}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Selection Section (Accordion) ──────────────────────────────────────────

interface SelectionSectionProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  expanded: boolean;
  onToggle: () => void;
  selectedLabel?: string;
  onRandomize: () => void;
  children: React.ReactNode;
}

function SelectionSection({ title, icon, color, expanded, onToggle, selectedLabel, onRandomize, children }: SelectionSectionProps) {
  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: expanded ? color + '40' : 'rgba(255,255,255,0.08)' }}>
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 transition-all"
        style={{ backgroundColor: expanded ? color + '08' : 'rgba(255,255,255,0.02)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + '20', color }}>
            {icon}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-white">{title}</p>
            {selectedLabel && !expanded && (
              <p className="text-xs" style={{ color }}>{selectedLabel}</p>
            )}
            {!selectedLabel && !expanded && (
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Not selected</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedLabel && (
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ArrowRight className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)', transform: 'rotate(90deg)' }} />
          </motion.div>
        </div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0">
              {/* Randomize single button */}
              <button
                onClick={(e) => { e.stopPropagation(); onRandomize(); }}
                className="flex items-center gap-2 mb-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:brightness-110"
                style={{ backgroundColor: color + '15', color, border: `1px solid ${color}30` }}
              >
                <Shuffle className="w-3 h-3" /> Randomize {title}
              </button>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Random Panel ───────────────────────────────────────────────────────────

function RandomPanel({ session, onRandomize, onRandomizeAndGo }: {
  session: any;
  onRandomize: () => void;
  onRandomizeAndGo: () => void;
}) {
  return (
    <div>
      <div className="space-y-4 mb-8">
        <button
          onClick={onRandomize}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl border text-lg font-semibold text-white transition-all hover:brightness-110"
          style={{ backgroundColor: 'rgba(220, 38, 38, 0.15)', borderColor: 'rgba(220, 38, 38, 0.4)' }}
        >
          <Shuffle className="w-5 h-5" style={{ color: '#dc2626' }} />
          Randomize
        </button>
        <button
          onClick={onRandomizeAndGo}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-lg font-semibold text-white transition-all hover:brightness-110"
          style={{ backgroundColor: '#dc2626' }}
        >
          <Sparkles className="w-5 h-5" />
          Randomize & Go!
        </button>
      </div>

      {/* Current Selection */}
      {session?.killer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Your Setup</h3>
          <div className="space-y-3">
            <ResultCard icon={<Skull className="w-5 h-5" />} label="Killer" value={session.killer} color="#dc2626" />
            <ResultCard icon={<MapPin className="w-5 h-5" />} label="Location" value={session.location} color="#f97316" />
            <ResultCard icon={<User className="w-5 h-5" />} label="Final Girl" value={session.finalGirl} color="#a855f7" />
            <ResultCard icon={<Film className="w-5 h-5" />} label="Difficulty" value={session.difficulty === 'extreme' ? 'Extreme Horror Mode' : 'Normal'} color="#eab308" />
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ResultCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: color + '30' }}>
      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + '20', color }}>
        {icon}
      </div>
      <div>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

// ─── Checklist Step ─────────────────────────────────────────────────────────

function ChecklistStep() {
  const { state, dispatch } = useFinalGirl();
  const session = state.currentSession;

  const checklistItems = useMemo(() => [
    { id: 'choose-fg', text: `Place ${session?.finalGirl || 'Final Girl'} card below the Player Board`, category: 'Core Box' },
    { id: 'player-board', text: `Set up Player Board (${session?.difficulty === 'extreme' ? 'Extreme Horror Mode' : 'Normal'} side)`, category: 'Core Box' },
    { id: 'dice', text: 'Take 6 custom dice and place them to the side', category: 'Core Box' },
    { id: 'zero-cost', text: 'Take 6 Zero Cost Action cards as your starting hand', category: 'Core Box' },
    { id: 'action-tableau', text: 'Sort remaining Action cards into the Action Tableau', category: 'Core Box' },
    { id: 'victims', text: 'Set aside Victim meeples and Overflow boards', category: 'Core Box' },
    { id: 'killer-board', text: `Place ${session?.killer?.split(' — ')[0] || 'Killer'} board above the Player Board`, category: 'Feature Film' },
    { id: 'location-board', text: `Place ${session?.location || 'Location'} board to the right of the Killer board`, category: 'Feature Film' },
    { id: 'finale', text: 'Shuffle Finale cards, place 1 facedown on Killer board', category: 'Feature Film' },
    { id: 'dark-power', text: 'Shuffle Dark Power cards, place 1 facedown below Finale', category: 'Feature Film' },
    { id: 'terror-deck', text: 'Shuffle Killer + Location Terror cards, deal 10 for Terror deck', category: 'Feature Film' },
    { id: 'setup-card', text: 'Draw a Setup card and arrange the Location board', category: 'Feature Film' },
    { id: 'items', text: 'Deal Item cards into 3 piles of 4 (flip top card faceup)', category: 'Feature Film' },
    { id: 'health-killer', text: 'Place Health markers on Killer board (as shown)', category: 'Health & Tracks' },
    { id: 'health-fg', text: `Place Health markers on Player board (${session?.finalGirl || 'Final Girl'}'s health)`, category: 'Health & Tracks' },
    { id: 'bloodlust', text: 'Place Bloodlust marker at bottom of Killer\'s Bloodlust track', category: 'Health & Tracks' },
    { id: 'time', text: 'Place Time marker on 6', category: 'Health & Tracks' },
    { id: 'horror', text: 'Place Horror marker at Killer\'s starting Horror Level', category: 'Health & Tracks' },
    { id: 'event', text: 'Shuffle Event cards, draw and resolve the first Event', category: 'Final Steps' },
  ], [session]);

  const categories = Array.from(new Set(checklistItems.map(i => i.category)));
  const completedCount = checklistItems.filter(i => state.setupChecklist[i.id]).length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Setup Checklist
        </h2>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {completedCount}/{checklistItems.length} steps completed
        </p>
        <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: '#dc2626' }}
            animate={{ width: `${(completedCount / checklistItems.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current game info */}
      {session?.killer && (
        <div className="mb-6 p-4 rounded-xl border" style={{ backgroundColor: 'rgba(220, 38, 38, 0.05)', borderColor: 'rgba(220, 38, 38, 0.2)' }}>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Killer</p>
              <p className="text-sm font-semibold" style={{ color: '#dc2626' }}>{session.killer.split(' — ')[0]}</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Location</p>
              <p className="text-sm font-semibold" style={{ color: '#f97316' }}>{session.location}</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Final Girl</p>
              <p className="text-sm font-semibold" style={{ color: '#a855f7' }}>{session.finalGirl}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {categories.map(cat => (
          <div key={cat}>
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: '#dc2626' }}>{cat}</h3>
            <div className="space-y-2">
              {checklistItems.filter(i => i.category === cat).map(item => (
                <button
                  key={item.id}
                  onClick={() => dispatch({ type: 'TOGGLE_CHECKLIST', itemId: item.id })}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all"
                  style={{
                    backgroundColor: state.setupChecklist[item.id] ? 'rgba(220, 38, 38, 0.08)' : 'rgba(255,255,255,0.02)',
                    borderColor: state.setupChecklist[item.id] ? 'rgba(220, 38, 38, 0.3)' : 'rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all"
                    style={{
                      backgroundColor: state.setupChecklist[item.id] ? '#dc2626' : 'transparent',
                      borderColor: state.setupChecklist[item.id] ? '#dc2626' : 'rgba(255,255,255,0.2)',
                    }}
                  >
                    {state.setupChecklist[item.id] && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span
                    className="text-sm"
                    style={{
                      color: state.setupChecklist[item.id] ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.85)',
                      textDecoration: state.setupChecklist[item.id] ? 'line-through' : 'none',
                    }}
                  >
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
