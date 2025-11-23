import { CharacterCard } from '../CharacterCard';
import { characters } from '@shared/characters';

export default function CharacterCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <CharacterCard 
        character={characters[0]} 
        onSelect={(char) => console.log('Selected:', char.name)}
      />
      <CharacterCard 
        character={characters[1]} 
        onSelect={(char) => console.log('Selected:', char.name)}
        isActive={true}
      />
      <CharacterCard 
        character={characters[2]} 
        onSelect={(char) => console.log('Selected:', char.name)}
      />
    </div>
  );
}
